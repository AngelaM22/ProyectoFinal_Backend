async function validarIIN(cardNumber) {
  try {
    const response = await fetch('/api/payments/validate-iins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardNumber })
    });

    const data = await response.json();
    console.log('Respuesta del backend IIN:', data);
  } catch (error) {
    console.error('Error en la validación IIN:', error);
  }
}

function procesarPago() {
  Culqi.publicKey = 'pk_test_9j3tnJnCznXfrk34';
  Culqi.settings({
    title: 'Mi Tienda',
    currency: 'PEN',
    description: 'Pago por productos',
    amount: 100,
  });
  Culqi.open();
}

function culqi() {
  if (Culqi.token) {
    const token = Culqi.token.id;
    const email = Culqi.token.email;
    const amount = 100;
    const bin = Culqi.card.bin;

    validarIIN(bin); // Validación opcional

    fetch('/api/payments/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, email, amount }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Pago aprobado') {
          alert('¡Pago realizado con éxito!');
          console.log(data);
        } else {
          alert('Error en el pago: ' + (data.error?.user_message || data.message));
        }
      })
      .catch(error => {
        alert('Error en el servidor.');
        console.error(error);
      });

  } else {
    console.error(Culqi.error.user_message);
    alert(Culqi.error.user_message);
  }
}
