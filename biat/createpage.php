<?php

process_post($_POST);

function validate_name($name){
	$errors = array();
	if(!(strlen($name) > 0 && strlen($name) < 20)){
		$errors[] = "path length";
	}
	if(!preg_match('/^[a-zA-Z0-9_]+$/', $name)){
		$errors[] = "path validcharacters";
	}
	if(file_exists($name) || file_exists($name . ".html") || file_exists($name . ".php")){
		$errors[] = "path inuse";
	}
	return $errors;	
}

function validate_key($key, $type){
	$errors = array();
	if(!validate_hex_string($key)){
		$errors[] = 'key ' . $type;
	}
	return $errors;
}

function validate_hex_string($string){
	return strlen($string) > 0 && preg_match('/^[a-fA-F0-9]+$/', $string);
}

function create_page($name, $encryptedRsaKey, $encryptedRandomKey, $extendedRsaKey, $publicKey){
	mkdir($name, 0755);
	copy("./template.tpl", $name . "/index.html");
	copy("./addpost.tpl", $name . "/addpost.php");
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
	$jsonkey = '{"publickey":"' . $publicKey . 
		'","ed":"' . $encryptedRsaKey .
		'","erk":"' . $encryptedRandomKey .
		'","efk":"' . $extendedRsaKey . '"}';
	fwrite($file, $jsonkey);
	fclose($file);
	$file = fopen($name . "/posts.html", "w");
	fwrite($file, "\n");
	fclose($file);
	return true;	
}

function process_post($post){
	$errors = array();
	if(!is_array($post)){
		fail(array("post notarray"));
	}
	foreach(array('ed', 'erk', 'efk', 'publickey') as $k){
		$errors = array_merge($errors, validate_key($post[$k], $k));
	}
	$errors = array_merge($errors, validate_name($post['name']));
	if(count($errors) > 0){
		fail($errors);
	}
	if(create_page($post['name'], $post['ed'], $post['erk'], $post['efk'], $post['publickey'])){
		print "success\n";
		print $post['name'];
	}
}

function fail($errors){
	print "fail\n";
	print implode("\n", $errors);
	exit();
}

