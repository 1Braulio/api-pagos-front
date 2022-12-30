const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const select = document.querySelector("select");
const url = 'http://127.0.0.1:8000/api/v2/payments/';
const urlServicios = 'http://127.0.0.1:8000/api/v2/pagos/servicios/';
const tokens = JSON.parse(localStorage.tokens) ?? undefined;
const userid = JSON.parse(localStorage.userid) ?? undefined;
const services = document.querySelector("#services");

console.log(inputs);
console.log(select);

async function servicesSelection() {

	const response = await fetch(urlServicios, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + tokens.tokens.access,
		}
	});

	const servicesData = await response.json();
	servicesData.forEach((service) => {
		services.innerHTML += `<option value="${service.id}">${service.name}</option>`;
	});
}

servicesSelection();

form.onsubmit = async function (event) {
	event.preventDefault();
	console.log(`service id: ${select.value}`);

	const body = {};
	const keyNames = ['amount','expiration_date'];

	inputs.forEach((input) => {
		if (keyNames.includes(input.name)) {
			body[input.name] = input.value;
		}
		console.log(`"${input.name}": ${input.value}`)
	});

	// user_id, payment_date
	let now = new Date();
	console.log(`1: ${now}`);
	let isoTime = now.toISOString();
	console.log(`2: ${isoTime}`);

	body['user_id'] = userid.user_id;
	body['payment_date'] = isoTime;
	let expDate = new Date(body['expiration_date']);
	body['expiration_date'] = expDate.toISOString();
	body['service_id'] = select.value;

	console.log(`pay date: ${body['payment_date']}`);
	console.log(`exp date: ${body['expiration_date']}`);
	console.log(body);
	try {
		let postResponse = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + tokens.tokens.access,
			},
			body: JSON.stringify(body),
		});
		if (postResponse.status == 201) {
			Swal.fire({
				text: 'Pago creado',
				icon: 'success',
			});
		} else {
			Swal.fire({
				text: 'Ocurrió un error',
				icon: 'error',
			});
		}
		
	} catch (error) {
		Swal.fire({
			text: error,
			icon: 'error',
		});
	}

}