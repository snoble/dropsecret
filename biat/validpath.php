<?
if(!is_array($_POST) || $_POST['path'] == ''){
	print "\nnotvalid\n";
	exit();
}

$path = $_POST['path'];
print("$path\n");

if(file_exists($path) && is_dir($path)){
	print("taken");
	exit();
}elseif(file_exists($path) || file_exists($path . ".html") || file_exists($path . ".php")){
	print("invalid");
	exit();
}
print("free");

