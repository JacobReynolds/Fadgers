var colorConfig;

var uploadedImage;
initColors();
setSchoolColors('badger')


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
	$('#pleaseSelect').css('display', 'block');
	$('#dirtySelectWrapper').remove()
	config()
});

function initColors() {
	colorConfig = {
		'one': [],
		'oneCount': 3,
		'twoCount': 3,
		'two': [],
		'current': 'one',
		'oneColor': '',
		'twoColor': '',
		'oneHex': '',
		'twoHex': ''
	}
}

function config() {
	updateSelect(colorConfig.oneCount, colorConfig.oneColor)
}

function flashMessage() {
	$('#pleaseSelectFlash').removeClass('animate');
	setTimeout(function () {
		$('#pleaseSelectFlash').addClass('animate');
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
	var colorHex = colorConfig[colorConfig.current + 'Hex'];
	var backgroundColorHex = colorConfig[colorConfig.current + 'BackgroundHex'];
	$('#pleaseSelect').html('Please select ' + count + ' <span style="color:' + colorHex + ';' + (backgroundColorHex ? ('padding: 5px; background: ' + backgroundColorHex) : '') + '">' + colorConfig[colorConfig.current + 'Color'] + '</span> ' + (count === 1 ? 'point' : 'points') + ' on the image')
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

//Just to prevent easy spamming
var sampleImage;
$('#useSampleImage').click(function () {
	setSchoolColors('badger')
	updateSelect(colorConfig.oneCount, colorConfig.oneColor)
	if (!sampleImage) {
		$.get('/sampleImage', function (image) {
			sampleImage = image;
			uploadedImage = image;
			$('#pleaseSelect').css('display', 'block');
			$('#uploadedImage').attr('src', image);
			$('#uploadedImage').css('display', 'block');
			$('#dirtySelectWrapper').remove()
		})
	} else {
		$('#uploadedImage').attr('src', sampleImage);
	}
})



function setSchoolColors(school) {
	colorConfig.oneBackgroundHex = null;
	colorConfig.twoBackgroundHex = null;
	switch (school) {
		case 'badger':
			colorConfig.oneColor = 'red';
			colorConfig.twoColor = 'white';
			colorConfig.oneHex = '#b70101';
			colorConfig.twoHex = '#fff';
			colorConfig.twoBackgroundHex = '#000';
			break;
		case 'hoosier':
			colorConfig.oneColor = 'crimson';
			colorConfig.twoColor = 'cream';
			colorConfig.oneHex = '#990000';
			colorConfig.twoHex = '#EEEDEB';
			colorConfig.twoBackgroundHex = '#000';
			break;
		case 'wolverine':
			colorConfig.oneColor = 'maize';
			colorConfig.twoColor = 'blue';
			colorConfig.oneHex = '#ffcb05';
			colorConfig.twoHex = '#00274c';
			break;
		case 'terrapin':
			colorConfig.oneColor = 'red';
			colorConfig.twoColor = 'white';
			colorConfig.oneHex = '#E03A3E';
			colorConfig.twoHex = '#fff';
			colorConfig.twoBackgroundHex = '#000';
			break;
		case 'spartan':
			colorConfig.oneColor = 'green';
			colorConfig.twoColor = 'white';
			colorConfig.oneHex = '#18453b';
			colorConfig.twoHex = '#fff';
			colorConfig.twoBackgroundHex = '#000';
			break;
		case 'buckeye':
			colorConfig.oneColor = 'scarlet';
			colorConfig.twoColor = 'gray';
			colorConfig.oneHex = '#bb0000';
			colorConfig.twoHex = '#666666';
			break;
		case 'nittany lion':
			colorConfig.oneColor = 'blue';
			colorConfig.twoColor = 'white';
			colorConfig.oneHex = 'navyblue';
			colorConfig.twoHex = '#fff';
			colorConfig.twoBackgroundHex = '#000';
			break;
		case 'scarlet knight':
			colorConfig.oneColor = 'scarlet';
			colorConfig.twoColor = 'white';
			colorConfig.oneHex = '#FF2400';
			colorConfig.twoHex = '#fff';
			colorConfig.twoBackgroundHex = '#000';
			break;
		case 'illini':
			colorConfig.oneColor = 'orange';
			colorConfig.twoColor = 'blue';
			colorConfig.oneHex = '#131F33';
			colorConfig.twoHex = '#FA6300';
			break;
		case 'hawkeye':
			colorConfig.oneColor = 'black';
			colorConfig.twoColor = 'yellow';
			colorConfig.oneHex = '#000';
			colorConfig.twoHex = '#FFE100';
			break;
		case 'cornhusker':
			colorConfig.oneColor = 'scarlet';
			colorConfig.twoColor = 'cream';
			colorConfig.oneHex = '#d00000';
			colorConfig.twoHex = '#f5f1e7';
			colorConfig.twoBackgroundHex = '#000';
			break;
		case 'wildcat':
			colorConfig.oneColor = 'purple';
			colorConfig.twoColor = 'white';
			colorConfig.oneHex = '#4E2A84';
			colorConfig.twoHex = '#fff';
			colorConfig.twoBackgroundHex = '#000';
			break;
		case 'boilermaker':
			colorConfig.oneColor = 'gold';
			colorConfig.twoColor = 'black';
			colorConfig.oneHex = '#CEB888';
			colorConfig.twoHex = '#000';
			break;
	}
}
