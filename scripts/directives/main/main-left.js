/**
 * Created by Administrator on 2015/7/31 0031.
 */
angular.module('Hisense')
    .directive('mainLeft',[function(){
        return{
            restrict:'E',
            templateUrl:'views/directives/main/main-left.html',
            replace:true,
            scope:{},
            link:function(scope,ele,attr){
                scope.left='l am left main';
            }
        }
    }]);