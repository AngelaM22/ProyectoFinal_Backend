// controllers/culqi.controller.js
require('dotenv').config();
const axios = require('axios');

exports.crearCargo = async (req, res) => {
  try {
    const {
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email,
      monto,
    } = req.body;

    // 1. Crear token con los datos de la tarjeta
    const tokenResponse = await axios.post(
      'https://api.culqi.com/v2/tokens',
      {
        card_number,
        cvv,
        expiration_month,
        expiration_year,
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CULQI_PUBLIC_KEY}`,
        },
      }
    );

    const token = tokenResponse.data.id;

    // 2. Crear el cargo con el token
    const chargeResponse = await axios.post(
      'https://api.culqi.com/v2/charges',
      {
        amount: parseInt(monto) * 100, // En céntimos
        currency_code: 'PEN',
        email,
        source_id: token,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CULQI_SECRET_KEY}`,
        },
      }
    );

    res.json({ ok: true, data: chargeResponse.data });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      ok: false,
      message: 'Error al procesar el pago',
      error: error.response?.data || error.message,
    });
  }
};
