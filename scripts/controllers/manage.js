/**
 * Created by Administrator on 2015/8/8 0008.
 */
angular.module('Hisense')
    .controller('manageCtrl',['$scope','$routeParams','commonDatas',function($scope,$routeParams,commonDatas){
        $scope.intro="班车";
        $scope.name='asdasd';
        $scope.items=[1,2,3,4,5];
        $scope.show=function(index){
            //$scope.val=false;
            alert(index);
            $("#manage-right >div").eq(index).css('z-index','10');
            $("#manage-right >div").eq(index).siblings().css('z-index','0');
            $scope.$apply();//ng-if 和 ng-show 问题检测原因
        };

        $scope.val=true;

        /*$("#manage-left ul").delegate('li','click',function(){

        });*/

        document.getElementById("manage").style.height=window.innerHeight-50+"px";


    }]);