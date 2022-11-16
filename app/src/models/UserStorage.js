"use strict";

const db = require("../config/db");

class UserStorage {

    static #getUserInfo(date, id) {
        const users = JSON.parse(data); 
        const idx = users.id.indexOf(id);       // => 인자로 넘어온 id를 찾았을 때의 index
        const userKeys = Object.keys(users);    // => key = {id, pw, nm}
        const userInfo = userKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];   // => KeyValue{(id,pw,nm)각각의 idx위치의 값}
            return newUser;
        }, {});

        return userInfo;    // => recurd 1건의 값을 return    
    }

    // filedb의 users.json 으로 저장
    // static #users = {     // # : public --> private 로 선언
    //     id: ["dev1","dev2","dev3"],
    //     pw: ["1111","2222","3333"],
    //     nm: ["가가가","나나나","다다다"],
    // };    

    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data);
        if (isAll) return users;      

        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        // console.log(newUsers);            
        return newUsers;
    }

    // => field의 값을 읽어 Return 한다. ( field에 해당하는 N건 Return )
    static getUsers(isAll, ...fields) {        

    }

    // => id에 해당하는 값을 읽어 Return 한다. ( idx 1건 )
    static getUserInfo(id) {
        console.log("getUserInfo(id):" + id);

        db.query("SELECT * FROM users")
            .then(res => {
                const rows = res.rows;

                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                });

                process.exit();                
            })
            .catch(err => {
                console.log(err);
            })

        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users = '?'", [id], (err, data) => {
                if (err) reject(err);
                console.log(data[0]);
                resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {

    }
}

module.exports = UserStorage;