"use strict";

const id = document.querySelector("#id"),
      nm = document.querySelector("#nm"),
      pw = document.querySelector("#pw"),
      confirmPw = document.querySelector("#confirm-pw"),
      registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
    if (!id.value) return alert("아이디를 입력하여 주세요.");
    if (!nm.value) return alert("이름을 입력하여 주세요.");
    if (pw.value !== confirmPw.value) {
        return alert("비밀번호가 일치하지 않습니다.");
    }

    const req = {
        id: id.value,
        nm: nm.value,
        pw: pw.value,
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            location.href = "/";
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error('회원가입 등록 중 에러 발생'));
    });
}
