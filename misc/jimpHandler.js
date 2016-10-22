var jimp = require("jimp");
var fs = require('fs');

function decodeBase64Image(dataString) {
	var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
		response = {};

	if (matches.length !== 3) {
		return new Error('Invalid input string');
	}

	response.type = matches[1];
	response.data = new Buffer(matches[2], 'base64');
	return response;
}

function saveImageFile(buffer, name, callback) {
	fs.writeFile(name, buffer.data, function (err) {
		if (!err) {
			callback();
		} else {
			console.log(err);
		}
	});
}

function getImageFile(buffer, name) {
	fs.readFile(name, buffer, function (err) {

	});
}

function deleteImageFile(imageName) {
	fs.unlink(imageName, function (err) {
		if (err) return console.log(err);
	});
}

function setColors(image, one, two, callback) {
	var oneArray = [];
	var twoArray = [];
	for (var color in one) {
		var offset = image.getPixelColor(Number(one[color].x), Number(one[color].y)).toString(16);
		oneArray.push("0x" + offset);
	}
	for (var color in two) {
		var offset = image.getPixelColor(Number(two[color].x), Number(two[color].y)).toString(16);
		twoArray.push("0x" + offset);
	}
	for (var x = 0; x < image.bitmap.width; x++) {
		for (var y = 0; y < image.bitmap.height; y++) {
			var currentColor = image.getPixelColor(x, y);
			currentColor = jimp.intToRGBA(parseInt(currentColor));
			for (var color in oneArray) {
				var arrayColor = oneArray[color];
				arrayColor = jimp.intToRGBA(parseInt(arrayColor));
				var diff = Math.abs(arrayColor.r - currentColor.r) + Math.abs(arrayColor.g - currentColor.g) + Math.abs(arrayColor.b - currentColor.b)
				if (diff < 50) {
					image.setPixelColor(0x7a0019FF, x, y);
				}
			}
			for (var color in twoArray) {
				var arrayColor = twoArray[color];
				arrayColor = jimp.intToRGBA(parseInt(arrayColor));
				var diff = Math.abs(arrayColor.r - currentColor.r) + Math.abs(arrayColor.g - currentColor.g) + Math.abs(arrayColor.b - currentColor.b)
				if (diff < 50) {
					image.setPixelColor(0xffcc33FF, x, y);
				}
			}
		}
	}
	callback(image);
}

module.exports.decodeBase64Image = decodeBase64Image;
module.exports.saveImageFile = saveImageFile;
module.exports.deleteImageFile = deleteImageFile;
module.exports.setColors = setColors;
