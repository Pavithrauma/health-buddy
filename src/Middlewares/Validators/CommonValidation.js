const { body, validationResult, header, check, param } = require("express-validator");
const Responder = require('../../Helpers/Responder');

const handleResult = (req, res, next) => {
        console.log(req.body);
        //console.log("req"+ JSON.stringify(req))
        let hasErrors = validationResult(req);
        if (!hasErrors.isEmpty())
                return Responder.sendFailure(res, hasErrors.errors[0].msg, 422);
        next();
}

function CommonValidation() {

        // this.checkNumber = (field, forMessage) =>
        //         body(field).trim().notEmpty().withMessage('Please Enter Your ' + forMessage)
        //                 .isNumeric().withMessage('Numbers Only Allowed')

        // this.checkBool = (field, forMessage) =>
        //         body(field).trim().notEmpty().withMessage('Please Select ' + forMessage)
        //                 .isIn([true, false]).withMessage(field + ' must be true | false Boolean Value' )

        // this.checkEnumVal = (field, forMessage, arr) =>
        //         body(field).trim().notEmpty().withMessage('Please Select ' + forMessage)
        //                 .isIn(arr).withMessage('Please Select Valid ' + forMessage )

        this.checkEmail = (field, forMessage) =>
        body(field).trim().notEmpty().withMessage('Please enter your ' + forMessage).bail()
            .isEmail().withMessage('Please enter valid ' + forMessage)
            .normalizeEmail({gmail_remove_dots: false})
            .escape();

        this.checkEmailOptional = (field, forMessage) =>
        body(field).trim().optional().notEmpty().withMessage('Please enter your ' + forMessage).bail()
            .isEmail().withMessage('Please enter valid ' + forMessage)
            .normalizeEmail({gmail_remove_dots: false})
            .escape();

        this.checkPhone = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage('Please enter your ' + forMessage).bail()
                .isNumeric().withMessage('Please enter valid ' + forMessage).bail()
                .matches(/^[0-9]+$/).withMessage('Please enter valid ' + forMessage).bail()
                .isLength({ min: 7, max: 15 }).withMessage('Please enter valid ' + forMessage).bail()
                .isMobilePhone().withMessage('Please enter valid ' + forMessage);

        this.checkPhoneOptional = (field, forMessage) =>
                body(field).trim().optional().notEmpty().withMessage('Please enter your ' + forMessage).bail()
                .isNumeric().withMessage('Please enter valid ' + forMessage).bail()
                .matches(/^[0-9]+$/).withMessage('Please enter valid ' + forMessage).bail()
                .isLength({ min: 7, max: 15 }).withMessage('Please enter valid ' + forMessage).bail()
                .isMobilePhone().withMessage('Please enter valid ' + forMessage);

        this.checkPassword = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage('Please enter your ' + forMessage).bail()
                .isLength({ min: 8 }).withMessage('Please enter 8 character ' + forMessage);

         this.checkName = (field, forMessage) =>
                 body(field).trim().notEmpty().withMessage('Please enter ' + forMessage).bail()
                 .isString().withMessage('Please enter valid ' + forMessage).bail()
                 .isLength({ max: 30 }).withMessage('Name must be less than 30 character ' + forMessage).bail()
                 .matches(/^[A-Za-z .]+$/).withMessage('Please enter valid ' + forMessage);

        this.checkNameOptional = (field, forMessage) =>
                body(field).trim().optional().notEmpty().withMessage('Please enter ' + forMessage).bail()
                .isString().withMessage('Please enter valid ' + forMessage).bail()
                .isLength({ min: 1, max: 50 }).withMessage('Please enter valid ' + forMessage);

        this.checkOtp = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage('Please enter your ' + forMessage)
                .isNumeric().withMessage('Numbers only allowed')
                .isLength({ min: 6, max: 6 }).withMessage('Invalid OTP');

        this.checkToken = (field, forMessage) =>
                header(field).trim().notEmpty().withMessage(forMessage + ' is missing').bail()
                .isJWT().withMessage('Invalid Authorization token');

        this.checkExist = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage(forMessage + ' is missing');

        this.checkIsIn = (field, values, forMessage) =>
                check(field).trim().notEmpty().withMessage(forMessage + ' field is missing').bail()
                .isIn(values).withMessage('Invalid data received');

        this.checkUniqueCode = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage(forMessage + ' is missing').bail()
                .isString().withMessage('Invalid ' + forMessage).bail()
                .matches(/^([A-Z0-9]){26}$/).withMessage('Invalid ' + forMessage)
                .isLength({ min: 26, max: 26 }).withMessage('Invalid ' + forMessage);

        //Merchant Validation
        this.checkGstNo = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage(forMessage + ' is empty').bail()
                .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).withMessage(forMessage + ' is invalid');
        
        this.checkAccountNumber = (field, forMessage) =>
                        body(field).trim().notEmpty().withMessage('Please Enter Your ' + forMessage)
                        .isNumeric().withMessage('Please Enter Valid' + forMessage)

        this.checkIfscCode = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage(forMessage + ' is empty').bail()
                .matches(/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/).withMessage(forMessage + ' is invalid');

        //Merchant Validation
        this.checkGstNoOptional = (field, forMessage) =>
                check(field).trim().optional().notEmpty().withMessage(forMessage + ' is empty').bail()
                .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).withMessage(forMessage + ' is invalid');
        
        this.checkAadharNo = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage(forMessage + ' is empty').bail()
                .matches(/^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/).withMessage(forMessage + ' is invalid');
        
        this.checkAadharNoOptional = (field, forMessage) =>
                check(field).trim().optional().notEmpty().withMessage(forMessage + ' is empty').bail()
                .matches(/^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/).withMessage(forMessage + ' is invalid');

        this.checkPanNo = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage(forMessage + ' is empty').bail()
                .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).withMessage(forMessage + ' is invalid');

        this.checkPanNoOptional = (field, forMessage) =>
                check(field).trim().optional().notEmpty().withMessage(forMessage + ' is empty').bail()
                .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).withMessage(forMessage + ' is invalid');

        this.checkPincode = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage(forMessage + ' is empty').bail()
                .matches(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/).withMessage(forMessage + ' is invalid');

        this.checkPincodeOptional = (field, forMessage) =>
                check(field).trim().optional().notEmpty().withMessage(forMessage + ' is empty').bail()
                .matches(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/).withMessage(forMessage + ' is invalid');

        this.checkCountryCode = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage('Please enter ' + forMessage).bail()
                .matches(/(\+\d{1,3})/).withMessage('Please enter valid ' + forMessage);

        // Network validation
        this.checkNetworkId = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage(forMessage + ' is empty').bail()
                .matches(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi).withMessage(forMessage + ' is invalid');

        this.checkNetworkName = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage('Please enter the ' + forMessage).bail()
                .matches(/^[A-Za-z0-9\.\-\_\s]+$/).withMessage(forMessage + ' is allowed only letters, numbers, hyphens (-), underscores (_) and dot (.)').bail()
                .isLength({ min: 3, max: 50 }).withMessage(forMessage + ' must be within 3 to 50 characters');

        this.checkBlockChain = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage('Please select the ' + forMessage);

        this.checkChainId = (field, forMessage) =>
                body(field)
                .trim().notEmpty().withMessage(forMessage + ' should not be empty').bail()
                .isNumeric().withMessage(forMessage + ' should be numbers').bail()
                .isLength({ min: 1, max: 15 }).withMessage(forMessage + ' length must be within 1 to 15 characters').bail();

        this.checkCurrencySymbol = (field, forMessage) =>
                body(field)
                .trim().notEmpty().withMessage(forMessage + ' should not be empty').bail()
                .matches(/^[A-Za-z0-9\.\-\_\s]+$/).withMessage(forMessage + ' is allowed only letters, numbers, hyphens (-), underscores (_) and dot (.)').bail()
                .isLength({ min: 1, max: 15 }).withMessage(forMessage + ' length must be within 1 to 10 characters').bail();

        this.checkExplorerUrl = (field, forMessage) =>
                body(field).optional({ checkFalsy: true })
                .trim().isURL().withMessage(forMessage + ' should be valid');

        this.checkUrl = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage(forMessage + ' should not be empty').bail()
                .isURL().withMessage(forMessage + ' should be valid');

        this.searchNetworkName = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage(forMessage + ' should not be empty')
                .escape();
        // issues validation
        this.checkIssueName = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage(forMessage + ' should not be empty').bail()
                .isLength({ min: 10, max: 255 }).withMessage(forMessage + ' must be within 10 to 255 characters')
                .escape();

        this.checkMongoId = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage(forMessage + ' is missing').bail()
                .isMongoId().withMessage('Invalid ' + forMessage + ' received');

        // this.checkCusId = (field, forMessage) =>
        //         body(field).trim().notEmpty().withMessage(forMessage+" should not be empty").bail()
        //                 .matches( /^[A-Z0-9\s]+$/ ).withMessage("Invalid "+forMessage).bail()
        //                 .isLength( { min: 26, max: 26 } ).withMessage("Invalid "+forMessage)

        this.checkDescription = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage(forMessage + ' should not be empty').bail()
                .isLength({ min: 10, max: 255 }).withMessage(forMessage + ' must be within 10 to 255 characters')
                .escape();

        this.checkPin = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage(forMessage + ' should not be empty').bail()
                .isNumeric().withMessage('Numbers only allowed')
                .isLength({ min: 6, max: 6 }).withMessage('Invalid PIN');

        this.checkCoinToken = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage('Please enter the ' + forMessage).bail()
                .isLength({ max: 42, min: 42 }).withMessage(forMessage + ' should Be 42 hexadecimal characters')
                .matches(/^(0x)?[0-9a-f]{40}$/).withMessage('Invalid ' + forMessage);

        this.checkDecimal = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage('Please enter the ' + forMessage).bail()
                .isDecimal().withMessage('Invalid decimal value');

        this.checkIp = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage('Please enter ' + forMessage)
                .isIP().withMessage('Enter valid ' + forMessage);

        this.checkAmount = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage('Please enter ' + forMessage)
                .matches(/^[0-9\.]+$/).withMessage('Numbers only allowed');

        this.checkRoleCode = (field, forMessage) =>
        check(field).trim().notEmpty().withMessage('Please enter ' + forMessage)
            .matches(/^[A-Z0-9]+$/).withMessage('Only alphabets and numbers are allowed')
            .isLength({ min: 8, max: 16 }).withMessage(forMessage + ' min be 8 or max 16 characters');

        this.checkRoleName = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage('Please enter ' + forMessage).bail()
                .matches(/^[A-Z\-\_]+$/).withMessage('Only uppercase, underscore and hyphens are allowed').bail()
                .isLength({ min: 3, max: 20 }).withMessage(forMessage + ' must be 3 to 20 characters');

        this.checkCreatedBy = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage('Please enter ' + forMessage).bail()
                .matches(/^[A-Za-z\-\_]+$/).withMessage('Please enter valid ' + forMessage).bail()
                .isLength({ min: 3, max: 20 }).withMessage(forMessage + ' must be 3 to 20 characters');


        this.checkBool = (field, forMessage) =>
                        body(field).trim().notEmpty().withMessage('Please Select ' + forMessage)
                                .isIn([true, false]).withMessage(field + ' must be true | false Boolean Value' )

        this.checkEnumVal = (field, forMessage, arr) =>
                        body(field).trim().notEmpty().withMessage('Please Select ' + forMessage)
                                .isIn(arr).withMessage('Please Select Valid ' + forMessage )

        this.checkNumber = (field, forMessage) =>
                        body(field).trim().notEmpty().withMessage('Please Enter Your ' + forMessage)
                                .isNumeric().withMessage('Numbers Only Allowed')

        this.checkIpAddress = (field, forMessage) =>
                check(field).trim().notEmpty().withMessage('Please enter ' + forMessage).bail()
                .isIP().withMessage('Please enter valid ' + forMessage).bail();

        this.checkIpAddressOptional = (field, forMessage) =>
                check(field).optional().trim().notEmpty().withMessage('Please enter ' + forMessage).bail()
                .isIP().withMessage('Please enter valid ' + forMessage).bail();

        this.checkStatusOptional = (field, forMessage) =>
                body(field).optional().trim().notEmpty().withMessage('Please enter ' + forMessage)
                        .isIn(["active", "in_active"]).withMessage(field + ' must be active | in_active' )

        this.checkId = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage('Please Enter ' + forMessage).bail()
                
        this.checkIdOptional = (field, forMessage) =>
                body(field).trim().optional().notEmpty().withMessage('Please Enter ' + forMessage).bail()


        this.checkVPA = (field, forMessage) => body(field).trim().notEmpty().withMessage('Please Enter ' + forMessage).bail()
        .matches(/^[\w.-]+@[\w.-]+$/).withMessage('Please Enter valid '+forMessage)

        this.checkPrefix = (field, forMessage) =>
                        body(field).trim().notEmpty().withMessage('Please Enter ' + forMessage).bail()
                                .isNumeric().withMessage('Numbers Only Allowed').bail()
                                .isLength({ min: 4, max: 4 }).withMessage(forMessage + ' must be 4 characters');


        this.checkPrefixOptional = (field, forMessage) =>
                body(field).optional().trim().notEmpty().withMessage('Please Enter ' + forMessage).bail()
                        .isNumeric().withMessage('Numbers Only Allowed').bail()
                        .isLength({ min: 4, max: 4 }).withMessage(forMessage + ' must be 4 characters');

        this.checkActiveOptional = (field, forMessage) =>
                body(field).optional().trim().notEmpty().withMessage('Please enter ' + forMessage)
                        .isIn(["active", "deactive"]).withMessage(field + ' must be active | deactive' )

        this.checkActive = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage('Please enter ' + forMessage)
                        .isIn(["active", "deactive"]).withMessage(field + ' must be active | deactive' )

        this.checkModeOptional = (field, forMessage) =>
                body(field).optional().trim().notEmpty().withMessage('Please enter ' + forMessage)
                        .isIn(["live", "test"]).withMessage(field + ' must be test | live' )

                        
        this.isAlphaNumeric = (field, forMessage) =>
                body(field).trim().notEmpty().withMessage('Please enter ' + forMessage)
                .matches(/^([0-9]|[a-z])+([0-9a-z]+)$/i).withMessage('Please enter valid ' + forMessage)

        this.isAlphaOnly = (field, forMessage) => 
                body(field).trim().notEmpty().withMessage('Please enter ' + forMessage)
                .matches(/^[a-zA-Z]+$/i).withMessage('Please enter valid ' + forMessage)

}

module.exports = { Common: new CommonValidation(), handleResult };