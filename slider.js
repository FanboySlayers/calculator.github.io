window.onload= function() {

    var prev= document.getElementById("prev");
    var next= document.getElementById("next");
    var images= document.getElementsByClassName("image");
    var x= 0;
    var numOfImg= images.length -1;
    
    prev.addEventListener("click",goBack);
    next.addEventListener("click", goForward);
    setInterval(goForward,7000);
    
    function goBack() {
       images[x].style.display= "none";
        if(x == 0){
            x= numOfImg;
        }
        else{
             x= x-1;
        }
       
        images[x].style.display= "block";
        images[x].style.WebkitAnimation= "fadeIn 3s";
        
    };
    
    function goForward(){
        images[x].style.display= "none";
        if(x == numOfImg){
            x = 0;
        }
        else{
            x= x+1;
        }
       
        images[x].style.display= "block";
        images[x].style.WebkitAnimation= "fadeIn 3s";
        images[x].style.Animation= "fadeIn 3s";
    };
        
};