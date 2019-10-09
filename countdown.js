window.onload = function() {
    var timer= document.getElementById("timer").children;
   /* var endDate = new Date().getTime() +300000;
   /* var endDate = edDate.setMinutes(edDate.getMinutes()+5) ;
     var currentDate = new Date().getTime();*/
    var countdowntime = 300000;
    
    setInterval(time, 1000);
    
    function time() {
        
    
    var days = Math.floor((((countdowntime/1000)/60)/60)/24);
    var hours = Math.floor((((countdowntime/1000)/60)/60))%24;
    var minutes = Math.floor(((countdowntime/1000)/60))%60;
    var seconds = Math.floor((countdowntime/1000))%60;
        timer[0].textContent = days;
        timer[1].textContent = hours;
        timer[2].textContent = minutes;
        timer[3].textContent = seconds;
        
        timer[3].classList.add("rotate");
        setTimeout(function(){f(3);},500);
        function f(x){timer[x].classList.remove("rotate")};
        
        if(timer[3].textContent==59){ 
            timer[2].classList.add("rotate");
            setTimeout(function(){f(2);},500);}
        countdowntime= countdowntime -1000;
        
      /* timer[3].style.Animation= "rotate 0.5s";
        setTimeout(h,0.6);
        function h(){
            timer[3].style.Animation= "";
        };*/
    };
    
    console.log("IM HERE");
    
    
};