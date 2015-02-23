$(function() {


	var makeTweet = function(message){
		var source = $('#template-tweet').html();
		var template = Handlebars.compile(source); // source is a string, compile this string, compile outputs a function
		var output = template({
			message: message
		});
		return output;
	};

	var makeThread = function(message){
		var source = $('#template-thread').html();
		var template = Handlebars.compile(source);
		var output = template({
			tweet: makeTweet(message)
		});
		return output;
	};

	$('form').on('submit', function(event) {
		event.preventDefault()
		var message = $('textarea').val();
		var output = makeThread(message);
		$('body').append(output);
		$('textarea').val('');
	});	



	
});
	// Other way to do event $('button').click();
