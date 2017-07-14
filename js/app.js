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