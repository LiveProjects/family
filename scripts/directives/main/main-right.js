/**
 * Created by Administrator on 2015/7/31 0031.
 */
angular.module('Hisense')
    .directive('mainRight',['$location','$routeParams','routeService',function($location,$routeParams,routeService){
        return{
            restrict:'E',
            templateUrl:'views/directives/main/main-right.html',
            replace:true,
            scope:{},
            link:function(scope,ele,attr){
                scope.right='l am right main';
                scope.heal="运动健身";
                scope.green="绿化";
                scope.clear="保洁";
                scope.book="加班申请";

                scope.bookbus=function(){//注意alert禁用，引起不必要的烦心
                    $location.path('bus/true');

                    var ass=routeService.getrouteParams();
                    /*console.log("___________________");
                    console.log(ass);
                    console.log($location.path());
                    console.log($location.hash());*/
                };
                scope.managebus=function(){//注意alert禁用，引起不必要的烦心
                    $location.path('bus/false');

                }

            }
        }
    }]);