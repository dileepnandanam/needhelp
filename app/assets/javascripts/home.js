initMasonry = function() {
		$('#masonry-container').masonry({
			itemSelector: '.question-wraper',
			gutter: 1000
		})
	}
$(document).on('turbolinks:load', function() {
	
	

	search = function() {
		query = $('.search input').val()
		$.ajax({
			url: $(this).data('url'),
			data: {
				query: query
			},
			success: function(data) {
				$('.questions').html(data)
				$('#masonry-container').masonry('destroy')
				initMasonry()
			}
		})
	}
	$('.search input').keyup($.debounce(250, search))
	initMasonry()

	$('.questions').on('ajax:success', '.view-more-questions', function() {
		$('#masonry-container').masonry('reloadItems')
		initMasonry()
	})

	$('.gender_form').find('input').on('change', function() {
		$(this).closest('form').submit().remove()
	})
})