const axios = require("axios");
const CryptoJS = require("crypto-js");
const { Buffer } = require("buffer");

class WebApiClient {
  constructor() {}

  cookie = "";
  defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Charset": "utf-8",
    "User-Agent": "Kingdee/Nodejs WebApi SDK (compatible: K3Cloud 7.3+)",
  };

  async execute(url, headers, postData, format) {
    let resp = await axios
      .post(url, postData, {
        headers: { ...this.defaultHeaders, ...headers },
      })
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // console.log(response.headers["set-cookie"]);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    this.cookie = resp.headers["set-cookie"].join(";");
    return format == "string" ? resp.data : JSON.stringify(resp.data);
  }

  buildHeader(service_url, config) {
    let path_url = service_url.replace(/\//g, "%2F");
    let time_stamp = Math.floor(Date.now() / 1000); // 1643627187
    let nonce = time_stamp;
    let arr = config["appid"].split("_");
    let client_id = arr[0];
    let client_sec = this.decodeAppSecret(arr[1]);
    let api_sign =
      "POST\n" +
      path_url +
      "\n\nx-api-nonce:" +
      nonce +
      "\nx-api-timestamp:" +
      time_stamp +
      "\n";
    let app_data =
      config["acct_id"] +
      "," +
      config["username"] +
      "," +
      (config["lcid"] ?? 2052) +
      "," +
      (config["org_num"] ?? 0);
    return {
      "X-Api-Auth-Version": "2.0",
      "X-Api-ClientID": client_id,
      "x-api-timestamp": time_stamp,
      "x-api-nonce": nonce,
      "x-api-signheaders": "x-api-timestamp,x-api-nonce",
      "X-Api-Signature": this.kd_HmacSHA256(api_sign, client_sec),
      "X-Kd-Appkey": config["appid"],
      "X-Kd-Appdata": btoa(app_data),
      "X-Kd-Signature": this.kd_HmacSHA256(
        config["appid"] + app_data,
        config["appsecret"]
      ),
    };
  }

  kd_HmacSHA256(content, sign_key) {
    return btoa(CryptoJS.HmacSHA256(content, sign_key).toString());
  }

  decodeAppSecret(secret) {
    if (secret.length != 32) {
      console.log("sec:" + secret + " is not 32 char");
      return secret;
    }
    // let xor_code = "0054s3974c62343787b09ca7d32e5debce72"; // example from official Python SDK
    let xor_code = "0054f397c6234378b09ca7d3e5debce7"; // example from official Java SDK
    let base64_xor = this.xor_code(secret, xor_code);
    return base64_xor.toString("base64");
  }

  xor_code(string, key) {
    let xor_code = Buffer.from(key, "hex");
    let base64_decode = Buffer.from(string, "base64");
    let base64_xor = Buffer.alloc(base64_decode.length);
    for (let i = 0; i < base64_decode.length; i++) {
      base64_xor[i] = base64_decode[i] ^ xor_code[i];
    }
    return base64_xor;
  }
}

module.exports = WebApiClient;
