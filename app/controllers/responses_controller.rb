class ResponsesController < ApplicationController
  before_action :check_user
  def new
    @response = Response.new
  	@user = User.find params[:user_id]
  	@user.questions.each do |q|
      @response.answers << Answer.new(question_id: q.id)
  	end
  end

  def create
  	@response = Response.create response_params.merge(responce_user_id: current_user.id)
    flash[:notice] = "You have successfully answered #{@response.user.name}'s questions"
    if @response.responce_user_id == @response.user_id
      @response.delete
    else
      ResponseMailer.with(response_user: @response.responce_user, user: @response.user).new_response.deliver_later
    end
    redirect_to root_path
  end

  def accept
    @response = current_user.responses.find(params[:id])
    @response.update(accepted: true)
    render 'accept', layout: false
    ResponseMailer.with(user: current_user, response_user: @response.responce_user).response_accepted.deliver_later
  end

  protected

  def response_params
    params.require(:response).permit(:user_id, :answers_attributes => [:question_id, :text])
  end
end