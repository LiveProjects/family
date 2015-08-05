/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
.directive('bookBus',['$location','$timeout','commonDatas',function($location,$timeout,commonDatas){
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

                /*获取工厂名*/
                if(localStorage.getItem('bookbusfactory')){
                    scope.facval=localStorage.getItem('bookbusfactory');
                }
                ele.find("div#1").find("input").blur(function(){
                    var val=$(this).val();
                    commonDatas.getfactoryhttp(val,function(data){
                        scope.facval=data[0]['FName'];
                        localStorage.setItem('bookbusfactory',data[0]['FName']);
                    });
                });

                /*获取基本班车信息*/
                commonDatas.getbusData(function(data){
                    console.log("-----lio---");
                    console.log(data);
                    console.log("-----lio---");

                    /*初始填充上次预约的值*/
                    if(localStorage.getItem('bookbus0')){
                        ele.find("div#1").find("input:first-child").val(localStorage.getItem('bookbus'));
                        ele.children("input").val(localStorage.getItem('bookbusfactory'));
                        ele.find("div#2").find("input").val(localStorage.getItem('bookbus0'));
                        ele.find("div#3").find("input").val(localStorage.getItem('bookbus1'));
                        ele.find("div#4").find("input").val(localStorage.getItem('bookbus2'));
                    }

                    /*添加加班时间*/
                    var addtime=data['addtime'];
                    (function(){
                        var docfra=document.createDocumentFragment();
                        for(var i=0;i<addtime.length;i++){
                            var li=document.createElement("li");
                            var txt=document.createTextNode(addtime[i]['FTime']);
                            li.appendChild(txt);
                            docfra.appendChild(li);
                        }
                        ele.find("div#3").find("ul").append(docfra);
                    })();


                    var spot=data['addBS'];
                    /*添加下车地点*/

                    var parkListulfrag=document.createDocumentFragment();
                    spot.forEach(function(item,index){
                        //console.log(item['FName']);
                        var li=document.createElement("li");
                        var txt=document.createTextNode(item['FName']);
                        li.appendChild(txt);
                        parkListulfrag.appendChild(li);
                    });
                    ele.find("ul#spot").append(parkListulfrag);

                    (function () {

                        if(!localStorage.getItem('usually0')){
                            localStorage.setItem('usually0',spot[0]['FName']);
                            localStorage.setItem('usually1',spot[1]['FName']);
                            localStorage.setItem('usually2',spot[2]['FName']);
                        }
                        //console.log(localStorage.getItem('usually'));
                        var parkfrag=document.createDocumentFragment();
                        for(var i=0;i<4;i++){
                            var li=document.createElement("li");
                            if(i==3){
                                var txt=document.createTextNode("其他");
                            }else{
                                var txt=document.createTextNode(localStorage.getItem("usually"+i));
                            };
                            li.appendChild(txt);
                            parkfrag.appendChild(li);
                        }
                        ele.find("div#4").find("ul").append(parkfrag);
                        //gl.parkOl.lastElementChild.setAttribute('id','showParklist');
                        //gl.parkOl.lastElementChild.setAttribute('onclick','addclass()')
                    }());
                }, function (data) {
                    console.log(data);
                });

                ele.find("div#4 ul").delegate('li:last-child','click',function(){
                    ele.find("div#spotpa").fadeIn(100);
                    ele.find("div#spotpa").css('margin-top','0');
                });
                ele.find("div#spotpa ul").delegate('li','click',function(){
                    var txt=$(this).text();
                    ele.find("div#4").find("input").val(txt);
                });

                /*查看信息*/
                commonDatas.getcheckMan(function(data){
                    console.log("-----check---");
                    console.log(data);
                    console.log("-----check---");
                },function(data){
                    console.log(data);
                });

                /*预订班车*/
                scope.bbus=function(){
                    var val=[];
                    val[0]=ele.find("div#1").find("input:first-child").val();
                    val[1]=ele.find("div#2").find("input").val();
                    val[2]=ele.find("div#3").find("input").val();
                    val[3]=ele.find("div#4").find("input").val();
                    console.log(val);
                    ele.find("div#5").find("button:first-child").attr('disabled','disabled');

                    /*ng方法实现*/
                    var timeout;
                    if(timeout){
                        console.log(123);
                        $timeout.cancel(timeout);
                        ele.find("div#5").find("button:first-child").attr('disabled','disabled');
                    }
                    timeout=$timeout(function(){
                        ele.find("div#5").find("button:first-child").removeAttr('disabled','disabled');
                    },2000);
                    commonDatas.bookbus(val,function(data){
                        if(data==1){
                            alert("您的加班预约已成功");
                            localStorage.setItem('bookbus',val[0]);
                            localStorage.setItem('bookbus0',val[1]);
                            localStorage.setItem('bookbus1',val[2]);
                            localStorage.setItem('bookbus2',val[3]);
                        }else if(data==0){
                            alert("请重新输入");
                        }
                    },function(data){
                        alert(data);
                    });

                    /*原生js方法实现*/
                    /*var timeout;
                    if(timeout){
                        clearTimeout(timeout);
                        ele.find("div#5").find("button:first-child").attr('disabled','disabled');
                    }
                    timeout=setTimeout(function () {
                        commonDatas.bookbus(val,function(data){
                            if(data==1){
                                alert("您的加班预约已成功");
                            }
                        },function(data){
                            alert(data);
                        });
                        ele.find("div#5").find("button:first-child").removeAttr('disabled','disabled');
                    },3000)*/
                };

                /*姓名模糊查询*/
                scope.mod=function(){
                    commonDatas.modelname(val,function(data){
                        var docname=document.createDocumentFragment();

                        !function(){
                            for(var i=0;i<val.length;i++){
                                var li=document.createElement("li");
                                var txt=document.createTextNode("lio");
                                li.appendChild(txt);
                                docname.appendChild(li);
                            }

                        }()
                    },function(data){
                        alert(data);
                    });
                };

               /*页面跳转*/
                scope.manbus=function(data){
                    $location.path('managebus');
                };
                scope.a="管理班车";

                /*页面数据选取*/

                ele.find("div#2").delegate('li','click',function(){
                    var txt=$(this).text();
                    $(this).parent().prev().find("input").val(txt);
                });
                ele.find("div#3").delegate('li','click',function(){
                    var txt=$(this).text();
                    $(this).parent().prev().find("input").val(txt);
                });
                ele.find("div#4").delegate('li','click',function(){
                    var txt=$(this).text();
                    $(this).parent().prev().find("input").val(txt);
                });

                /*星期设置*/
                function makeday(num){
                    var whichDay=new Date();
                    var datefra=document.createDocumentFragment();
                    var year=whichDay.getFullYear();
                    var month=whichDay.getMonth()+1;
                    var day=Number(whichDay.getDate());
                    //alert(year+"-"+month+"-"+day);

                    for(;num<=7;num++){
                        var colorSE=Math.floor(Math.random()*4);
                        var li=document.createElement("li");
                        var txt=document.createTextNode(year+"-"+month+"-"+(day++));
                        li.appendChild(txt);
                        li.style.backgroundColor=gl.randomcolor()[colorSE];
                        datefra.appendChild(li);
                    }
                    gl.adddate.appendChild(datefra);
                }

                scope.$watch(scope.case,function(newval){
                    if(newval=="false"){
                        /*console.log(newval+"aaaaaaaaaaaaaaa");*/
                        ele.fadeOut();
                    }
                });


                function tr(){
                    for(var i=0;i<3;i++){
                        localStorage.removeItem('usually'+i);
                    }
                }




                /*设置离线下车地点,更人性化是放到预订成功之后*/
                $("#parkListul").delegate('li','click',function(){
                    var parkval=$(this).text();
                    if(parkval!=localStorage.getItem('usually0')&&parkval!=localStorage.getItem('usually1')&&parkval!=localStorage.getItem('usually2')){
                        localStorage.setItem('usually2',localStorage.getItem('usually1'));
                        localStorage.setItem('usually1',localStorage.getItem('usually0'));
                        localStorage.setItem('usually0',parkval);
                    }
                    console.log(localStorage.getItem('usually0'));
                });



                document.getElementById("bookbus").style.height=window.innerHeight-50+"px";

            }
        }
    }]);