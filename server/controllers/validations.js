function phonenumber(inputtxt) {
    var phoneno = /^\d{10}$/;
    console.log(inputtxt.length);

    if(inputtxt.length==13 && inputtxt.substring(0,3)=="+91"){
        inputtxt = inputtxt.substring(3, inputtxt.length);
    }

    else if(inputtxt.length==11 && inputtxt.substring(0,1)=="0"){
        inputtxt = inputtxt.substring(1, inputtxt.length);
    }


    if (inputtxt.match(phoneno)) {
        console.log("valid phone no");
        alert("valid phone no");
        return true;
    } else {
        alert("Not a valid Phone Number");
        return false;
    }
}



function validName(inputtext){
    var name= /^[a-zA-Z ]*$/;
    if(inputtext.match(name)){
        console.log("valid");
        alert("valid name");
    }
    else{
        alert("invalid name");

    }

}

function indianPinCode(inputText){
    var pinNo = /^[0-9]{6}$/;
    if(inputText.match(pinNo)){
        console.log("valid pin code");
        alert("valid pin code")
    }
    else{
        alert("invalid pin code");

    }

}
