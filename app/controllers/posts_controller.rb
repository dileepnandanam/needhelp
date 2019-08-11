class PostsController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @posts = @user.posts
    render 'index', layout: false
  end

  def create
    @post = Post.create(params.require(:post).permit(:text).merge({
      user_id: params[:user_id],
      post_user_id: current_user.id
    }))
    render 'post', layout: false
  end

  def destroy
    @post = Post.find(params[:id])
    if [@post.user, @post.post_user].include? current_user
      @post.delete
    end
    render 'post', layout: false
  end
end