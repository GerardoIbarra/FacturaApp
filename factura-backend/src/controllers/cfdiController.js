// controllers/cfdiController.js
const facturaService = require("../services/facturaService");

const listCfdi = async (req, res) => {
  try {
    const data = await facturaService.makeRequest("/v4/cfdi/list", req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelCfdi = async (req, res) => {
  try {
    const { cfdiUid } = req.params;
    const data = await facturaService.cancelCfdi(cfdiUid, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendEmailCfdi = async (req, res) => {
  try {
    const { cfdiUid } = req.params;
    const data = await facturaService.sendEmail(cfdiUid);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listCfdi,
  cancelCfdi,
  sendEmailCfdi,
};
