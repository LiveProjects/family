/**
 * Created by Ann on 1/6/15.
 */
'use strict';

angular.module('dalockrAppV2App').service('commonServices',['$sessionStorage','localStorageService',function($sessionStorage,localStorageService) {
    var commonServices ={};
    var currentlockrsInTimelines;
    var userStats = null;
    var userSpaceInfo = null;
    var userDetails = null;
    var toShowAssetDetails = null;

    commonServices.lockrList = [];
    commonServices.searchLockrList = [];
    commonServices.isOpInSublockrToolBar = false;
    commonServices.socialChannels = null;

    var selectedLockr={
        name: '',
        description:'',
        id:''
    };

    // to save currentLockrselected before edit
    var selectedLockrSaved;

    //get Authentication Token
    commonServices.getAuthToken = function (sessionId, sessionSecret) {
        if (sessionId && sessionSecret) {
            var salt = '' + Date.now();
            var signature = CryptoJS.HmacSHA256(salt, sessionSecret);

            var authToken = {
                salt: salt,
                sessionId: sessionId,
                signature: signature.toString()
            };

            return authToken;
        }
        return false;
    };

    //findIndex in a list
    commonServices.findIndex = function(obj,id){
        var index = 0;
        angular.forEach(obj,function(value,key){
            if(value['id'] == id ){
                index = key;
            }
        });
        return index;
    };

    //Set current lockrs in time line to save them
    commonServices.setCurrentLockrs=function(currentlockrs){
         currentlockrsInTimelines=currentlockrs;

    };


    //get current lockrs in time line to save them
    commonServices.getCurrentLockrs=function(){
        return currentlockrsInTimelines;

    };

    //get current selected lockr in Timeline
    commonServices.getSelectedLockr=function(){

        return selectedLockr;
    };

    //set current selected lockr in Timeline
    commonServices.setSelectedLockr=function(currentLockrItem){
        //selectedLockr=currentLockrItem;
        selectedLockr.name = currentLockrItem.name;
        selectedLockr.description = currentLockrItem.description;
        selectedLockr.id = currentLockrItem.id;
    };


    // get original lockr before edit (if edit unsuccessfully, need reset lockr value)
    commonServices.getSelectedLockrSaved=function(){

        return selectedLockrSaved;
    };

    // save original lockr before edit (if edit unsuccessfully, need reset lockr value)
    commonServices.setSelectedLockrSaved=function(currentLockrItem){
        //selectedLockr=currentLockrItem;
        selectedLockrSaved = currentLockrItem;
    };

    //use current lockr value to reset
    commonServices.reSetSelectedLockrSaved=function(){
        //selectedLockr=currentLockrItem;
        selectedLockrSaved.name = selectedLockr.name;
        selectedLockrSaved.description = selectedLockr.description;
    };

    commonServices.setUserStats=function(data){
        userStats = data;
    };

    commonServices.getUserStats=function(){
        return userStats;
    };

    commonServices.getAssetStats = function(assetId,successfulCallback,errorCallback){
        var assetIsShare = false;
        angular.forEach(userStats.assetsWithStats, function(value){
            if(value.assetId === assetId){
                assetIsShare = true;
                successfulCallback(value);
            }
        });

        if(!assetIsShare){
            errorCallback(null);
        }
    };

    commonServices.setUserSpaceInfo = function(data){
      userSpaceInfo = data;
    };
    commonServices.getUserSpaceInfo = function(){
        return userSpaceInfo;
    };

    commonServices.setUserDetails = function(data){
      userDetails = data;
    };
    commonServices.getUserDetails = function(data){
      return userDetails;
    };

    commonServices.setShowAssetDetails = function(data){
        toShowAssetDetails = data;
    };
    commonServices.getShowAssetDetails = function(data){
        return toShowAssetDetails;
    };


    //cache mylockrs page data
    //commonServices.mylockrsCacheData = {
    //  'mylockrsData':null,
    //  'currentLockrId':null,
    //  'currentLockrAssets':null,
    //  'noSubLockrId':null,
    //  'currentLockrSubLockrs':null
    //};

    commonServices.flushUser = function(){

        commonServices.mylockrsCacheData = {
            'mylockrsData':null,
            'currentLockrId':null,
            'currentLockrAssets':null,
            'noSubLockrId':null,
            'currentLockrSubLockrs':null
        };
        commonServices.lockrList = [];
        commonServices.socialChannels = null;

        //securityAuthorization.isAuthorization = false;
        delete $sessionStorage.com_dalockr_dev;

        //console.log($sessionStorage.com_dalockr_dev);


    };

    commonServices.getUrlParams = function(url){

        var k1 = 'sid',
            k2 = 'ss';

        var regUrl = new RegExp('?'+ sid + '=[^&]+&' + ss + '=[^&]+#');
        var content = url.match(regUrl);

        console.log(content);

    };

    commonServices.getRedirectUrlParams = function(url){

        var params = {};


        var reg = new RegExp('\\?([^&#]+=[^&#]+&*)+','g');

        var result = url.match(reg);

        if( result === null ){
            return false;
        }

        var resultStr = result[0].replace(/^\?/,'');
        var paramsArr = resultStr.split('&');
        for(var i = 0; i < paramsArr.length; i++){
            var itemArr = paramsArr[i].split('=');
            params[itemArr[0]] = itemArr[1];
        }

        return params;
    };

    commonServices.in_array = function(search,array){
        for(var i in array){
            if(array[i] === search){
                return true;
            }
        }
        return false;
    };

    commonServices.loadJsCssFile = function(filename,filetype){

        if(filetype == 'js'){
            var fileref = document.createElement('script');
            fileref.setAttribute('type','text/javascript');
            fileref.setAttribute('src',filename);
        }else if(filetype == 'css'){

            var fileref = document.createElement('link');
            fileref.setAttribute('rel','stylesheet');
            fileref.setAttribute('type','text/css');
            fileref.setAttribute('href',filename);
        }
        if(typeof fileref != 'undefined'){
            document.getElementsByTagName('head')[0].appendChild(fileref);
        }

    };

    commonServices.addCss = function addCSS(cssText){
        var style = document.createElement('style'),
            head = document.head || document.getElementsByTagName('head')[0];
        style.type = 'text/css';
        if(style.styleSheet){ //IE
            var func = function(){
                try{
                    style.styleSheet.cssText = cssText;
                }catch(e){

                }
            };

            if(style.styleSheet.disabled){
                setTimeout(func,10);
            }else{
                func();
            }
        }else{ //w3c
            var textNode = document.createTextNode(cssText);
            style.appendChild(textNode);
        }
        head.appendChild(style); //
    };



    //dalockr-v2
    commonServices.lockrInfo = {
        allLockrData:null,
        currentShowLockrDetails:null
    };

    commonServices.lockrViewStack = [];
    commonServices.pushLockrToViewStack = function(lockr){
        commonServices.lockrViewStack.push(lockr);
        updateLocalStorageStack();

    };
    commonServices.popLockrFromViewStack = function(){
        commonServices.lockrViewStack.pop();
        updateLocalStorageStack();

    };
    commonServices.popLockrFromViewStackByLockrId = function(lockrId){

        updateLocalStorageStack();
    };

    function updateLocalStorageStack(){
        if(localStorageService.isSupported) {

            localStorageService.set("lockrViewStack", commonServices.lockrViewStack);
            //var key = localStorageService.get("key");

        }

    }
    commonServices.getLockrViewStackFromLocalStorage = function(){
        return localStorageService.get("lockrViewStack");
    };
    commonServices.updateLocalLockrViewStack = function(data){
        var stackData = localStorageService.get("lockrViewStack");
        stackData.pop();
        stackData.push(data);

        localStorageService.set("lockrViewStack", stackData);
        commonServices.lockrViewStack = stackData;
    };
    commonServices.clearLockrViewStack = function(){
        commonServices.lockrViewStack = [];
        localStorageService.remove("lockrViewStack");
    };
    commonServices.popLocalLockrViewStack = function(id){
        var stackData = localStorageService.get("lockrViewStack");
        var k = 0;
        angular.forEach(stackData,function(value, key){
           if(value.id === id){
              k = key;
              stackData.splice(key + 1,stackData.length-1 - key);
           }
        });
        //
        //for(var i=(k+1); i < stackData.length; i++){
        //    stackData.unshift();
        //}
        localStorageService.remove('lockrViewStack');
        localStorageService.set("lockrViewStack", stackData);
        commonServices.lockrViewStack = stackData;
    };

    commonServices.syncLocalAndService = function(){
        //var stackData = ;
        commonServices.lockrViewStack = localStorageService.get("lockrViewStack");
    };









    //open edit or create lockr dialog Mark
    //commonServices.alertCreateOrEditModalMark = false;
    //commonServices.deleteLockrMark = false;

    return commonServices;
}]);
