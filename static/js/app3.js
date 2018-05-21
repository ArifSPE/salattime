var app = angular.module('myApp', ['ngDialog']);

var changelabelline = 1;


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

app.controller('dateCtrl', function($scope, $timeout, $window, MyService, $interval,ngDialog) {
    //$scope.today = new Date();
    console.log("==============Date Controller Call=====================");
    $scope.salatconfig = $window.config;
    var time = MyService.calculateTimes($window);

    $scope.fajren = $scope.salatconfig.fajr.en;
    $scope.fajrsalattime= $scope.salatconfig.fajr.salat;
    $scope.fajradhan= $scope.salatconfig.fajr.adhan;

    $scope.shooruken = "Shurooq"
    var sunrisestring = time.sunrise;
    $scope.sunrise = sunrisestring.substring(0, sunrisestring.length-3);

    $scope.duhuren = $scope.salatconfig.duhr.en;
    $scope.duhursalattime= $scope.salatconfig.duhr.salat;
    $scope.duhuradhan = $scope.salatconfig.duhr.adhan;

    $scope.asaren = $scope.salatconfig.asr.en;
    $scope.asrsalattime= $scope.salatconfig.asr.salat;
    $scope.asradhan = $scope.salatconfig.asr.adhan;

    var sunsetstring = time.maghrib;
    $scope.maghribsalattime = sunsetstring.substring(0,sunsetstring.length-3);

    $scope.maghriben = $scope.salatconfig.maghrib.en;

    console.log($scope.maghribsalattime);

    $scope.ishaen = $scope.salatconfig.isha.en;
    $scope.ishasalattime= $scope.salatconfig.isha.salat;
    $scope.ishaadhan = $scope.salatconfig.isha.adhan;


    $scope.adhanArabic= "Adhan"
    $scope.iqamahArabic= "Iqamah"
    $scope.jummah = "Jummah Khutbah"

    $scope.tickInterval = 1000 //ms

    var tick = function () {
        $scope.today = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }
    // Start the timer
    $timeout(tick, $scope.tickInterval);

    var d = new Date();
    $scope.monthstring= d.toDateString();

    $scope.getHijriDate = function() {
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

    $scope.getHijriDateArabic = function(){

            var iMonthNames = new Array("محرم","صفر","ربيع الأول","ربيع الثاني",
			"جمادى الأولى","جمادى الثانيـة","رجب","شعبان",
			"رمضان","شوال","ذو القـعدة","ذو الحـــجـــة");
            var iDate = moment().format('iYYYY/iM/iD');
        var res = iDate.split("/"); //1439/8/22
        var outputIslamicDateAr = $scope.parseArabic(res[2]) + " " + iMonthNames[res[1]-1] + " " + $scope.parseArabic(res[0]) ;
        return outputIslamicDateAr;
    };

    $scope.parseArabic = function (number) {
        var englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ':'];
        var arabicNumbers = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠',':'];
        var numberToString = number.toString();

      for (var i = 0; i < englishNumbers.length; i++) {
       numberToString = numberToString.replace(new RegExp(englishNumbers[i], 'g'), arabicNumbers[i]);
      }
        return numberToString;
     };

     var changemonthlabel = function() {
                if(changelabelline == 1)
                {
                    $scope.monthstring = $scope.getHijriDate();
                    changelabelline++;

                }
                else if (changelabelline == 2)
                {
                    $scope.monthstring = $scope.getHijriDateArabic();
                    $scope.fajren = $scope.salatconfig.fajr.ar;
                    $scope.duhuren = $scope.salatconfig.duhr.ar;
                    $scope.asaren = $scope.salatconfig.asr.ar;
                    $scope.shooruken = "شروق"
                    $scope.maghriben = $scope.salatconfig.maghrib.ar;
                    $scope.ishaen = $scope.salatconfig.isha.ar;
                    $scope.jummah = "جمعة خطبة";
                    //$scope.adhanArabic= "أَذَان";
                    //$scope.iqamahArabic= "إقامة";
                    
                /**
                    $scope.fajrsalattime= $scope.parseArabic($scope.salatconfig.fajr.salat);
                    $scope.fajradhan= $scope.parseArabic($scope.salatconfig.fajr.adhan);
                    $scope.duhursalattime= $scope.parseArabic($scope.salatconfig.duhr.salat);
                    $scope.duhuradhan = $scope.parseArabic($scope.salatconfig.duhr.adhan);
                    $scope.asrsalattime= $scope.parseArabic($scope.salatconfig.asr.salat);
                    $scope.asradhan = $scope.parseArabic($scope.salatconfig.asr.adhan);
                    $scope.maghribsalattime= $scope.parseArabic($scope.maghribsalattime);
                    $scope.ishasalattime= $scope.parseArabic($scope.salatconfig.isha.salat);
                    $scope.ishaadhan = $scope.parseArabic($scope.salatconfig.isha.adhan);
                    $scope.sunrise = $scope.parseArabic($scope.sunrise);
                    **/
                    changelabelline++;

                }
                else if(changelabelline == 3)
                {
                        $scope.monthstring= d.toDateString();
                        $scope.fajren = $scope.salatconfig.fajr.en;
                        $scope.duhuren = $scope.salatconfig.duhr.en;
                        $scope.asaren = $scope.salatconfig.asr.en;
                        $scope.shooruken = "Shurooq"
                        $scope.maghriben = $scope.salatconfig.maghrib.en;
                        $scope.ishaen = $scope.salatconfig.isha.en;
                        $scope.jummah = "Jummah Khutbah";
                        $scope.adhanArabic= "Adhan";
                        $scope.iqamahArabic= "Iqamah";
                /**
                        $scope.fajrsalattime= $scope.salatconfig.fajr.salat;
                        $scope.fajradhan= $scope.salatconfig.fajr.adhan;
                        $scope.duhursalattime= $scope.salatconfig.duhr.salat;
                        $scope.duhuradhan = $scope.salatconfig.duhr.adhan;
                        $scope.asrsalattime= $scope.salatconfig.asr.salat;
                        $scope.asradhan = $scope.salatconfig.asr.adhan;
                        $scope.maghribsalattime= $scope.sunset;
                        $scope.ishasalattime= $scope.salatconfig.isha.salat;
                        $scope.ishaadhan = $scope.salatconfig.isha.adhan;
                        var sunrisestring = time.sunrise;
                        $scope.sunrise = sunrisestring.substring(0, sunrisestring.length-3);
                        var sunsetstring = time.maghrib;
                        $scope.maghribsalattime = sunsetstring.substring(0,sunsetstring.length-3);
                    **/
                        changelabelline = 1;
                    var targets = angular.element(document).find('body'); 
                    //alert(targets[0].background);
                    //allCarets.removeClass('fa-caret-down');
                    //allCarets.addClass('fa-caret-right');
                    //var vcomponents =  angular.element('#collapse_vcomponents');
                    //vcomponents.removeClass('collapse');
                    //vcomponents.addClass('panel-collapse width in');
                    //vcomponents.css('width', 'auto');
                    
                }
                $timeout(changemonthlabel,10000);
        };

        $timeout(changemonthlabel,10000);
    
        
        var imageseq = 1;
        $interval(function(){
            var img = 'bg'+imageseq;
            //alert(img);
            var imagename = 'static/images/assets/'+img+'.jpg'
            var targets = angular.element(document).find('body'); 
            targets[0].background=imagename;
            imageseq++;
            if(imageseq > 15)
                imageseq = 1; 
            
            var salattd1 = angular.element(document).find('#salattime1');
            var salattd2 = angular.element(document).find('#salattime2');
            var salattd3 = angular.element(document).find('#salattime3');
            var salattd4 = angular.element(document).find('#salattime4');
            var salattd5 = angular.element(document).find('#salattime5');
            var salattd6 = angular.element(document).find('#salattime6');
            
               
            //salattd[0].className ='righttableblack ng-binding';
            if(img == 'bg3')
            {
                    salattd1[0].className ='righttablegreen ng-binding';
                    salattd2[0].className ='righttablegreen ng-binding';
                    salattd3[0].className ='righttablegreen ng-binding';
                
            }
            else if(img == 'bg4')
            {
                    salattd1[0].className ='righttable ng-binding';
                    salattd2[0].className ='righttable ng-binding';
                    salattd3[0].className ='righttable ng-binding';
                    salattd4[0].className ='righttableblack ng-binding';
                    salattd5[0].className ='righttableblack ng-binding';
                    salattd6[0].className ='righttableblack ng-binding';
                    
            }
            else
            {
                    salattd1[0].className ='righttable ng-binding';
                    salattd2[0].className ='righttable ng-binding';
                    salattd3[0].className ='righttable ng-binding';
                    salattd4[0].className ='righttable ng-binding';
                    salattd5[0].className ='righttable ng-binding';
                    salattd6[0].className ='righttable ng-binding';
                    
            }
                

        }, 10000);

});



