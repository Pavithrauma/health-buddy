const AdminModel = require("../Models/AdminModel");
const Config = require("../Configs/Config");
const Utils = require("../Helpers/Utils");
const CommunityService = require("../Services/CommunityService");
const Responder = require("../Helpers/Responder");
const jwt = require("jsonwebtoken");
const { ResMessage } = require("../Helpers/ResMessage");
const CommunityModel = require("../Models/CommunityModel");

function Controller() {

    this.communityCreate = async (req, res) => {
        console.log("Mariii")
        const {
            communityName,
            email,
            phone,
            password,
            accType,
            role,
            userName,
            userId,
            address
          } = req.body;
    
          const validPass = Utils.checkPasswordPattern(password);
      
          if (validPass !== true) return Responder.sendFailure(res, validPass, 422);
          else if ((await CommunityService.checkUserEmailExists({ email })) === true)
            return Responder.sendFailure(res, ResMessage[19], 422);
        //   else if ((await CommunityService.checkUserPhoneExists(phone?.number)) === true)
        //     return Responder.sendFailure(res, ResMessage[20], 422);
        //   const defaultRole = await RoleModel.findOne({
        //     hasDeleted: { $ne: true },
        //     isDefault: true,
        //     roleType: "superadmin",
        //   });
          const EMAILOTP = await Utils.generateOtp();
          const emailOtp = await EMAILOTP.toString();
      
        //   if (!defaultRole) {
        //     return Responder.sendFailure(res, ResMessage[38], 422);
        //   }
          let communityId = "COMMUNITY_"+Utils.getNanoId();
          let community = {
            communityId: communityId,
            role: {
              roleCode: role.roleCode ?? "",
              roleName: role.roleName ?? "",
            },
            accType : accType,
            communityName: communityName,
            address : address,
            phone: {
              number: phone.number,
              code: phone.code,
            },
            email: email,
            status: "active",
            audit: {
              createdBy: {
                id: userId,
                name : userName,
              },
            },
            verification: {
              emailVerified: false,
              // phoneVerified: false,
              emailOtp: emailOtp,
              // phoneOtp: phoneOtp,
              expiryTime: Utils.getMinutuesHelp(Config?.otpExp),
            },
            credentials: {
              password: await Utils.createHashPwd(password),
              status: true,
              expiryAt: Utils.getDaysHelp(Config?.passExp),
            },
          };
          // console.log("adminnn",admin);return;
          let schema = new CommunityModel(community);
          let result = await schema.save().catch((err) => {
            console.log(err.message,"Marrri");
            return Responder.sendFailure(res, "Enter valid data.", 422);
          });
          if (result) {
                return Responder.sendSuccess( res,"Community Created Successfully",201,{});
            } else {
                  return Responder.sendFailure(res,"Something went wrong",422);
            }

    }

}

module.exports = new Controller();