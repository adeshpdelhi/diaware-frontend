'use strict';

angular.module('App')

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
        $state.go('app');
    };
}])
.controller('NewBillController',['$scope','patientFactory','$stateParams','dropDownFactory','choosePatientFactory', function($scope,patientFactory,$stateParams, dropDownFactory,choosePatientFactory){
        $scope.panelSelected = false;
        $scope.patient = patientFactory.getPatient(parseInt($stateParams.id,10));
        
        $scope.patient.id = choosePatientFactory.getChosenPatient();
        $scope.panels = dropDownFactory.getPanels();
        $scope.transactionTypes =  dropDownFactory.getTransactionTypes();
        $scope.show = false;
        $scope.basicSelectionComplete = false;
        $scope.bill = {
            transactionId:'',
            transactionType:"",
            product:"",
            quantity:1,
            cost:"",
            paid:false
        }
        $scope.bedSelected = false;
        $scope.changeState = function(i){
            if(i == 1 && $scope.bed != "") $scope.bedSelected = true;
            if(i == 2 ){
                if($scope.modeOfPayment === "cashless"){
                    $scope.panelSelected = true;
                    $scope.basicSelectionComplete = false;
                }else if($scope.modeOfPayment === "cash") {
                    $scope.basicSelectionComplete = true;
                    $scope.panelSelected = false;
                }
            }
            if(i == 3 && $scope.panel != "" && $scope.panelSelected) $scope.basicSelectionComplete = true;
            if(i == 4 && $scope.bill.transactionType != ""){
                $scope.show= true;
                switch($scope.bill.transactionType){
                    case "dialysis":$scope.dropDown = dropDownFactory.getDialysis();
                                    break;
                    case "procedure":$scope.dropDown = dropDownFactory.getProcedures();
                                    break;
                    case "pharmacy":$scope.dropDown = dropDownFactory.getPharmacy();
                                    break;
                    case "consumable":$scope.dropDown = dropDownFactory.getConsumables();
                                    break;
                }
            }
        }

        $scope.bill.quantity = 1 ;
        $scope.bill.cost = 230
        $scope.bills = [];
        var trId = 0;
        // $scope.submitted = false; // to be used with ng show for remove bill in billTable 
        $scope.submit = function(){
            // $scope.submitted = true;
            $scope.bill.transactionId = trId++;
            $scope.bills.push($scope.bill);
            console.log($scope.bill);
            dropDownFactory.updateBills($scope.bills);

            for (var i = $scope.bills.length - 1; i >= 0; i--) {
                $scope.bills[i].paid = true;
            }
            $scope.bill = {
                transactionId:'',
                transactionType:"",
                product:"",
                quantity:1,
                cost:230,
                paid: false
            }
            $scope.billingForm.$setPristine();
            $scope.panelSelected = false;
            $scope.show = false;
            $scope.basicSelectionComplete = false;
            $scope.bedSelected = false;
            $scope.modeOfPayment = "";
            $scope.bed = "";
            // $scope.bills = [];

        }
        $scope.removeEntry = function(id){
            for (var i = $scope.bills.length - 1; i >= 0; i--) {
                if($scope.bills[i].transactionId == id)
                    $scope.bills.splice(i,1);
            }
        }
        $scope.add = function(){
            $scope.bill.transactionId = trId++;
            $scope.bills.push($scope.bill);
            $scope.bill = {
                transactionId:'',
                transactionType:"",
                product:"",
                quantity:1,
                cost:230,
                paid: false
            }
            $scope.billingForm.$setPristine();
            $scope.panelSelected = false;
            $scope.show = false;
            $scope.basicSelectionComplete = false;
            $scope.bedSelected = false;
            $scope.modeOfPayment = "";
            $scope.bed = "";
        }

    }])
    .controller('ViewBillController',['$scope', function($scope){

    }])
    .controller('BillingHomeController',['$scope', function($scope){

    }])
    .controller('ChoosePatientController',['$scope','patientFactory','choosePatientFactory', function($scope,patientFactory, choosePatientFactory){
        $scope.patient = {
            id:null,
            name:null,
            contact:null
        }
        var pats= patientFactory.getPatients();
        $scope.patients = patientFactory.getPatients();
        choosePatientFactory.setPatient($scope.patient.id);
    }])
;