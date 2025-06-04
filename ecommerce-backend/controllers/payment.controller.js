const axios = require('axios');

const CULQI_SECRET_KEY = process.env.CULQI_SECRET_KEY;

exports.realizarPago = async (req, res) => {
  const { token, amount, email } = req.body;

  if (!token || !amount || !email) {
    return res.status(400).json({
      success: false,
      message: 'Faltan datos requeridos: token, amount o email',
    });
  }

  try {
    const respuesta = await axios.post(
      'https://api.culqi.com/v2/charges',
      {
        amount: amount, // en céntimos
        currency_code: 'PEN',
        email: email,
        source_id: token,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CULQI_SECRET_KEY}`,
        },
      }
    );

    res.json({
      success: true,
      mensaje: 'Pago realizado correctamente',
      data: respuesta.data,
    });
  } catch (error) {
    const errorCulqi = error.response?.data || {};
    res.status(400).json({
      success: false,
      mensaje: errorCulqi.user_message || 'Error al procesar el pago',
      error: errorCulqi,
    });
  }
};
