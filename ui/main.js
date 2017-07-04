var button = document.getElementById('counter');
var span = document.getElementById('count');

button.onclick =function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        
      
        if(request.readystate === XMLHttpRequest.DONE)
        {
              span.innerHTML="hello";
            if(request.status === 200){
                var counter = request.responseText;
               
                span.innerHTML="hello";
            }
        }
    };
    
 
   request.open('GET','http://mrajashri3697.imad.hasura-app.io/counter',true);
    
    
    
};