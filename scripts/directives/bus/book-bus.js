/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
.directive('bookBus',['$location','commonDatas',function($location,commonDatas){
        return{
            restrict:'E',
            replace:true,
            scope:{
                case:'='
            },//这里需要隔离作用域，不然management.js会污染scope从而影响其作用域
            templateUrl:'views/directives/bus/book-bus.html',
            link:function(scope,ele,attr){
                scope.intro="班车预订";

                /*console.log("------------");
                console.log(scope.case);
                console.log("------------");*/

                commonDatas.getfactoryhttp(function(data){
                    scope.intro=data[0]['FName'];
                });
                commonDatas.getbusData(function(data){
                    console.log("-----lio---");
                    console.log(data);
                    console.log("-----lio---");
                }, function (data) {
                    console.log(data);
                });

                commonDatas.getcheckMan(function(data){
                    console.log("-----check---");
                    console.log(data);
                    console.log("-----check---");
                },function(data){
                    console.log(data);
                });

                function bbus() {
                    var val=[];
                    val[0]=ele.find("div").text();
                    commonDatas.bookbus(val,function(data){
                        if(data){
                            alert("预约成功");
                        }
                    },function(data){
                        alert(data);
                    });
                }


                scope.manbus=function(){
                    $location.path('bus/false');
                };
                scope.a="管理班车";
                /*console.log("ssssssssssssssssss");
                console.log(typeof scope.case);*/
                scope.$watch(scope.case,function(newval){
                    if(newval=="false"){
                        /*console.log(newval+"aaaaaaaaaaaaaaa");*/
                        ele.fadeOut();
                    }
                });
                document.getElementById("bookbus").style.height=window.innerHeight-50+"px";

            }
        }
    }]);