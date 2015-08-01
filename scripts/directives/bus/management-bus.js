/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
.directive('managementBus',[function(){
        return{
            restrict:'E',
            replace:true,
            scope:{},
            templateUrl:'views/directives/bus/management-bus.html',

            link:function(scope,ele,attr){
                scope.intro="班车管理";
            }
        }
    }]);