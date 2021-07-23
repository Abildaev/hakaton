let addBtn = document.getElementById('add__productBtn');
let editBtn = document.getElementById('edit__productBtn');

let id;

let urlAllProduct = "https://easyitselfcheck.herokuapp.com/api/v1/foods";
let urlOneProduct = "https://easyitselfcheck.herokuapp.com/api/v1/food";

let formElems = document.querySelectorAll('#add__product-form .form-control');

let editProductForm = document.querySelectorAll('#edit__product-form .form-control');

let showProducts = (data) => {
  let templateproducts = document.getElementById('buffet-product-template').innerHTML;
  let compiledTemplate = Handlebars.compile(templateproducts);
  let finishTemplate = compiledTemplate(data);
  document.querySelector('#products-root').innerHTML = finishTemplate;
  let editBtns = document.querySelectorAll('.edit__btn');
  let deleteBtns = document.querySelectorAll('.delete__btn');

  editBtns.forEach(btn => {
    btn.addEventListener('click', getOneProduct);
  });

  deleteBtns.forEach(delBtn => {
    delBtn.addEventListener('click', deleteProduct);
  });

};


showDeletedProduct = (data) => {
  let templateproducts = document.getElementById('buffet-deleted-product-template').innerHTML;
  let compiledTemplate = Handlebars.compile(templateproducts);
  let finishTemplate = compiledTemplate(data);
  document.querySelector('#deleled-product-root').innerHTML = finishTemplate;

  let restoreBtns = document.querySelectorAll(".restore__btn");
  let editBtns = document.querySelectorAll(".edit__btn");

  restoreBtns.forEach(el => {
    el.addEventListener('click', restoreAction);
  });

  editBtns.forEach(el => {
    el.addEventListener('click', getOneProduct);
  });
};

let restoreAction = (e) => {
  let id = e.target.dataset.id;
  let dataSet = e.target.dataset;
  let data = {
    ...dataSet
  };
  data["active"] = true;

  let options = {
    method: 'PUT',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  };

  fetch(`${urlOneProduct}/${id}/`, options)
    .then(response => response.json())
    .then(data => getProducts());
};


let deleteProduct = (e) => {
  let id = e.target.dataset.id;
  let dataSet = e.target.dataset;
  let data = {
    ...dataSet
  };
  data["active"] = false;

  let options = {
    method: 'PUT',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  };

  fetch(`${urlOneProduct}/${id}/`, options)
    .then(response => response.json())
    .then(data => getProducts());
};

let getProducts = () => {
  fetch(urlAllProduct)
    .then(response => response.json())
    .then(data => {
      showProducts(data);
      showDeletedProduct(data);   
    });
};

let addProduct = () => {
  let data = {};

  formElems.forEach(el => {
    data[el.name] = el.value;
    data["active"] = true;
  });

  console.log(data);

  let options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };
  fetch(urlAllProduct, options)
    .then(response => {
      if(response.ok === true) {
        alert("товар добавлен");
        getProducts();
      }
    })
};


let getOneProduct = (e) => {
  id = e.target.dataset.id;
  fetch(`${urlOneProduct}/${id}/`)
    .then(response => response.json())
    .then(data => {
      editProductForm.forEach(el => {
        el.value = data[el.name];
      });
    });
};


let editProduct = (e) => {
  let data = {};
  editProductForm.forEach(el => {
    data[el.name] = el.value;
    data["active"] = true;
  });

  let options = {
    method: 'PUT',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  };

  fetch(`${urlOneProduct}/${id}/`, options)
    .then(response => {
        if (response.ok == true) {
          alert("Изменения сохранены");
          getProducts();
        }
        else {
          alert("Что то пошло не так");
        }
      }
    );
};



addBtn.addEventListener("click", addProduct);

editBtn.addEventListener('click', editProduct);

getProducts();