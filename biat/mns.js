$(function(){
	$.ajaxSetup({cache: false});
	$('#documentation').tabs().find("ul.ui-tabs-nav li").removeClass("ui-corner-top").addClass("ui-corner-all");
	$('#dest-path').keyup(checkDestPath);
	$('a').not('li a').each(function(){
		if($(this).attr('href').substr(0,1) == '/'){ return;}
		if($('#documentation ' + $(this).attr('href')).length > 0){
			var target = $(this).attr('href').substr(1);
			$(this).click(function(){
				$('#documentation').tabs('select', target);
			});
		}
		if($(this).attr('href').substr(0,1) == '#'){
			$(this).click(function(){return false});
		}
	});
	$('a[href="#goto"]').click(function(){
		$('#goto, #dest-path').each(pulse);
	});
	$('#content').css({visibility: 'visible'});
});

function pulse(){
	$(this).animate({opacity: 0.2}, 400)
		.animate({opacity: 0.8}, 300)
		.animate({opacity: 0.2}, 300)
		.animate({opacity: 1}, 400)
}

function attention(message, dontshow){
	return createDialogDiv(message).dialog({
		modal: true, 
		autoOpen: dontShowOption(dontshow)
	});
}

function attentionWithButton(message, dontshow){
	return createDialogDiv(message).dialog({
		modal: true, 
		buttons: {"Close": function(){$(this).dialog("destroy").remove()}},
		autoOpen: dontShowOption(dontshow)
	});
}

function attentionWithProgressBar(message, dontshow){
	return createDialogDiv(message).append('<div class="pb"></div>').dialog({
		modal: true,
		autoOpen: dontShowOption(dontshow)
	});
}

function dontShowOption(dontshow){
	if(dontshow == null) {dontshow = false;}
	return !dontshow;
}

function createDialogDiv(message){
	return $('<div class="dialog">' + message + '</div>').appendTo($('body'));
}

function gotoPath(path){
	window.location.pathname = '/' + path;
}

function checkDestPath(){
	var path = $('#dest-path').val().toLowerCase();
	$('#goto').unbind("click");
	$('#dest-path').unbind("keypress");
	ifValidateDestPath(path, function(){
		if(path != $('#dest-path').val()) {return}
		$('#goto').removeAttr("disabled").click(function(){gotoPath(path)});
		$('#dest-path').keypress(function(e){
			if(e.which == 13){gotoPath(path);}
		});
	},function(){
		if(path != $('#dest-path').val()) {return}
		$('#goto').attr("disabled", "disabled");
	});
}

function ifValidateDestPath(path, trueResponder, falseResponder){
	if(path.match(/^[a-z0-9]+$/)){
		ifValidatePathNameAvailable(path, falseResponder, trueResponder);
	}else{
		falseResponder();
	}
}

function ifValidatePathNameAvailable(path, trueResponder, falseResponder){
	$.post('./validpath.php', 
		{"path": path}, 
		function(data){
			data = data.split("\n");
			if(data[1] == "free"){
				trueResponder();
			}
			else{
				falseResponder();
			}
		}
	);
}

