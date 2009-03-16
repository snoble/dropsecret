$(function(){$('#mpb').click(
	function(){
		return false;
	}
).click(
	function(){
		alert($('#ppf').val());
		getFlashMovie("mynumberstation").generateKeys($('#ppf').val());
	}
);
});

function getFlashMovie(movieName) {
	var isIE = navigator.appName.indexOf("Microsoft") != -1;
	return (isIE) ? window[movieName] : document[movieName];
}

var encryptedkey = 0;
var pubkey = 0;

function setvalue(key, value){
	switch(key){
	case "b":
		encryptedkey = pubkey = value;
		break;
	case "p":
		pubkey = value;
		break;
	case "e":
		encryptedkey = value;
		break;
	default:
		return;
	}

	if(encryptedkey != 0 && pubkey != 0){
		$("body").append('<p class="sp">pubkey ' + pubkey + '</p>');
		$("body").append('<p class="sp">encryptedkey ' + encryptedkey + '</p>');
	}
}

function flashdone(){
	$("body").append("flashdone <br />");
}

