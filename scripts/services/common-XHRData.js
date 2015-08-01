/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
.service('commonDatas',['$http',function($http){
        commonDatas={};

        commonDatas.getfactory= function (username,successcallback,errorcallback) {
            if(sessionStorage.getItem('name')){
                commonDatas.username=sessionStorage.getItem('name');
            }else{
                sessionStorage.setItem('name','lio');
            }

            $.ajax({
                url: apiServerAddress+'/auth',
                async: true,
                type: 'POST',
                data: loginDataString,
                beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('Authorization', userToken);
                }
            }).done(function (data) {
                $sessionStorage.com_dalockr_dev  = {
                    clusterId : data.clusterId,
                    username : data.username,
                    userid : data.userid,
                    isAuthorization : true
                };
                successCallback(data);

            }).fail(function (data) {
                errorCallback(data);
            });
        };
        commonDatas.getfactoryhttp=function(successcallback,errorcallback){
            $http({
                method:'GET',
                url:'PHPInterface/Asnyc/ForBookbusAsnyc.php',
                data:{'firstname':'lio'}
            }).success(function(data,status,headers,config){
                var oo=JSON.stringify(data);
                console.log(oo);
                console.log(data[0]['FName']);
                successcallback(data);

            }).error(function(data,status,headers,config){
                console.log("error");
                errorcallback(data);
            })
        };


        return commonDatas;

    }]);