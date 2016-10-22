var w=0;
    var x=0;
    var y=0;
    var z=0;

    function first(price){w=price;}
    function second(price){x=price;}
    function third(price){y=price;}
    function fourth(price){z=price;}
    function sum(){
      var total=Number(x)+Number(w)+Number(y)+Number(z);
      document.getElementById("demo").innerHTML="Your Checkout price is:$ "+total;
    }