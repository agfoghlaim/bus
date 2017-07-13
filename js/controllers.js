  app.controller('ctrl', function($scope, BusService, StopService, LocationService){
    $scope.busses = BusService.getBusses(
    function(response){
     $scope.noResults = response.numberofresults;
     $scope.stopId = response.stopid;
     $scope.busses = response.results;
    }, function(errorStatus, errorStatusText){
      $scope.errorMsg = "Error: ";
      $scope.errorStatus = errorStatus;
      $scope.errorStatusText = errorStatusText;
    }
    );





       $scope.passId = function(stopId){
      $scope.stopId = stopId;
     
      $scope.theStop = StopService.getStop($scope.stopId, 
      function(response){
        if(response.numberofresults !== 0){
        $scope.stopName = response.results[0].fullname;
        $scope.shortName = response.results[0].shortname;
        $scope.loName = response.results[0].shortnamelocalized;
      }else{
         $scope.stopName = 'sorry could not find it';
        console.log("noResults");
      }

        console.log("good from comtroller "+ response);
      }, 
      function(response){
          console.log("bad from comtroller "+ response);
           $scope.stopName = response;
      });
    }
    





      $scope.findLocation = function(address){
      console.log(address);
      $scope.address = address;
      $scope.theStopNo = LocationService.findLocation($scope.address, 
        function(response){
          
          $scope.stop = response;
          $scope.stopResults = response.results;
          console.log($scope.stopResults);

      }, function(response){
          console.log("ghjk");
      });

    }


  // app.controller('StopCtrl', function($scope, StopService){
    
 
 
  // });

  // app.controller('StopLocaion', function($scope, LocationService){

  });