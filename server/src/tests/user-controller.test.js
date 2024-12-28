import UserController from "../controllers/user-controller";
const { v4: uuidv4 } = require('uuid');

describe("TESTING USER CRUD", () => {
    const userHandler = new UserController();
    const uniqueEmail = uuidv4();
    const email = `eveguelfreelancers_${uniqueEmail}@gmail.com`
    let crud = [
        {
            action: "create",
            body: {
                full_name: "Eveguel Arocha",
                email: email,
                contact: "0917-975-9841",
            },
            param: {},
        },
        {
            action: "duplicateEmail",
            body: {
                full_name: "Eveguel Arocha",
                email: email,
                contact: "0917-975-9841",
            },
            param: {},
        },
        {
            action: "update",
            body: {
                full_name: "Eveguel Arocha",
                email: 'eveguelfreelancers_jest@gmail.com',
                contact: "0917-975-9841",
            },
            param: {},
        },
        {
            action: "getUser",
            body: {
                full_name: "Eveguel Arocha",
                email: 'eveguelfreelancers_jest@gmail.com',
                contact: "0917-975-9841",
            },
            param: {},
        },
        {
            action: "fetchUser",
            body: {
                full_name: "Eveguel Arocha",
                email: 'eveguelfreelancers_jest@gmail.com',
                contact: "0917-975-9841",
            },
            param: {},
        },
        {
            action: "delete",
            body: {
                full_name: "Eveguel Arocha",
                email: 'eveguelfreelancers_jest@gmail.com',
                contact: "0917-975-9841",
            },
            param: {},
        }
    ];

    const modelMap = {
        create: userHandler.createUser,
        duplicateEmail: userHandler.createUser,
        update: userHandler.updateUser,
        getUser: userHandler.getUser,
        fetchUser: userHandler.getUserList,
        delete: userHandler.deleteUser,
    };

    let userId = 0;
    for (let item of crud) {
        test(`Testing action ${item.action}`, async () => {
            const actionFunction = modelMap[item.action];

            const req = {
                body: item.body,
                params: item.param
            };

            const res = {
                status: jest.fn().mockReturnThis(), 
                send: jest.fn().mockReturnThis()   
            };

            if (actionFunction && item.action.includes('create')) {
                await actionFunction(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.send).toHaveBeenCalledWith({
                    data: expect.objectContaining({
                        full_name: item.body.full_name,
                        email: item.body.email,
                        contact: item.body.contact,
                    }),
                    message: "Success"
                });
                userId = res.send.mock.calls[0][0]?.data?.id
            }else if (actionFunction && item.action.includes('duplicateEmail')) {
                await actionFunction(req, res);
                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.send).toHaveBeenCalledWith({
                    data: expect.objectContaining({}),
                    message: "Email already exist"
                });
            }else if (actionFunction && item.action.includes('update')) {
                await actionFunction({
                    body: item.body,
                    params:{
                        id:userId
                    }
                }, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.send).toHaveBeenCalledWith({
                    data: expect.objectContaining([1]),
                    message: "Success"
                });
            }else if (actionFunction && item.action.includes('getUser')) {
                await actionFunction({
                    body: item.body,
                    params:{
                        id:userId
                    }
                }, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.send).toHaveBeenCalledWith({
                    data: expect.objectContaining({
                        full_name: item.body.full_name,
                        email: item.body.email,
                        contact: item.body.contact,
                    }),
                    message: "Success"
                });
            }else if (actionFunction && item.action.includes('fetchUser')) {
                await actionFunction(req, res);
                expect(res.status).toHaveBeenCalledWith(200);
            }else if (actionFunction && item.action.includes('delete')) {
                await actionFunction({
                    body: item.body,
                    params:{
                        id:userId
                    }
                }, res);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.send).toHaveBeenCalledWith({
                    data: 1,
                    message: "Success"
                });
            }else {
                throw new Error(`No action function found for ${item.action}`);
            }
        });
    }
});
