var Chatty = {
	endpoint: 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0',
	token: 'UQngykNP5WHC',

	getAllMessages: function(successCallback) {
		this.getJson(this.endpoint, successCallback);
	},

	getMessagesNewerThan: function(timestamp, successCallback) {
		this.getJson(this.endpoint + '?since=' + timestamp, successCallback);
	},

	getJson: function(endpoint, successHandler) {
		$.ajax({ 
		    type: 'GET', 
		    url: endpoint, 
		    dataType: 'json',
		    headers: { 'token': Chatty.token },
		    success: successHandler
		});
	},

	sendMessage: function(text, author, successCallback) {
		var message = {
			'message': text,
			'author': author
		};
		this.postJson(this.endpoint, message, successCallback);
	},

	postJson: function(endpoint, json, successHandler) {
		$.ajax({ 
		    type: 'POST', 
		    url: endpoint, 
		    data: JSON.stringify(json),
		    dataType: 'json',
		    contentType: 'application/json; charset=utf-8',
		    headers: { 'token': Chatty.token },
		    success: successHandler
		});
	}
};