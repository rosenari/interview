let promise1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        console.log("promise1");
        resolve("1");
    }, 3000);
});

let promise2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        console.log("promise2");
        resolve("2");
    }, 2000);
});
//new 로 객체를 생성할경우 동일한 객체를 계속 사용함으로 마지막 상태가 유지된다.
//실제사용시는 객체를 바로 쓰기보다는 객체를 리턴하는 형태의 함수를 많이 선언한다.

//프로미스 객체를 배열로 넘겨야한다.
Promise.all([promise1, promise2]).then(function (values) {
    console.log(values);
})