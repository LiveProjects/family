/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
.directive('mainRightSearch',[function(){
        return{
            restrict:'E',
            templateUrl:'views/directives/main/main-right-search.html',
            link:function(scope,ele,attr){
                scope.seaval="三妹";
            }
        }
    }]);