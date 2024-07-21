const axios = require("axios");

const API_KEY =
  "JDJ5JDEwJHNITDlpZ0ZwMzdyd0RCTzFHVXlUOS5XVnlvaFFjd3ZWcnRBZHBIV0Q5QU5xM1Jqc2lpNlVD";
const SECRET_KEY =
  "JDJ5JDEwJHRXbFROTHNiYzRzTXBkRHNPUVA3WU83Y2hxTHdpZHltOFo5UEdoMXVoakNKWTl5aDQwdTFT";
const BASE_URL = "https://sandbox.factura.com/api";
const PLUGIN_KEY = "9d40959c7fed575bc81c40b3e033eeb8252416ed";

const request = async (method, endpoint, body = null) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
        "f-Api-Key": API_KEY,
        "f-Secret-Key": SECRET_KEY,
        "f-PLUGIN": PLUGIN_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

const makeRequest = (endpoint, body) => request("post", endpoint, body);

const sendEmail = (cfdiUid) => request("get", `/v4/cfdi40/${cfdiUid}/email`);

const cancelCfdi = (cfdiUid, body) =>
  request("post", `/v4/cfdi40/${cfdiUid}/cancel`, body);

const createCfdi = (body) => request("post", "/v4/cfdi40/create", body);

module.exports = {
  makeRequest,
  sendEmail,
  cancelCfdi,
  createCfdi,
};
