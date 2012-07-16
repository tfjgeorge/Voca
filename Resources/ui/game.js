var gameWindow = Ti.UI.createWindow({
	backgroundColor : 'white',
	height : '100%'
});

var gameWord = Ti.UI.createLabel({
	color : '#00132b',
	left : 6,
	top : 6,
	right : 6,
	font : {
		fontSize : 24
	},
	text : 'Word to translate',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	height : 'auto',
});

var answerField = Ti.UI.createTextField({
	left : 6,
	top : 36,
	right : 6,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	height : 'auto',
});

var translateButton = Ti.UI.createButton({
	right : 0,
	bottom : 0,
	height : 24,
	width : '50%',
	style : Ti.UI.iPhone.SystemButtonStyle.PLAIN,
	title : 'Add a word'
});

gameWindow.add(gameWord);
gameWindow.add(answerField);
gameWindow.add(translateButton);

gameWindow.addEventListener('click', function() {
	var TranslateWindow = require('ui/translate');
	TranslateWindow.show();
});

exports.show = function() {
	gameWindow.open();
}
