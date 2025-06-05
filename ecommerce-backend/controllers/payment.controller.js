const axios = require('axios');

exports.procesarPago = async (req, res) => {
  const { token, amount, email } = req.body;

  try {
    const response = await axios.post('https://api.culqi.com/v2/charges', {
      amount: amount,
      currency_code: 'PEN',
      email: email,
      source_id: token,
    }, {
      headers: {
        'Authorization': 'Bearer sk_test_UAMOxPX0tgdRfmEX', 
        'Content-Type': 'application/json',
      }
    });

    res.status(200).json({ message: 'Pago aprobado', data: response.data });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(400).json({ message: 'Pago fallido', error: error.response?.data });
  }
};
