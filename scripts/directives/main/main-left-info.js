/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
    .directive('mainLeftInfo',[function(){
        return{
            restrict:'E',
            templateUrl:'views/directives/main/main-left-info.html',
            scope:{},
            link:function(scope,ele,attr){
                scope.intro="重要通知信息";
            }
        }
    }]);
