<?php
require 'dbaccess.php';
$db = new DB ();
/**
 * *****************预约删除******************
 */

$FName = $_GET ['name'];
$BDate = $_GET ['FRDate'] . ' 00:00:00';

/* $FID = $_GET ['FRDate']; */

$sql_id = "select FID from t_hs_employee where FName='{$FName}' ";
$res_id = $db->getrow ( $sql_id );

$sql_del = "delete From t_hs_overwork_reserv where FEmployeeID='{$res_id['FID']}' and FRDate='{$BDate}'";
/* $sql_del = "delete t_hs_overwork_reserv where FID='{$FID}' "; */
$res_del = $db->execsql ( $sql_del );
$res = mysql_affected_rows ();
if ($res) {
	echo 1; // 删除成功
} else {
	echo mysql_error ();
	echo 0; // 删除失败
}
