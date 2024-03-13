# kingdee-nodejs/k3cloud

## About

- A Node.js SDK for [Kingdee K/3](https://www.ik3cloud.com) ...

## Requirement

- [Node.js](https://nodejs.org/en/download/) 16+

## Dependencies

- [axios](https://github.com/axios/axios)
- [crypto-js](https://github.com/brix/crypto-js)

## Usage

- Install

  ```shell
  $ npm install @kingdee-nodejs/k3cloud
  ```

- Test

  ```js
  const K3CloudApiSdk = require("@kingdee-nodejs/k3cloud");

  // ------ 初始化
  config = {
    auth_type: 3, // 授权类型：1 用户名+密码；2 第三方授权应用ID+应用密钥；3 签名；
    host_url: "http||https://xxxxxxxxxxxxxxxxx/k3cloud/", // 金蝶授权请求地址
    acct_id: "xxxxxxxxxx", // 账户ID
    username: "xxxxxxxxxx", // 用户名（授权类型为1时必须）
    password: "xxxxxxxxxx", // 密码（授权类型为1时必须）
    appid: "xxxxxxxxxx", // 应用ID（授权类型为2或3时必须）
    appsecret: "xxxxxxxxxx", // 应用Secret（授权类型为2或3时必须）
    lcid: 2052, // 账套语系，默认2052
  };
  let client = new K3CloudApiSdk(config);

  // ------ 发起请求 (基础管理->基础资料->物料->单据查询)
  // 准备POST数据
  postData = {
    FormId: "BD_MATERIAL",
    FieldKeys: "FMATERIALID,FNumber,FName",
    FilterString: "FDocumentStatus = 'C'",
    OrderString: "",
    TopRowCount: 0,
    StartRow: 0,
    Limit: 2,
    SubSystemId: "",
  };
  // 一般调用
  client
    .executeBillQuery(postData)
    .then((resp) => {
      console.log("\n>> 一般调用 <<");
      console.log(resp);
    })
    .catch((error) => {
      console.log(error);
    });
  // 或 await 调用
  (async () => {
    let resp = await client.executeBillQuery(postData);
    console.log("\n>> await调用 <<");
    console.log(resp);
  })();
  ```

〜 That is it. 〜
