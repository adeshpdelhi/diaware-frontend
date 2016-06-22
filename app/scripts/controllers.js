'use strict';

angular.module('confusionApp')

.controller('LoginController', ['$scope', 'authorize', '$state', function ($scope, authorize, $state) {
    
    $scope.credentials = {username: "", password: "", centre: ""};
    $scope.display_centre = false;
    $scope.doLogin = function(){
        if(authorize.doAuth($scope.credentials.username,$scope.credentials.password)){
            var tempcentres = authorize.doAuth($scope.credentials.username,$scope.credentials.password);
            $scope.channels=[];
            for(var i = 0; i<tempcentres.length; i++ ){
                $scope.channels.push({value: tempcentres[i], label: tempcentres[i]});
            }
            $scope.credentials.centres;
            $scope.display_centre=true;
        }
    };
    $scope.chooseCentre = function(){
        $state.go('app.home');
        console.log("moving to home");
    };

}])

.controller('HomeManagementController', ['$scope', '$state', 'authorize', function ($scope, $state, authorize) {
    if(authorize.isLoggedIn() === true)
        $state.go('app.home');
    else
        $state.go('app.login');
}])

.controller('HeaderController', ['$scope', '$state', 'authorize', function ($scope, $state, authorize) {
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    $scope.loggedIn = authorize.isLoggedIn();
    $scope.username = authorize.getUsername();
    console.log($scope.loggedIn+" "+$scope.username);
    $scope.logout = function(){
        authorize.logout();
        $state.go('app.login');
    }
}])

;