var WordReference = require('wordreference');
var Dict = require('dict');
var word;

var addWindow = Ti.UI.createWindow({
	backgroundColor : 'white',
	height : '100%',
	modal : true
});

var translateField = Ti.UI.createTextField({
	left : '6dp',
	top : '6dp',
	right : '41dp',
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	height : '30dp',
	hintText : 'Type a new word to translate'
});

var translate_button = Ti.UI.createButton({
	right : '6dp',
	top : '6dp',
	width : '29dp',
	height : '30dp'
});

var translation_table = Ti.UI.createTableView({
	top : '42dp',
	left : 0,
	right : 0,
	height : 'auto'
});

var back_button = Ti.UI.createButton({
	title : 'back'
});

addWindow.setLeftNavButton(back_button);
addWindow.add(translateField);
addWindow.add(translate_button);
addWindow.add(translation_table);

var close = function() {
	addWindow.close();
};

var create_row = function(translation) {
	var row = Ti.UI.createTableViewRow({
		width : 'auto',
		height : 65
	});

	var original = (translation.OriginalTerm.sense == '' ? translation.OriginalTerm.term : translation.OriginalTerm.sense);
	var translation_original = Ti.UI.createLabel({
		text : original,
		bottom : 5,
		left : 5,
		right : 5,
		height : 'auto',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		font : {
			fontSize : 15
		}
	});

	var add_button = Ti.UI.createButton({
		right : 5,
		height : 30,
		width : 30,
		title : '+',
		top : 5,
	});

	var translation_translation = Ti.UI.createLabel({
		text : translation.FirstTranslation.term,
		top : 10,
		left : 5,
		right : 5,
		font : {
			fontSize : 23
		}
	});
	row.add(translation_original);
	row.add(translation_translation);
	row.add(add_button);

	add_button.addEventListener('click', function() {
		Dict.add_word(word, translation.FirstTranslation.term);
		row.setBackgroundColor('green');
		add_button.setEnabled(false);
	});

	return row;
};

var display_translations = function(principal, additional) {
	Ti.API.log(principal);
	Ti.API.log(additional);
	var data = [];
	for (var trans_key in principal) {
		var translation = principal[trans_key];
		data.push(create_row(translation));
	}
	for (var trans_key in additional) {
		var translation = additional[trans_key];
		data.push(create_row(translation));
	}

	translation_table.data = data;
};

var get_translation = function() {
	word = translateField.value;

	WordReference.get_translation(word, function(principal, additional) {
		display_translations(principal, additional);
	});
};

back_button.addEventListener('click', close);
translate_button.addEventListener('click', get_translation);

exports.show = function() {
	addWindow.open();
}
