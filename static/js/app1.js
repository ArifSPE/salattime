var app = angular.module('myApp', []);


app.factory('MyService', function ($window) {
  return {
    calculateTimes: function ($window) {
		var date = new Date(); // today
		var lat = $window.loc.lat;
		var lon = $window.loc.lon;	
		prayTimes.setMethod('ISNA');
		prayTimes.adjust({asr: 'Hanafi'});
		var times = prayTimes.getTimes(date, [lat, lon], 'auto', 'auto', '12h');
		var params = prayTimes.getSetting();
		return times;
    }
  }
});

app.controller('slideCtrl', function($scope,$timeout){
    
    var myIndex = 0;
    carousel();

    function carousel() {
        var i;
        var x = document.getElementsByClassName("mySlides");
        for (i = 0; i < x.length; i++) {
           x[i].style.display = "none";  
        }
        myIndex++;
        if (myIndex > x.length) {myIndex = 1}    
        x[myIndex-1].style.display = "block";  
        setTimeout(carousel, 10000); // Change image every 2 seconds
    }

   // $timeout(carousel, 2000);

});

app.controller('myCtrl', function($scope, $window, MyService, $interval, $timeout) {
    $scope.salatconfig = $window.config;
    $scope.today = new Date();
    var time = MyService.calculateTimes($window);
    $scope.sunrise = time.sunrise;
    $scope.sunset = time.maghrib;
});

app.controller('footerCtrl', function($scope){
        
    $scope.getHijriDate = function(adjustment) {
        var wdNames = new Array("Ahad","Ithnin","Thulatha","Arbaa","Khams","Jumuah","Sabt");
        var iMonthNames = new Array("Muharram","Safar","Rabi'ul Awwal","Rabi'ul Akhir",
        "Jumadal Ula","Jumadal Akhira","Rajab","Sha'ban",
        "Ramadan","Shawwal","Dhul Qa'ada","Dhul Hijja");
        //var iDate = kuwaiticalendar(adjustment);
        var iDate = moment().format('iYYYY/iM/iD');
        var res = iDate.split("/"); //1439/8/22
        var outputIslamicDate = res[2] + " " + iMonthNames[res[1]-1] + " " + res[0] +" AH";
        return outputIslamicDate;
    };
});

app.controller('dateCtrl', function($scope, $timeout, $window, MyService, $interval,$timeout) {
    //$scope.today = new Date(); 
    console.log("==============Date Controller Call=====================");
    
    function gmod(n,m){
            return ((n%m)+m)%m;
    };
    
     
    $scope.tickInterval = 1000 //ms

    var tick = function () {
        $scope.today = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }
    // Start the timer
    $timeout(tick, $scope.tickInterval);
});