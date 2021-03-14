#### 호이스팅(Hoisting)

hoist라는 단어의 사전적 정의는 끌어올리기라는 뜻이다.
자바스크립트에서 var 키워드로 선언된 모든 변수선언은 `호이스트`된다.
`함수 컨텍스트 내에서 선언이 함수의 최상위로 끌어올려지는 것`이다.
단 할당의 경우 호이스트 되지않는다.
함수 바깥에 정의한 경우 전역 컨텍스트의 최상위로 호이스트된다.
`선언문은 항상 자바스크립트 엔진 구동시 가장 최우선으로 해석하므로, 호이스팅 되고, 할당 구문은 런타임 과정에서 이루어지기 때문에 호이스팅 되지않는다.`

```javascript
function getX(){
    //var x; 자바스크립트 실행시 다음처럼 끌어올려진다.
    console.log(x);//undefined
    var x = 1000;
    console.log(x); //1000
}
```

함수 선언문의 형태로 정의한 함수의 유효범위도 전체 코드의 맨 처음부터 시작한다. `함수 호이스팅은 함수를 끌어올리지만 변수는 값을 끌어올리지 않는다.`

```javascript
foo();
function foo(){
    console.log('hello');
}
//함수에 대한 선언을 호이스팅하여 global객체에 등록하기 떄문에 정상출력
//hello 출력
```

```javascript
foo();
var foo = function (){
    console.log('hello');
}
//함수 리터럴을 할당하는 구조는 변수만 호이스팅되며, 함수가 호이스팅 되지않는다.
//타입에러 : foo is not a function
```

#### 클로저(Closure)

클로저란 `두개의 함수로 만들어진 환경으로 이루어진 특별한 객체`이다.
환경이라함은 클로저 생성시 그 범위에 있던 여러 지역 변수들이 포함된 context를 말한다.
클로저를 통해 멤버 은닉화를 구현할 수 있다.

> 렉시컬 스코프란 ?
> - 프로그래밍 언어는 동적 스코프 방식과 렉시컬 스코프 방식 중 하나를 채택하여 함수의 상위 스코프(참조대상 식별자를 찾아낼때 현재 스코프에 없다면 상위스코프에서 찾는다.)를 결정한다. 
> - 렉시컬 스코프는 상위 스코프가 소스코드가 작성된 문맥에서 결정된다. 현대 프로그래밍 대부분 언어는 렉시컬 스코프 규칙을 따른다.

##### 클로저 생성조건 (3개가 모두 만족해야함)

- 내부함수가 외부함수의 반환값으로 사용되는 경우
- 내부함수가 외부함수의 실행환경을 외부스코프 참조로 저장하는 경우
(내부함수가 외부함수안에 속할때)
- 내부함수에서 사용되는 변수 x가 외부함수 변수스코프에 있는 경우

```javascript
function outer(){
   var x = "closure"
   return function(){ 
       //소스레벨에서 리턴되는 함수의 상위스코프는 outer 스코프가 되므로 
       //전역환경에서 해당 함수가 실행되도 상위스코프는 outer이다.
       console.log(x);
   } 
}

var callFunc = outer(); //callFunc을 클로저라 한다.
callFunc();
```

> 결론 : 외부함수 호출이 종료되더라도 상위스코프를 외부함수 스코프로 가지고 있는 구조를 클로저(외부함수에 의해 반환되는 내부함수)라한다. 

#### this

자바스크립트 모든 `함수는 실행될 때마다 this라는 객체가` arguments라는 유사배열 객체와 함께 `함수 내부로 암묵적으로 전달`된다.
`this는 함수가 호출된 상황에 따라 그 모습을 달리`한다.

1. 객체의 메서드를 호출하는 상황

객체의 메서드를 호출할때 this는 메서드를 소유하는 인스턴스를 참조한다. 즉, `해당 메서드를 호출한 객체로 바인딩` 된다.

```javascript
var obj = {
    name: "foo",
    sayName: function(){
        console.log(this),
    }
};
obj.sayName(); //Object {name: "foo", sayName: sayName()}
```

2. 함수 호출상황

함수 호출시 함수 내부에 사용된 this는 전역객체에 바인딩 된다.

```javascript
var value = 100;
var obj = {
    value: 1,
    func1: function() {
        console.log(this.value); //1
        var func2 = function(){
            console.log(this.value);//100
        }
        func2();
    }; 
};

obj.func1();
```

3. 생성자 함수를 통해 객체를 생성하는 상황

`new 키워드를 통해 생성자 함수를 호출하는 경우에는 this가 객체 자신`이 된다.
내부적으로 보면 생성자 함수 호출시 일반 빈 객체가 생성되고, this가 바인딩된다. `해당 객체는 함수를 통해 생성된 객체이며, 자신의 부모인 프로토타입 객체와 연결`되어있다.
return이 명시되지 않은경우 this가 리턴된다.

```javascript
var Person = function(name) {
    console.log(this);
    this.name = name;
}

var foo = new Person('foo'); //Person
console.log(foo.name); //foo
```

4. apply call bind를 통한 호출상황

여러 상황에 의존하지 않고 this를 자바스크립트 코드로 주입 설정하는 방법이다.
bind는 선언시 call,apply는 호출시 this를 설정한다.

- bind
```javascript
var value = 100;
var obj = {
    value:1,
    func1: function() {
        console.log(this.value);
        
        var func2 = function(){
            console.log(this.value);
        }.bind(this);

        func2();
        //원래는 전역객체에 this가 바인딩되나, 
        //bind를 통해 this를 obj로 바인딩 하였다.
    }
}
obj.func1();
//1
//1
```

- call : call은 파라미터를 하나씩 넘겨준다.

```javascript
var value = 100;
var obj = {
    value:1,
    func1: function() {
        console.log(this.value);
        
        var func2 = function(p1,p2){
            console.log(this.value);
            console.log(p1);
            console.log(p2);
        };

        func2.call(this,'param1','param2');
        //원래는 전역객체에 this가 바인딩되나, 
        //call을 통해 호출시 this를 obj로 바인딩 하였다.
    }
}
obj.func1();
```

- apply : apply는 파라미터를 배열의 형태로 넘긴다.

```javascript
var value = 100;
var obj = {
    value:1,
    func1: function() {
        console.log(this.value);
        
        var func2 = function(p1,p2){
            console.log(this.value);
            console.log(p1);
            console.log(p2);
        };

        func2.apply(this,['param1','param2']);
        //원래는 전역객체에 this가 바인딩되나, 
        //apply을 통해 호출시 this를 obj로 바인딩 하였다.
    }
}
obj.func1();
```

#### 자바스크립트 언어의 특징

1. 인터프리터 언어

- 인터프리터 언어란 프로그램을 한줄마다 기계어로 번역하여 실행하는 프로그래밍 언어입니다. (한줄한줄 번역하면서 실행하기때문에 컴파일언어보다 처리속도가 느리다.)
- 최신 웹 브라우저들은 자바스크립트 코드를 컴파일하는 JIT컴파일러가 내장되어 있어 실행속도가 빠르다.

2. 동적 프로토타입 기반 객체지향 언어

- 클래스 기반 객체지향언어입니다.
- 자바스크립트는 프로토타입을 상속하는 프로토타입 기반 객체지향언어입니다.
- 객체 생성후에도 프로퍼티와 메서드를 동적으로 추가,삭제할 수 있습니다.

3. 동적 타입언어

- 자바스크립트에는 변수 타입이 없으며, 실행 중 변수에 저장되는 데이터타입이 동적으로 바뀔 수 있습니다.

4. 함수가 일급객체

- 자바스크립트에서 함수는 일급객체입니다.
- 이 특성을 활용해 고차함수 구현이 가능하여, 함수형 프로그래밍(함수들의 조합으로 구현해 나가는 프로그래밍)이 가능합니다.

> 일급객체란 다음 조건을 만족하는 것을 말한다.
> - 객체를 변수에 담을 수 있다.
> - 객체를 인자로 전달 할 수 있다.
> - 반환 값으로 전달 할 수 있다.

> 고차함수란 ?
> - 함수를 리턴하는 함수를 고차함수라 합니다.
> - 1차 고차함수란 함수를 리턴하는 함수
> - 2차 고차함수란 함수를 리턴하는 함수를 리턴하는 함수

5. 싱글 스레드 언어

- 싱글스레드는 말귿로 한번에 하나의 작업만 수행할 수 있습니다.


#### 자바스크립트 싱글스레드에 대한 고찰



