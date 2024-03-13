const ApiAuthTypeConst = require("./consts/ApiAuthTypeConst");
const ApiPathConst = require("./consts/ApiPathConst");
const WebApiClient = require("./core/WebApiClient");

class K3CloudApiSdk {
  webApiClient = null;
  hostUrl = "";
  config = {};

  constructor(config) {
    this.hostUrl = config["host_url"].replace(/\/+$/, "") + "/";
    this.config = config;
    this.webApiClient = new WebApiClient(config);
  }

  // 登录: 用户名+密码
  async loginForPassword() {
    let url = this.hostUrl + ApiPathConst.LOGIN_API;
    let postData = {
      acctid: this.config["acct_id"], // 账户ID
      username: this.config["username"], // 用户名
      password: this.config["password"], // 密码
      lcid: this.config["lcid"] ?? 2052, // 语言
    };
    let resp = await this.webApiClient.execute(url, [], postData, "string");
    return resp;
  }

  // 登录: 第三方授权应用ID+应用密钥
  async loginForSecret() {
    let url = this.hostUrl + ApiPathConst.LOGIN_API_APP_SECRET;
    let postData = {
      acctid: this.config["acct_id"], // 账户ID
      username: this.config["username"], // 用户名
      appid: this.config["appid"], // 应用ID
      appsecret: this.config["appsecret"], // 应用密钥
      lcid: this.config["lcid"] ?? 2052, // 语言
    };
    let resp = await this.webApiClient.execute(url, [], postData, "string");
    return resp;
  }

  // 登录: 签名
  async getHeaders(url) {
    // cookie
    if (this.config["auth_type"] == ApiAuthTypeConst.USER_ID_PASSWORD) {
      if (this.webApiClient.cookie == "") {
        await this.loginForPassword();
      }
    }
    if (this.config["auth_type"] == ApiAuthTypeConst.APP_ID_SECRET) {
      if (this.webApiClient.cookie == "") {
        await this.loginForSecret();
      }
    }
    // headers
    let headers = [];
    if (this.config["auth_type"] == ApiAuthTypeConst.API_SIGNATURE) {
      headers = this.webApiClient.buildHeader(url, this.config);
    } else {
      headers = { cookie: this.webApiClient.cookie };
    }
    return headers;
  }

  // 详情
  async view(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.VIEW_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 单据查询
  async executeBillQuery(data, format = "string") {
    let url = this.hostUrl + ApiPathConst.EXECUTEBILLQUERY_API;
    let postData = {
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 单据查询(json) （官方在2023.9.4新增此接口）
  async billQuery(data, format = "string") {
    let url = this.hostUrl + ApiPathConst.BILLQUERY_API;
    let postData = {
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 元数据查询
  async queryBusinessInfo(data, format = "string") {
    let url = this.hostUrl + ApiPathConst.QUERYBUSINESSINFO_API;
    let postData = {
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 获取数据中心列表
  async getDataCenterList(format = "string") {
    let url = this.hostUrl + ApiPathConst.GETDATACENTERLIST_API;
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      [],
      format
    );
  }

  // 保存
  async save(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.SAVE_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 批量保存
  async batchSave(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.BATCHSAVE_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 审核
  async audit(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.AUDIT_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 反审核
  async unAudit(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.UNAUDIT_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 提交
  async submit(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.SUBMIT_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 操作
  async operation(formId, opNumber, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.EXCUTEOPERATION_API;
    let postData = {
      formid: formId,
      opNumber: opNumber,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 下推
  async push(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.PUSH_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 暂存
  async draft(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.DRAFT_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 删除
  async delete(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.DELETE_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 分配
  async allocate(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.ALLOCATE_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 取消分配
  async cancelAllocate(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.CANCEL_ALLOCATE_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 弹性域保存
  async flexSave(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.FLEXSAVE_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 发送消息
  async sendMsg(data, format = "string") {
    let url = this.hostUrl + ApiPathConst.SENDMSG_API;
    let postData = {
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 分组保存
  async groupSave(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.GROUPSAVE_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 拆单
  async disassembly(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.DISASSEMBLY_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 工作流审批
  async workflowAudit(data, format = "string") {
    let url = this.hostUrl + ApiPathConst.WORKFLOWAUDIT_API;
    let postData = {
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 查询分组信息
  async queryGroupInfo(data, format = "string") {
    let url = this.hostUrl + ApiPathConst.QUERYGROUPINFO_API;
    let postData = {
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 分组删除
  async groupDelete(data, format = "string") {
    let url = this.hostUrl + ApiPathConst.GROUPDELETE_API;
    let postData = {
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }

  // 查询报表数据
  async getSysReportData(formId, data, format = "string") {
    let url = this.hostUrl + ApiPathConst.GET_SYS_REPORT_DATA_API;
    let postData = {
      formid: formId,
      data: data,
    };
    return this.webApiClient.execute(
      url,
      await this.getHeaders(url),
      postData,
      format
    );
  }
}

module.exports = K3CloudApiSdk;
