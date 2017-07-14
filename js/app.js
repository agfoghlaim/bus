'use strict';



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC8DzYdlL9QUSWMGD3C9veccwUeoJ__3m8",
    authDomain: "busses-ed305.firebaseapp.com",
    databaseURL: "https://busses-ed305.firebaseio.com",
    projectId: "busses-ed305",
    storageBucket: "busses-ed305.appspot.com",
    messagingSenderId: "597902685352"
  };
  firebase.initializeApp(config);



var app = angular.module('app', ['firebase']);
  app.controller('ctrl', function($scope, PresidentService){
    $scope.presidents = PresidentService.getPresidents(
    function(presidents){
      $scope.presidents = presidents;
    }, function(errorStatus, errorStatusText){
      $scope.errorMsg = "Error: ";
      $scope.errorStatus = errorStatus;
      $scope.errorStatusText = errorStatusText;
    }
    );
  });

  app.service('PresidentService', function($http){
    this.getPresidents = function(callBackOk, callBackNotOk){
      var searchUrl = 'https://api.myjson.com/bins/po22';
      
      $http.get(searchUrl).then(funOk, funNotOk);
      
      function funOk(response){
        callBackOk(response.data);
      };
      function funNotOk(response){
        callBackNotOk(response.status, response.statusText);
        
      }
    }
  });