var pbv;
var dsekey = new DSEKey();

$(function(){
	$('#mpb').click(
		function(){
			return false;
		}
	).click(
		function(){
			$('#path, #ppf, #ppf2').attr('readonly', "true");
			ifCheckAllParameters(function(){
				$('#waitmessage').dialog({modal: true, buttons: {'Generating...' : function(){}}});
				setTimeout("getFlashMovie('mynumberstation').generateKeys($('#ppf').val())", 500);
				$('#path, #ppf, #ppf2').removeAttr('readonly');
			},function(){
				$('#path, #ppf, #ppf2').removeAttr('readonly');
			});
		}
	);
	$('#path').keyup(checkPathName).focus(function(){$('#documentation').tabs('select', 'pagenamedoc');});
	$('#ppf, #ppf2').keyup(checkPassPhrase).keyup(checkPathName).focus(function(){$('#documentation').tabs('select', 'passworddoc');});
	$('#ppf').keyup(function(){dsekey.setKeys({passphrase: $(this).val()});});
	$('.form-alert').html("&nbsp");
});

function ifCheckAllParameters(trueResponder, falseResponder){
	if(checkPassPhrase()){
		ifCheckPathName(function(){
			trueResponder();
		},function(){
			falseResponder();
		});
	}else{
		checkPathName();
		falseResponder();
	}
}

function checkPathName(){
	ifCheckPathName(function(){}, function(){});
}

function ifCheckPathName(trueResponder, falseResponder){
	var pathName = $('#path').val();
	if(!pathName.match(/^[a-z0-9]+$/)){
		$('#path-alert').text("Page names can only contain lower case letters, numbers and underscores and may not be blank");
		falseResponder();
		return;
	}

	ifValidatePathNameAvailable(pathName, function(){
		if(pathName == $('#path').val()){
			$('#path-alert').html('&nbsp');
		}
		trueResponder();	
	},function(){
		if(pathName == $('#path').val()){
			$('#path-alert').text("That page name is not available");
		}
		falseResponder();
	});
}

function checkPassPhrase(){
	var result = validatePassPhrase();
	if(result){
		$('#ppf-alert').html("&nbsp");
	}else{
		$('#ppf-alert').text("Your pass phrase can't be blank.");
	}
	var result2 = validatePassPhraseMatch();
	if(result2){
		$('#ppf2-alert').html("&nbsp");
	}else{
		$('#ppf2-alert').text("Your pass phrases don't match.");
	}
	return (result && result2);
}

function validatePassPhrase(){
	return ($('#ppf').val().length > 0 );
}

function validatePassPhraseMatch(){
	return ($('#ppf').val() == $('#ppf2').val());
}

function getFlashMovie(movieName) {
	var isIE = navigator.appName.indexOf("Microsoft") != -1;
	return (isIE) ? window[movieName] : document[movieName];
}

var keys = {};
keys.rk = keys.publickey = keys.d = keys.p = keys.q = keys.dmp = keys.dmq = keys.qinv = 0;
function isSet(keys){
	for(var j in keys){
		if(keys[j] == 0) return false;
	}
	return true;
}

function setvalue(key, value){
	keys[key] = value;
	if(isSet(keys)){
		var postkeys = dsekey.setKeys(keys).encryptKeys().getSafeKeys();
		postkeys.name = $('#path').val();
		$.post("/createpage.php", postkeys, pagecreationdone);  
		for(var j in keys){
			keys[j] = 0;
			dsekey = new DSEKey();
		}
	}
}

function pagecreationdone(data){
	results = data.split("\n");
	switch(results.shift()){
	case "success":
		setTimeout("showWelcome(results[0])", 100);
		break;
	case "fail":
		$('#waitmessage').dialog("close");
		attentionWithButton("Shoot, there was a strange error.  " +
		"Would you mind emailing it to me at help@dropsecret.com.  " +
		"If you submit again it may work the second time.  Sorry about this. \n Error: " + 
		results.join("\n"));
		break;
	default:
		$('#waitmessage').dialog("close");
		attentionWithButton("The server responded surprisingly\n Please try to submit again");
		break;
	}
}

function showWelcome(path){
	$('#waitmessage').dialog("close");
	var welcome = attentionWithButton(
		'<p>Your page has been created for you.  If you want people to give you a message just give them the url <a href="/'+path+'">http://www.dropsecret.com/'+path+'</a></p><p>That is also where you will go to receive and decrypt the messages they have sent you.</p><p><strong>Don\'t give out your pass phrase!</strong> Others do not need your pass phrase to leave you a message; they only need your page name.',
		true);
	var buttons = welcome.dialog("option", "buttons");
	buttons["Take me there"] = function(){
		gotoPath(path);
	};
	welcome.dialog("option", "buttons", buttons).dialog("open");
} 

function a2p(txt){
	$("body").append('<p class="sp">' + txt + '</p>');
}

function flashdone(){

}
