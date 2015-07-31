/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
.directive('mainRightBus',[function(){
        return{
            restrict:'ECMA',
            templateUrl:'views/directives/main/main-right-bus.html',
            scope:{},
            link:function(scope,ele,attr){
                scope.busline="班车路线";
                scope.busbook="班车申请";
            }
        }
    }]);