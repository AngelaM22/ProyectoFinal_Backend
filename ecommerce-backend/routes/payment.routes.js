// routes/culqi.routes.js
const express = require('express');
const router = express.Router();
const Culqi = require('culqi');
const culqi = new Culqi({ privateKey: 'sk_test_UAMOxPX0tgdRfmEX', publicKey: 'pk_test_9j3tnJnCznXfrk34' });

router.post('/pagar', async (req, res) => {
  const { token, total, correo } = req.body;

  try {
    const charge = await culqi.charge.create({
      amount: total,
      currency_code: 'PEN',
      email: correo,
      source_id: token
    });

    res.json({ msg: '✅ ¡Éxito en tu compra!', detalle: charge });
  } catch (error) {
    res.status(400).json({
      msg: '❌ Error en el pago',
      error: error.message || error.user_message
    });
  }
});

module.exports = router;
