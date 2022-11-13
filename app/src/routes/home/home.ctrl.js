"use strict";

// const UserStorage = require("../../models/UserStorage");
const User = require("../../models/User");
const UserStorage = require("../../models/UserStorage");

const output = {
    home: (req, res) => {
        res.render("home/index");
    },    
    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    },
}

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        console.log(response);
        return res.json(response);
        /* ------------------------------------------------------------
        const id = req.body.id,
          pw = req.body.pw;

        // const userStorage = new UserStorage();
        // console.log(userStorage.users);

        // console.log(UserStorage.getUsers("id","pw"));
        const users = UserStorage.getUsers("id","pw");

        const response = {};  // 선언 --> {} : Object, [] : Array

        if (users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if (users.pw[idx] === pw) {
                // 1.response 를 이용
                response.success = true;
                return res.json(response);

                // 2.아래의 Logic를 1.response를 이용하는 것으로 수정
                // return res.json({
                //     success: true,
                // });
            }
        }

        response.success = false;
        response.msg = "로그인에 실패하였습니다.";

        return res.json(response);
        ------------------------------------------------------------ */
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        console.log(response);
        return res.json(response);
    },
};


module.exports = {
    output,
    process,
}