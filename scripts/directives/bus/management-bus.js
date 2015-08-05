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

                /*初始化数据*/
                commonDatas.getcheckMan(function(data){
                    console.log(data);
                    for(var i=0;i<data['check'].length;i++){
                        /*check*/
                        var FRDate=data['check'][i]['FRDate'];
                        var FRTime=data['check'][i]['FRTime'];
                        var FStop=data['check'][i]['FStop'];
                        var book_name=data['check'][i]['book_name'];
                        /*company*/
                        var id_emp=data['company']['id_emp'];
                        var name_com=data['company']['name_com'];
                        var name_emp=data['company']['name_emp'];

                        var li=
                            "<li>"+
                                "<div>"+
                                    "<label for=''>加班日期:</label>"+
                                    "<input type='text' placeholder='加班日期' value='"+FRDate+"' disabled/>"+
                                "</div>"+

                                "<div>"+
                                    "<label for=''>姓名:</label>"+
                                    "<input type=text placeholder='姓名' value='"+name_emp+"' disabled/>"+
                                    "<label for=''>加班时间:</label>"+
                                    "<input type='text' placeholder='加班时间' value='"+FRTime+"' disabled/>"+
                                "</div>"+
                                "<div>"+
                                    "<label for=''>下车地点:</label>"+
                                    "<input type='text' placeholder='下车地点' value='"+FStop+"' disabled/>"+
                                "</div>"+
                                "<div>"+
                                    "<label for=''>所在公司:</label>"+
                                    "<input type='text' placeholder='所在公司' value='"+name_com+"' disabled/>"+
                                "</div>"+
                                "<div>"+
                                    "<label for=''>提报人姓名:</label>"+
                                    "<input type='text' placeholder='提报人姓名' value='"+book_name+"' disabled/>"+
                                    "<label for=''>提报时间:</label>"+
                                    "<input type='text' placeholder='提报时间' value='"+"2015-8-8"+"' disabled/>"+
                                "</div>"+
                                "<div>"+
                                    "<button class='btn btn-danger' ng-click='delbus()'>删除</button>"+
                                    "<button class='btn btn-success' ng-click='fixbus()'>修改</button>"+
                                "</div>"+
                            "</li>";

                        console.log(li);
                        $("#checkmainbody").append(li);
                    }
                },function(data){
                    console.log(data);
                });

                /*删除预约*/
                commonDatas.delbus('lio','3:00',function(data){

                },function(data){

                });

                /*修改数据*/
                scope.fixbus=function(){

                };
            }
        }
    }]);