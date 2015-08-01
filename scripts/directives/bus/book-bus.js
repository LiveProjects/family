/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
.directive('bookBus',['commonDatas',function(commonDatas){
        return{
            restrict:'E',
            replace:true,
            scope:{},//这里需要隔离作用域，不然management.js会污染scope从而影响其作用域
            templateUrl:'views/directives/bus/book-bus.html',
            link:function(scope,ele,attr){
                scope.intro="班车预订";


                commonDatas.getfactoryhttp(function(data){
                    scope.intro=data[0]['FName'];
                });
            }
        }
    }]);