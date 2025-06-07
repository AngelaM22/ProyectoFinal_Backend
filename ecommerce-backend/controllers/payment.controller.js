// payment.controller.js
const axios = require('axios');
require('dotenv').config();

exports.procesarPago = async (req, res) => {
  const {
    amount,
    currency,
    email,
    name,
    card_number,
    cvv,
    expiration_month,
    expiration_year
  } = req.body;

  try {
    // Crear token en Culqi
    const tokenResponse = await axios.post(
      'https://api.culqi.com/v2/tokens',
      {
        card_number,
        cvv,
        expiration_month,
        expiration_year,
        email
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CULQI_PUBLIC_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const tokenId = tokenResponse.data.id;

    // Crear el cargo
    const chargeResponse = await axios.post(
      'https://api.culqi.com/v2/charges',
      {
        amount: amount * 100,
        currency_code: currency,
        email,
        source_id: tokenId,
        description: `Pago de ${name}`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CULQI_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({ success: true, message: 'Pago aprobado', data: chargeResponse.data });
  } catch (error) {
    console.error('Error al procesar el pago:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Error al procesar el pago',
      error: error.response?.data || error.message
    });
  }
};
