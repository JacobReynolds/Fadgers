var colorConfig = {
	'one': [],
	'oneCount': 3,
	'twoCount': 3,
	'two': [],
	'current': 'one',
	'oneColor': 'red',
	'twoColor': 'white'
}

var uploadedImage;

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			uploadedImage = e.target.result;
			$('#uploadedImage').attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}

$("#imgInput").change(function () {
	readURL(this);
	config()
});

function config() {
	updateSelect(colorConfig.oneCount, colorConfig.oneColor)
}

function updateSelect() {
	if (colorConfig.current === 'one' && colorConfig.oneCount === 0) {
		colorConfig.current = 'two';
	} else if (colorConfig.twoCount === 0) {
		$('#pleaseSelect').html('Please press submit');
		return;
	}
	$('#pleaseSelect').html('Please select ' + colorConfig[colorConfig.current + 'Count'] + ' ' + colorConfig[colorConfig.current + 'Color'] + ' points on the image')
}

$("#uploadedImage").click(function (event) {
	if (colorConfig.twoCount !== -1) {
		colorConfig[colorConfig.current].push({
			'x': event.offsetX,
			'y': event.offsetY
		})
		colorConfig[colorConfig.current + 'Count']--;
		updateSelect()
	}
})

$('#submitImage').click(function () {
	$.post('/submitImage', {
		'one': colorConfig.one,
		'two': colorConfig.two,
		'image': uploadedImage
	}).then(function (image, status) {
		$('#uploadedImage').attr('src', image);
	})
})
