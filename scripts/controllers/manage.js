/**
 * Created by Administrator on 2015/8/8 0008.
 */
angular.module('Hisense')
    .controller('manageCtrl',['$scope','$routeParams','commonDatas',function($scope,$routeParams,commonDatas){
        $scope.intro="班车";
        $scope.name='asdasd';


        $scope.val=true;

        $("#manage-left ul").delegate('li','click',function(){
            var val=$(this).text();
            $scope.val=false;

            $scope.$apply();//ng-if 和 ng-show 问题检测原因

        });

        document.getElementById("manage").style.height=window.innerHeight-50+"px";


    }]);