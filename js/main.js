$(function(){
	
	// user object
	var User = {
    	handle: '@bobtabor',
    	img: 'images/Bob.jpg'
	}


	// Render template functions
	var renderTweet = function(message, User){
		var source = $('#template-tweet').html();
		var template = Handlebars.compile(source);
		var output = template({
			title: User.handle,
			message: message,
			img: User.img
		});
		return output;
	};

	var renderCompose = function(){
		var source = $('#template-compose').html();
		var template = Handlebars.compile(source);
		var output = template();
		return output;
	};

	var renderThread = function (message, User){
		var source = $('#template-thread').html();
		var template = Handlebars.compile(source);
		var output = template({
			compose: renderCompose,
			tweet: renderTweet(message, User)
			});
		return output;
	};

	// Toggle classes to expand tweets and compose sections
	$('.tweets').on('click', '.thread .tweet', function(){
		$(this).parents('.thread').toggleClass('expand');
	});

	$('body').on('click', '.compose', function(){
		$(this).toggleClass('expand');
	});


	// event handlers
	$('header > form').on('submit', function(event) {
		event.preventDefault();
		var message = $('textarea').val();
		var output = renderThread(message, User);
		$('.tweets').prepend(output); 
		$('textarea').val('');
	});

	$('.tweets').on('submit', '.replies', function(event) {
		event.preventDefault();
		var message = $(this).find('textarea').val();
		var output = renderTweet(message, User);
		$(this).find('form').after(output); 
		console.log(message);
		$('textarea').val('');
	});	

});