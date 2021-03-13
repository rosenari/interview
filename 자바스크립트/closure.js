function generateCounter() {
    var count = 1;
    return function () {
        return count++;
    }
}

let counter = generateCounter();
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());