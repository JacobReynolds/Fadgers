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
			$('#uploadedImage').attr('src', e.target.result);
			$('#uploadedImage').css('display', 'block');
			//Set global variable
			uploadedImage = e.target.result;
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

function flashMessage() {
	$('#pleaseSelect').removeClass('animate');
	setTimeout(function () {
		$('#pleaseSelect').addClass('animate');
	}, 250)
}

function updateSelect() {
	if (colorConfig.current === 'one' && colorConfig.oneCount === 0) {
		colorConfig.current = 'two';
	} else if (colorConfig.twoCount === 0) {
		flashMessage();
		$('#pleaseSelect').html('Please press submit');
		return;
	}
	var count = colorConfig[colorConfig.current + 'Count'];
	$('#pleaseSelect').html('Please select ' + count + ' ' + colorConfig[colorConfig.current + 'Color'] + ' ' + (count === 1 ? 'point' : 'points') + ' on the image')
	flashMessage();
}

$("#uploadedImage").click(function (event) {
	if (colorConfig.twoCount !== 0) {
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
		$('#pleaseSelect').html('<a class="btn btn-success col-xs-12 col-md-6 col-md-offset-3" href="/">Try again?</>');
	})
})

$('#pleaseSelect').html('Please upload an image');
flashMessage();
