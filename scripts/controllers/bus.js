/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
.controller('busCtrl',['$scope','$routeParams','commonDatas',function($scope,$routeParams,commonDatas){
        $scope.intro="班车";

        $scope.pageClass="pagebus";


        $scope.which=$routeParams['which'];
        $scope.back=function(){
            return $scope.which;
        };
        /*console.log("--back--------");*/
        $scope.back();
        /*console.log("--back--------");*/

        if($scope.which=='true'){
            $("#bookb").css('display','block');
            $("#managementb").css('display','none');
        }else{
            $("#bookb").css('display','none');
            $("#managementb").css('display','block');
        }

    }]);