var _promise = function (params) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (params) {
                resolve(JSON.stringify({ name: "jangsoon" }));
            } else {
                reject(Error("실패"));
            }
        }, 1000);
    });
}

_promise(false)
    .then((data) => JSON.parse(data)) //이부분이
    .then(function (text) { //에러가 난다면 다음 함수가 실행되지 않음.
        console.log(text);
    })
    .catch(function () {
        console.log('에러');
    })

