document.addEventListener("DOMContentLoaded", () => {
  const totalSpan = document.getElementById("total");
  const total = localStorage.getItem("totalCarrito");

  if (total) {
    totalSpan.textContent = `S/${total}`;
  } else {
    totalSpan.textContent = "S/0.00";
  }
});

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
    amount: 1000, // en céntimos = S/10.00
  });
  Culqi.open();
}

function culqi() {
  if (Culqi.token) {
    const token = Culqi.token.id;
    const email = Culqi.token.email;
    const bin = Culqi.card.bin;

    validarIIN(bin); // opcional

    fetch('/api/payments/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 10, // monto en soles
        currency: 'PEN',
        email,
        name: 'Cliente Web',
        card_number: Culqi.card.number,
        cvv: Culqi.card.cvv,
        expiration_month: Culqi.card.exp_month,
        expiration_year: Culqi.card.exp_year
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
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
