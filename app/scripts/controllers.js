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
            $scope.credentials.centres
            $scope.display_centre=true;
        }
    };
    $scope.chooseCentre = function(){
        console.log("changing state");
        $state.go('app.home');
    };

}])

.controller('HomeController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])
;