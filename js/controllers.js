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

    app.controller('DataController', function($scope,  $firebaseArray, $http, GoogleService){


    // $scope.bus.$add({
    //     name : 'moh',
    //     address: 'here'
    // }).then(function(ref){
    //   console.log("contact id is "+ ref);
    // });

    //1 get (1)busstop latitude and longitude
    //2reverse lookup on google
    //3save stopid, lat, long and location details to firebase
    //done 4 save stop name and other stuff
 $scope.testBusId = function(testBus){
      var stopId = testBus;
      //var testBusId = '520801'; //callaghan's cross
      var url = 'https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation?stopid=' + stopId;
     
      var county , exactLocation;
      $http.get(url).then(
        function(response){
          console.log("success "+ response.data.results[0].latitude);
          console.log("success "+ response.data.results[0].longitude);
          $scope.latitude = response.data.results[0].latitude;
          $scope.longitude = response.data.results[0].longitude;
            $scope.theLocation = GoogleService.lookUpCoordinates($scope.latitude, $scope.longitude,
              function(response){
                console.log(response.results);
                 console.log(response.results[0].formatted_address);
                 exactLocation = response.results[0].formatted_address;
                 county = response.results[0].address_components[3].long_name;
                 console.log(county);



                               var ref = firebase.database().ref();
                              $scope.bus = $firebaseArray(ref);
                              console.log($firebaseArray);

                               $scope.bus.$add({
                                  stopid:stopId,
                                  latitude:$scope.latitude,
                                  longitude:$scope.longitude,
                                  county: county

                                }).then(function(ref){
                                    console.log(ref);
                                    console.log("added...");
                                });







              }, 
              function(response){
                console.log("error from google "+ response);

            } );
        }, 
        function(response){
         console.log("error "+ response);
      });

    

     


 }
     



  });