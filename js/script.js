var ChatUI = {
	chat: $('.chat__messages'),
	author: 'Me',
	latestTimestamp: 0,
	fetching: false,

	init: function() {
		var authorParam = this.getUrlParam('author');
		if (authorParam != null) {
			this.author = authorParam;
		}

		// Send message on form submit
		$('form').submit(function(event) {
			var text = $('input[type=text]').val();
			Chatty.sendMessage(text, author, function() {
				console.log('Message sent');
			});
			event.preventDefault();
		});

		// Fetch messages and add them to the DOM every 5s
		setInterval(this.getMessages, 5000);
	},

	getMessages: function() {
		if (ChatUI.fetching) return;
		ChatUI.fetching = true;
				
		var successHandler = function(messages) {
			ChatUI.addMessages(messages);
			ChatUI.fetching = false;
		}

		if (ChatUI.latestTimestamp != 0) {
			Chatty.getMessagesNewerThan(ChatUI.latestTimestamp, successHandler);
		} else {
			ChatUI.chat.empty();
			Chatty.getAllMessages(successHandler);
		}
	},

	addMessages: function(messages) {
		if (messages.length > 0) {
			messages.forEach(ChatUI.addMessage);
			ChatUI.latestTimestamp = messages[messages.length-1].timestamp;
		}
	},

	addMessage: function(json) {
		// Define if the message was sent or received 
		var isMine = json.author == ChatUI.author;
		// Use moment.js to format the timestamp
		var timestamp = moment(new Date(json.timestamp)).format("DD MMM YYYY HH:mm");
		var messageHtml =
			'<div class="chat__message '+ (isMine ? 'chat__message--sent' : 'chat__message--received') +' message">' +
				'<div class="message__name">'+ json.author +'</div>' +
				'<div class="message__text">'+ json.message +'</div>' +
				'<div class="message__timestamp">'+ timestamp +'</div>' +
			'</div>';
		ChatUI.chat.append(messageHtml);
	},

	getUrlParam: function(prop) {
	    var params = {};
	    var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
	    var definitions = search.split( '&' );

	    definitions.forEach( function( val, key ) {
	        var parts = val.split( '=', 2 );
	        params[ parts[ 0 ] ] = parts[ 1 ];
	    } );

	    return ( prop && prop in params ) ? params[ prop ] : null;
	}
}
ChatUI.init();