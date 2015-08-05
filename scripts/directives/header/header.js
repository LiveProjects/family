/**
 * Created by Administrator on 2015/8/9 0009.
 */
angular.module('Hisense')
.directive('header',['$location',function($location){
        return{
            restrict:'EC',
            scope:{},
            templateUrl:'views/directives/header/header.html',

            link:function(scope,ele,attr){
                ele.find("#loginBox").css('height',window.innerHeight-100+'px');
                ele.find("#login").click(function(e){
                    e.stopPropagation();
                    e.cancelBubble=true;
                    ele.find("#loginBox").fadeIn(200);

                    $("#page").css('opacity','0.2');
                });
                ele.find("#loginBox>span").click(function(){
                    ele.find("#loginBox").fadeOut(200);

                    $("#page").css('opacity','1');
                });
                ele.find("#loginBox input").focus(function(){
                    $(this).prev().css('top','-100%');
                    $(this).css('text-indent','10px');
                    $(this).parent().css('width','90%');
                });
                ele.find("#loginBox input").blur(function(){
                    if($(this).val()==''){
                        $(this).prev().css('top','0');
                        $(this).css('text-indent','120px');
                        $(this).parent().css('width','80%');
                    }
                });
                scope.manbus=function(){
                    $location.path('/manage')
                };
                scope.layout=function(){
                    alert("add layout function");
                }

            }
        }
    }]);