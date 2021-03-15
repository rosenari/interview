
let _promise1 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve('promise1 complete');
        }, 3000);
    });
}

let _promise2 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve('promise2 complete');
        }, 2000);
    });
}

async function func() {

    try {
        const result1 = await _promise1();
        const result2 = await _promise2();

        return [result1, result2];
    } catch (err) {
        return err;
    }
}

async function main() {
    console.log(await func());
}

main();