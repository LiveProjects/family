/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
    .directive('mainLeftCom',[function(){
        return{
            restrict:'E',
            templateUrl:'views/directives/main/main-left-com.html',
            scope:{},
            link:function(scope,ele,attr){
                scope.intro="学术交流";
            }
        }
    }]);
