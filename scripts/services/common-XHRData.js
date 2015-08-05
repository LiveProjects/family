/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
.service('commonDatas',['$http',function($http){
        commonDatas={};

        /*commonDatas.getfactoryhttp= function (successcallback,errorcallback) {
            if(sessionStorage.getItem('name')){
                commonDatas.username=sessionStorage.getItem('name');
            }else{
                sessionStorage.setItem('name','lio');
            }

            $.ajax({
                url: 'PHPInterface/Asnyc/ForBookbusAsnyc.php',
                async: true,
                type: 'POST',
                data: {'firstname':'lio'},
                beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                }
            }).done(function (data) {
                var oo=JSON.stringify(data);
                console.log(oo);
                console.log(data[0]['FName']);
                successcallback(data);

            }).fail(function (data) {
                errorCallback(data);
            });
        };*/
        /*获取工厂名*/
        commonDatas.getfactoryhttp=function(val,successcallback,errorcallback){
            $http({
                method:'POST',
                url:'PHPInterface/Asnyc/ForBookbusAsnyc.php',
                data:{'firstname':'lio'},
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                params : {'firstname':val}
            }).success(function(data,status,headers,config){
                var oo=JSON.stringify(data);
                /*console.log(oo);
                console.log(data[0]['FName']);*/
                successcallback(data);

            }).error(function(data,status,headers,config){
                console.log("error");
                errorcallback(data);
            })
        };

        /*commonDatas.getfactoryhttp=function(successcallback,errorcallback){
             $http.post('PHPInterface/Asnyc/ForBookbusAsnyc.php',{
                 'firstname':'lio'
             }).success(function(data){
                 console.log(123);
                 console.log(data);
                 successcallback(data);
             }).error(function(error){
                 errorcallback(error);
             });
        };*/

        /*返回bus基本预加载数据*/
        commonDatas.getbusData=function(successcallback,errorcallback){
            $http({
                method:'POST',
                url:'PHPInterface/Passive/json.php',
                data:{'firstname':'lio'},
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).success(function(data,status,headers,config){
                /*var oo=JSON.stringify(data);
                console.log(oo);*/
                successcallback(data);
            }).error(function(data,status,headers,config){
                /*console.log("error");*/
                errorcallback(data);
            })
        };
        /*预约查看*/
        commonDatas.getcheckMan= function (/*val,username*/successcallback, errorcallback) {
            $http({
                method:'POST',
                url:'PHPInterface/Passive/checkBus.php',
                data:{'firstname':'lio'},
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                params:{}
            }).success(function(data,status,headers,config){
                /*var oo=JSON.stringify(data);
                 console.log(oo);*/
                successcallback(data);
            }).error(function(data,status,headers,config){
                /*console.log("error");*/
                errorcallback(data);
            })
        };

        /*删除预约*/
        commonDatas.delbus=function(name,FRDate,successcallback,errorcallback){
            $http({
                method:'POST',
                url:'PHPInterface/Asnyc/delBus.php',
                data:{},
                params:{'name':name,'FRDate':FRDate},
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).success(function(data,status,headers,config){
                /*var oo=JSON.stringify(data);
                 console.log(oo);*/
                successcallback(data);
            }).error(function(data,status,headers,config){
                /*console.log("error");*/
                errorcallback(data);
            })
        };

        /*修改预约*/
        commonDatas.fixBus= function (val, successcallback, errorcallback) {
            $http({
                method:'POST',
                url:'PHPInterface/Asnyc/fixBus.php',
                data:{},
                params:{'name':val[0]},//索引出其具体指传进来的数组，待修改...
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).success(function(data){
                successcallback(data);
            }).error(function(data){
                errorcallback(data);
            })
        };

        /*提交预订*/
        commonDatas.bookbus=function(val, successcallback, errorcallback){
            $http({
                method:'POST',
                url:'PHPInterface/Asnyc/book_commit.php',
                data:{},
                params:{
                    'name_employee':val[0],
                    'FRTime':val[2],
                    'FRDate':val[1],
                    'FStop':val[3]
                },
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).success(function(data){
                successcallback(data);
            }).error(function(data){
                errorcallback(data);
            })
        };

        /*员工姓名模糊查询*/
        commonDatas.modelname=function(val,successcallback,errorcallback){
            $http({
                method:'POST',
                url:'',
                data:{},
                params:{},
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).success(function(data){
                successcallback(data);
            }).error(function (data) {
                errorcallback(data);
            })
        };

        return commonDatas;

    }]);