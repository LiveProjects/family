<?php
require '../dbaccess.php';
header ( 'content-type:text/html;charset=utf-8' );
$openid = "0001";
$db = new DB ();
/*提报时间FBooktime*/
// 记录本周的起始日期
$currentdate = strtotime ( date ( 'Y-m-d', time () ) );
$currentweek = date ( 'w', time () );
switch ($currentweek) {
	case 1 :
		break;
	case 2 :
		$currentdate -= 1 * 24 * 60 * 60;
		break;
	case 3 :
		$currentdate -= 2 * 24 * 60 * 60;
		break;
	case 4 :
		$currentdate -= 3 * 24 * 60 * 60;
		break;
	case 5 :
		$currentdate -= 4 * 24 * 60 * 60;
		break;
	case 6 :
		$currentdate -= 5 * 24 * 60 * 60;
		break;
	case 7 :
		$currentdate -= 6 * 24 * 60 * 60;
		break;
	default :
		break;
}
$from = date ( 'Y-m-d', $currentdate ) . " 00:00:00"; // 查询的起始日期
                                                  // $act = $_GET ['act'];
                                                  // if ($act == 'check') {
/**
 * ****************预约查看*********************
 */
/*$name_emp = $_GET['name'];*/
// echo $name_emp;
// $name_emp='lio';
// 联合查询出职员编码$res_com['id_emp']和其所在公司名称$res_com['name_com']
$sql_com = "select  a.FID as id_emp, a.FName as name_emp,b.FName as name_com from t_hs_employee a inner join t_hs_company b on a.FCompanyID=b.FID where a.FWechatID='{$openid}'";
$res_com = $db->getrow ( $sql_com );
// 查找当天之后的预约记录
$sql_check = "select FStopID as FStop,FRDate,FRTime,FBookID as book_name from t_hs_overwork_reserv where FEmployeeID='{$res_com['id_emp']}' and FRDate>='{$from}'";
$res_check = $db->execsql ( $sql_check );
// var_dump($res_check);
$num = count ( $res_check );
if ($num) {
	for($i = 0; $i < $num; $i ++) {
		$sql_state = "select FName as name_stop from  t_hs_stop where FID='{$res_check[$i]['FStop']}'";
		$res_state = $db->getrow ( $sql_state );
		// print_r($res_state);
		$res_check [$i] ['FStop'] = $res_state ['name_stop'];
		// 获取预约人的姓名
		$sql_id_wechat_book = "select FName as book_name from  t_hs_employee where FID='{$res_check[$i]['book_name']}'";
		$res_id_wechat_book = $db->getrow ( $sql_id_wechat_book );
		// print_r($res_id_wechat_book);
		// echo $sql_id_wechat_book;
		$res_check [$i] ['book_name'] = $res_id_wechat_book ['book_name'];
		$data = explode ( ' ', $res_check [$i] ['FRDate'] );
		// var_dump($data);
		$res_check [$i] ['FRDate'] = $data [0];
	}
} /*
   * else {
   * echo "无预约记录";
   * }
   */
// 将查到的公司信息与职员的预约记录以JSON格式输出
// var_dump ( $res_com );
// var_dump ( $res_check );
$check_data = array (
		'company' => $res_com,
		'check' => $res_check 
);
$checkjson = json_encode ( $check_data );
echo $checkjson;


?>
