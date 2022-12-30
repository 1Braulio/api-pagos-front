const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');

console.log(inputs);

form.onsubmit = async function (event) {
	event.preventDefault();
	const body = {}
	console.log(inputs);
	inputs.forEach((input) => {
		body[input.name] = input.value;
		console.log(input.name);
		console.log(input.value);
	});


	let response = await fetch('http://127.0.0.1:8000/users/login/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	let data = await response.json();
	localStorage.setItem('tokens', JSON.stringify(data));
	console.log(data);

	if (response.status == 200) {
		let response = await fetch('http://127.0.0.1:8000/users/getuserid/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + data.tokens.access,
			}
		});
		let userID = await response.json();
		console.log(userID);
		localStorage.setItem('userid', JSON.stringify(userID));
		window.location.replace('./index.html');
	} else {
		Swal.fire({
      		text: "Email o contraseña incorrectos",
	      	icon: "error",
	    });
	}
	


}

