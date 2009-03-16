<?php

process_post($_POST);

function validate_name($name, &$errors){
	return strlen($name) > 0 && strlen($name) < 20 && preg_match('/^[a-zA-Z0-9_]+$/', $name) && !file_exists($name); 
	
}

function validate_hex_string($string){
	return strlen($string) > 0 && preg_match('/^[a-fA-F0-9]+$/') && strlen($string) < 10000 ;
}

function create_page($name, $encryptedRsaKey, $encryptedRandomKey, $extendedRsaKey, $publicKey){
	mkdir($name, 0755);
	copy("./template.html", $name . "/index.html");
	$file = fopen($name . "/encryptedRsaKey", "w");
	fwrite($file, $encryptedRsaKey);
	fclose($file);
	$file = fopen($name . "/encryptedRandomKey", "w");
	fwrite($file, $encryptedRandomKey);
	fclose($file);
	$file = fopen($name . "/extendedRsaKey", "w");
	fwrite($file, $extendedRsaKey);
	fclose($file);
	$file = fopen($name . "/publicKey", "w");
	fwrite($file, $publicKey);
	fclose($file);
	$file = fopen($name . "/keys.json", "w");
	$jsonkey = '{"publicKey":"' . $publicKey . 
		'","encryptedRsaKey":"' . $encryptedRsaKey .
		'","encryptedRandomKey":"' . $encryptedRandomKey .
		'","extendedRsaKey":"' . $extendedRsaKey . '"}';
	fwrite($file, $jsonkey);
	fclose($file);
	
}

function process_post($post){
	$errors = array();
	if(!is_array($post) || !validate_name($post['name'], $errors)){
		fail($errors);
		return;
	}
	create_page($post['name'], $post['encryptedRsaKey'], $post['encryptedRandomKey'], $post['extendedRsaKey'], $post['publicKey']);
}

function fail($errors){
	print "fail\n";
	print implode("\n", $errors);
}

