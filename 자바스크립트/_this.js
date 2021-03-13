(function () {
    var obj = {
        value: 1,
        func: function () {
            console.log(this.value);
        }
    }
    obj.func();
})();

(function () {
    global.value = 1000;
    function func() {
        console.log(this.value);
    }
    func();
})();

(function () {
    function Person(name) {
        console.log(this);
        this.name = name;
    }
    var person = new Person('foo');
    console.log(person.name);
})();

(function () {
    var obj = {
        value: 1,
        func: function () {
            console.log(this.value);
            var func2 = function () {
                console.log(this.value);
            }.bind(this);
            func2();
        }
    }
    obj.func();
})();