$(function(){
	$('#subject').val("Subject won't be encrypted").css({color: "d3d1d0", size: "small"})
		.focus(selectSubject).click(selectSubject).keyup(selectSubject).keydown(selectSubject);
	$('#ppcontent').tabs().find("ul.ui-tabs-nav li").removeClass("ui-corner-top").addClass("ui-corner-all");
	$('#encrypt').click(function(){return false;});
	$('#decrypt, #decrypt a').click(function(){
		$.get("posts.html", initializePosts);
	});
	$.getJSON("keys.json", setkeys);
	if(window.location.hash == '#welcome'){
		showWelcome();
	}
	$('#passphrase').keyup(function(){dsekey.setKeys({passphrase: $(this).val()});});
	$('#subject').focus(function(){$('#documentation').tabs('select', 'subjectdoc')});
	$('#message').focus(function(){$('#documentation').tabs('select', 'messagedoc')});
	$('#decrypt, #decrypt a').click(function(){$('#documentation').tabs('select', 'decryptdoc')});
});

var dsekey = new DSEKey();
var subjectchanged = false;

function selectSubject(){
	if(subjectchanged) return;
	if($(this).val() == "Subject won't be encrypted"){
		$(this).select();
	}else{
		subjectchanged = true;
		$(this).css('color', '#222222');
	}
}

function initializeButtons(){
	$('#encrypt').click(addpost);
}

function initializePosts(data){
	$("#posts").html(data);
	$('a.decrypt').click(decryptmessage);
}

function setkeys(keys){
	dsekey.setKeys(keys);
	initializeButtons();
}

function addpost(){
	var dialog = attentionWithProgressBar("Sending message");
	$('#subject, #message').attr("readonly", "true");
	$('#encrypt').unbind("click");

	var params = {};
	params.subject = $('#subject').val();
	params.message = dsekey.encryptPlainText($('#message').val());
	$.post('addpost.php', params, function(){postreceived(dialog)});
}

function postreceived(dialog){
	dialog.dialog("destroy").remove();
	attentionWithButton("Message arrived");
	$('#subject, #message').removeAttr("readonly").val('');
	initializeButtons();
}

function decryptmessage(){
	var post = $(this).parent();
	var decrdialog = attention("decrypting...");
	setTimeout(function(){
		var plaintext = dsekey.decryptCipherText(post.find("p.ciphertext").text());
		if(plaintext != null){
			post.find(".plaintext").text(plaintext);
			post.find("a.decrypt").remove();
			$('#passphrase').attr("readonly", "true");
		}else{
			attentionWithButton("Wrong password");
		}
		decrdialog.dialog("destroy").remove();
	}, 100);
}

function showWelcome(){
	//$('#welcome').css("display", "block");
}

