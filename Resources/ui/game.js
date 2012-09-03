var Dict = require('dict');

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

var gameWindow = Ti.UI.createWindow({
	backgroundColor : '#c5e2ed',
	height : '100%'
});

var gameWord = Ti.UI.createLabel({
	color : '#00132b',
	left : 6,
	top : 30,
	right : 6,
	font : {
		fontSize : 24
	},
	text : 'Word to translate',
	textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
	height : 'auto',
});

var answerField = Ti.UI.createTextField({
	left : 6,
	top : 60,
	right : 6,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	height : 30,
});

var addButton = Ti.UI.createImageView({
	right : 5,
	top : 0,
	height : 43,
	width : 43,
	image : '/images/add.png'
});
var statsButton = Ti.UI.createImageView({
	right : 54,
	top : 0,
	height : 43,
	width : 43,
	image : '/images/stats.png'
});

var lastAnswersView = Ti.UI.createTableView({
	top : 95,
	bottom : 0,
	left : 0,
	right : 0,
	backgroundColor : 'transparent'
});

var createLastAnswerRow = function(word, translation, correct) {
	var row = Ti.UI.createTableViewRow({
		backgroundColor : correct ? 'green' : 'red',
	});
	var wordLabel = Ti.UI.createLabel({
		text : word.capitalize(),
		right : 10,
		font : {
			fontSize : 20
		}
	});
	var translationLabel = Ti.UI.createLabel({
		text : translation.capitalize(),
		left : 10,
		top : 10,
		bottom : 10,
		height : 'auto',
		font : {
			fontSize : 24
		}
	});

	row.add(wordLabel);
	row.add(translationLabel);
	return row;
};

gameWindow.add(gameWord);
gameWindow.add(answerField);
gameWindow.add(addButton);
gameWindow.add(statsButton);
gameWindow.add(lastAnswersView);

addButton.addEventListener('click', function() {
	var AddWindow = require('ui/add');
	AddWindow.show();
});

var fetch_random = function(obj) {
	var temp_key, keys = [];
	for (temp_key in obj) {
		if (obj.hasOwnProperty(temp_key)) {
			keys.push(temp_key);
		}
	}
	return obj[keys[Math.floor(Math.random() * keys.length)]];
};
var word;

var start_game = function() {
	next_word();
};

var next_word = function() {
	word = fetch_random(Dict.dict);
	gameWord.text = word.word;
};

var match = function(word1, word2) {
	return word1 == word2;
};

var addLastAnswer = function(view) {
	if (lastAnswersView.data.length == 0) {
		lastAnswersView.appendRow(view);
	} else {
		lastAnswersView.insertRowBefore(0, view);
	}
};

var check_answer = function() {
	answerField.blur();
	var answer = answerField.value.toLowerCase();
	if (match(answer, word.translation)) {
		addLastAnswer(createLastAnswerRow(word.word, word.translation, true));
		next_word();
	} else {
		addLastAnswer(createLastAnswerRow(word.word, answer, false));
	}
};

answerField.addEventListener('return', check_answer);

exports.show = function() {
	gameWindow.open();
	start_game();
}
