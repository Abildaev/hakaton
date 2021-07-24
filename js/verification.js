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

  if(userPhoneElem.value) {
    user[userPhoneElem.name] = userPhoneElem.value;
    pinElem.forEach(one => {
      pin += one.value;
    });
    user["pin"] = pin;


    console.log(user);

    let option = {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    };

    fetch('https://easyitselfcheck.herokuapp.com/api/v1/user/auth', option)
    .then(response => response.json())
    .then(data => 
      {
        if(data.success == true) {
          window.location.href = "https://abildaev.github.io/hakaton/indexmain.html";
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


