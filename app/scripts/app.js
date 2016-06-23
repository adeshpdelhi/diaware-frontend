'use strict';

angular.module('App', ['ui.router','ngResource','ngDialog'])
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
                        template:"<h1>hey</h1>",
                        controller  : 'HomeManagementController'                  
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }

            })
            .state('app.login', {
                url:'login',
                views: {
                    'content@': {
                        templateUrl : 'views/login.html',
                        controller  : 'LoginController'                  
                    }
                }

            })
            .state('app.home', {
                url:'home',
                views: {
                    'content@': {
                        templateUrl : 'views/home.html'                
                    }
                }

            })

            .state('app.registration', {
                url:'registration',
                views: {
                    'content@': {
                        templateUrl : 'views/registration/register.html'  
                    }
                }

            })

            .state('app.monitoring', {
                url:'monitoring',
                views: {
                    'content@': {
                        templateUrl : 'views/monitoring/monitoringchart.html'  
                    }
                }

            })
        
        .state('app.billing',{
            url:"billing/",
            views:{
                'content@':{
                    templateUrl:'views/billing/home.html',
                    controller:'BillingHomeController'
                }
            }
        })
        .state('app.billing.choosePatient',{
            url:'choosePatient',
            views:{
                'content@':{
                    templateUrl:'views/billing/choosePatient.html',
                    controller:'ChoosePatientController'
                }
            }
        })
        .state('app.billing.newbill',{
            url:'newbill/:id',
            views:{
                'content@':{
                    templateUrl:'views/billing/newbill.html',
                    controller:'NewBillController'
                }
            }
        })
        .state('app.billing.viewbill',{
            url:'viewbill',
            views:{
                'content@':{
                    templateUrl:'views/billing/viewbill.html',
                    controller:'ViewBillController'
                }
            }
        })
        ;
        $urlRouterProvider.otherwise('/');
    })
;
