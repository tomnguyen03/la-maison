const accountService = require("../services/account.service");
const roleService = require("../services/role.service");
const authHelper = require("../../helpers/auth.helper");
const { ROLE } = require("../../constants/role.constant");
const accountModel = require("../models/account.model");

const AuthController = {
  registerUser: async (req, res) => {
    try {
      if (!req.body) {
        throw new Error("Invalid Input value");
      }
      const isExistEmail = await accountService.findOne({ email: req.body.email });
      if (isExistEmail) {
        return res.status(403).json({ message: "Email đã tồn tại", key: "email" });
      }
      const role = await roleService.findOne({ name: ROLE.USER });

      req.body.roleId = role._id;
      req.body.password = authHelper.hashedPassword(req.body.password);
      await accountService.createOne({ ...req.body, isActive: true });
      const user = await accountModel.findOne({ email: req.body.email }).populate("roleId");
      const token = authHelper.createToken({ ...user });
      const refreshToken = authHelper.createRefreshToken({ ...user });
      let { password, ...other } = user._doc;
      const res_data = { ...other, token, refreshToken };
      return res.json({ message: "Successfully", data: res_data });
    } catch (error) {
      return res.status(400).json({ message: error.message, data: error });
    }
  },

  login: async (req, res) => {
    try {
      const loginResult = await authHelper.login(req, res);
      if (!loginResult) {
        throw new Error("Sai tài khoản hoặc mật khẩu");
      }

      return res.json({ message: "Successfully", data: loginResult });
    } catch (error) {
      return res.status(403).json({ message: error.message, data: error });
    }
  },

  update: async (req, res) => {
    try {
      const body = {
        name: req.body.name,
        phone: req.body.phone,
        avatar: req.body.avatar,
        birthday: req.body.birthday,
        detail_address: req.body.detail_address,
        ward_id: req.body.ward_id,
        district_id: req.body.district_id,
        province_id: req.body.province_id,
      };

      const accountId = req.user._id;

      await accountService.update(accountId, body);
      const dataAfterUpdate = await accountService.findOne({ _id: accountId });
      const { password, ...result } = dataAfterUpdate._doc;

      return res.json({ message: "Successfully", data: result });
    } catch (error) {
      return res.status(400).json({ message: error.message, data: error });
    }
  },

  changePassword: async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await accountService.changePassword(userId, req.body);
      return res.status(200).json({ message: "Successfully", result: user });
    } catch (error) {
      return res.status(400).json({ message: error.message, data: error });
    }
  },
};

module.exports = AuthController;
