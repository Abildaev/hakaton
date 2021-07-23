let formInputsPart = document.querySelectorAll('.form__inputs');

let data = {};

formInputsPart.forEach(el => {
  let inputs = el.querySelectorAll('.form__input');
  data[el.id] = {};
  inputs.forEach(elem => {
    data[el.id][elem.name] = elem.value;
  });
});

console.log(data);