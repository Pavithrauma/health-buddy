
const { Common, handleResult } = require("./CommonValidation"); 
 
function Validation() {
  
  this.rawFoods = [
    Common.checkName("name", "Name"),
    Common.checkDescription('description', "Enter Description"),
    handleResult,
    
  ];

  this.category = [
    Common.checkName("name", "Name"),
    Common.checkDescription('description', "Enter Description"),
    handleResult,
    
  ];


  this.users = [
    Common.checkName("fullName", "Full Name"),
    Common.checkEmail("email", "Email Address"),
    Common.checkPhone("phone.number", "Mobile Number"),
    Common.checkCountryCode("phone.code", "Country Code"),
    Common.checkPassword("password", "password"),
    Common.checkName("accType", "Account type"),
    handleResult,
  ];

  this.addAdmin = [
    Common.checkName("fullName", "Full Name"),
    Common.checkEmail("email", "Email Address"),
    Common.checkPhone("phone.number", "Mobile Number"),
    Common.checkCountryCode("phone.code", "Country Code"),
    Common.checkPassword("password", "password"),
    Common.checkName("accType", "Account type"),
    handleResult,
  ];

  this.addFeed = [Common.checkName("description", "Description"), handleResult];

  this.addComment = [
    Common.checkName("comment", "comment"),
    Common.checkId("feedId", "feedId"),
    handleResult,
  ];

  this.addCommunity = [
    Common.checkName("communityName", "Full Name"),
    Common.checkEmail("email", "Email Address"),
    Common.checkPhone("phone.number", "Mobile Number"),
    Common.checkCountryCode("phone.code", "Country Code"),
    Common.checkPassword("password", "password"),
    Common.checkName("accType", "Account type"),
    // Common.checkName("userName", "User Name"),
    // Common.checkId("userId", "User Id"),
    handleResult,
  ];

  this.addSubUser = [
    Common.checkName("fullName", "First Name"),
    Common.checkEmail("email", "Email Address"),
    Common.checkPhone("phone.number", "Mobile Number"),
    Common.checkPassword("password", "password"),
    handleResult,
  ];

  this.updateSubUser = [
    Common.checkName("fullName", "First Name"),
    handleResult,
  ];
  //Admin Login validation
  this.login = [
    Common.checkEmail("email", "email address"),
    Common.checkPassword("password", "password"),
    handleResult,
  ];

  // this.twoFALogin = [
  //   Common.checkToken("authorization", "Login token"),
  //   Common.checkOtp("otp", "OTP"),
  //   Common.checkEmail("email", "email address"),
  //   handleResult,
  // ];

  this.twoFALogin = [
    Common.checkOtp("otp", "OTP"),
    Common.checkEmail("email", "email address"),
    handleResult,
  ];

  this.validEmail = [Common.checkEmail("email", "email address"), handleResult];

  this.validOtp = [
    Common.checkOtp("verification_code", "Email otp"),
    // Common.checkOtp("phone_otp", "Phone otp"),
    Common.checkEmail("email", "email address"),
    handleResult,
  ];

  //   this.validPass = [
  //     Common.checkEmail("email", "email address"),
  //     Common.checkPassword("password", "password"),
  //     Common.checkPassword("confirmPassword", "Confirm password"),
  //     handleResult,
  //   ];

  this.signup = [
    Common.checkName("fullName", "Full name"),
    Common.checkEmail("email", "email address"),
    Common.checkPhone("phone", "phone number"),
    Common.checkPassword("password", "password"),
    // Common.checkExist("recaptchaToken", "Recaptcha token"),
    handleResult,
  ];

  //Verify User Email
  this.verifyEmail = [
    Common.checkEmail("email", "email address"),
    Common.checkOtp("otp", "OTP"),
    Common.checkExist("fcmTokenId", "fcmToken "),
    Common.checkIsIn("platform", ["android", "ios"], "Diveic platform"),
    Common.checkExist("deviceId", "deviceId"),
    handleResult,
  ];

  //User Login validation
  // this.login = [
  //     Common.checkEmail("email", "email address"),
  //     Common.checkPassword("password", "password"),
  //     Common.checkExist("fcmTokenId", "fcmToken "),
  //     Common.checkIsIn("platform",["android" ,"ios"], "Diveic platform"),
  //     Common.checkExist("deviceId", "deviceId"),
  //     Common.checkExist("recaptchaToken", "Recaptcha token"),
  //     handleResult
  // ];

  this.changePassword = [
    Common.checkPassword("currentPassword", "current password"),
    Common.checkPassword("newPassword", "new password"),
    Common.checkPassword("confirmPassword", "confirm password"),
    handleResult,
  ];

  this.resendEmailOtp = [
    Common.checkEmail("email", "email address"),
    handleResult,
  ];

  this.beneficiaryCreate = [
    Common.checkExist("beneficiary_ref", "Beneficiary Reference"),
    Common.checkExist("ifsc", "ifsc"),
    Common.checkNumber("acc_number", "Account Number"),
    Common.checkExist("name.full", "Full Name"),
    handleResult,
  ];

  // this.twoFALogin = [
  //   Common.checkOtp("otp", "OTP"),
  //   Common.checkEmail("email", "email address"),
  //   Common.checkExist("fcmTokenId", "fcmToken "),
  //   Common.checkIsIn("platform", ["android", "ios"], "Diveic platform"),
  //   Common.checkExist("deviceId", "deviceId"),
  //   handleResult,
  // ];

  this.validEmail = [
    Common.checkEmail("email", "email address"),
    // Common.checkExist("recaptchaToken", "Recaptcha token"),
    handleResult,
  ];

  this.forgotOtp = [
    Common.checkEmail("email", "email address"),
    Common.checkOtp("otp", "OTP"),
    handleResult,
  ];

  this.forgetPass = [Common.checkEmail("email", "email address"), handleResult];

  this.validPass = [
    Common.checkEmail("email", "email address"),
    Common.checkPassword("newPassword", "password"),
    Common.checkPassword("confirmPassword", "Confirm password"),
    handleResult,
  ];

  this.verifyUpdate2FA = [
    Common.checkIsIn("status", ["active", "inactive"], "Status"),
    Common.checkOtp("otp", "OTP"),
    handleResult,
  ];

  this.changeMPinStatus = [
    Common.checkIsIn(
      "mpin_status",
      ["active", "inactive", "forgot"],
      "MPin status"
    ),
    handleResult,
  ];

  this.mPinVerifyOtp = [
    Common.checkIsIn("mpin_status", ["active", "inactive"], "MPin status"),
    Common.checkOtp("otp", "OTP"),
    handleResult,
  ];

  this.storeMPin = [Common.checkPin("mpin", "MPin"), handleResult];

  this.createMPin = [
    Common.checkPin("newMpin", "MPin"),
    Common.checkPin("otp", "otp"),
    Common.checkPassword("password", "password"),
    handleResult,
  ];

  this.pinSendOtp = [
    Common.checkPassword("password", "password"),
    handleResult,
  ];
  this.changeMPin = [
    Common.checkPin("oldMpin", "Old MPin"),
    Common.checkPin("newMpin", "new MPin"),
    Common.checkPin("otp", "otp"),
    Common.checkPassword("password", "password"),
    handleResult,
  ];

  this.createWebhook = [
    Common.checkExist("merchant_id", "Merchant id"),
    Common.checkUrl("bankAccountCredit", "Bank Account Credit"),
    Common.checkUrl("virtualAccountCredit", "Virtual Account Credit"),
    Common.checkUrl("connectedBankingVACredit", "Connected Banking VACredit"),
    Common.checkUrl("invalidUPICredit", "invalid UPI Credit"),
    Common.checkUrl("invalidVACredit", "invalid VA Credit"),
    Common.checkUrl("bankAccountVerification", "Bank Account Verification"),
    Common.checkUrl("upiIdVerification", "UpiId Verification"),
    Common.checkUrl("fundTransfer", "Fund Transfer"),
    Common.checkUrl("fundTransferStatus", "Fund Transfer Status"),
    Common.checkUrl("upiCollectionStatus", "Upi Collection Status"),
    Common.checkUrl("lowBalanceAccount", "Low Balance Account"),
    handleResult,
  ];

  //Update user profile details
  this.updateProfile = [
    Common.checkName("fullName", "Full name"),
    Common.checkEmail("email", "email address"),
    Common.checkPhone("phone", "phone number"),
    handleResult,
  ];

  this.transactionType = [
    Common.checkIsIn("type", ["all", "send", "receive"], "Type"),
    handleResult,
  ];

  this.addIpAddress = [
    // Common.checkId("userId", "User ID"),
    Common.checkIpAddress("ipAddress", "IP Address"),
    handleResult,
  ];

  this.addKey = [
    // Common.checkId("userId", "User ID"),
    Common.checkModeOptional("mode", "Mode"),
    handleResult,
  ];

  this.deleteIpAddress = [
    // Common.checkId("userId", "User ID"),
    Common.checkIpAddress("ipAddress", "IP Address"),
    handleResult,
  ];

  this.updateIpAddress = [
    // Common.checkIdOptional("userId", "User ID"),
    Common.checkIpAddressOptional("ipAddress", "IP Address"),
    // Common.checkStatusOptional("status", "Status"),
    handleResult,
  ];
}

module.exports = new Validation();
