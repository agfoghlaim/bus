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


  // app.controller('StopCtrl', function($scope, StopService){
    
 
 
  // });

  // app.controller('StopLocaion', function($scope, LocationService){

  });

    app.controller('DataController', function($scope,  $firebaseArray){
   
    var ref = firebase.database().ref();
    $scope.bus = $firebaseArray(ref);
    console.log($firebaseArray);

    $scope.bus.$add({
        name : 'moh',
        address: 'here'
        
      }).then(function(ref){
        //var id = ref.key();
        console.log("contact id is "+ ref);
        
      });



  });