<?php
require 'dbaccess.php';
/**
 * *****************预约修改******************
 */

$openid = '0001';
$BTime = $_GET ['fixtime']; // 修改后的预约时间
$BDate = $_GET ['fixdate']; // 修改后的预约日期
$FStop = $_GET ['fixpark']; // 修改后的下车站点
$FRDate = $_GET ['FRDate']; // 修改前的预约日期
$FName = $_GET ['fixname']; // 职员姓名
                            // $FID=$_GET['FID'];
if (empty ( $BTime ) || empty ( $BDate ) || empty ( $FStop )) {
	echo 2; // 请检查空项
} else {
	$db = new DB ();
	$time = date ( 'Y-m-d H:i:s', time () );
	// echo $time;
	$week = date ( 'w', $BDate );
	switch ($week) {
		case 1 :
		case 2 :
		case 3 :
		case 4 :
		case 5 :
			$FType = 1;
			break;
		case 6 :
		case 0 :
			$FType = 2;
			break;
		default :
			break;
	}
	$sql_id_emp = "select FID from t_hs_employee where FName='{$FName}'";
	$res_id_emp = $db->getrow ( $sql_id_emp );
	// echo $res_id_emp['FID'];
	$sql_id_book = "select FID from t_hs_employee where FWechatID='{$openid}'";
	$res_id_book = $db->getrow ( $sql_id_book );
	$sql_stop = "select FID from t_hs_stop where FName='{$FStop}' ";
	$res_stop = $db->getrow ( $sql_stop );
	// echo $sql_stop;
	$sql_mod = "update  t_hs_overwork_reserv set FBookID='{$res_id_book['FID']}',FStopID='{$res_stop['FID']}' , FRTime='{$BTime}' , FRDate='{$BDate}' , FDate='{$time}' , FType='{$FType}' where FEmployeeID='{$res_id_emp['FID']}' and FRDate='{$FRDate}'";
	// echo $sql_mod;DIE;
	$res_mod = $db->execsql ( $sql_mod );
	$num_row = mysql_affected_rows ();
	if ($num_row) {
		echo 1; // 修改成功
	} else {
		echo 0; // 修改失败
	}
}