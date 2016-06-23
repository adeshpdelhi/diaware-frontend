'use strict';

angular.module('App')

.factory('$localStorage', ['$window', function ($window) {
    return {
        store: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    };
}])
.factory('choosePatientFactory',['$localStorage', function($localStorage){
  var patFac = {};
  var patient = $localStorage.getObject('chosenPatient','{}');
  patFac.setPatient = function(id){
    patient = {id: id};
    $localStorage.storeObject('chosenPatient', patient);
  };
  patFac.getChosenPatient = function(){
    return patient;
  };
  return patFac;
}])

.factory('authorize', ['$localStorage', function ($localStorage) {
	
  var logged_in_user = $localStorage.get('username','');
  var logged_in_centre = $localStorage.get('centre','');
  var logged_in = false;
  if(logged_in_user !== ''){
    logged_in = true;
  }
    var users =  [
      {
        username: "rishabh",
        password : "12345",
        centres : ["JP","CH"]
      },
      {
        username: "admin",
        password : "admin",
        centres : ["JP","CH","AP","SP"]
      }
    ];
    return {
      doAuth : function(username,password){
        for(var i=0;i<users.length;i++){
          if(users[i].username == username && users[i].password == password){
              logged_in_user=username;
              logged_in=true;
              $localStorage.store('username',users[i].username);
              return users[i].centres;
          }
        }
      return false;
      },
      getUsername : function(){
        return logged_in_user;
      },
      setCentre : function(centre){
        $localStorage.store('centre', centre);
        logged_in_centre = centre;
      },
      getCentre : function(centre){
          return logged_in_centre;
      },
      isLoggedIn : function(){
        console.log("Logged in: "+logged_in+" "+logged_in_centre);
        return logged_in;
      },
      logout : function(){
        logged_in=false;
        logged_in_user='';
        logged_in_centre='';
        $localStorage.store('username','');
        $localStorage.store('centre','');

      }
    };
}])

.service('patientFactory', function(){
    var patients = [
      {
        patientId:1,
        patientName:"aishwarya",
        patientContact:1234567890
      },{
        patientId:2,
        patientName: "adesh",
        patientContact:9876543210
      },
      {
        patientId:3,
        patientName:"rishabh",
        patientContact:8765432109
      }
    ];
    this.getPatients = function(){
      return patients;
    };
    this.getPatient = function(id){
      for (var i = patients.length - 1; i >= 0; i--) {
        if(patients[i].patientId == id) 
          return patients[i]; 
      }
      return null;
    };
  })
// use factory/service to interact with the database n inject that in controller

  .factory('dropDownFactory', function(){
    // use separate factory maybe then like panelFactory .... or directly interact with db
    var drpDwnFac = {};
    var panels = [
      {
        value:"cghs",
        text:'CGHS'
      },
      {
        value:"panel1",
        text:'PANEL1'
      },
      {
        value:'panel2',
        text:"PANEL2"
      }
    ];
    var transactionTypes = [
      {
        value:"dialysis",
        text:"Dialysis"
      },
      {
        value:"procedure",
        text:"Procedure"  
      },
      {
        value:"pharmacy",
        text:"Pharmacy"
      },
      {
        value:"consumable",
        text:"Consumable"
      }
    ];
    var dialysisTypes = [
      {
        value:'dialysis1',
        text:"Dialysis1"
      },
      {
        value:'dialysis2',
        text:"Dialysis2"
      },
      {
        value:'dialysis3',
        text:'Dialysis3'
      }
    ];
    var proceTypes = [
      {
        value:'procedure1',
        text:"procedure1"
      },
      {
        value:'procedure2',
        text:"procedure2"
      },
      {
        value:'procedure3',
        text:'procedure3'
      }
    ];
    var pharmacyTypes = [
      {
        value:'pharmacy1',
        text:"pharmacy1"
      },
      {
        value:'pharmacy2',
        text:"pharmacy2"
      },
      {
        value:'pharmacy3',
        text:'pharmacy3'
      }
    ];
    var consumableTypes = [
      {
        value:'consumable1',
        text:"consumable1"
      },
      {
        value:'consumable2',
        text:"consumable2"
      },
      {
        value:'consumable3',
        text:'consumable3'
      }
    ];
    drpDwnFac.getDialysis = function(){
      return dialysisTypes;
    };
    drpDwnFac.getProcedures = function(){
      return proceTypes;
    };
    drpDwnFac.getPharmacy = function(){
      return pharmacyTypes;
    };
    drpDwnFac.getConsumables = function(){
      return consumableTypes;
    };
    drpDwnFac.getPanels = function(){
      return panels;
    };
    drpDwnFac.getTransactionTypes = function(){
      return transactionTypes;
    };
    return drpDwnFac;
  })
  .service('billFactory',function(){
    var bills =[];
    this.getBills = function(){
      console.log("in services.getBills: "+ bills[0]);
      return bills;
    };
    this.updateBills = function(bill){
      console.log("in services.updateBills:"+ bill[0]);
      bills = bills.concat(bill);
    }
    this.addBill = function(bill){
      bills.push(bill);
    }
  })

;