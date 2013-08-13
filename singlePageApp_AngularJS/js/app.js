var nswebModule = angular.module('nsweb', []).
  config(function($routeProvider) {
    $routeProvider.
      when('/p/:page', {controller:'RouteControllerStatic', templateUrl:'/pages/pagelist.html'}).
      when('/p/apps/:page', {controller:'RouteControllerDataDynamic', templateUrl:'/pages/dynamic.html', base:'apps'}).
      when('/p/examples/:page', {controller:'RouteControllerDataDynamic', templateUrl:'/pages/dynamic.html', base:'examples'}).
      when('/p/customapps/:page', {controller:'RouteControllerDataDynamic', templateUrl:'/pages/dynamic.html', base:'customapps'}).
      when('/p/analytics/:page', {controller:'RouteControllerDataDynamic', templateUrl:'/pages/dynamic.html', base:'analytics'}).
      when('/p/services/:page', {controller:'RouteControllerDataDynamic', templateUrl:'/pages/dynamic.html', base:'services'}).
      when('/p/get-customapps/:page', {controller:'RouteControllerDataDynamic', templateUrl:'/pages/dynamic.html', base:'get-customapps'}).
      when('/p/mobile/:page', {controller:'RouteControllerDynamicStaticPage', templateUrl:'/pages/dynamic.html', base:'mobile'}).
      otherwise({redirectTo:'/p/main'});
});

/*
 Loads a simple static page based on the route parameter
 Parameter: ':page' Static page to load.
 */
function RouteControllerStatic ($scope, $routeParams) {
    if($routeParams.page !== undefined){
        var pageToLoad = $routeParams.page;
        $scope.page  = '/pages/'+ pageToLoad + '.html';
    }

    //After page is loaded initialize any DOM Plugins
    $scope.page_loaded = function(){
        //For the homepage initialize the flex slider
        if($routeParams.page == 'main')
            angular.element('.flexslider').flexslider();
    } ;
}


/*
 Loads dynamic html pages along with their navigation.
 The pages are hosted under a directory whose name is defined in the "base" parameter.

 Parameter: ':page' Dynamic page to load example: mobile/(publish-everywhere, complete-control, ...)
 */
function RouteControllerDynamicStaticPage ($scope, $routeParams, $route, $http) {
    if($routeParams.page !== undefined){
        var pageDir = $route.current.$$route.base;
        $scope.nav = '/pages/'+pageDir+'/nav.html';
        $scope.page  = '/pages/'+pageDir+'/'+$routeParams.page+'.html';
    }
}

/*
    Loads apps, examples, custom data dynamically. The custom data are hosted under a directory which is defined in the "base" parameter.
    Loads the display data for pages dynamically via json objects.

    Parameter: ':page' Dynamic page to load (instagram, fan-coupon, exclusive..)
    base
 */
function RouteControllerDataDynamic ($scope, $routeParams, $route, $http) {
    //Dynamically determine the page to load
    var pageAndDataDir = $route.current.$$route.base;
    var pageDataToLoad = $routeParams.page;

    if(pageAndDataDir !== undefined){
        //Load Nav
        $scope.nav = '/pages/'+pageAndDataDir+'/nav.html';

        //Load Page
        if($routeParams.page == "overview")
            $scope.page  = '/pages/'+pageAndDataDir+'/overview.html';
        else{
            $scope.page  = '/pages/'+pageAndDataDir+'/dynamic-content.html';

            //Render page data dynamically
            var httpUrl = '/data/'+pageAndDataDir+'/'+pageDataToLoad+'.json';
            $http.get(httpUrl).success(function (data) {
                if(data !== undefined ){
                    $scope.pageData = data;

                }
            }).error(function (resp) {
                    //handle error
            });
        }

    } else{
        //Try loading a static page
        $scope.page  = '/pages/'+ pageAndDataDir + '.html';
    }
}

function RouteController ($scope, $routeParams) {
  // Getting the slug from $routeParams
  var slug = $routeParams.slug;

  // We need to get the page data from the JSON
  // $scope.page = ?;
}
