/**
 * Created by Ann on 12/30/14.
 */
'use strict';

angular.module('dalockrAppV2App')
    .service('userServices', ['$http','$window','$sessionStorage','commonServices','appConfig',
        function ($http, $window,$sessionStorage,commonServices,appConfig) {

            var userServices = {};
            var userToken = '';
            //PPR
            var apiServerAddress = appConfig.API_SERVER_ADDRESS + '/api';

            userServices.user = null;

//            userServices.initUserService = function () {
//                var cookieUser = commonServices.decryptAES($cookies.authentificatedUserAES, userService.passPhrase);
//                if (!_.isUndefined(cookieUser)) {
//                    userServices.user = cookieUser;
//                    userServices.initUserProfile();
//                }
//            };

            userServices.getUser = function () {
                return $sessionStorage.com_dalockr_dev;
            };

            userServices.authenticationWithUserCredential = function (username,password,successCallback, errorCallback) {
                console.log(userToken);

                console.log('request.............');

                var loginData = {
                    //'clusterId':clusterId,
                    'username':username,
                    'password':password
                };
                var loginDataString = JSON.stringify(loginData);//Post GuDing Geshi


                $.ajax({
                    url: apiServerAddress+'/auth',
                    async: true,
                    type: 'POST', //POST for authentication
                    data: loginDataString,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('Authorization', userToken);
                    }
                }).done(function (data) {

                    // write cookie
                    //console.log(data);

                    $sessionStorage.com_dalockr_dev  = {
                        //sessionId : data.sessionId,
                        //sessionSecret : data.sessionSecret,
                        clusterId : data.clusterId,
                        username : data.username,
                        userid : data.userid,
                        isAuthorization : true
                    };

                    if(data.clusterId === appConfig.DASTORR_CLUSTER_ID){
                        $sessionStorage.com_dalockr_dev.isDastorrUser = true;
                    }

                    $sessionStorage.com_dalockr_dev.authToken =   commonServices.getAuthToken(data.sessionId, data.sessionSecret);

                    userServices.user=data;
                    //console.log($sessionStorage.com_dalockr_dev);

                    successCallback(data);


                }).fail(function (data) {
                    errorCallback(data);
                });
            };

            userServices.authenticationWithSession = function (data,successCallback, errorCallback) {
                //console.log(userToken);
                //
                console.log('request.............');


                $.ajax({
                    url: apiServerAddress+'/session/auth',
                    async: true,
                    type: 'POST', //POST for authentication
                    data:JSON.stringify({
                        sessionId:data.sid,
                        sessionSecret:data.ss
                    }),
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                    }
                }).done(function (data) {

                    $sessionStorage.com_dalockr_dev  = {
                        clusterId : data.clusterId,
                        username : data.username,
                        userid : data.userid,
                        isAuthorization : true
                    };

                    $sessionStorage.com_dalockr_dev.authToken =   commonServices.getAuthToken(data.sessionId, data.sessionSecret);

                    console.log($sessionStorage.com_dalockr_dev);
                    successCallback(data);
                }).fail(function (data) {
                    errorCallback(data);
                });
            };


            userServices.registerNewUser = function(registerData,successCallback,errorCallback){
                /*
                var registerData = {
                    //'lockrRef':'li',
                    'clusterId':'demo',
                    'username':'ck', //leaset 4
                    'password':'qdsjkq1456',
                    'firstName':'chis',
                    'lastName':'li',
                    'email':'1705781390@qq.com'
                    //'phoneNumber':'+0864951661'
                };
                */
                var registerDataString = JSON.stringify(registerData);//Post GuDing Geshi


                $.ajax({
                    url: apiServerAddress+'/register',
                    async: true,
                    type: 'POST', //POST for authentication
                    data: registerDataString,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                    }
                }).done(function (data) {

                    $sessionStorage.com_dalockr_dev  = {
                        //sessionId : data.sessionId,
                        //sessionSecret : data.sessionSecret,
                        clusterId : data.clusterId,
                        username : data.username,
                        userid : data.userid,
                        isAuthorization : true
                    };

                    if(data.clusterId === appConfig.DASTORR_CLUSTER_ID){
                        $sessionStorage.com_dalockr_dev.isDastorrUser = true;
                    }

                    //console.log(data);
                    $sessionStorage.com_dalockr_dev.authToken =   commonServices.getAuthToken(data.sessionId, data.sessionSecret);

                    successCallback(data);
                    userServices.user=data;
                    //console.log(data);

                }).fail(function (data) {
                    errorCallback(data);
                });


            };

            userServices.forgotPasswd = function (data, successCallback, errorCallback) {
                var url = apiServerAddress + '/reset/password';
                $.ajax({
                    url : url,
                    method : 'POST',
                    data : JSON.stringify(data),
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                    }
                }).done(function(data){
                    successCallback(data);
                }).fail(function(error){
                    errorCallback(error);
                });

            };
            userServices.forgotPasswdcode = function (newPassword, successCallback, errorCallback) {
                var url = apiServerAddress + '/reset/password/' + newPassword.resetCode;
                $.ajax({
                    url : url,
                    method : 'POST',
                    data : JSON.stringify(newPassword),
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                    }
                }).done(function(data){
                    successCallback(data);
                }).fail(function(error){
                    errorCallback(error);
                });

            };


            return userServices;
        }
    ]
);
