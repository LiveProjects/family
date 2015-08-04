<?php
header('content-type:text/html;charset=utf-8 ');
require '../dbaccess.php';
// $name=$_GET['name'];
$name="明";
if (isset($name)){
	$db=new DB();
	$sql_name="select FName from t_hs_employee where FName like '%".$name."%' limit 10";
// 	echo $sql_name;
	$res_name=$db->execsql($sql_name);
// 	var_dump($res_name);
	echo json_encode($res_name);
}
