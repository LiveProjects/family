/**
 * Created by Administrator on 2015/8/9 0009.
 */
angular.module('Hisense')
.directive('manageBusblock',[function(){
        return{
            restrict:'E',
            scope:{},
            templateUrl:'views/directives/manage/manageBusblock.html',
            link:function(scope,ele,attr){
                scope.name="三妹";

                ele.find("#manageBusblock-switchbtn button").eq(0).click(function(){
                    ele.find("ul").show();
                    ele.find("ol").hide();
                });
                ele.find("#manageBusblock-switchbtn button").eq(1).click(function(){
                    ele.find("ol").show();
                    ele.find("ul").hide();
                })
            }
        };
    }]);