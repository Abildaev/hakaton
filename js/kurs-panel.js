const URL = 'https://easyitselfcheck.herokuapp.com/api/v1/course';
let addBtn = document.querySelector('#add-btn');
let saveBtn = document.querySelector('#save-btn');
let editBtn = document.getElementById('edit-btn');

saveBtn.onclick = function(){
	let formElements = document.querySelectorAll('#add-form input, #add-form select');
	let data = {
		active: true
	};

	formElements.forEach((item) => {
		data[item.id] = item.value;
	})

        console.log(data);

	let options = {
		method: "POST",
		headers: {
			"Content-Type": 'application/json'
		},
		body: JSON.stringify(data)
	}

	fetch(URL, options)
	.then(response => response.json())
	.then(data => getCourse())

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
    .then(data => getCourse(data));
}


let editCourse = () => {

    id = event.target.dataset.id;
	const url = `${URL}/${id}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
    	document.querySelector('#edit-nameCourse').value=data.name;
    	document.querySelector('#edit-nameMentor').value=data.mentor;
    	document.querySelector('#edit-nameAssisstant').value=data.assistant;
    	document.querySelector('#edit-dateStart').value=data.start_date;
    	document.querySelector('#edit-dateEnd').value=data.end_date;
    	document.querySelector('#edit-priceCourse').value=data.price;
    	document.querySelector('#edit-class_room').value=data.class_room;
    	document.querySelector('#edit-time').value=data.time;

    });

    
}


let deleteCourse = () => {
	id = event.target.dataset.id;
	name = event.target.dataset.name;
	mentor = event.target.dataset.mentor;
	assistant = event.target.dataset.assistant;
	startDate = event.target.dataset.startdate;
	endDate = event.target.dataset.enddate;
	price = event.target.dataset.price;
	classRoom  = event.target.dataset.classroom;
	time = event.target.dataset.time;	

	let data = {
		active: false,
		name: name,
		mentor: mentor,
		assistant: assistant,
		start_date: startDate,
		end_date: endDate,
		price: price,
		class_room: classRoom,
		time: time
		};

	let options = {
		method: "PUT",
		headers:{
    		"Content-Type":"application/json"
    	},
    	body: JSON.stringify(data)

	}

	fetch(`${URL}/${id}`, options)
	.then(response => response.json())
	.then(data => getCourse(data))

}

let getCourse = () =>{
	fetch(URL)
	.then(response => response.json())
	.then(data => showCourse(data))

}

let showCourse = (data) => {
	
	let bodyTable = document.getElementById('body-table');
	let tr = '';
	data.forEach((item) => {
		if(item["active"]){
		tr += ` 
	        <tr>
	            <td>${item.id}</td>
	            <td>${item.name}</td>
				<td>${item.mentor}</td>
				<td>${item.assistant}</td>
				<td>${item.start_date}</td>
				<td>${item.end_date}</td>
				<td>${item.price}</td>
				<td>${item.class_room}</td>
				<td>${item.time}</td>
				<td><button data-id='${item.id}' data-name='${item.name}' data-mentor='${item.mentor}' data-assistant='${item.assistant}' data-startdate='${item.start_date}' data-enddate='${item.end_date}' 
				data-price='${item.price}' data-classroom='${item.class_room}' data-time='${item.time}'  class='btn btn-danger delete-btn'>Удалить</button></td>
				<td><button class='btn btn-light edit-btn ' data-id='${item.id}' data-bs-toggle="modal" data-bs-target="#edit-modal" >Редактировать</button></td>
			</tr>
		`
		}
	})
	
	bodyTable.innerHTML = tr;

	let deleteBtns = document.querySelectorAll(".delete-btn");
	let editBtns = document.querySelectorAll(".edit-btn");

	deleteBtns.forEach((item) =>{
		item.onclick = deleteCourse;
	})

	editBtns.forEach((item) => {
		item.onclick = editCourse;
	})

}

getCourse();