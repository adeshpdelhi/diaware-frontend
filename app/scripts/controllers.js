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
            $scope.display_centre=true;
        }
    };
    $scope.chooseCentre = function(){
        authorize.setCentre($scope.credentials.centre);
        console.log("centre set to "+$scope.credentials.centre);
        $state.go('app.home', {}, {reload: true});
    };

}])

.controller('HomeManagementController', ['$scope', '$state', 'authorize', function ($scope, $state, authorize) {
    if(authorize.isLoggedIn() === true)
        $state.go('app.home', {}, {reload: true});
    else
        $state.go('app.login', {}, {reload: true});
}])

.controller('HeaderController', ['$scope', '$state', 'authorize', function ($scope, $state, authorize) {
    $scope.stateis = function(curstate) {
       return $state.includes(curstate);  
    };
    $scope.loggedIn = authorize.isLoggedIn();
    $scope.username = authorize.getUsername();
    $scope.centre = authorize.getCentre();
    $scope.logout = function(){
        authorize.logout();
        $state.go('app', {}, {reload: true});
    };
}])

.controller('FooterController', ['$scope', '$state', 'authorize', function ($scope, $state, authorize) {
    $scope.loggedIn = authorize.isLoggedIn();
}])

.controller('NewBillController',['$scope','patientFactory','billFactory', '$stateParams','dropDownFactory','choosePatientFactory', function($scope,patientFactory,billFactory, $stateParams, dropDownFactory,choosePatientFactory){
        $scope.panelSelected = false;
      //  $scope.patient = patientFactory.getPatient(parseInt($stateParams.id,10));
        
        $scope.patient = patientFactory.getPatient(choosePatientFactory.getChosenPatient().id);
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
            paid:false,
            patientId: ""
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
        var pendingTransactions = false; 
        $scope.submit = function(){
            pendingTransactions = false;
            $scope.bill.transactionId = trId++;
            $scope.bill.patientId = $scope.patient.patientId;
            if($scope.bill.transactionType !== "")
                $scope.bills.push($scope.bill);
            console.log($scope.bill);
            billFactory.updateBills($scope.bills);

            for (var i = $scope.bills.length - 1; i >= 0; i--) {
                $scope.bills[i].paid = true;
            }
            $scope.bill = {
                transactionId:'',
                transactionType:"",
                product:"",
                quantity:1,
                cost:230,
                paid: false,
                patientId:""
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
        $scope.check = function(){
            // console.log($scope.bill.transactionType + " " + $scope.bills.length);
            // 
            if(!pendingTransactions) return false;
            else {
                    if($scope.bill.transactionType === "") return true;
                    else return false;      
                }
        }
        $scope.removeEntry = function(id){
            for (var i = $scope.bills.length - 1; i >= 0; i--) {
                if($scope.bills[i].transactionId == id)
                    $scope.bills.splice(i,1);
            }
        }
        $scope.add = function(){
            pendingTransactions = true;
            $scope.bill.transactionId = trId++;
            $scope.bill.patientId = $scope.patient.patientId;
            $scope.bills.push($scope.bill);
            $scope.bill = {
                transactionId:'',
                transactionType:"",
                product:"",
                quantity:1,
                cost:230,
                paid: false,
                patientId: ""
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
// use populate join from backend database ... TB changed 
    .controller('ViewBillController',['$scope','billFactory','patientFactory', function($scope, billFactory, patientFactory){
        $scope.billsJoinedPatients = billFactory.getBills();
        console.log($scope.billsJoinedPatients[0]);
        var patients = patientFactory.getPatients();
        for (var i = $scope.billsJoinedPatients.length - 1; i >= 0; i--) {
            for (var j = patients.length - 1; j >= 0; j--) {
                if(patients[j].patientId == $scope.billsJoinedPatients[i].patientId)
                    $scope.billsJoinedPatients[i].patient = patients[i];
            }
        }
        $scope.redirect = function(){
            // add code to redirect to bill details page
        }
    }])
    .controller('BillingHomeController',['$scope', function($scope){

    }])
    .controller('ChoosePatientController',['$scope','patientFactory','choosePatientFactory','$state','$stateParams', function($scope,patientFactory, choosePatientFactory, $state, $stateParams){
        $scope.patient = {
            id:null,
            name:null,
            contact:null
        }
        var pats= patientFactory.getPatients();
        $scope.patients = patientFactory.getPatients();
        $scope.redirect = function(id){
        	choosePatientFactory.setPatient(id);
        	var callback = $stateParams.callback;
        	$state.go('app.'+callback);
        }
    }])

 .controller('ViewRegistrationController',['$scope','patientFactory','choosePatientFactory', function($scope, patientFactory, choosePatientFactory){
        $scope.patient = patientFactory.getPatient(choosePatientFactory.getChosenPatient().id);
    }])

  .controller('MonitoringController',['$scope','patientFactory','choosePatientFactory', function($scope, patientFactory, choosePatientFactory){
       
        $scope.patient = patientFactory.getPatient(choosePatientFactory.getChosenPatient().id);
    }])
	
	.controller('DialysisCarePlanController',['$scope','patientFactory','choosePatientFactory', function($scope, patientFactory, choosePatientFactory){
       
        $scope.patient = patientFactory.getPatient(choosePatientFactory.getChosenPatient().id);
    }])
;