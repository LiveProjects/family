/**
 * Created by Administrator on 2015/8/4 0004.
 */
/**
 * Created by Administrator on 2015/8/1 0001.
 */
angular.module('Hisense')
    .service('routeService',['$location',function($location){
        routeParams={};
        routeParams.getrouteParams=function(){
           return $location.params;
        };

        return routeParams;

    }]);