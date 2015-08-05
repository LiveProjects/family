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
                //document.getElementById("managementbus").style.minHeight=window.innerHeight-50+"px";

                /*console.log("-----班车管理------");
                console.log(scope.case);
                console.log("-----班车管理----");*/

                /*初始化数据jquery思想*/
                /*commonDatas.getcheckMan(function(data){
                    *//*注意MVC思想，还有new Array() 不能直接放到数组中的原因*//*
                    *//*var len=data['check'].length;
                    var arr=[];
                    for(var io=0;io<len;io++){
                        arr[io]=io;
                    }
                    scope.checkdata=arr;*//*
                    var checkdoc=document.createDocumentFragment();

                    for(var i=0;i<data['check'].length;i++){
                        *//*check*//*
                        var FRDate=data['check'][i]['FRDate'];
                        var FRTime=data['check'][i]['FRTime'];
                        var FStop=data['check'][i]['FStop'];
                        var book_name=data['check'][i]['book_name'];

                        scope.FRDate=data['check'][i]['FRDate'];
                        scope.FRTime=data['check'][i]['FRTime'];
                        scope.FStop=data['check'][i]['FStop'];
                        scope.book_name=data['check'][i]['book_name'];

                        *//*company*//*
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
                                    "<button class='btn btn-success' ng-click='fixbuss()'>修改</button>"+
                                "</div>"+
                            "</li>";

                        //console.log(li);
                        *//*checkdoc.appendData(li);*//**//*js实现append的方法*//*
                        $("#checkmainbody").append(li);
                    }

                },function(data){
                    console.log(data);
                });*/


                /*初始化数据ng思想*/
                commonDatas.getcheckMan(function (data) {
                    /*为什么回来直接就是数组，不应该是json吗*/
                    /*console.log(data);
                    console.log(data['check']);
                    console.log(data['company']);*/

                    scope.checkData=data['check'];
                    console.log(data['check']);

                    scope.id_emp=data['company']['id_emp'];
                    scope.name_com=data['company']['name_com'];
                    scope.name_emp=data['company']['name_emp'];
                });


                /*删除预约*/
                scope.delbus=function(index){
                    console.log(index);
                    commonDatas.delbus('lio','3:00',function(data){
                        if(data){
                            scope.checkData.splice(index,1);
                            console.log("删除成功");
                        }
                    },function(data){

                    });
                };

                /*修改数据*/
                scope.fixbus=function(index){
                    //console.log(index);
                    ele.find("ol#checkmainbody li").eq(index).find("input").removeAttr('disabled');
                    var val=ele.find("ol#checkmainbody li").eq(index).find("button").eq(1).text();

                    if(val=="完成"){
                        commonDatas.fixBus(index,function (data) {
                            if(1){
                                ele.find("ol#checkmainbody li").eq(index).find("button").eq(1).text("修改");
                                ele.find("ol#checkmainbody li").eq(index).find("input").css({'background-color':'#60c0c5','color':'white'});
                            }
                        })
                    }else{
                        ele.find("ol#checkmainbody li").eq(index).find("button").eq(1).text("完成");
                        ele.find("ol#checkmainbody li").eq(index).find("input").css({'background-color':'white','color':'black'});
                    }

                };
            }
        }
    }]);