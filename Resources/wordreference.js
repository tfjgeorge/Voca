var API_KEY = '26e2d';
var DEFAULT_FROM = 'fr';
var DEFAULT_TO = 'en';

var BASEURL = 'http://api.wordreference.com/0.8/' + API_KEY + '/json/';

var api_call = function(word, from, to, success_callback, error_callback) {

	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		if (xhr.status == 200) {
			success_callback(JSON.parse(xhr.responseData));
		} else {
			error_callback(xhr.responseData)
		}
	};

	var url = BASEURL + from + to + '/' + word;
	xhr.open('GET', url);
	xhr.send();
};

exports.get_translation = function(word, success_callback, error_callback) {
	api_call(word, DEFAULT_FROM, DEFAULT_TO, function(response) {
		Ti.API.log(response);
		if ( typeof response.term0 != 'undefined') {
			success_callback(response.term0.PrincipalTranslations,response.term0.AdditionalTranslations);
		} else {
			error_callback(response);
		}
	});
};
