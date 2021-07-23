const URL = 'https://easyitselfcheck.herokuapp.com/api/v1/student';
const URL1 ='https://easyitselfcheck.herokuapp.com/api/v1/search_student';
let addBtn = document.querySelector('#add-btn');
let saveBtn = document.querySelector('#save-btn');
let editBtn = document.getElementById('edit-btn');
let searchBtn = document.querySelector('#search-btn');
const urlCourse = 'https://easyitselfcheck.herokuapp.com/api/v1/course';
let id;

addBtn.onclick = function(){
    fetch(urlCourse)
    .then(response => response.json())
    .then(data => showCourse(data))
}

searchBtn.onclick = function(){
	let name = document.querySelector("#s_name");
	let surname = document.querySelector("#s_surname");
	let params;

	if (!name.value && !surname.value){
		alert("Хотя бы одно поле должно быть заполнено");
		return;
	}

	if(name.value && !surname.value){
	     params = `?name=${name.value}`;
    } else if (!name.value && surname.value){
				 params = `?last_name=${surname.value}`;
	} else {
		params = `?last_name=${surname.value}&name=${name.value}`;
	};

	const url = `${URL1}/${params}`;

	fetch(url)
	.then(response => response.json())
	.then(data => showStudent(data))

}


saveBtn.onclick = function(){
	
	let formElements = document.querySelectorAll('#add-form input, #add-form select');
	let data = {
		active: true
	};

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

	fetch(URL, options)
	.then(response => response.json())
	.then(data => getStudent(data))
}

editBtn.onclick = function(){

	let elements = document.querySelectorAll('#edit-form input, #edit-form select');
    let data = {};

    elements.forEach((elem) => {
    	data[elem.name] = elem.value;
    })

    let options = {
    	method: "PUT",
    	headers:{
    		"Content-Type":"application/json"
    	},
    	body: JSON.stringify(data)

    }

    fetch(`${URL}/${id}`, options)
    .then(response => response.json())
    .then(data => getStudent());
}

let showCourse = (data) => {

	let course = document.getElementById('course');
	let option = '';

	data.forEach((item) =>{
		if(item["active"]){
		option += ` <option value="${item.id}">${item.name}</option>`
		}
	})

	course.innerHTML = option;
}



let editStudent = () => {

	fetch(urlCourse)
    .then(response => response.json())
    .then(data => {

    	let getCourse = document.getElementById('edit-course');
    	let option = '';

    	data.forEach((el) => {
			if(el["active"]){
    		option +=
    		 `<option value=${el.id}>${el.id}</option>`;
			}
    	})

    	getCourse.innerHTML=option;
    })

    id = event.target.dataset.id;
	const url = `${URL}/${id}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
		console.log(data);
    	document.querySelector('#edit-last_name').value=data.last_name;
		document.querySelector('#edit-pin').value=data.pin;
    	document.querySelector('#edit-name').value=data.name;
    	document.querySelector('#edit-phone').value=data.phone;
        document.querySelector('#edit-course').value=data.course;
    	
	});    
}


let deleteStudent = () => {
	id = event.target.dataset.id;
	name = event.target.dataset.name;
	lastName = event.target.dataset.lastname;
	course = event.target.dataset.course;
	phone = event.target.dataset.phone;
	pin = event.target.dataset.pin;


	let data = {
		name: name,
		last_name: lastName,
		course: course,
		phone: phone,
		pin: pin,
		active: false

	};

	let options = {
		method: "PUT",
		headers:{
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	}

	fetch(`${URL}/${id}`, options)
	.then(response => response.json())
	.then(data => getStudent(data))
}

let getStudent = () =>{
	fetch(URL)
	.then(response => response.json())
	.then(data => showStudent(data))

}

let showStudent = (data) => {

	let bodyTable = document.getElementById('body-table');
	let tr = '';
	data.forEach((item) => {
		if (item["active"]){
		tr += ` 
	        <tr>
	            <td>${item.id}</td>
				<td>${item.last_name}</td>
				<td>${item.name}</td>
				<td>${item.course}</td>
				<td>${item.phone}</td>
				<td>${item.pin}</td>
				<td><button data-id='${item.id}' data-name='${item.name}' data-lastname='${item.last_name}' data-course='${item.course}'
				data-phone='${item.phone}' data-pin='${item.pin}' class='btn btn-danger delete-btn'>Удалить</button></td>
				<td><button class='btn btn-light edit-btn ' data-id='${item.id}' data-bs-toggle="modal" data-bs-target="#edit-modal" >Редактировать</button></td>
			</tr>		
		`
		}
	})
	
	bodyTable.innerHTML = tr;

	let deleteBtns = document.querySelectorAll(".delete-btn");
	let editBtns = document.querySelectorAll(".edit-btn");

	deleteBtns.forEach((item) =>{
		item.onclick = deleteStudent;
	})

	editBtns.forEach((item) => {
		item.onclick = editStudent;
	})

}

getStudent();