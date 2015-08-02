<?php 
require '../dbaccess.php';
$DB=new DB();
/*********************用户名以及工厂查询**************************************/
/*$firstname=$_GET['firstname'];*/
$firstname='lio';
//  $name=$_GET['name'];
if(isset($firstname)){
	$link="SELECT b.FName FROM t_hs_employee as a inner join t_hs_company as b on a.FCompanyID=b.FID WHERE a.FName =  '".$firstname."'";
	$res=$DB->execsql($link);
    echo json_encode($res);
};

/*  $arr=array(
		'a'=>'123'
);


if (isset($name)){
	echo json_encode($arr); 
}  */
	
?>