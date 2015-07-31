/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
    .directive('mainLeftView',[function(){
        return{
            restrict:'E',
            templateUrl:'views/directives/main/main-left-View.html',
            scope:{},
            link:function(scope,ele,attr){
                scope.intro="参观接待";
            }
        }
    }]);
