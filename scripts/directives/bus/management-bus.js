/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
.directive('managementBus',['commonDatas',function(commonDatas){
        return{
            restrict:'E',
            replace:true,
            scope:{
                case:'='
            },
            templateUrl:'views/directives/bus/management-bus.html',
            link:function(scope,ele,attr){
                scope.intro="班车管理";
                document.getElementById("managementbus").style.minHeight=window.innerHeight-50+"px";

                /*console.log("-----班车管理------");
                console.log(scope.case);
                console.log("-----班车管理----");*/

                commonDatas.delbus('lio','3:00',function(data){

                },function(data){

                })
            }
        }
    }]);