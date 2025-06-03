const Culqi = require('culqi-node');
const Payment = require('../models/payment');
const Order = require('../models/order');

const culqi = new Culqi({
  publicKey: process.env.CULQI_PUBLIC_KEY,
  privateKey: process.env.CULQI_SECRET_KEY,
  pciCompliant: true
});

exports.procesarPago = async (req, res) => {
  const { token, email, monto, ordenId } = req.body;

  try {
    const charge = await culqi.charges.create({
      amount: monto,
      currency_code: 'PEN',
      email,
      source_id: token
    });

    const pago = new Payment({
      usuario: req.user.id,
      orden: ordenId,
      total: monto / 100,
      metodo: 'Culqi'
    });

    await pago.save();

    res.status(200).json({ msg: 'Pago procesado con Culqi', charge });
  } catch (error) {
    res.status(500).json({ msg: 'Error en el pago Culqi', error: error.message });
  }
};
