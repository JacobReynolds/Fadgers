var express = require('express');
var router = express.Router();
var jimpHandler = require('../misc/jimpHandler');
var jimp = require('jimp');
var crypto = require('crypto')
var imageDirectory = __dirname + '/../imageDirectory/'
	/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', {
		title: 'Express'
	});
});

router.post('/submitImage', function (req, res) {
	var imageBuffer = jimpHandler.decodeBase64Image(req.body.image);
	var imageType;
	switch (imageBuffer.type) {
		case 'image/png':
			imageType = jimp.MIME_PNG;
		case 'image/jpeg':
		case 'image/jpg':
			imageType = jimp.MIME_JPEG;
		case 'image/bpm':
			imageType = jimp.MIME_BMP;
	}
	crypto.randomBytes(24, function (err, buffer) {
		var token = buffer.toString('hex');
		var imageName = imageDirectory + token;
		jimpHandler.saveImageFile(imageBuffer, imageName, function () {
			jimp.read(imageName, function (err, image) {
				jimpHandler.setColors(image, req.body.one, req.body.two, function (image1) {
					image1.getBuffer(imageType, function (err, image2) {
						if (image2) {
							var base64Image = image2.toString('base64');
							var imgSrcString = "data:" + imageBuffer.type + ";base64," + base64Image;
							res.writeHead(200, {
								'Content-Type': imageBuffer.type
							});
							res.end(imgSrcString, 'binary');
							jimpHandler.deleteImageFile(imageName);
						} else {
							res.write(500);
						}
					})
				})
			}).catch(function (err) {
				console.log('err');
				res.write(500);
			})
		});
	});

})

module.exports = router;
