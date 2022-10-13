const accountService = require("../services/account.service");
const roleService = require("../services/role.service");
const authHelper = require("../../helpers/auth.helper");
const { ROLE } = require("../../constants/role.constant");

const AuthController = {
  registerUser: async (req, res) => {
    try {
      if (!req.body) {
        throw new Error("Invalid Input value");
      }
      const isExistEmail = await accountService.findOne({ email: req.body.email });
      if (isExistEmail) {
        return res.json({ message: "Email đã tồn tại" });
      }
      const role = await roleService.findOne({ name: ROLE.USER });

      req.body.roleId = role._id;
      req.body.password = authHelper.hashedPassword(req.body.password);
      const account = await accountService.createOne({ ...req.body, isActive: true });
      const { password, ...result } = account._doc;
      return res.json({ message: "Successfully", data: result });
    } catch (error) {
      return res.status(400).json({ message: error.message, data: error });
    }
  },

  login: async (req, res) => {
    try {
      const loginResult = await authHelper.login(req, res);
      if (!loginResult) {
        throw new Error("Login failed");
      }

      return res.json({ message: "Successfully", data: loginResult });
    } catch (error) {
      return res.status(403).json({ message: error.message, data: error });
    }
  },
};

module.exports = AuthController;
