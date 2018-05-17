var app = angular.module('myApp', ['ngDialog']);

var changelabelline1=true;
var changelabelline2=true;


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

app.controller('firstRowController', function($scope, $window, MyService, $interval, $timeout, ) {
    
    console.log("==============firstRowController Controller Call=====================");

    $scope.salatconfig = $window.config;
    $scope.today = new Date();
    var time = MyService.calculateTimes($window);
    $scope.sunrise = time.sunrise;
    $scope.sunset = time.maghrib;
    
    $scope.fajren = $scope.salatconfig.fajr.en;
    $scope.duhuren = $scope.salatconfig.duhr.en;
    $scope.asaren = $scope.salatconfig.asr.en;
    $scope.shooruken = "Shurooq"

    
    $scope.labelchangeinterval = 10000 //ms
    
    

    var changelabel = function () {
        if(changelabelline1)
        {
                $scope.fajren = $scope.salatconfig.fajr.ar;
                $scope.duhuren = $scope.salatconfig.duhr.ar;
                $scope.asaren = $scope.salatconfig.asr.ar;
                $scope.shooruken = "شروق"
                changelabelline1 = false;
      
        }
        else
            {
                $scope.fajren = $scope.salatconfig.fajr.en;
                $scope.duhuren = $scope.salatconfig.duhr.en;
                $scope.asaren = $scope.salatconfig.asr.en;
                $scope.shooruken = "Shurooq"
                changelabelline1=true
            }
        
        $timeout(changelabel, $scope.labelchangeinterval); // reset the timer
    }
    // Start the timer
    $timeout(changelabel, $scope.labelchangeinterval);
});

app.controller ('secondRowController',  function($scope, $window, MyService, $interval, $timeout){
    
    console.log("==============second Controller Call=====================");

    $scope.salatconfig = $window.config;
    var time = MyService.calculateTimes($window);
    $scope.sunrise = time.sunrise;
    $scope.sunset = time.maghrib;
    $scope.jummah = "Jummah Khutbah"

    
    $scope.maghriben = $scope.salatconfig.maghrib.en;
    $scope.ishaen = $scope.salatconfig.isha.en;
    
    $scope.labelchangeinterval2 = 10000 //ms
    var changelabel2 = function () {
        if(changelabelline2)
        {
            $scope.maghriben = $scope.salatconfig.maghrib.ar;
            $scope.ishaen = $scope.salatconfig.isha.ar;
            $scope.jummah = "جمعة خطبة";
            changelabelline2 = false;
      
        }
        else
            {
                $scope.maghriben = $scope.salatconfig.maghrib.en;
                $scope.ishaen = $scope.salatconfig.isha.en;
                $scope.jummah = "Jummah Khutbah"
                changelabelline2=true
            }
        
        $timeout(changelabel2, $scope.labelchangeinterval2); // reset the timer
    }
    // Start the timer
    $timeout(changelabel2, $scope.labelchangeinterval2);        
});

app.controller('footerCtrl', function($scope){
        
    console.log("==============footerCtrl Controller Call=====================");

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

app.controller('dateCtrl', function($scope, $timeout, $window, MyService, $interval,$timeout, $element, ngDialog) {
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
    
    //Schedulers
    console.log($window.timeoutscheduled);
    var start;
    $interval.cancel(start);
    start = $interval(function($scope)
    {
        var hours = new Date().getHours();
		var minutes = new Date().getMinutes();
        if (minutes >= 0 && minutes <= 9)
            minutes = '0'+minutes;

		var currentTime = (hours + ':' + minutes);
        console.log(currentTime);

        if(currentTime == $window.config.fajr.hr || currentTime == $window.config.duhr.hr || currentTime == $window.config.asr.hr || currentTime == $window.config.isha.hr)
        {

                var dialog = ngDialog.open({
                    template: '<h2  style="font-size: 100px;">Salat in progress !!, <br> Please be quite and turn of your cellphone</h2>',
                    className: 'ngdialog-theme-default',
                    height: 400,
                    width: 500,
                    plain: true,
                    data: '{"data": "bar"}'
                });


            $timeout(function(){
                location.reload();
            }, 1800000);
                    //var start = new Date().getTime();
                    //for (var i = 0; i < 1e7; i++) {
                    //    if ((new Date().getTime() - start) > 5000){
                    //        dialog.close(dialog.id, '{"data": "bar"}');
                    //        break;
                    //    }
                    //}
        }
    }, 1000 * 60);
});



function parseArabic(){ // PERSIAN, ARABIC, URDO
     var yas ="٠١٢٣٤٥٦٧٨٩";
     yas = (yas.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
         return d.charCodeAt(0) - 1632;                
         }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) { return d.charCodeAt(0) - 1776; })
     );
     alert(yas);
}
