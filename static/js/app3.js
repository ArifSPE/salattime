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

app.controller('dateCtrl', function($scope, $timeout, $window, MyService, $interval, $sce) {
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
    //$scope.myHTML=''

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
            var datecell = angular.element(document).find('#datecell');
            var timecell = angular.element(document).find('#timecell');


            targets[0].background=imagename;
            imageseq++;
            if(imageseq == 9)
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
                    salattd4[0].className ='righttablegreen ng-binding';
                    salattd5[0].className ='righttablegreen ng-binding';
                    salattd6[0].className ='righttablegreen ng-binding';
                    timecell[0].className = 'topbargreen ng-binding';
                    datecell[0].className = 'topbargreen  ng-binding';

                
            }
            else if(img == 'bg5')
            {
                    timecell[0].className = 'topbarbrown ng-binding';
                    datecell[0].className = 'topbarbrown ng-binding';
                    salattd1[0].className ='righttable ng-binding';
                    salattd2[0].className ='righttable ng-binding';
                    salattd3[0].className ='righttable ng-binding';
                    salattd4[0].className ='righttable ng-binding';
                    salattd5[0].className ='righttable ng-binding';
                    salattd6[0].className ='righttable ng-binding';

            }
            else
            {
                    salattd1[0].className ='righttable ng-binding';
                    salattd2[0].className ='righttable ng-binding';
                    salattd3[0].className ='righttable ng-binding';
                    salattd4[0].className ='righttable ng-binding';
                    salattd5[0].className ='righttable ng-binding';
                    salattd6[0].className ='righttable ng-binding';
                    timecell[0].className = 'topbar ng-binding';
                    datecell[0].className = 'topbar  ng-binding';
            }
                

        }, 300000);
    
    var slidenumber = 1;
    var nextSalatNumber = 1;
    var jummahSalat = $interval(function($scope){
            var contentcell = angular.element(document).find('#content');
        var html='';
        if(slidenumber == 1)
        {    
            html = '<p class="salatlabel1">Jummah</p>'+'<p class="salatlabel1">Adhan:'+$window.jummah.adhan+'</p><p class="salatlabel1">Khutbah:'+$window.jummah.khutbah+'</p><p class="salatlabel1">Khateeb '+$window.jummah.khateebh+'</p>';
            slidenumber++
        }
        else if(slidenumber==2)
        {
            html = '<p class="salatlabel">Attention !!!</p><img src="static/images/cell2.png" height="625px">';
            slidenumber++;
        }
        else
        {
                    var hours = new Date().getHours();
		            var minutes = new Date().getMinutes();
                    if (minutes >= 0 && minutes <= 9)
                        minutes = '0'+minutes;

                    var currentTime = (hours + ':' + minutes);
                    console.log(currentTime);
                    if(currentTime>$window.config.fajr.hr  && currentTime <= $window.config.duhr.hr)
                    {
                        nextSalatNumber = 2;
                    }
                    if(currentTime > $window.config.duhr.hr && currentTime <= $window.config.asr.hr)
                    {
                        nextSalatNumber = 3;
                    }
                    if(currentTime > $window.config.asr.hr && currentTime < $scope.maghribsalattime)
                    {
                        nextSalatNumber = 4;    
                    }
                    if(currentTime > $scope.maghribsalattime && currentTime < $window.config.isha.hr)
                    {
                        nextSalatNumber = 5;
                    }
                    if(currentTime > $window.config.isha.hr)
                    {
                        nextSalatNumber = 1;    
                    }
                    
                    console.log(nextSalatNumber);
            
                    if(nextSalatNumber == 1)
                    {
                        html = '<p class="salatlabel1"> Next:'+$window.config.fajr.en+'</p>'+'<p class="salatlabel1">Adhan:'+$window.config.fajr.adhan+'</p><p class="salatlabel1">Iqamah:'+$window.config.fajr.salat+'</p>'; 
                    }
                    if(nextSalatNumber == 2)
                    {
                    html = '<p class="salatlabel1"> Next:'+$window.config.duhr.en+'</p>'+'<p class="salatlabel1">Adhan:'+$window.config.duhr.adhan+'</p><p class="salatlabel1">Iqamah:'+$window.config.duhr.salat+'</p>'; 
                    }
                    if(nextSalatNumber == 3)
                    {
                        html = '<p class="salatlabel1"> Next:'+$window.config.asr.en+'</p>'+'<p class="salatlabel1">Adhan:'+$window.config.asr.adhan+'</p><p class="salatlabel1">Iqamah:'+$window.config.asr.salat+'</p>'; 
                    }
                    if(nextSalatNumber== 4)
                    {
                        var time = MyService.calculateTimes($window);
                        var sunsetstring = time.maghrib;
                        var maghribsalattime = sunsetstring.substring(0,sunsetstring.length-3);
                        html = '<p class="salatlabel1">Next:'+$window.config.maghrib.en+'</p>'+'<p class="salatlabel1">Adhan:'+maghribsalattime+'</p><p class="salatlabel1">Iqamah: +7 Min</p>'; 
                    }
                    if(nextSalatNumber==5)
                    {
                        html = '<p class="salatlabel1"> Next:'+$window.config.isha.en+'</p>'+'<p class="salatlabel1">Adhan:'+$window.config.isha.adhan+'</p><p class="salatlabel1">Iqamah:'+$window.config.isha.salat+'</p>'; 
                    }
            slidenumber=1;
        }
            contentcell[0].innerHTML = html;
             $timeout(function(){
                    var contentcell = angular.element(document).find('#content');
                contentcell[0].innerHTML='';
            }, 500 * 30);
        
    }, 1000 * 30);
   

//    var start = $interval(function($scope)
//    {
//        var hours = new Date().getHours();
//		var minutes = new Date().getMinutes();
//        if (minutes >= 0 && minutes <= 9)
//            minutes = '0'+minutes;

//		var currentTime = (hours + ':' + minutes);
//        console.log(currentTime);

//        if(currentTime == $window.config.fajr.hr || currentTime == $window.config.duhr.hr || currentTime == $window.config.asr.hr || currentTime == $window.config.isha.hr)
//        {
//            var contentcell = angular.element(document).find('#content');
//            contentcell[0].innerHTML = '<p class="salatlabel">Attention !!!</p><p class="attention">Iqamam is in progres !</p>'+
//                '<img src="static/images/cell.png" height="150" width="150">';
            
//            $timeout(function(){
//                    var contentcell = angular.element(document).find('#content');
//                contentcell[0].innerHTML='';
//            }, 1800000);
//        }
//    }, 1000 * 60);

});



