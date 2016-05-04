;(function(){
    var url = 'http://openweathermap.org/data/2.5/forecast/daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a';
    var place = document.querySelector('.place');
    var bg = new Array("images/clouds.PNG","images/clouds.png","images/sunny.png","images/rain.png","images/rain.png");
    var contain = document.querySelector('.contain');
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.onload = function (e) {
        if (this.status === 200) {
            callback(JSON.parse(this.responseText));
        }
    }
    xhr.send();

    function Datefn(myDate){
        switch (myDate.getDay()){
            case 0:
            return '星期天'; 
            break;
            case 1:
            return '星期一'; 
            break;
            case 2:
            return '星期二'; 
            break;
            case 3:
            return '星期三'; 
            break;
            case 4:
            return '星期四'; 
            break;
            case 5:
            return '星期五'; 
            break;
            case 6:
            return '星期六'; 
            break;
        }
    }
    function bgcolor (data) {
       switch(data) {
              default:break;
              case 'Rain':
              case 'Clouds':
              return '#005f9a';
              //return '-webkit-linear-gradient(top,#88a9ca,#bcd3e3)';
              break;
              case 'Clear':
              return '#005f9a';
              //return '-webkit-linear-gradient(top,#50b2fb,#a6d4f6)';
       }
    }
    function bgimg(data) {
      switch(data) {
                default:break;
                case 'light rain':
                  return 'url(' + bg[3] + ')';
                  break;
                case 'moderate rain':
                  return  'url(' + bg[4] + ')';
                  break;
                case 'clear sky':
                  return  'url(' + bg[2] + ')';
                  break;
                case 'broken clouds':
                  return  'url(' + bg[1] + ')';
                  break;
       }
    }
    function Month(index) {
        switch(index) {
              case 0 :return '(今天)';
              break;
              case 1 :return '(明天)';
              break;
              case 2 :return '(后天)';
              break;
              default : return '';
              break;
             }
    }
    function createDom (){
        contain.innerHTML += "<li class = 'list'>" +  "<span class='date'></span>" + "<span class='day'></span>" +  "<div class='img'></div>" +  "<p class='weather'></p>" +  "<p class='temp'>"+ "<span class='max'></span>"+ "<span class='min'></span>"+ "</p>" + "</li>";
    }
    function callback (res) {
         place.innerHTML = res.city.name; 
        res.list.forEach(function(item, index){
            if(index < 7) {
              createDom ();
                var date = document.querySelectorAll('.date');
                var img = document.querySelectorAll('.img');
                var max = document.querySelectorAll('.max');
                var min = document.querySelectorAll('.min');
                var weather = document.querySelectorAll('.weather');
                var day = document.querySelectorAll('.day');
                var myDate = new Date(item.dt * 1000);
                var List = document.querySelectorAll('.list');
                 day[index].innerHTML = Datefn(myDate);
                 //date[index].innerHTML = month + Month(index);

                 max[index].innerHTML = item.temp.max + '℃' + ' /';
                 min[index].innerHTML = item.temp.min + '℃';
                 weather[index].innerHTML = item.weather[0].main;

                 List[index].style.background = bgcolor(item.weather[0].main);

                 img[index].style.backgroundImage = bgimg(item.weather[0].description);
            }
        });
    }
}());
