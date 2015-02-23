$(function(){

	// Toggle classes to expand tweets and compose sections
	$('.tweets').on('click', '.thread .tweet', function(){
		$(this).siblings().toggleClass('show');
	});

	$('body').on('click', '.compose', function(){
		$(this).toggleClass('expand');
	});

	// Render template functions
	var renderTweet = function(message){
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

	var renderThread = function (message){
		var source = $('#template-thread').html();
		var template = Handlebars.compile(source);
		var output = template({
			compose: renderCompose,
			tweet: renderTweet(message)
			});
		return output;
	};

	// user object
	var User = {
    handle: '@bradwestfall',
    img: 'images/brad.png'
	}


	// event handlers
	$('header > form').on('submit', function(event) {
		event.preventDefault();
		var message = $('textarea').val();
		var output = renderThread(message);
		$('.tweets').prepend(output); 
		$('textarea').val('');
	});

	$('.tweets').on('submit', '.replies', function(event) {
		event.preventDefault();
		var message = $(this).find('textarea').val();
		var output = renderTweet(message);
		$(this).find('form').after(output); 
		console.log(message);
		$('textarea').val('');
	});	

});