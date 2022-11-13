"use strict";

const fs = require("fs");

class UserStorage {

    // filedb의 users.json 으로 저장
    // static #users = {     // # : public --> private 로 선언
    //     id: ["dev1","dev2","dev3"],
    //     pw: ["1111","2222","3333"],
    //     nm: ["가가가","나나나","다다다"],
    // };    

    // // => field의 값을 읽어 Return 한다. ( field에 해당하는 N건 Return )
    // static getUsers(...fields) {        
    //     const users = this.#users;
    //     const newUsers = fields.reduce((newUsers, field) => {
    //         if (users.hasOwnProperty(field)) {
    //             newUsers[field] = users[field];
    //         }
    //         return newUsers;
    //     }, {});
    //     // console.log(newUsers);            
    //     return newUsers;
    // }

    // => id에 해당하는 값을 읽어 Return 한다. ( idx 1건 )
    static getUserInfo(id) {
        // const users = this.#users;
        fs.readFile("./src/filedb/users.json", (err, data) => {
            if (err) throw err;
            // console.log(JSON.parse(data));
            const users = JSON.parse(data);

            const idx = users.id.indexOf(id);       // => 인자로 넘어온 id를 찾았을 때의 index
            const userKeys = Object.keys(users);    // => key = {id, pw, nm}
            const userInfo = userKeys.reduce((newUser, info) => {
                newUser[info] = users[info][idx];   // => KeyValue{(id,pw,nm)각각의 idx위치의 값}
                return newUser;
            }, {});
    
            return userInfo;    // => recurd 1건의 값을 return    
        });
    }

    static save(userInfo) {
        // const users = this.#users;
        users.id.push(userInfo.id);
        users.nm.push(userInfo.nm);
        users.pw.push(userInfo.pw);

        console.log(users);

        return {success: true};
    }
}

module.exports = UserStorage;