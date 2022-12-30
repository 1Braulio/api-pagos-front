const tokens = JSON.parse(localStorage.tokens) ?? undefined;
const userid = JSON.parse(localStorage.userid) ?? undefined;

console.log(tokens);
console.log(userid);

const pagosRealizados = document.querySelector('#pagosRealizados');
const pagosVencidos = document.querySelector('#pagosVencidos');
const url = 'http://127.0.0.1:8000/api/v2/payments/';
const serviciosURL = 'http://127.0.0.1:8000/api/v2/pagos/servicios/';
const expiredPaymentsURL = 'http://127.0.0.1:8000/api/v2/pagos/expired-payments/';

async function getPayments() {
	
	let pagos = [];
	let expiredPayments = [];

	let paymentsResponse = await fetch(url, {
		method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + tokens.tokens.access,
		}
	});
	let paymentData = await paymentsResponse.json();
	console.log(paymentData);
	
	paymentData.results.forEach((result) => {
		console.log(`result user id: ${result.user_id}, userid: ${userid.user_id}, igualdad: ${result.user_id === userid.user_id}`);
		if (result.user_id === userid.user_id) {

			pagos.push(result);
		}

	});

	let serviciosResponse = await fetch (serviciosURL, {
		method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + tokens.tokens.access,
		}
	});

	let serviciosData = await serviciosResponse.json();
	
	console.log(serviciosData);

	let expiredPaymentsResponse = await fetch (expiredPaymentsURL, {
		method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + tokens.tokens.access,
		}
	});

	let expiredPaymentsData = await expiredPaymentsResponse.json();

	console.log(expiredPaymentsData);

	expiredPaymentsData.forEach((result) => {
		console.log(`result user id: ${result.payment_user_id}, userid: ${userid.user_id}, igualdad: ${result.payment_user_id === userid.user_id}`);
		if (result.payment_user_id === userid.user_id) {

			expiredPayments.push(result);
		}

	});

	// render de pagos

	pagosRealizados.innerHTML = '';

	pagos.forEach((pago) => {
		pagosRealizados.innerHTML += generatePayment(pago, serviciosData);
	});

	console.log(pagos);

	pagosVencidos.innerHTML = '';

	expiredPayments.forEach((pago) => {
		pagosVencidos.innerHTML += generateExpiredPayment(pago, serviciosData);
	});

	console.log(pagos);


}

function generatePayment (pago, serviciosData) {

	let service = serviciosData.find((service) => service.id === pago.service_id);

	return `
	  <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${service.name}</h5>
      <small>3 days ago</small>
      </div>
      <p class="mb-1">${pago.payment_date}</p>
      <small>${pago.amount}</small>
	`;
}

function generateExpiredPayment (pagoExpirado, serviciosData) {

	let service = serviciosData.find((service) => service.id === pagoExpirado.service_id);

	return `
	  <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${service.name}</h5>
      <small>3 days ago</small>
      </div>
      <p class="mb-1">${pagoExpirado.payment_date}</p>
      <small>${pagoExpirado.amount}</small>
      <small>${pagoExpirado.penalty_fee_amount}</small>
	`;
}

getPayments();

