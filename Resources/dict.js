if (Ti.App.Properties.hasProperty('dict')) {
	var dict = JSON.parse(Ti.App.Properties.getString('dict'));
	Ti.API.log(dict);
} else {
	var dict = {};
}

exports.add_word = function(word, translation) {
	dict[word] = {
		word : word,
		translation : translation,
		tries : 0,
		success : 0,
		timestamp : 0
	};
	// TODO many translations for same word
	Ti.App.Properties.setString('dict', JSON.stringify(dict));
};

exports.dict = dict; 