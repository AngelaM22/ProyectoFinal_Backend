const axios = require('axios');

exports.validateIIN = async (req, res) => {
  const { cardNumber } = req.body;

  try {
    const response = await axios.post(
      'https://api.culqi.com/v2/validate-iins',
      { bin: cardNumber.substring(0, 6) }, // Primeros 6 dígitos
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk_test_UAMOxPX0tgdRfmEX', // usa tu llave secreta real de pruebas
        }
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al validar IIN:', error.response?.data || error.message);
    res.status(400).json({ error: error.response?.data || 'Error desconocido' });
  }
};
