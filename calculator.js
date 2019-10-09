window.onload = function() {
    var displayValue = "";
    var numTextValue ="";
    var currentTextValue = []; //The main array that keeps changing and updating
    var index = 0;             //index to use for the currentTextValue
    var indicator =0;          // Tells whether there was a number or ans(with a value) input before a symbol is pressed
    var pointer = 1;           // Used by displayValue and add ans once to the total display value
    var ans = "";
    var ansPressedPreviously =0;
    var display=document.getElementById("display");  
    var indexAdd= [];
    var indexMultiply= [];
    var indexSubtract= [];
    var indexDivide= [];
    var indexPower= [];
    var indexRoot = [];
    var indexModulus = [];
    var ansCounter = 0;         // to check when the ans button is pressed it cannot be pressed twice in a row
    var ansCounter = 0;         // to check when the ans button is pressed it cannot be pressed twice in a row
    var syntaxErrorCounter = 0; // to ensure when ever there is a syntax error the user must clear
    
///////////////////////////////////////EVEN LISTENERS/////////////////////////////////////////////////////////////////////   
    
   var number = document.getElementsByClassName("number");
    for (var i = 0; i < number.length; i++){
        number[i].addEventListener("click",showNumber); 
    }
    
    var symbol = document.getElementsByClassName("symbol");
    for (var i = 0; i < symbol.length; i++){
        symbol[i].addEventListener("click",showSymbol); 
    }
    
    var answer= document.getElementById("on");
    answer.addEventListener("click", displayans);
    
    var clear= document.getElementById("clear");
    clear.addEventListener("click", reset);
    
///////////////////////////////////////END EVEN LISTENERS/////////////////////////////////////////////////////////////////      
    
///////////////////////////////////////WHEN NUMBER IS PRESSED/////////////////////////////////////////////////////////////    
     function showNumber() {
        if(pointer ==1){
            if(ansCounter == 0){
                 var singleNumValue = this.firstChild.textContent;
                 displayValue +=singleNumValue;
                 numTextValue +=singleNumValue;
                
                 if(singleNumValue == "."){ 
                     currentTextValue[index] = numTextValue + ".";
                     console.log(currentTextValue);}
                 else{
                     currentTextValue[index] = numTextValue; 
                     console.log(currentTextValue[index]);}
                
                display.firstChild.textContent = displayValue;
                console.log(currentTextValue);
            }
        }
         indicator =1;
         ansPressedPreviously =0; 
         console.log(currentTextValue);
    } 
//////////////////////////////////END WHEN NUMBER IS PRESSED/////////////////////////////////////////////////////////////       
    
////////////////////////////////////// WHEN SYMBOL IS PRESSED/////////////////////////////////////////////////////////////       
     function showSymbol() {
         if(syntaxErrorCounter == 0){
             ansCounter = 0;
             var singleSymbolValue = this.firstChild.textContent;
             var sign = singleSymbolValue;
             console.log(singleSymbolValue);
             numTextValue ="";
             
             
             if(sign != "√"){
                 ///////FOR MINUS US AT THE BIGINNING(TEMPORARY SOLUTION)///////////////////////////
                 if(ansPressedPreviously ==0 && indicator == 0 && index == 0 && sign == "-"){
                     if(currentTextValue[0]){index++;}
                     currentTextValue[index] = "-";
                 }
                 else{
                 index += 1;
                 currentTextValue[index] = sign;} 
                 }
             ///////IF NUMBERS PRESENT JUST BEFORE SQUARE ROOT/////////
             else if(indicator == 1 ){
                 currentTextValue[index]= "?";
             }
             else if(ansPressedPreviously == 1 && ans !==""){
                  currentTextValue[index]= "?";
             }
             else{
                 currentTextValue[index] = sign;
             }
             
             index += 1;
             
             if(pointer == 2){
                 /////TO DISPLAY AS SOON AS WE GET THE ANSWER  SO WE CAN ADD IT LATER////////////////////////
                 displayValue = ans;
                 pointer = 1;
             }
             
             displayValue += singleSymbolValue;
             display.firstChild.textContent= displayValue;
             
             if(sign == "="){
                 
                 var h = calculate();
                 if(isNaN(h)){
                 display.firstChild.textContent="SYNTAX ERROR!";
                 syntaxErrorCounter = 1;
                 }
                 else{
                     console.log(h);
                     console.log(currentTextValue);
                     console.log(currentTextValue);
                     
                     ans = h;
                     reset();
                     display.firstChild.textContent=h;
                     currentTextValue[index]=h;
                 }
                 
             pointer++;                  
         }
       }
         indicator =0;
         ansPressedPreviously =0;
     };
//////////////////////////////////////END WHEN SYMBOL IS PRESSED/////////////////////////////////////////////////////////////       
    
////////////////////////////////////// WHEN ANS IS PRESSED//////////////////////////////////////////////////////////////////       
    
    function displayans() {
       
        if(syntaxErrorCounter == 0){
            if(ansCounter == 0){
                displayValue = displayValue + ans;
                display.firstChild.textContent=displayValue;
                currentTextValue[index]=ans;
                if(ans !=""){
                    ansPressedPreviously =1;
                    ansCounter = 1;
                }
            }
        }        
    };
//////////////////////////////////////END WHEN ANS IS PRESSED/////////////////////////////////////////////////////////////   
    
//////////////////////////////////////CALCULATE IN ORDER//////////////////////////////////////////////////////////////////    
     function calculate() {
        currentTextValue=currentTextValue;
        power();
        root();        
        divide();
    //////////////////MULTIPLY WITH -1 AT INDEX 0/////////////////////////////////
        if(currentTextValue[0] == "-"){
            currentTextValue[1]= -currentTextValue[1];
            currentTextValue.splice(0,1);
        }   
         /////////////END MULTIPLY WITH -1 AT INDEX 0/////////////////////////////////
        multiply();   
        add();
        subtract();
        modulus();        
        return currentTextValue[0];
    };
/////////////////////////////////////////////////END CALCULATE IN ORDER/////////////////////////////////////////////////   
    
/////////////////////////////////////////MATH FUNCTIONS/////////////////////////////////////////////////////////////////    
    
    function power(){/////FIND THE INDEX OF of POWER SYMBOlS/////////////////////////
        for(var x = 0; x < currentTextValue.length; x++){
             if(currentTextValue[x] == "^"){
                 indexPower.push(x);
             }
         }
          ///////DONT BOTHER RUNNING IF THERE ARE NO POWER SYMBOLS////////////////
        if(indexPower.length > 0){
            ////WHEN FOUND THEN CALCULATE THE LEFT AND RIGHT POSITIONS OF POWER SYMBOL AND REPLACE THE RIGT POSITION OF THE SYMBOL WITH THE CALCUULATED VALUE////////
            for(var c = 0; c < indexPower.length; c++){
                currentTextValue[indexPower[c]+1] = Math.pow(parseFloat(currentTextValue[indexPower[c]-1]),parseFloat(currentTextValue[indexPower[c]+1]));
            }
            ////////////////USING THE SPLICE TO GO BACK TO STEPS FROM THE SYMBOL AND DELETING THE LEFT POSTION AND THE SYMBOL ITSELF//////////////////////////////
            for(var c = 0 ; c < currentTextValue.length ; c++ ){
                if(currentTextValue[c]== "^"){
                    currentTextValue.splice(c-1,2);
                    c=-1;
                }
            }            
        }    
    };
    
    function root(){
         for(var x = 0; x < currentTextValue.length; x++){
             if(currentTextValue[x] == "√"){
                 indexRoot.push(x);
             }
         }
      
        if(indexRoot.length > 0){
            for(var c = 0; c < indexRoot.length; c++){
                currentTextValue[indexRoot[c]+1] = Math.sqrt(parseFloat(currentTextValue[indexRoot[c]+1]));
            }
            for(var c = 0 ; c < currentTextValue.length ; c++ ){
                if(currentTextValue[c]== "√"){
                    currentTextValue.splice(c,1);
                    c=-1;
                }
            }
            
        }        
    };
    
    function divide(){
         for(var x = 0; x < currentTextValue.length; x++){
             if(currentTextValue[x] == "÷"){
                 indexDivide.push(x);
             }
         }
        if(indexDivide.length > 0){
             for(var c = 0; c < indexDivide.length; c++){
                 currentTextValue[indexDivide[c]+1] = parseFloat(currentTextValue[indexDivide[c]-1])/parseFloat(currentTextValue[indexDivide[c]+1]);
             }
             for(var c = 0 ; c < currentTextValue.length ; c++ ){
                 if(currentTextValue[c]== "÷"){
                     currentTextValue.splice(c-1,2);
                     c=-1;
                }
              }
        }       
    };
    
    function multiply(){
          for(var x = 0; x < currentTextValue.length; x++){
              if(currentTextValue[x] == "X"){
                  indexMultiply.push(x);
                  }
              }
        if(indexMultiply.length > 0){
            for(var c = 0; c < indexMultiply.length; c++){
                currentTextValue[indexMultiply[c]+1] = parseFloat(currentTextValue[indexMultiply[c]-1])*parseFloat(currentTextValue[indexMultiply[c]+1]);
            }
            
            for(var c = 0 ; c < currentTextValue.length ; c++){
                if(currentTextValue[c]== "X"){
                    currentTextValue.splice(c-1,2);
                    c=-1;
                }
            }
        }
    };
    
    function add(){        
        for(var x = 0; x < currentTextValue.length; x++){
             if(currentTextValue[x] == "+"){
                 indexAdd.push(x);
             }
         }
        if(indexAdd.length > 0){
            
            for(var c = 0; c < indexAdd.length; c++){
                currentTextValue[indexAdd[c]+1] = parseFloat(currentTextValue[indexAdd[c]-1]) + parseFloat(currentTextValue[indexAdd[c]+1]);
            }
            
            for(var c = 0 ; c < currentTextValue.length ; c++ ){
                if(currentTextValue[c]== "+"){
                    currentTextValue.splice(c-1,2);
                    c=-1;
                }
            }            
        }        
    };
    
    function subtract(){
         for(var x = 0; x < currentTextValue.length; x++){
             if(currentTextValue[x] == "-"){
                 indexSubtract.push(x);
             }
         }
        
        if(indexSubtract.length > 0){
             for(var c = 0; c < indexSubtract.length; c++){
                 currentTextValue[indexSubtract[c]+1] = parseFloat(currentTextValue[indexSubtract[c]-1])-parseFloat(currentTextValue[indexSubtract[c]+1]);
             }
            
            for(var c = 0 ; c < currentTextValue.length ; c++ ){
                if(currentTextValue[c]== "-"){
                    currentTextValue.splice(c-1,2);
                    c=-1;
                }
            }            
        }       
    };
    
    function modulus(){
        for(var x = 0; x < currentTextValue.length; x++){
             if(currentTextValue[x] == "%"){
                 indexModulus.push(x);
             }
         }
        if(indexModulus.length > 0){
            for(var c = 0; c < indexModulus.length; c++){
                currentTextValue[indexModulus[c]+1] = parseFloat(currentTextValue[indexModulus[c]-1])%parseFloat(currentTextValue[indexModulus[c]+1]);
                }
            
            for(var c = 0 ; c < currentTextValue.length ; c++){
                if(currentTextValue[c]== "%"){
                    currentTextValue.splice(c-1,2);
                    c= -1;
                }
            }                
        }        
    };
/////////////////////////////////////////END MATH FUNCTIONS//////////////////////////////////////////////////////////////     
    
//////////////////////////////////////////RESET//////////////////////////////////////////////////////////////////////////    
    
    
    function reset() {
        currentTextValue ="";
        displayValue = "";
        numTextValue ="";
        display.firstChild.innerHTML= "&nbsp;";
        console.log("IN C")
        currentTextValue = [];
        preParsedNum = [];
        indicator =0;
        index = 0;
        ansPressedPreviously =0;
        pointer = 1;
        indexAdd= [];
        indexMultiply= [];
        indexSubtract= [];
        indexDivide= [];
        indexPower= [];
        indexRoot = [];
        indexModulus = [];
        ansCounter = 0;
        syntaxErrorCounter = 0;
    };
////////////////////////////////////////////END RESET////////////////////////////////////////////////////////////////////    
};