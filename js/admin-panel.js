const URL = 'https://easyitselfcheck.herokuapp.com/api/v1/user';
const URL1 = 'https://easyitselfcheck.herokuapp.com/api/v1/user';
let addBtn = document.querySelector('#add-btn');
let saveBtn = document.querySelector('#save-btn');
let editBtn = document.getElementById('edit-btn');

saveBtn.onclick = function(){
	let formElements = document.querySelectorAll('#add-form input');
	let data = {active: true};

	formElements.forEach((item) => {
		data[item.id] = item.value;
	})

	let options = {
		method: "POST",
		headers: {
			"Content-Type": 'application/json'
		},
		body: JSON.stringify(data)
	}

	fetch(URL1, options)
	.then(response => response.json())
	.then(data => getAdmins(data))

}

editBtn.onclick = function(){
	
	let elements = document.querySelectorAll('#edit-form input');
    let data = {
				active: true
			};
	
    elements.forEach((elem) => {
    	data[elem.name] = elem.value;
    })

	console.log("elem:  ", data);

    let options = {
    	method: "PUT",
    	headers:{
    		"Content-Type":"application/json"
    	},
    	body: JSON.stringify(data)

    }

    fetch(`${URL1}/${id}`, options)
    .then(response => response.json())
    .then(data => getAdmins());
}


let editAdmin = () => {

    id = event.target.dataset.id;
	const url = `${URL1}/${id}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
    	document.querySelector('#edit-name').value=data.name;
    	document.querySelector('#edit-pin').value=data.pin;
    	document.querySelector('#edit-phone').value=data.phone;
    	
    });

    
}


let deleteAdmin = () => {
	id = event.target.dataset.id;
	name = event.target.dataset.name;
	phone = event.target.dataset.phone;
	pin = event.target.dataset.pin;
	

	let user = {
		active: false,
		name: name,
		pin: pin,
		phone: phone
	};

	let options = {
		method: "PUT",
		headers:{
    		"Content-Type":"application/json"
    	},
    	body: JSON.stringify(user)

    }

    fetch(`${URL1}/${id}`, options)
    .then(response => response.json())
    .then(data => getAdmins(data));
}


let getAdmins = () =>{
	fetch(URL)
	.then(response => response.json())
	.then(data => showAdmins(data))

}

let showAdmins = (data) => {
	let bodyTable = document.getElementById('body-table');
	let tr = '';
	data.forEach((item) => {
		if(item["active"]){
			tr += ` 
	        <tr>
	            <td>${item.id}</td>
	            <td >${item.name}</td>
				<td>${item.phone}</td>
				<td>${item.pin}</td>
				<td><button data-id='${item.id}' data-name='${item.name}' data-phone='${item.phone}' data-pin='${item.pin}' class='btn btn-danger delete-btn'>Удалить</button></td>
				<td><button class='btn btn-light edit-btn ' data-id='${item.id}' data-bs-toggle="modal" data-bs-target="#edit-modal" >Редактировать</button></td>
			</tr>
		`
		}
	})
	
	bodyTable.innerHTML = tr;

	let deleteBtns = document.querySelectorAll(".delete-btn");
	let editBtns = document.querySelectorAll(".edit-btn");

	deleteBtns.forEach((item) =>{
		item.onclick = deleteAdmin;
	})

	editBtns.forEach((item) => {
		item.onclick = editAdmin;
	})

}

getAdmins();