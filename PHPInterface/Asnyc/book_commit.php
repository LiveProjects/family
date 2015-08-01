<?php
require '../dbaccess.php';
$name_emp = $_GET ['name_employee'];
$FRTime = $_GET ['FRTime']; // 加班时间
$FRDate = $_GET ['FRDate']; // 加班日期
// $FRDate = "2015-7-31"; // 加班日期
$FStop = $_GET ['FStop']; // 下车站点
$openid = "0001"; // 获取预约人的微信ID
/*
 * echo $name_emp;
 * if (empty($name_emp)){
 * echo 2;
 * }
 */
if (empty ( $name_emp ) || empty ( $FRTime ) || empty ( $FRDate ) || empty ( $FStop )) {
	echo 2; // 请检查空项
	die ();
} else {
	$week = date ( 'w', strtotime ( $FRDate ) );
// 	echo "haha".$week."hah";
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
	$db = new DB ();
	// 查询职员编号
	$sql_id_emp = "select FID from t_hs_employee where FName='{$name_emp}'";
	// echo $sql_id_emp;
	$res_id_emp = $db->getrow ( $sql_id_emp );
	// echo $res_id_emp ['FID'];
	// 查询下车站点编号
	$sql_id_stop = "select FID from t_hs_stop where FName='{$FStop}'";
	$res_id_stop = $db->getrow ( $sql_id_stop );
	// 根据预约人的微信ID获取其在t_hs_employee表中的FID
	$sql_id_book = "select FID from t_hs_employee where FWechatID='{$openid}'";
	$res_id_book = $db->getrow ( $sql_id_book );
	// 构造数据库结构
	$book = array ();
	$book ['FEmployeeID'] = $res_id_emp ['FID'];
	$book ['FStopID'] = $res_id_stop ['FID'];
	$book ['FRTime'] = $FRTime;
	$book ['FRDate'] = $FRDate;
	$book ['FType'] = $FType;
	$book ['FDate'] = date ( 'Y-m-d H:i:s', time () );
	$book ['FBookID'] = $res_id_book ['FID'];
// 	print_r($book);die;
	// 判断是否重复预约
	$sql_repeat = "select FID from t_hs_overwork_reserv where FEmployeeID='{$book['FEmployeeID']}' and FRDate='{$book ['FRDate']}' ";
	$res_repeat = $db->getrow ( $sql_repeat );
	// echo $res_repeat['FID'];
	if (empty ( $res_repeat )) { // 没有重复预约
	                             // 向数据库插入数据
		$insert = $db->insert ( 't_hs_overwork_reserv', $book );
		if ($insert) {
			echo 1; // 预约成功
		} else {
			echo 0; // 预约失败，请联系技术支持
		}
	} else {
		$sql_update = "update  t_hs_overwork_reserv set FStopID='{$book['FStopID']}' , FRTime='{$book ['FRTime']}' , FType='{$book ['FType']}' , FDate='{$book ['FDate']}',FBookID='{$book['FBookID']}' where FID='{$res_repeat['FID']}'";
		$res_update = $db->execsql ( $sql_update );
		if ($res_update) {
			echo 1; // 预约成功
		} else {
			echo 0; // 预约失败，请联系技术支持
		}
	}
}

