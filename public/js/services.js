 app.service('BusService', function($http){
    this.getBusses = function(sid, callBackOk, callBackNotOk){
      //var searchUrl = 'https://api.myjson.com/bins/po22';
     // var searchUrl = 'https://data.gov.ie/api/3/action/package_list';
      var searchUrl = 'https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=' + sid;
      
      $http.get(searchUrl).then(funOk, funNotOk);
      
      function funOk(response){
        callBackOk(response.data);
      };
      function funNotOk(response){
        callBackNotOk(response.status, response.statusText);
        
      }
    }
  });

 app.service('StopService', function($http){

  this.getStop = function(stopId , good, bad){
    //this.stopId = stopId;
    var url= 'https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation?stopid=' + stopId;
    console.log(this.stopId);
    console.log(url);
     //var searchUrl = 'https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=523001&format=json';
    $http.get(url).then(funOk, funNotOk);
     function funOk(response){
        good(response.data);
      };
      function funNotOk(response){
        bad(response.errormessage);
        
      };
  }

 });

 app.service('LocationService', function($http){
  this.findLocation= function(address, good, bad){
    var url = 'https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation?stopname=' + address ;
    $http.get(url).then(funOk, funNotOk);
    function funOk(response){
      good(response.data);
    };
    function funNotOk(response){
      bad(response.errormessage);
    }
  }
 });


  app.service('GoogleService', function($http){
  this.lookUpCoordinates= function(latitude,longitude, good, bad){
      var apiKey = 'AIzaSyCh7uFwmTh3dl8j3kmjT69SC3gshUJmbI0';
      var googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude +','+ longitude+'&result_type=bus_station&key='+apiKey;
      console.log("this is googleurl " + googleUrl);
    $http.get(googleUrl).then(funOk, funNotOk);
    function funOk(response){
      good(response.data);
    };
    function funNotOk(response){
      bad(response.errormessage);
    }
  }
 });

  app.service('FirebaseService', function($http, $firebaseArray){

    this.addToFirebase = function(details, good, bad){
      //make requests


             var ref = firebase.database().ref();
                              var bus = $firebaseArray(ref);
                              console.log($firebaseArray);

                               bus.$add(details).then(
                                function(ref){
                                   
                                    console.log("added...");
                                });
    }
  });

  app.service('CoordinatesService', function($http){
    this.getCoordinates = function(para, good, bad){
       var url = 'https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation?stopid=' + para;
      $http.get(url).then(funOk, funNotOk);
      function funOk(response){
        good( response);
      };
      function funNotOk(response){
        bad(response);

      }

    }
  });




