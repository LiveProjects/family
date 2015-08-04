var app=angular
  .module('Hisense', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.
        when('/',{
            templateUrl:'views/main.html',
            controller:'MainCtrl'
        })
        .when('/bus/:which',{
            templateUrl:'views/bus.html',
            controller:'busCtrl'
        }).when('/managebus',{
            templateUrl:'views/managebus.html',
            controller:'busCtrl'
        });
        /*.otherwise({
            redirection:'/'
        })*/
}]);