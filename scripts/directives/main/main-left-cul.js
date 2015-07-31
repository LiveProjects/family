/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
    .directive('mainLeftCul',[function(){
        return{
            restrict:'E',
            templateUrl:'views/directives/main/main-left-cul.html',
            scope:{},
            link:function(scope,ele,attr){
                scope.intro="园区文化";
            }
        }
    }]);
