// services/facturaService.js
const axios = require("axios");

const API_KEY =
  "JDJ5JDEwJHNITDlpZ0ZwMzdyd0RCTzFHVXlUOS5XVnlvaFFjd3ZWcnRBZHBIV0Q5QU5xM1Jqc2lpNlVD";
const SECRET_KEY =
  "JDJ5JDEwJHRXbFROTHNiYzRzTXBkRHNPUVA3WU83Y2hxTHdpZHltOFo5UEdoMXVoakNKWTl5aDQwdTFT";
const BASE_URL = "https://sandbox.factura.com/api";

const makeRequest = async (endpoint, body) => {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, body, {
      headers: {
        "Content-Type": "application/json",
        "f-Api-Key": API_KEY,
        "f-Secret-Key": SECRET_KEY,
        "f-PLUGIN": "9d40959c7fed575bc81c40b3e033eeb8252416ed",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

const sendEmail = async (cfdiUid) => {
  try {
    const response = await axios.get(`${BASE_URL}/v4/cfdi40/${cfdiUid}/email`, {
      headers: {
        "Content-Type": "application/json",
        "f-Api-Key": API_KEY,
        "f-Secret-Key": SECRET_KEY,
        "f-PLUGIN": "9d40959c7fed575bc81c40b3e033eeb8252416ed",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

const cancelCfdi = async (cfdiUid, body) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v4/cfdi40/${cfdiUid}/cancel`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          "f-Api-Key": API_KEY,
          "f-Secret-Key": SECRET_KEY,
          "f-PLUGIN": "9d40959c7fed575bc81c40b3e033eeb8252416ed",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

const createCfdi = async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/v4/cfdi40/create`, body, {
      headers: {
        "Content-Type": "application/json",
        "f-Api-Key": API_KEY,
        "f-Secret-Key": SECRET_KEY,
        "f-PLUGIN": "9d40959c8f7ed5785cb14c0e3b033eeb8252416ed",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

module.exports = {
  makeRequest,
  sendEmail,
  cancelCfdi,
  createCfdi,
};
