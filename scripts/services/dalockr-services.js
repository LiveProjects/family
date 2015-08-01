/**
 * Created by Ann on 12/30/14.
 */
'use strict';

angular.module('dalockrAppV2App')
    .service('dalockrServices', ['$http','$window','$sessionStorage','userServices','commonServices','$filter','appConfig',
        function ($http, $window,$sessionStorage,userServices,commonServices,$filter,appConfig) {


            var dalockrServices = {};

            //var authToken = commonServices.getAuthToken(userServices.getUser().sessionId,userServices.getUser().sessionSecret);
            var authToken = $sessionStorage.com_dalockr_dev.authToken;
            var clusterId = $sessionStorage.com_dalockr_dev.clusterId;

          //  var apiServiceAddress = 'https://app.dalockr.com/api/lockr?sort=name';
            var apiServiceAddress = appConfig.API_SERVER_ADDRESS + '/api/';

            dalockrServices.getUserDetails = function(userId,successCallback,errorCallback){

                console.log('-----GET USER DETAILS-----');

                $.ajax({
                    url: apiServiceAddress + 'user/' + userId,
                    async: true,
                    type: 'GET', //POST for authentication
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);
                }).fail(function (data) {
                    errorCallback(data);
                });
            };

            dalockrServices.getTimeline = function (successCallback, errorCallback) {
                authToken = $sessionStorage.com_dalockr_dev.authToken;

                console.log('-------GET   TIME   LINE-------');

                $.ajax({
                    url: apiServiceAddress+'lockr?sort=name',
                    async: true,
                    type: 'GET', //POST for authentication
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);
                    //sonsole.log(JSON.stringify(data));

                }).fail(function (data) {

                    errorCallback(data);
                });
            };


            dalockrServices.getThumbnailUrl = function (type,id) {
                return apiServiceAddress+ type +'/'+id +'/tn?salt=' + authToken.salt + '&sessionId=' + authToken.sessionId + '&signature=' + authToken.signature;
            };
            dalockrServices.getAssetSrc = function(type,id){
                return apiServiceAddress+ type +'/'+id +'?hq=false' + '&salt=' + authToken.salt + '&sessionId=' + authToken.sessionId + '&signature=' + authToken.signature;
            };
            dalockrServices.downloadLockrUrl = function(lockrId){
                return apiServiceAddress + 'lockr/'+ lockrId +'/contents?&salt=' + authToken.salt + '&sessionId=' + authToken.sessionId + '&signature=' + authToken.signature;
            };
            dalockrServices.downloadAssetUrl = function(assetId){
                return apiServiceAddress + 'asset/'+ assetId +'?dl=true&salt=' + authToken.salt + '&sessionId=' + authToken.sessionId + '&signature=' + authToken.signature;
            };




            dalockrServices.getAssetThumbnail = function(assetId, successCallback, errorCallback){

                console.log('----GET ASSET THUMBNAIL----');

                var authTokenStr = JSON.stringify(authToken);
                var tnServiceAddress = apiServiceAddress+'asset/'+assetId+'/tn';
                $.ajax({
                    url: tnServiceAddress,
                    async: true,
                    type: 'GET', //POST for authentication
                    data:authToken
                }).done(function (data) {

                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });
            };



            dalockrServices.getLockrDetails = function(lockrId,successCallback,errorCallback){

                console.log('------GET LOCKR DETAILS------');
                var lockrServiceAddress = apiServiceAddress+'lockr/' + lockrId;
                $.ajax({
                    url: lockrServiceAddress,
                    async: true,
                    type: 'GET',
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {

                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });

            };



            ///
            ///edit lockr name and des
            ///
            dalockrServices.editLockrDetails = function(lockrId,name,description,successCallback,errorCallback){
                var entityData = {
                    'name':name,
                    'description':description
                };

                dalockrServices.updateLockr(lockrId,entityData,successCallback,errorCallback);
            };

            dalockrServices.editLockrPublish = function(lockrId,hiddenFromPublicView,successCallback,errorCallback){
                var entityData = {
                    'hiddenFromPublicView':hiddenFromPublicView
                };
                dalockrServices.updateLockr(lockrId,entityData,successCallback,errorCallback);

            };

            ///
            /// Update Lockr
            ///
            dalockrServices.updateLockr = function(lockrId, entityData,successCallback,errorCallback){
                var entityDataString = JSON.stringify(entityData);// JSON Format


                var lockrServiceAddress = apiServiceAddress+'lockr/' + lockrId;
                //$.ajax({
                //    url: lockrServiceAddress,
                //    async: true,
                //    data:entityDataString,
                //
                //    type: 'PUT',
                //    beforeSend: function (xhr, settings) {
                //        xhr.setRequestHeader('Content-Type', 'application/json');
                //        //xhr.setRequestHeader('Authorization', userToken);
                //        xhr.setRequestHeader('sessionId', authToken.sessionId);
                //        xhr.setRequestHeader('salt', authToken.salt);
                //        xhr.setRequestHeader('signature', authToken.signature);
                //    }
                //}).done(function (data) {
                //
                //    successCallback(data);
                //
                //}).fail(function (data) {
                //    errorCallback(data);
                //});

                return $http.put(lockrServiceAddress,entityDataString,{
                    'headers':{
                        'Content-Type':'application/json',
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });


            };



            dalockrServices.createSubLockr = function(subLockrData,successCallback,errorCallback){

                var entityDataString = JSON.stringify(subLockrData);//Post JSON Format

                var createLockrServiceAddress = apiServiceAddress+'lockr';

                $.ajax({
                    url: createLockrServiceAddress,
                    async: true,
                    type: 'POST',
                    data:entityDataString,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    console.log(data);

                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });

            };

            dalockrServices.createProductLockr = function(entityData,successCallback,errorCallback){

                var entityDataString = JSON.stringify(entityData);//Post JSON Format

                var createLockrServiceAddress = apiServiceAddress+'store/product';

                $.ajax({
                    url: createLockrServiceAddress,
                    async: true,
                    type: 'POST',
                    data:entityDataString,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    console.log(data);

                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });

            };

            dalockrServices.createStoreLockr = function(entityData,successCallback,errorCallback){//ProductLockr

                var entityDataString = JSON.stringify(entityData);//Post JSON Format

                var createLockrServiceAddress = apiServiceAddress+'store';

                $.ajax({
                    url: createLockrServiceAddress,
                    async: true,
                    type: 'POST',
                    data:entityDataString,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    console.log(data);

                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });

            };
            dalockrServices.createCategoryLockr = function(entityData,successCallback,errorCallback){

                var entityDataString = JSON.stringify(entityData);//Post JSON Format

                var createLockrServiceAddress = apiServiceAddress+'store/category';

                $.ajax({
                    url: createLockrServiceAddress,
                    async: true,
                    type: 'POST',
                    data:entityDataString,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    console.log(data);

                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });

            };



            dalockrServices.createLockr = function(name,description,successCallback,errorCallback){

                var entityData = {
                    'name':name,
                    'description':description
                };
                var entityDataString = JSON.stringify(entityData);//Post JSON Format

                var createLockrServiceAddress = apiServiceAddress+'lockr';

                $.ajax({
                    url: createLockrServiceAddress,
                    async: true,
                    type: 'POST',
                    data:entityDataString,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    console.log(data);

                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });

            };

            dalockrServices.deleteLockr = function(lockrId,deleteAssets,socialChannels,successCallback,errorCallback){
                var entityData = {
                    'deleteAssets':deleteAssets,
                    'socialChannels':socialChannels
                };
                var entityDataString = JSON.stringify(entityData);// JSON Format
                console.log('------[delete service invoke service in dalockr service]---');


                var lockrServiceAddress = apiServiceAddress+'lockr/' + lockrId;
                $.ajax({
                    url: lockrServiceAddress,
                    async: true,
                    data:entityDataString,

                    type: 'delete',
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    console.log('------[delete service invoke service in dalockr service  success]---');

                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });

            };

            /*
            dalockrServices.createAsst = function (successCallback, errorCallback) {
                $.ajax({
                    url: apiServiceAddress,
                    async: true,
                    type: 'POST', //POST for authentication
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    console.log(data);
                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });
            };
            */

            dalockrServices.getUserAvatar = function(clusterId,userId){
                if(typeof $sessionStorage.com_dalockr_dev === 'undefined') return;
                if(clusterId && userId){
                    return 'https://v2.dalockr.com/u/' + clusterId +'/' + userId + '/avatar';
                }else{
                    return 'https://v2.dalockr.com/u/' + $sessionStorage.com_dalockr_dev.clusterId +'/' + $sessionStorage.com_dalockr_dev.username + '/avatar';
                }
            };

            dalockrServices.getAssetDetails = function(assetId,successCallback,errorCallback){

                console.log('-----GET ASSET DETAILS-----');

                var assetApiServiceAddress = apiServiceAddress + 'asset/' + assetId + '/details';
                //var assetApiServiceAddress = 'https://v2.dalockr.com/api/asset/'+assetId+'/details';
                $.ajax({
                    url: assetApiServiceAddress,
                    async: true,
                    type: 'GET', //POST for authentication
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    console.log(data);
                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });
            };

            dalockrServices.getLockrOrAssetComments = function(type,id,successCallback,errorCallback){
                var commentsApiServiceAddress = apiServiceAddress + type + '/' + id + '/comments';

                $.ajax({
                    url: commentsApiServiceAddress,
                    async: true,
                    type: 'GET', //POST for authentication
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });
            };

            dalockrServices.moveAssetsToAnotherLockr = function(assetsId,oldLokcrId,newLockrId,successCallback,errorCallback){
                var moveApiServiceAddress = apiServiceAddress + 'lockr/' + oldLokcrId + '/move/assets/to/lockr/' + newLockrId;
                var assetsIdStr = JSON.stringify(assetsId);
                $.ajax({
                    url: moveApiServiceAddress,
                    async: true,
                    type: 'PUT', //POST for authentication
                    data: assetsIdStr,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });

            };

            dalockrServices.copyAssetsToAnotherLockr = function(assetsId,oldLokcrId,newLockrId,successCallback,errorCallback){
                var moveApiServiceAddress = apiServiceAddress + 'lockr/' + oldLokcrId + '/copy/assets/to/lockr/' + newLockrId;
                var assetsIdStr = JSON.stringify(assetsId);
                $.ajax({
                    url: moveApiServiceAddress,
                    async: true,
                    type: 'POST', //POST for authentication
                    data: assetsIdStr,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });

            };

            dalockrServices.publishOrUnpublishAsset = function(type, assetId, successCallback , errorCallback){
                var publishApiServiceAddress = apiServiceAddress + 'asset/' + assetId + '/' + type;

                $.ajax({
                    url: publishApiServiceAddress,
                    async: true,
                    type: 'POST', //POST for authentication
                    beforeSend: function (xhr, settings) {
                        //xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });
            };

            dalockrServices.deleteAsset = function(assetId,successCallback,errorCallback){
                var deleteApiServiceAddress = apiServiceAddress + 'asset/' + assetId;

                $.ajax({
                    url: deleteApiServiceAddress,
                    async: true,
                    type: 'DELETE', //POST for authentication
                    beforeSend: function (xhr, settings) {
                        //xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });
            };

            dalockrServices.updateAssetDetails = function(assetId,assetDetailsData,successCallback,errorCallback){
                var updateApiServiceAddress = apiServiceAddress + 'asset/' + assetId + '/details';

                var assetDetailsDataStr = JSON.stringify(assetDetailsData);

                $.ajax({
                    url: updateApiServiceAddress,
                    async: true,
                    type: 'PUT', //POST for authentication
                    data: assetDetailsDataStr,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });
            };

            dalockrServices.shareAsset = function(assetId,data,successCallback,errorCallback){
                var shareApiServiceAddress = apiServiceAddress + 'asset/' + assetId + '/share';
                var assetShareDataStr = JSON.stringify(data);

                $.ajax({
                    url: shareApiServiceAddress,
                    async: true,
                    type: 'POST', //POST for authentication
                    data: assetShareDataStr,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });


            };

            dalockrServices.shareLockr = function(lockrId,data,successCallback,errorCallback){
                var shareApiServiceAddress = apiServiceAddress + 'lockr/' + lockrId + '/share';
                var lockrShareDataStr = JSON.stringify(data);

                $.ajax({
                    url: shareApiServiceAddress,
                    async: true,
                    type: 'POST', //POST for authentication
                    data: lockrShareDataStr,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });


            };

            dalockrServices.getSocialChannels = function(successCallback,errorCallback){
                var scApiServiceAddress = apiServiceAddress + 'social/share/channel';
                console.log(scApiServiceAddress);
                $.ajax({
                    url: scApiServiceAddress,
                    async: true,
                    type: 'GET', //POST for authentication
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        //xhr.setRequestHeader('Authorization', userToken);
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });
            };

            dalockrServices.createUser = function(createUserData,successCallback,errorCallback){
                //var createUserData = {
                //    'clusterId': 'demo',
                //    'username': 'sun',
                //    'password': 'qqq123456',
                //    'firstName': 'sun',
                //    'lastName': 'tang',
                //    'email': '1059688489@qq.com',
                //    'phoneNumber': '+0864951661'
                //};
                /*
                 {
                 'lockrRef': 'optional ref',
                 'clusterId': 'dalockr',
                 'username': 'dape',
                 'password': '...',
                 'firstName': 'daLockr',
                 'lastName': 'Pehrs',
                 'email': 'dalockr.pehrs@gmail.com',
                 'phoneNumber': '+46707070707'
                 }
                 */
                var createUserDataString = JSON.stringify(createUserData);//Post GuDing Geshi


                $.ajax({
                    url: apiServiceAddress +'user',
                    async: true,
                    type: 'POST', //POST for authentication
                    data: createUserDataString,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {

                    // write cookie
                    //$cookieStore.put('username',username);
                    //$cookieStore.put('sessionId',data.sessionId);
                    //$cookieStore.put('sessionSecret',data.sessionSecret);
                    //$cookieStore.put('clusterId',data.clusterId);
                    //$cookieStore.put('username',data.username);

                    console.log(data);
                    successCallback(data);
                    //userServices.user=data;

                }).fail(function (data) {
                    errorCallback(data);
                });


            };



            dalockrServices.getAllClusterUsers = function(clusterId,successCallback,errorCallback){
                $.ajax({
                    url: apiServiceAddress +'cluster/'+ clusterId + '/users',
                    async: true,
                    type: 'GET', //POST for authentication
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {

                    // write cookie
                    //$cookieStore.put('username',username);
                    //$cookieStore.put('sessionId',data.sessionId);
                    //$cookieStore.put('sessionSecret',data.sessionSecret);
                    //$cookieStore.put('clusterId',data.clusterId);
                    //$cookieStore.put('username',data.username);

                    console.log(data);
                    successCallback(data);
                    //userServices.user=data;

                }).fail(function (data) {
                    errorCallback(data);
                });
            };

            dalockrServices.shareLockrWithAnotherUser = function(lockrId,userName,successCallback,errorCallback){

                $.ajax({
                    url: apiServiceAddress + 'lockr/'+ lockrId + '/share/with/' + userName,
                    async: true,
                    type: 'PUT', //POST for authentication
                    beforeSend: function (xhr, settings) {
                        //xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);
                }).fail(function (data) {
                    errorCallback(data);
                });


            };



            dalockrServices.CreateSharingrule = function(sharingRule,successCallback,errorCallback){

                var sharingRuleData = JSON.stringify(sharingRule);

                $.ajax({
                    url: apiServiceAddress + 'sharingrule',
                    async: true,
                    type: 'POST', //POST for authentication
                    data:sharingRuleData,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);
                }).fail(function (data) {
                    errorCallback(data);
                });

            };

            dalockrServices.getUserSharingRules  = function(successCallback, errorCallback){
                $.ajax({
                    url: apiServiceAddress + 'sharingrule',
                    async: true,
                    type: 'GET', //POST for authentication
                    beforeSend: function (xhr, settings) {
                        //xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);
                }).fail(function (data) {
                    errorCallback(data);
                });
            };

            dalockrServices.setSharingRuleForUser = function(ruleId,successCallback,errorCallback){
                $.ajax({
                    url: apiServiceAddress + 'sharingrule/' + ruleId + '/default',
                    async: true,
                    type: 'PUT',
                    beforeSend: function (xhr, settings) {
                        //xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);
                }).fail(function (data) {
                    errorCallback(data);
                });
            };
            dalockrServices.deleteSharingRule = function(ruleId,successCallback,errorCallback){
                $.ajax({
                    url: apiServiceAddress + 'sharingrule/' + ruleId,
                    async: true,
                    type: 'DELETE',
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);
                }).fail(function (data) {
                    errorCallback(data);
                });
            };

            dalockrServices.replyComment = function( message , assetId, socialCommentId , successCallback, errorCallback){
                var replyApiServiceAddress = apiServiceAddress + 'asset/'+ assetId + '/' + socialCommentId +  '/' + 'reply';
                var messageStr = JSON.stringify(message);
                $.ajax({
                    url: replyApiServiceAddress,
                    async: true,
                    type: 'POST',
                    data:messageStr,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);
                }).fail(function (data) {
                    errorCallback(data);
                });
            };

            dalockrServices.likeComment = function(assetId, socialCommentId , successCallback, errorCallback){
                var likeApiServiceAddress = apiServiceAddress + 'asset/'+ assetId + '/' + socialCommentId +  '/' + 'like';
                var messageStr = JSON.stringify({'like':true});
                $.ajax({
                    url: likeApiServiceAddress,
                    async: true,
                    type: 'POST',
                    data:messageStr,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    successCallback(data);
                }).fail(function (data) {
                    errorCallback(data);
                });
            };


            // dashboard services
            dalockrServices.getPublicAssetViewsPerCountry = function(date, successCallback,errorCallback){
                //var url = apiServiceAddress + 'track/public/views/country';

                var url;
                if(date !== null && date.startTime !== null && date.endTime !== null){
                    url = apiServiceAddress + clusterId +  '/track/public/views/country?start=' + $filter('date')((new Date(date.startTime)), 'yyyyMMdd') + '&end=' + $filter('date')((new Date(date.endTime)), 'yyyyMMdd');
                } else {
                    url = apiServiceAddress  + clusterId + '/track/public/views/country';
                }

                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };


            dalockrServices.getPublicViewsViaSocialChannelPerDay = function(typeOfView,date,successCallback,errorCallback){

                var url;
                if(date.startTime !== null && date.endTime !== null){
                    url = apiServiceAddress + clusterId +  '/track/' + typeOfView + '/views/socialchannel/per/day?start=' + $filter('date')((new Date(date.startTime)), 'yyyyMMdd') + '&end=' + $filter('date')((new Date(date.endTime)), 'yyyyMMdd');
                } else {
                    url = apiServiceAddress + clusterId + '/track/' + typeOfView + '/views/socialchannel/per/day';
                }

                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };

            dalockrServices.getPublicViewsPerSocialChannel = function(typeOfView,successCallback,errorCallback){
                var url = apiServiceAddress + clusterId + '/track/' + typeOfView + '/views/socialchannel';
                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });

            };

            dalockrServices.getPublicAssetViewsPerBrowserType = function(successCallback,errorCallback){

                var url = apiServiceAddress + clusterId + '/track/public/views/browsers';

                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };

            dalockrServices.getTotalNumberOfCommentsAndViewsPerDay = function(date,successCallback,errorCallback){
                var url;
                if(date.startTime !== null && date.endTime !== null){
                    url = apiServiceAddress + clusterId + '/track/rates?start=' + $filter('date')((new Date(date.startTime)), 'yyyyMMdd') + '&end=' + $filter('date')((new Date(date.endTime)), 'yyyyMMdd');
                } else {
                    url = apiServiceAddress + clusterId + '/track/rates';
                }


                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };


            dalockrServices.getNumberOfCommentsAndViewsPerDayForAssetOrLockr = function(typeId,successCallback,errorCallback){
                var url = apiServiceAddress + clusterId + '/track/rates/' + typeId;

                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };


            dalockrServices.getNumberOfCommentsAndViewsPerDayOnSocialChannels = function(successCallback, errorCallback){
                var url = apiServiceAddress + clusterId + '/track/channel/rates';

                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };

            dalockrServices.inviteNewUserForLockr = function(id,userNameOrMail,successCallback,errorCallback){
                var url = apiServiceAddress + 'lockr/' + id + '/invite/' + userNameOrMail;

                $http({
                   method:'PUT',
                   url:url,
                   headers:{
                    'sessionId':authToken.sessionId,
                    'salt':authToken.salt,
                    'signature':authToken.signature
                   }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };
            /*
            dalockrServices.addAssetComment = function(replyData, assetId, socialCommentId, successCallback, errorCallback){

                var url = apiServiceAddress + 'asset/' + assetId + '/' + socialCommentId + '/reply';

                $http.post(url,{
                    'data':replyData,
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };
            */
            dalockrServices.getUserDashboard = function(date, successCallback,errorCallback){
                //var url = apiServiceAddress + 'user/stats/dashboard';

                var url;
                if(date !== null && date.startTime !== null && date.endTime !== null){
                    url = apiServiceAddress + 'user/stats/dashboard?start=' + $filter('date')((new Date(date.startTime)), 'yyyyMMdd') + '&end=' + $filter('date')((new Date(date.endTime)), 'yyyyMMdd');
                } else {
                    url = apiServiceAddress + 'user/stats/dashboard';
                }

                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    //console.log(data);
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };


            dalockrServices.getNumberOfCommentsAndViewsPerDayForAssetOrLockrOnSocialChannels = function(date, entityId, successCallback, errorCallback){
                var url;
                if(date !== null && date.startTime !== null && date.endTime !== null){
                    url = apiServiceAddress + clusterId + '/track/channel/rates/' + entityId + '?start=' + $filter('date')((new Date(date.startTime)), 'yyyyMMdd') + '&end=' + $filter('date')((new Date(date.endTime)), 'yyyyMMdd');
                } else {
                    url = apiServiceAddress + clusterId + '/track/channel/rates/' + entityId;
                }
                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    //console.log(data);
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });

            };

            dalockrServices.getUsedAndAvailableSpaceInformationForUser = function(successCallback, errorCallback){
                var url = apiServiceAddress + 'user/storage';



                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    //console.log(data);
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });

            };

            dalockrServices.updateUserDetails = function(userId, data ,successCallback, errorCallback){

                var url = apiServiceAddress + 'user/' + userId;
                var dataStr = JSON.stringify(data);

                $http.put(url, dataStr, {
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    //console.log(data);
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };
            dalockrServices.deleteASocialChannel = function(scId , successCallback, errorCallback){
                var url = apiServiceAddress + 'social/channel/' + scId;

                $http.delete(url, {
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    //console.log(data);
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });

            };

            dalockrServices.getEvent = function(successCallback, errorCallback){
                var url = apiServiceAddress + 'event';
                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };
            dalockrServices.getUserFollowings = function(successCallback, errorCallback){
                var url = apiServiceAddress + 'user/following';
                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };
            dalockrServices.getUserFollowers = function(successCallback, errorCallback){
                var url = apiServiceAddress + 'user/followers';
                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };
            dalockrServices.getLockrFollowers = function(lockrId,successCallback,errorCallback){
                var url = apiServiceAddress + 'lockr/' + lockrId + '/followers';
                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallback(data);
                }).error(function(error){
                    errorCallback(error);
                });
            };
            dalockrServices.followUser = function(userId,successCallBack, errorCallBack){
                var url = apiServiceAddress + 'user/follow/user/' + userId;
                $.ajax({
                    url : url,
                    type : 'POST',
                    async : true,
                    beforeSend : function(xhr, sentings){
                        xhr.setRequestHeader('Accept','application/json, text/javascript, */*');
                        //xhr.setRequestHeader('Content-Type','Application/json');
                        xhr.setRequestHeader('salt',authToken.salt);
                        xhr.setRequestHeader('signature',authToken.signature);
                        xhr.setRequestHeader('sessionId',authToken.sessionId);
                    },
                    success : function(data){
                        successCallBack(data);
                    },
                    error : function(error){
                        errorCallBack(error);
                    }
                });
            };
            dalockrServices.followLockr = function(LockrId,successCallBack, errorCallBack){
                var url = apiServiceAddress + 'user/follow/lockr/' + LockrId;
                $.ajax({
                    url : url,
                    type : 'POST',
                    async : true,
                    beforeSend : function(xhr, sentings){
                        xhr.setRequestHeader('Accept','application/json, text/javascript, */*');
                        //xhr.setRequestHeader('Content-Type','Application/json');
                        xhr.setRequestHeader('salt',authToken.salt);
                        xhr.setRequestHeader('signature',authToken.signature);
                        xhr.setRequestHeader('sessionId',authToken.sessionId);
                    },
                    success : function(data){
                        successCallBack(data);
                    },
                    error : function(error){
                        errorCallBack(error);
                    }
                });
            };
            dalockrServices.deleteUserFollows = function(followId, successCallBack, errorCallBack){
                var url = apiServiceAddress + 'user/following/' + followId;
                $http.delete(url, {
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallBack(data);
                }).error(function(error){
                    errorCallBack(error);
                });
            };
            dalockrServices.getCluster = function(clusterId, successCallBack, errorCallBack){
                var url = apiServiceAddress + 'cluster/' + clusterId;
                $http.get(url, {
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallBack(data);
                }).error(function(error){
                    errorCallBack(error);
                });
            };
            dalockrServices.getClusters = function(successCallBack, errorCallBack){
                var url = apiServiceAddress + 'cluster';
                $http.get(url, {
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallBack(data);
                }).error(function(error){
                    errorCallBack(error);
                });
            };
            dalockrServices.updateCluster = function(clusterId,data, successCallBack, errorCallBack){
                var url = apiServiceAddress + 'cluster/' + clusterId;
                $http.put(url,data, {
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallBack(data);
                }).error(function(error){
                    errorCallBack(error);
                });
            };
            dalockrServices.createCluster = function(cluster,successCallback, errorCallback){

                var clusterData = JSON.stringify(cluster);
                var url = apiServiceAddress + 'cluster';

                $.ajax({
                    url: url,
                    async: true,
                    type: 'POST',
                    data:clusterData,
                    beforeSend: function (xhr, settings) {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.setRequestHeader('sessionId', authToken.sessionId);
                        xhr.setRequestHeader('salt', authToken.salt);
                        xhr.setRequestHeader('signature', authToken.signature);
                    }
                }).done(function (data) {
                    console.log(data);

                    successCallback(data);

                }).fail(function (data) {
                    errorCallback(data);
                });
            };
            dalockrServices.getClusterUsers = function(clusterId, successCallBack, errorCallBack){
                var url = apiServiceAddress + 'cluster/' + clusterId + '/users';
                $http.get(url, {
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallBack(data);
                }).error(function(error){
                    errorCallBack(error);
                });
            };
            dalockrServices.getClusterInfo = function(successCallBack,errorCallBack){
              var url = apiServiceAddress + 'cluster/info';
                $http.get(url, {
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallBack(data);
                }).error(function(error){
                    errorCallBack(error);
                });
            };
            dalockrServices.addSocialChannel = function(clusterId, name, successCallBack, errorCallBack){
                var url = apiServiceAddress + clusterId + '/adm/add/social/channel/' + name;
                $http.get(url, {
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                }).success(function(data){
                    successCallBack(data);
                }).error(function(error){
                    errorCallBack(error);
                });
            };
            dalockrServices.getSearch = function(searchText, successCallBack, errorCallBack){
                var url = apiServiceAddress + $sessionStorage.com_dalockr_dev.clusterId + '/search?text=' + searchText;
                console.log(url);
                $http.get(url,{
                    'headers':{
                        'sessionId':authToken.sessionId,
                        'salt':authToken.salt,
                        'signature':authToken.signature
                    }
                })
                    .success(function(data){
                        successCallBack(data);
                    })
                    .error(function(error){
                        errorCallBack(error);
                    });
            };


            return dalockrServices;

        }
    ]
);
