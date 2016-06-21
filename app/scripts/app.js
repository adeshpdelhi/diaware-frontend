'use strict';

angular.module('confusionApp', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        template : ''
                    },
                    'content@': {
                        templateUrl : 'views/login.html',
                        controller  : 'LoginController'                  
                    },
                    'footer@': {
                        templateUrl : 'views/footer.html'
                    }
                }

            })
            .state('app.home', {
                url:'/home',
                views: {
                    'header@': {
                        templateUrl : 'views/header.html'
                    },
                    'content@': {
                        templateUrl : 'views/index.html'                
                    },
                    'footer@': {
                        templateUrl : 'views/footer.html'
                    }
                }

            })

;
    
        $urlRouterProvider.otherwise('/');
    })
;
