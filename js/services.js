 app.service('BusService', function($http){
    this.getBusses = function(callBackOk, callBackNotOk){
      //var searchUrl = 'https://api.myjson.com/bins/po22';
     // var searchUrl = 'https://data.gov.ie/api/3/action/package_list';
      var searchUrl = 'https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=523001&format=json';
      
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