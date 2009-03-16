<?php
print "started \n";
if(validate_post($_POST)){
	add_post($_POST);
}
else{
	print "fail";
}

function validate_post($post){
	return(true);
}

function validate_message($text){
	return strlen($text) < 10000 && preg_match('/^[a-fA-F0-9]+$/', $text);
}

function validate_subject($text){
	return strlen($text) < 300;
}

function add_post($post){
	$subject = htmlspecialchars($post['subject']);
	$message = $post['message'];
	$newpost = <<<EOL
<div class="post">
	<span class="subject">$subject</span><br />
	<p class="ciphertext">$message</p>
	<textarea readonly="true" class="plaintext"></textarea>
	<a href="#" class="decrypt">Decrypt</a>
</div>

EOL;
	$file = fopen("./posts.html", "r+");
	flock($file, LOCK_EX);
	$oldposts = fread($file, filesize("./posts.html"));
	rewind($file);
	fwrite($file, $newpost . $oldposts);
	fclose($file);
	print "done";
}

