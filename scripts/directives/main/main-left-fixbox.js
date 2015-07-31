/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
    .directive('mainLeftFixbox',[function(){
        return{
            restrict:'E',
            templateUrl:'views/directives/main/main-left-fixbox.html',
            scope:{},
            link:function(scope,ele,attr){
                scope.intro1="设备维修";
                scope.intro2="意见箱";
            }
        }
    }]);
