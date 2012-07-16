var homeWindow = Ti.UI.createWindow({
	backgroundColor : 'white',
	height : '100%'
});

var gamePart = Ti.UI.createView({
	bottom : '50%',
	height : '50%'
});
var gameWord = Ti.UI.createLabel({
	color : '#00132b',
	left : 6,
	top : 6,
	right : 6,
	font : {
		fontSize	 : 24
	},
	text : 'Word to translate',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	height : 'auto',
});
gamePart.add(gameWord);

var translatePart = Ti.UI.createView({
	backgroundColor : '#c5e2ed',
	height : '50%',
	top : '50%'
});
var translateField = Ti.UI.createTextField({
	left : 6,
	top : 6,
	right : 6,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	height : 'auto',
	hintText : 'Type a new word to translate'
});

translatePart.add(translateField);
homeWindow.add(translatePart);
homeWindow.add(gamePart);

exports.show = function() {
	homeWindow.open();
}
