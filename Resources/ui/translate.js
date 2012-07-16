var translateWindow = Ti.UI.createWindow({
	backgroundColor : 'white',
	height : '100%'
});

var translateField = Ti.UI.createTextField({
	left : 6,
	top : 6,
	right : 6,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	height : 'auto',
	hintText : 'Type a new word to translate'
});

translateWindow.add(translateField);

exports.show = function() {
	translateWindow.open();
}
