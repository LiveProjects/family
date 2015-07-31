/**
 * Created by Administrator on 2015/7/31 0031.
 */
angular.module('Hisense')
    .directive('mainRight',[function(){
        return{
            restrict:'E',
            templateUrl:'views/directives/main/main-right.html',
            replace:true,
            scope:{},
            link:function(scope,ele,attr){
                scope.right='l am right main';
                scope.heal="运动健身";
                scope.green="绿化";
                scope.clear="保洁";
            }
        }
    }]);