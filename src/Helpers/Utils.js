let request = require("request");
const multer = require("multer");
const { customAlphabet } = require("nanoid");
const Config = require("../Configs/Config");
let ejs = require("ejs");
let emailClient = require("elasticemail");
let client = emailClient.createClient({
  username: "info@ippopay.com",
  apiKey: "c802e30d-7ea8-4ecf-b993-1ba53959f872",
});
let jwt = require("jsonwebtoken");
const keygen = require("keygenerator");
const Responder = require("../Helpers/Responder");
const { ResMessage } = require("../Helpers/ResMessage");

const nanoid = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  10
);

let bcrypt = require("bcrypt");

const AdminModel = require("../Models/AdminModel");

function Utils() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Destination folder for storing uploaded images
    },
    filename: function (req, file, cb) {
      // Rename file to avoid naming conflicts
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  this.uploadSingleImage = async (req, res, imgName) => {
    const upload = multer({
      storage: storage,
      limits: { fileSize: 1000000 },
    }).single(imgName);
    return await new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        const fileDetails = req.file;
        if (err) reject(false);
        if (!req.file) {
          reject(false);
        }
        if (!req.file || !fileDetails.path || fileDetails === null) {
          reject(false);
        }
        const basePath = `${req.protocol}://${req.get("host")}/${
          fileDetails.path
        }`;
        let formData = { basePath: basePath, ...req.body };
        resolve(formData);
      });
    });
  };

  let self = this;

  this.getRandomNumber = function () {
    return Math.floor(Math.random() * 899999 + 100000);
  };

  this.getRandonNumberPrefix = function () {
    return Math.floor(Math.random() * 8999 + 1000);
  };

  this.createBeneficiaryCode = function () {
    return Math.floor(Math.random() * 8999999999 + 1000000000);
  };

  this.empty = (value) => {
    if (typeof value == "object" && value != null) {
      if (value.length == 0 || Object.keys(value).length === 0) return true;
    }
    somevalue = [
      "",
      "0",
      0,
      0.0,
      null,
      undefined,
      Infinity,
      false,
      NaN,
    ].includes(value);
    if (somevalue) return true;
    else return false;
  };

  // this.createHashPwd = function (input) {
  //     return crypto.createHash('md5').update(input).digest('hex');
  // };

  this.getTransactionId = function () {
    return Math.floor(Math.random() * 8999999999 + 1000000000);
  };

  this.getUserId = function (req) {
    const detail = {
      merchantId: undefined,
      subUserId: undefined,
    };
    if (
      req.headers["x-consumer-username"] &&
      req.headers["x-consumer-username"].split("_").length > 1
    ) {
      detail.merchantId = req.headers["x-consumer-username"].split("_")[1];
      if (
        req.headers["x-consumer-username"].split("_")[0] != "merchant" &&
        req.headers["x-consumer-username"].split("_").length > 2
      ) {
        detail.subUserId = req.headers["x-consumer-username"].split("_")[2];
      }
    }
    return detail;
  };

  this.getmerchantId = function () {
    return Math.floor(Math.random() * 8999999 + 1000000);
  };

  this.generateId = function () {
    return nanoid();
  };

  this.validateCaptcha = function (captcha, callback) {
    let options = {
      url:
        Config.CAPTCHA.URL +
        "?secret=" +
        Config.CAPTCHA.SECRET_KEY +
        "&response=" +
        captcha,
    };
    console.log(options);
    request.post(options, function (err, response, body) {
      body = JSON.parse(body);
      console.log(body);
      callback(body);
    });
  };

  this.getNanoId = function () {
    return nanoid();
  };

  this.loginFraudAttempts = async (res, loggedUser) => {
    loggedUser.loginAttempt.lastAttempt = new Date();
    if (loggedUser.loginAttempt.attemptCount === 5) {
      loggedUser.loginAttempt.attemptCount = 0;
      loggedUser.login.loginProceed = "inactive";
      // loggedUser.status = "inactive";
    } else {
      loggedUser.loginAttempt.attemptCount += 1;
    }

    await loggedUser.save();
    return Responder.sendFailure(res, ResMessage[2], 400, {});
  };

  this.createHash = async function (plainTextPassword) {
    // Hashing user's salt and password with 10 iterations,
    const saltRounds = 10;
    // First method to generate a salt and then create hash
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
    // Second mehtod - Or we can create salt and hash in a single method also
    // return await bcrypt.hash(plainTextPassword, saltRounds);
  };

  // Genarate 4 digit OTP
  this.generateOtp = async () =>
    Config?.common?.sendEmail === "yes"
      ? Math.floor(100000 + Math.random() * 900000)
      : 123456;

  // Try Catch error Handling
  this.getErr = async (err) => {
    console.log(err);

    if (err?.code === 11000)
      return `${Object.keys(err.keyPattern)[0]} already exist`;
    else if (err.errors) return ResMessage[102];
    else if (err.errors === undefined) return ResMessage[102];
  };

  // Genarate JWT Kong token
  this.genarateJwtToken = (payLoad, expiryTime) =>
    jwt.sign(
      { iss: payLoad.key.toString(), exp: expiryTime },
      payLoad.secret.toString()
    );

  this.generateRandomStr = (round) =>
    (Math.random() + 1).toString(36).substring(round).toUpperCase();

  // Minutes
  this.getMinutuesHelp = (minutes) =>
    new Date(new Date().getTime() + minutes * 60000);

  // Days
  this.getDaysHelp = (days) =>
    new Date().setDate(new Date().getDate() + parseInt(days));

  this.checkPassword = async (plain, hashPassword) =>
    await bcrypt.compare(plain, hashPassword);

  // Genarate JWT Local token
  this.genarateLocalJwtToken = (payLoad, expiresIn) =>
    jwt.sign({ payLoad }, Config?.common?.jwtSecretKey, { expiresIn });

  this.getMaskedStringLast = function (input, maskLength, maskCharacter) {
    let unmaskedString = input.slice(0, -maskLength);
    let maskedString = unmaskedString + maskCharacter.repeat(maskLength);
    return maskedString;
  };

  this.getMaskedStringFirst = function (
    input,
    maskLength,
    maskCharacter = "*"
  ) {
    let unmaskedString = input.slice(-maskLength);
    let maskedPart =
      unmaskedString + maskCharacter.repeat(input.length - maskLength);
    return maskedPart;
  };

  this.checkPasswordPattern = (password) => {
    if (password.length < 8) return "Password must be 8 characters";
    else if (!/^(?=.*[0-9]).{1}.*$/.test(password))
      return "Enter at least one number";
    else if (!/^(?=.*[a-z]).{1}.*$/.test(password))
      return "Enter at least one lower case character";
    else if (!/^(?=.*[A-Z]).{1}.*$/.test(password))
      return "res", "Enter at least one upper case character";
    else if (!/^(?=.*\W).{1}.*$/.test(password))
      return "Enter at least one special character";
    else if (!/^(?!.*(.)\1\1.*).*$/.test(password))
      return "Repeating characters not allowed";
    else return true;
  };

  this.sendMail = function (email, otp, merchant, callback) {
    let data = {
      merchant: {
        verification_code: otp,
        name: merchant.name.full,
      },
    };
    ejs.renderFile(
      "./Helpers/emailtemplates/register.html",
      data,
      {},
      function (err, html) {
        console.log(err);
        if (!err && html) {
          let msg = {
            from: "info@ippopay.com",
            from_name: "Ippopay",
            to: email,
            subject: "Verify your account and to set password",
            body_html: html,
          };
          console.log(msg);
          client.mailer.send(msg, function (err, result) {
            console.log("mailer", err, result);
            callback(err, result);
          });
        }
      }
    );
  };

  this.createHashPwd = async (password) => {
    return await bcrypt.hash(password, 10);
  };

  this.compareHashPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };

  this.searchQuery = (searchTerm, searchFields) => {
    let searchQuery = {};

    if (searchTerm) {
      let searchQueryArr = [];
      searchFields.forEach(function (item, index) {
        let searchData = {};
        searchData[item] = { $regex: new RegExp(searchTerm, "i") };
        searchQueryArr.push(searchData);
      });
      searchQuery["$or"] = searchQueryArr;
      return searchQuery;
    } else {
      return searchQuery;
    }
  };

  this.getUser = async (req) => {
    let merchantId = this.getUserId(req)?.merchantId;
    console.log(merchantId, "hsdjkhskdsh");
    let roleUser = await MerchantModel.findOne({
      merchantId,
      hasDeleted: { $ne: true },
    });
    return roleUser;
  };

  this.generatePublicKey = function (mode) {
    return (
      "payoutpk_" +
      mode +
      "_" +
      keygen._({
        length: 12,
      })
    );
  };

  this.generateSecretKey = function (mode) {
    return (
      "payoutsk_" +
      mode +
      "_" +
      keygen._({
        length: 40,
      })
    );
  };

  this.searchQuery = (searchTerm, searchFields) => {
    let searchQuery = {};

    if (searchTerm) {
      let searchQueryArr = [];
      searchFields.forEach(function (item, index) {
        let searchData = {};
        searchData[item] = { $regex: new RegExp(searchTerm, "i") };
        searchQueryArr.push(searchData);
      });
      searchQuery["$or"] = searchQueryArr;
      return searchQuery;
    } else {
      return searchQuery;
    }
  };

  this.createBeneficiarynew = function (data, callback) {
    //console.log(bank_info)
    var beneficiary = {
      beneficiary_id: data?.beneficiary_id,
      merchant_id: data?.merchant_id,
      acc_number: data?.account.number,
      ifsc: data?.account?.ifsc,
      name: data?.bank_info?.account_holder_name,
      bank_id: "923020012476673", //Config.axis?.bankId,
      request_id: self?.createBeneficiaryCode().toString(),
      product: "stack",
      bene_type: "master",
      bank: "axis",
    };
    var options = {
      url: `${Config.bank.axisUrl}/api/v1/internal/axis/ft/beneficiary/add`,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic dGRzRXA3Rzh3S3pYdTFoODprYTRxeVk0OVdqY2VKMWxkcTdXODJIRXBJ",
      },
      body: JSON.stringify(beneficiary),
    };
    console.log("11111", options);
    request.post(options, function (error, response, body) {
      callback(error, response, body);
    });
  };

  this.addBenificiaryUPI = function (data, callback) {
    var postData = {
      merchant_id: data["merchant_id"],
      beneficiary_id: data["upi_id"],
      acc_number: data["vpa"],
      name: data["name"],

      bank_id: "923020012476673", //Config.axis?.bankId,//"923020012476673",
      request_id: "test",
      product: "stack",
      bene_type: "master",
      bank: "axis",
    };
    var options = {
      url: `${Config.bank.axisUrl}/api/v1/internal/axis/ft/beneficiary/add/upi`,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic dGRzRXA3Rzh3S3pYdTFoODprYTRxeVk0OVdqY2VKMWxkcTdXODJIRXBJ",
      },
      body: JSON.stringify(postData),
    };
    console.log("11111", options);
    request.post(options, function (error, response, body) {
      callback(error, response, body);
    });
  };

  this.validateBenificiaryUPI = function (data, callback) {
    var postData = {
      acc_number: data["vpa"],
    };
    var options = {
      url: `${Config.bank.axisUrl}/api/v1/internal/axis/ft/transfer/validate/vpa`,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic dGRzRXA3Rzh3S3pYdTFoODprYTRxeVk0OVdqY2VKMWxkcTdXODJIRXBJ",
      },
      body: JSON.stringify(postData),
    };
    console.log("11111", options);
    request.post(options, function (error, response, body) {
      console.log(error, body);
      callback(error, response, body);
    });
  };

  this.getCommissionReduction = async function (data, callback) {
    try {
      let account = await AccountsModel.findOne({
        merchant_id: data.merchant_id,
      });
      if (account) {
        let balance = account.available_balance;
        let settings = await SettingModel.findOne({ setting_id: "bf1pbQgvX" });
        let commissionObj = settings?.commission[data?.process][data.method];
        //if(commission)
        if (commissionObj && commissionObj.calculation == "normal")
          account.available_balance =
            account.available_balance - commissionObj.commission;
        else if (commissionObj && commissionObj.calculation == "percentage")
          account.available_balance = account.available_balance;
        account
          .save()
          .then((savedAccount) => {
            if (savedAccount)
              //self.createSettlement()
              return callback(null, savedAccount);
            else return callback("Error saving account", null);
          })
          .catch((err) => {
            return callback("Something went wrong", null);
          });
      }
    } catch (e) {
      return callback("Something went wrong", null);
    }
  };

  this.apiRouteCheckListByRole = () => {
    let routelist = [];

    let deepCloned = JSON.parse(JSON.stringify(SubMerchantRouteList));

    routelist = deepCloned.map((e) => {
      let group = e.route_list.map((groupObj) => groupObj.group);
      return group;
    });

    return routelist;
  };

  this.getUserRoleApiRouteCheckListByRole = async (authUser) => {
    let routelist = [];

    let authUserRole = await RoleModel.findOne({
      roleCode: authUser.role?.roleCode,
      hasDeleted: { $ne: true },
    });
    let privileges = authUserRole.privileges;

    let deepCloned = JSON.parse(JSON.stringify(SubMerchantRouteList));

    routelist = deepCloned.filter((e) => {
      let filtered_route_list = e.route_list.filter((groupObj) =>
        privileges.includes(groupObj.group)
      );
      e.route_list = filtered_route_list;
      return e.route_list != false;
    });

    return routelist;
  };

  this.getUserRoleUpdateApiRouteCheckList = async (authUser, role) => {
    let routelist = [];

    routelist = await this.getUserRoleApiRouteCheckListByRole(authUser);

    // console.log(routelist);
    routelist = await routelist.map((e) => {
      e.route_list.map((groupObj) => {
        if (role?.privileges.includes(groupObj.group)) {
          groupObj.is_enabled = true;
          e.is_enabled = true;
        }
      });
      return e;
    });

    routelist = routelist.filter((e) => {
      return e.is_enabled == true;
    });

    routelist = await routelist.map((e) => {
      let enabledRoutes = e.route_list.filter((groupObj) => {
        if (groupObj.is_enabled == true) {
          return true;
        } else {
          return false;
        }
      });
      e.route_list = enabledRoutes;
      return e;
    });

    return routelist;
  };

  this.getBeneficiaryCount = async function (merchantId, callback) {
    let count = await BeneficiaryModel.countDocuments({
      merchant_id: merchantId,
    });
    if (count) callback(count);
    else callback(null);
  };

  this.getBeneficiaryCount2 = async function (merchantId, callback) {
    let count = await MerchantBeneficiaryMapModel.countDocuments({
      merchant_id: merchantId,
    });
    if (count) callback(count);
    else callback(null);
  };

  this.isAlphaNumeric = function (value) {
    var Exp = /^([0-9]|[a-z])+([0-9a-z]+)$/i;
    if (!value) return false;
    if (!value.match(Exp)) return false;
    else return true;
  };

  this.getSetting = async function (merchantId) {
    let merchantSettings = await MerchantSettingModel.findOne({
      "merchant.id": merchantId,
      status: "active",
    });
    let globalSetting = await GlobalSettingModel.findOne({ status: "active" });
    if (merchantSettings) return merchantSettings;
    else if (globalSetting) return globalSetting;
    else return null;
  };

  this.getCommission = async function (commissionObject, amount) {
    let commission = "";
    if (commissionObject?.calculation == "normal")
      return commissionObject?.commission;
    if (commissionObject?.calculation == "percentage" && amount)
      return (commission =
        (commissionObject?.commission / 100) * parseFloat(amount));
  };

  this.balanceAvailabilityCheck = async function (data, merchantId) {
    if (!data?.amount) data["amount"] = "0";
    let account = await AccountModel.findOne({ merchant_id: merchantId });
    console.log(account);
    if (!account || account?.available_balance == null) return false;
    if (
      account?.available_balance &&
      parseFloat(account?.available_balance) <= parseFloat(data?.amount)
    )
      return false;
    if (
      account?.available_balance &&
      parseFloat(account?.available_balance) >= parseFloat(data?.amount)
    )
      return true;
  };

  this.createCommissionTransaction = function (
    beneficiary,
    merchant,
    commission,
    product_type,
    account
  ) {
    let body = {
      beneficiary: beneficiary,
      merchant: merchant,
      commission: commission,
      product_type: product_type,
      trans_type: "DEBIT",
      init_source: "WEB",
    };
    let options = {
      url: `${Config.internal.transaction}/api/payout/transaction/recordCommission`,
      headers: {
        "Content-Type": "application/json",
        "x-consumer-username": `merchant_${merchant.merchantId}`,
      },
      body: JSON.stringify(body),
    };
    console.log("34o", options);
    request.post(options, function (err, resp, body) {
      console.log(123, err, resp, body);
    });
  };

  this.deductAccountBalance = async function (total, commission, merchantId) {
    let account = await AccountModel.findOne({
      merchant_id: merchantId,
      status: "active",
    });
    account["available_balance"] =
      parseFloat(account?.available_balance) -
      (parseFloat(total) + parseFloat(commission));
    account.save().then((updatedAccountBalance) => {
      if (updatedAccountBalance) console.log("Account Balance updated");
      else console.log("Error updating Account Balance");
    });
  };

  this.deductAmountCalculation = function (balance, amount) {
    balance = parseFloat(balance);
    amount = parseFloat(amount);
    if (balance >= 0) {
      return balance - amount;
    } else {
      return -(Math.abs(balance) + amount);
    }
  };

  this.checkValidRole = async (roleCode) => {
    let roleExist = await RoleModel.exists({
      roleCode,
      hasDeleted: { $ne: true },
      status: "active",
    });
    console.log(roleExist, "dsjdksdkjh");
    return roleExist;
  };

  this.sendSms = async (number, otp, merchanId) => {
    let body = {
      message: otp + " is your OTP. Don't share the OTP with anyone -Ippopay",
      phone: "91" + number,
    };
    let options = {
      url: `${Config.propertiesUrl}/api/properties/sms/send`,
      headers: {
        "Content-Type": "application/json",
        "x-consumer-username": `merchant_${merchanId}`,
      },
      body: JSON.stringify(body),
    };
    console.log(options, 567);
    request.post(options, function (err, body) {
      console.log(123, err, body);
    });
  };

  this.sendOTPSms = (otp, merchant, callback) => {
    let body = {
      message: `${otp} is your OTP. Don't share the OTP with anyone. -Ippopay`,
      phone: "91" + merchant?.phone?.number,
    };
    let options = {
      url: `${Config.propertiesUrl}/api/properties/sms/send`,
      headers: {
        "Content-Type": "application/json",
        "x-consumer-username": "merchant_" + merchant.merchantId,
      },
      body: JSON.stringify(body),
    };
    console.log(options, "kkljjljkkjkjlj");

    request.post(options, function (err, resp, body) {
      console.log(body, err, "jhkjhjkh");
      callback(null, body);
    });
  };

  this.checkUserStatus = async (req, res, next) => {
    const user = this.getUserId(req);
    const userId = user?.subUserId ?? user?.merchantId;

    let roleUser = await MerchantModel.findOne({
      merchantId: userId,
      hasDeleted: false,
    });

    if (roleUser?.status != "active")
      return Responder.sendFailure(res, "Unauthorized Access", 401);

    //Check Status for Sub User
    if (roleUser?.accType == "subUser") {
      if (!roleUser?.parentMerchant?.parentMerchantId) {
        //not to allow if SubUser has no Merchant mapping
        return Responder.sendFailure(res, "Unauthorized Access", 401);
      } else {
        let mainUser = await MerchantModel.findOne({
          merchantId: roleUser?.parentMerchant?.parentMerchantId,
          hasDeleted: false,
        });
        if (mainUser?.status != "active") {
          return Responder.sendFailure(res, "Unauthorized Access", 401);
        } else {
          next();
        }
      }
    } else if (roleUser?.accType == "merchant") {
      next();
    }
  };

  this.checkUserStatusIpWhitelisted = async (req, res, next) => {
    let merchant = await this.getUser(req);
    if (merchant?.status != "active") {
      return Responder.sendFailure(res, "Unauthorized Access", 401);
    } else if (
      req.headers["x-forwarded-for"] &&
      req.headers["x-forwarded-for"].split(",").length > 0
    ) {
      var ipAddress = req.headers["x-forwarded-for"].split(",")[0];
      let ipExist = await KeyModel.findOne({
        merchant_id: merchant.merchantId,
        status: "active",
        whitelisted_ips: { $in: [ipAddress] },
      });
      if (!ipExist) {
        return Responder.sendFailure(res, "Ip not whitelisted", 401);
      } else {
        next();
      }
    } else {
      return Responder.sendFailure(res, "Ip not whitelisted", 401);
    }
  };

  this.checkUserAccountStatus = async (req, res, next) => {
    let merchant = await this.getUser(req);
    if (merchant?.status != "active") {
      return Responder.sendFailure(res, "Unauthorized Access", 401);
    } else if (merchant?.accountActivationStatus != "activated") {
      return Responder.sendFailure(res, "Account need to be activated", 403);
    } else {
      next();
    }
  };

  /*  this.checkTransPin = async (req, res, next)=> {
    let merchant = await this.getUser(req);
    let pin = req.query?.mPin;
    if(!pin){
      return Responder.sendFailure(res,"Please enter valid Transaction pin",422,{})
    }else if(!merchant?.transPin){
      return Responder.sendFailure(res,"you not have Transaction pin, Please create your transaction Pin",422,{})
    }else{
      let dd = await this.checkPassword(pin.toString(), merchant?.transPin);
      if(!dd){
        return Responder.sendFailure(res,"Invalid Pin",422,{})
      }else{
        next()
      }
    }   
} */

  this.checkTransPin = async (req, callback) => {
    let merchant = await this.getUser(req);
    let pin = req.body?.mPin;
    if (!pin) {
      callback(false, "Please enter valid Transaction pin");
    } else if (!merchant?.transPin) {
      callback(
        false,
        "you not have Transaction pin, Please create your transaction Pin"
      );
    } else {
      let dd = await this.checkPassword(pin.toString(), merchant?.transPin);
      if (!dd) {
        callback(false, "Invalid Pin");
      } else {
        callback(true, "");
      }
    }
  };

  this.deactivateKey = (merchantId, mode) => {
    KeyModel.updateMany(
      { merchant_id: merchantId, mode: mode },
      { status: "deactive" }
    );
  };

  this.checkBalance = async (merchant_id, amount, callback) => {
    let account = await AccountModel.findOne({ merchant_id: merchant_id });
    if (amount > EncDec.decrypt(account.available_balance))
      return callback(false);
    callback(true);
  };

  this.setPrefix = async function (prefix, merchantId) {
    let savedPrefix = await PrefixModel.findOne({ prefix: prefix });
    if (savedPrefix) self.setPrefix(self.getRandonNumberPrefix().toString());
    else {
      let newPrefix = {};
      newPrefix["merchantId"] = merchantId;
      (newPrefix["status"] = "active"),
        (newPrefix["prefix"] = prefix),
        (newPrefix["prefixId"] = self.getNanoId());
      let newPrefixDoc = new PrefixModel(newPrefix);
      await newPrefixDoc.save();
      return prefix;
    }
  };
}

module.exports = new Utils();
