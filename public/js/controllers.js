   //maps api key:  AIzaSyCh7uFwmTh3dl8j3kmjT69SC3gshUJmbI0 
  app.controller('ctrl', function($scope, BusService, StopService, LocationService){
       $scope.getInfo = function(stopId){
              $scope.sid = stopId;
              // console.log("sid is "+ stopId);
              // console.log("scope id is " + $scope.sid);
              $scope.busses = BusService.getBusses( $scope.sid,
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

        }






       $scope.passId = function(stopId){
      $scope.stopId = stopId;
     
      $scope.theStop = StopService.getStop($scope.stopId, 
      function(response){
        if(response.numberofresults !== 0){
        $scope.fullStopName = response.results[0].fullname;
        $scope.shortStopName = response.results[0].shortname;
        $scope.localStopName = response.results[0].shortnamelocalized;
        }else{
         $scope.stopName = 'sorry could not find it';
        }

        
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
});

    app.controller('DataController', function($scope, GoogleService, FirebaseService, CoordinatesService){



    //1 get (1)busstop latitude and longitude
    //2reverse lookup on google
    //3save stopid, lat, long and location details to firebase
    //done 4 save stop name and other stuff
$scope.testBusId = function(testBus){
      var stopId = testBus;
      CoordinatesService.getCoordinates(stopId, goodFun, badFun);
        function goodFun(response){
            console.log("success "+ response.data.results[0].latitude);
            console.log("success "+ response.data.results[0].longitude);
              var latitude = response.data.results[0].latitude;
              var longitude = response.data.results[0].longitude;
              GoogleService.lookUpCoordinates(latitude,longitude, googleSuccess, googleFail);
              function googleSuccess(response){
                console.log(response.results);
                console.log(response.results[0].formatted_address);
                exactLocation = response.results[0].formatted_address;
                county = response.results[0].address_components[3].long_name;
                console.log(county);
                var detailsToSave = {
                  stopid: stopId,
                  latitude:latitude,
                  longitude:  longitude,
                  county:response.results[0].address_components[3].long_name,
                  fulladdress:response.results[0].formatted_address
                }
                FirebaseService.addToFirebase(detailsToSave);

              };
              function googleFail(response){
                console.log("error "+ response);

              }
       
            

        };
        function badFun(response){
            console.log("error "+ response);
        }
  }//end testBusIf
     



});//end controller




            
              



                            



              
       