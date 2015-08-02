<?php
	require '../dbaccess.php';
	//error_reporting(0);
	$DB=new DB();
	
	/*********************加班时间查询**************************************/
	$linktime="SELECT * FROM t_hs_bustime";
	$restime=$DB->execsql($linktime);
	
	
	/*********************班车站点查询**************************************/
	$linkBS="SELECT FName FROM t_hs_stop";
	$resBS=$DB->execsql($linkBS);
	
	
	
	
	$chushi=array('addtime'=>$restime,'addBS'=>$resBS);
	echo json_encode($chushi);
	
	
	
	
	
	
	
	
	
	
	//这种设置数组名的方式有点麻烦
	/* $arr=array('addtime'=>$res);
	echo $arr."<br/>";
	echo json_encode($arr)."<br/>";
	foreach ($arr as $key =>  $val){
		echo $key;
		print_r($val)."<br/>";
	} */
		
	
	
	
	
	
	
	
	
	
	
	
	
	/***********************测试数据模块 ************************************************/
	/* $arr=array(
			'name'=>'asd',
			'age'=>123,
			'sex'=>'男'
	); */
	//$as=$_GET['name'];
	/* echo $as; */
	//echo json_encode($arr);
	//echo json_encode($as);
	