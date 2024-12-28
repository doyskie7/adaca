import { success, fail } from "../utils/response";
import { createUserSchema, getSingleUserSchema } from "../validation/user-schema";
import ERROR_MESSAGES from "../utils/error-messages";
import UserModel from "../models/user-model";
import { raw } from "body-parser";

class UserController {
    constructor() {}

    async getUserList(req, res) {
        try {
            let result = await UserModel.findAll({ raw: true });
            return success(req, res, result);
        } catch (error) {
            return fail(req, res, error);
        }
    }

    async getUser(req, res) {
        try {
            let params = req.params;
            let validate = await getSingleUserSchema.validate(params);

            if (validate.error) {
                return fail(req, res, {
                    message: validate.error?.details[0]?.message,
                });
            }

            let result = await UserModel.findOne({
                where: {
                    id: params?.id,
                },
                raw: true,
            });

            return success(req, res, result);
        } catch (error) {
            return fail(req, res, error);
        }
    }
   
    async createUser(req, res) {
        try {
            let body = req.body;
            let validate = await createUserSchema.validate(body);

            if (validate.error) {
                return fail(req, res, {
                    message: validate.error?.details[0]?.message,
                });
            }

            let emailExist = await UserModel.findOne({
                where: {
                    email: body?.email,
                },
                raw:true
            });
        
            if (emailExist) {
                return fail(req, res, {
                    message: ERROR_MESSAGES?.EMAIL_EXIST,
                });
            }

            let result = await UserModel.create(body);
            let rawResult = result.get({ plain: true });

            return success(req, res, rawResult);
        } catch (error) {
            return fail(req, res, error);
        }
    }
   
    async updateUser(req, res) {
        try {
            let params = req.params;
            let body = req.body;

            let validateParam = await getSingleUserSchema.validate(params);

            if (validateParam.error) {
                return fail(req, res, {
                    message: validateParam.error?.details[0]?.message,
                });
            }

            let validateBody = await createUserSchema.validate(body);

            if (validateBody.error) {
                return fail(req, res, {
                    message: validateBody.error?.details[0]?.message,
                });
            }

            let result = await UserModel.update(body, {
                where: {
                    id: params.id,
                },
            });
            if (result[0] > 0) {
                return success(req, res, result);
            } else {
                return fail(req, res, {
                    message: ERROR_MESSAGES?.USER_NOT_FOUND,
                });
            }
        } catch (error) {
            return fail(req, res, error);
        }
    }
    
    async deleteUser(req, res) {
        try {
            let params = req.params;
            let validateParam = await getSingleUserSchema.validate(params);

            if (validateParam.error) {
                return fail(req, res, {
                    message: validateParam.error?.details[0]?.message,
                });
            }
            let result = await UserModel.destroy({ where: { id: params.id } });
            if (result > 0) {
                return success(req, res, result);
            } else {
                return fail(req, res, {
                    message: ERROR_MESSAGES?.USER_NOT_FOUND,
                });
            }
        } catch (error) {
            return fail(req, res, error);
        }
    }
}

module.exports = UserController;
