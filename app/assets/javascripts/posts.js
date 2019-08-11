$(document).on('turbolinks:load', function() {
	$('.new-group-post').on('ajax:success', function(e) {
		new_post = $('.new-post')
		$('.new-post').html(e.detail[2].responseText)
		$(new_post).find('.post-form').ajaxForm(function(e) {
			$('.posts').prepend(e)
		    $('.post-form').remove()
		})
		$(new_post).find('.open-image-upload').on('click', function() {
			$(this).siblings('.image-upload').removeClass('d-none')
		})
	})

	$('.questions-container').on('ajax:success', '.delete-post', function(e) {
		$(this).closest('.group-post, .comment').remove()
	})

	$('.questions-container').on('ajax:success', '.cast-vote', function(e) {
		$(this).closest('.votes-container').html(e.detail[2].responseText)
	})
	
	$('.questions-container').on('ajax:success', '.new-comment-link', function(e) {
		$(this).closest('.comment-actions').siblings('.new-comment').html(e.detail[2].responseText)
	})

	$('.questions-container').on('ajax:success', '.comment-form', function(e) {
		$(this).closest('.new-comment').siblings('.comments-container').removeClass('d-none')
		$(this).closest('.new-comment').siblings('.comments-container').children('.comments').prepend(e.detail[2].responseText)
		$(this).closest('.new-comment').siblings('.comments-container').removeClass('d-none')
		$('.comment-form').remove()
	})

    $('.questions-container').on('ajax:success', '.expand-comment', function(e) {
    	$(this).closest('.comment-actions').siblings('.comments-container').html(e.detail[2].responseText)
    	$(this).closest('.comment-actions').siblings('.comments-container').removeClass('d-none')
    })
})