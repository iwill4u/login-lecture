"use strict";

const fs = require("fs").promises;

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
        return fs
            .readFile("./src/filedb/users.json")
            .then((data) => {
                return this.#getUsers(data, isAll, fields);
            })
            .catch(console.error);
    }

    // => id에 해당하는 값을 읽어 Return 한다. ( idx 1건 )
    static getUserInfo(id) {
        // const users = this.#users;
        fs.readFile("./src/filedb/users.json")
            .then((data) => {
                return this.#getUserInfo(data, id);
            })
            .catch((err) => console.error(err));
        
        // -----------------------------------------------------------------------------------------
        // --> 변수 메모리를 사용하는 경우
        // -----------------------------------------------------------------------------------------
        // , (err, data) => {
        //     if (err) throw err;
        //     // console.log(JSON.parse(data));
        //     const users = JSON.parse(data);

        //     const idx = users.id.indexOf(id);       // => 인자로 넘어온 id를 찾았을 때의 index
        //     const userKeys = Object.keys(users);    // => key = {id, pw, nm}
        //     const userInfo = userKeys.reduce((newUser, info) => {
        //         newUser[info] = users[info][idx];   // => KeyValue{(id,pw,nm)각각의 idx위치의 값}
        //         return newUser;
        //     }, {});
    
        //     return userInfo;    // => recurd 1건의 값을 return    
        // });
        // -----------------------------------------------------------------------------------------
    }

    static async save(userInfo) {
        // const users = await this.getUsers("id","pw","name");
        const users = await this.getUsers(true);  // --> 모든 컬럼을 읽도록 수정       
        // console.log(users);
        if (users.id.includes(userInfo.id)) {
            throw "이미 존재하는 아이디 입니다";
        } 
        // Data 추가
        users.id.push(userInfo.id);
        users.nm.push(userInfo.nm);
        users.pw.push(userInfo.pw);
        fs.writeFile("./src/filedb/users.json", JSON.stringify(users));

        return {success: true};
    }
}

module.exports = UserStorage;