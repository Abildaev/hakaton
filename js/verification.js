let loginBtn = document.getElementById('login__btn');

function testJump(x){
  var ml = ~~x.getAttribute('maxlength');
  if(ml && x.value.length >= ml){
      do{
          x = x.nextSibling;
      }
      while(x && !(/number/.test(x.type)));
      if(x && /number/.test(x.type)){
          x.focus();
      }
  }
}



let postUserData = () => {
  let user = {};
  let userPhoneElem =  document.getElementById('phoneNumber');
  let pinElem = document.querySelectorAll('#form__verification-numbers .form__verification-number');
  let pin = "";

  let data = {
    name: "datan"
  }


  if(userPhoneElem.value) {
    user[userPhoneElem.name] = userPhoneElem.value;
    pinElem.forEach(one => {
      pin += one.value;
    });
    user["userPin"] = pin;

    let option = {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    };

    fetch('http://0919a6c89c4a.ngrok.io/api/v1/authentication/', option)
    .then(response => response.json())
    .then(data => 
      {
        if(data.message == true) {
          window.location.href = "http://127.0.0.1:5503/buffets.html";
        }else {
          console.log(data);
        }
      }
      );
    
  }else {
    alert('заполните все поля');
  }
 

};

loginBtn.addEventListener('click', postUserData);


