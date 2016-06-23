'use strict';

angular.module('confusionApp')

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

.factory('authorize', ['$localStorage', function ($localStorage) {
  var logged_in_user = $localStorage.get('username','');
  var logged_in = false;
  if(logged_in_user!=''){
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
              $localStorage.store('username',username);
              return users[i].centres;
          }
        }
      return false;
      },
      getUsername : function(){
        return logged_in_user;
      },
      isLoggedIn : function(){
        return logged_in;
      },
      logout : function(){
        logged_in=false;
        logged_in_user='';
        $localStorage.store('username','');
      }
    };
}])

;