'use strict';

angular.module('confusionApp', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller : 'HeaderController'
                    },
                    'content': {
                        controller  : 'HomeManagementController'                  
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }

            })
            .state('app.login', {
                url:'/',
                views: {
                    'content@': {
                        templateUrl : 'views/login.html',
                        controller  : 'LoginController'                  
                    }
                }

            })
            .state('app.home', {
                url:'/home',
                views: {
                    'content@': {
                        templateUrl : 'views/index.html'                
                    }
                }

            })

            .state('app.registration', {
                url:'/registration',
                views: {
                    'content@': {
                        templateUrl : 'views/registration/register.html'  
                    }
                }

            })

            .state('app.monitoring', {
                url:'/monitoring',
                views: {
                    'content@': {
                        templateUrl : 'views/monitoring/monitoringchart.html'  
                    }
                }

            })

            
;
    
        $urlRouterProvider.otherwise('/');
    })
;
