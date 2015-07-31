/**
 * Created by Administrator on 2015/7/31 0031.
 */
angular.module('Hisense')
.directive('mainTop',[function(){
        return{
            restrict:'E',
            templateUrl:'views/directives/main/main-top.html',
            replace:true,

            link:function(scope,ele,attr){
                scope.top="l am top main";
            }
        }
    }]);