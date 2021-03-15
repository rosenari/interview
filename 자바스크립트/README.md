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


#### JS 언어는 싱글스레드인데, 어떻게 비동기를 지원하는가 ?

자바스크립트 엔진은 기본적으로 싱글스레드로 동작한다.
싱글스레드 : Callstack이 하나(동시에 단 하나의 작업만 처리)
자바스크립트는 싱글스레드인데 어떻게 여러 작업을 비동기로 처리가능할까 ?
브라우저는 자바스크립트 엔진만으로 동작하지 않는다.
DOM조작이나, AJAX같은 비동기 이벤트를 위해 Web API를 제공한다.
또한 Web API 호출 후 콜백 함수처리를 위한 이벤트 루프와 이벤트큐 가 존재한다.
(Web API는 자바스크립트 엔진과 독립적이며, 이벤트 루프,큐를 통한 비동기 처리가 가능하다.)

#### 비동기처리과정는 상세하게 어떻게 되나요 ?

Event Loop는 call stack이 비워진 경우 queue에서 작업을 꺼내 call stack에 넣는다.
자바스크립트는 이 Event Loop와 Queue들을 이용하여 비동기 작업을 수행한다.
직접적인 작업은 Web Api에서 처리하고, 처리가 완료되면 요청시 등록했던 콜백함수가 queue에 등록된다.
위처럼 이벤트 루프와 큐는 자바스크립트 엔진이 코드조각을 하나씩 처리할 수 있도록 스케줄하는 동시에 비동기 처리가 가능하도록 한다.

> 이벤트 큐
> 이벤트 큐는 여러 종류가 있으나, 대표적으로 microTask, Task 큐가 있다. stack에서 처리할 작업이 없으면 우선적으로 microTask 큐를 확인한후 callstack에 넣고, microtask가 비었다면 task 큐를 확인한다.

```javascript
console.log("script start");

//setTimeout 콜백함수는 Task 큐에 등록된다.
setTimeout(function(){
    console.log("setTimeout");
},0);

//Promise then의 콜백함수는 microTask 큐에 등록된다.
Promise.resolve().then(function(){
    console.log("promise1");
}).then(function(){
    console.log("promise2");
});

//requestAnimation 콜백함수는 Animation Frames 큐에 등록된다.
requestAnimationFrame(function (){
    console.log("requestAnimationFrame");
})

console.log("script end");

//위 실행순서를 보게 되면
//1. script start 출력
//2. Promise 작업이 스택에 등록되고 WebApi에 Promise 작업 요청
//(callback도 전달, stack에서 Promise작업 제거)
//3. WebApi는 Promise작업이 완료되면 then의 콜백을 microtask 큐에 등록
//4. requestAnimation작업이 stack에 등록, WebApi에 requestAnimation작업 요청
//(callback함수를 전달) stack에서 작업제거
//5. WebAPI는 requestAnimation의 콜백함수를 animation frame에 등록
//6. script end 출력
//7. 스택이 비워지므로 microtask 큐에 등록된 Promise then의 콜백 함수를 stack에 등록
//8. promise 1출력 (그다음 then이 있다면 callback을 microtask queue에 등록)
//9. microstack queue에 있는 콜백함수를 콜스택에 추가하여 실행
//10. promise 2 출력
//11.microstack 작업이 완료되면 requestAnimationFrame호출후 콜백함수를 Animation Frame에 넣는다.
//12. 이후 브라우저는 렌더링 작업을 하여 UI업데이트(리페인트)
//13. stack과 microtask queue가 비어있으므로 task queue에 등록된 콜백 실행
//14. setTimeout 출력
//15. 스택과 큐가 모두 비어있다.
```

> 정리
> - 비동기 작업으로 등록되는 작업은 task,microtask,animationFrame작업으로 구분
> - microtask가 우선순위가 높다.
> - microtask 처리이후 requestAnimationFrame이 호출되고 이후 브라우저 랜더링이 발생

> 의문점
> - microtask와 animation frames는 브라우저 렌더링에 영향을 미치는가 ?
> 아니다. 브라우저 렌더링은 궁극적으로 비동기로 처리되지 않는 모든 것이 영향을 준다.
> 일반적인 렌더링은 위에서 설명한 animation frame과 관련이 없다.
> - 브라우저 종류에 따라 타스크 실행 순서가 다른가요 ?
> 네 그렇습니다.

#### 자바스크립트에서 멀티쓰레드를 사용하는 방법(웹 워커)

- 멀티 쓰레드가 필요한 경우 ?

자바스크립트는 싱글스레드로 동작하기때문에 연산량이 많은 작업을 할 경우, 해당 작업이 끝날때까지 아무작업을 할수가없다.
그러면 작업을 할때동안은 UI클릭 및 DOM업데이트 역시도 동작하지 않기에 원활한 서비스 제공이 어렵습니다.
이러한 문제를 위해 새로운 쓰레드의 워커를 생성할 수 있습니다.

- 웹 워커 

새로운 쓰레드의 워커를 생성해 워커에게 계산을 맡기고 메인 쓰레드는 다른 작업을 수행합니다.
워커가 계산된 결과를 메인쓰레드에게 보내주면 메인 쓰레드는 이벤트를 수신하여 dom 업데이트를 진행하면됩니다.
싱글코어의 컴퓨터의 경우는 워커생성의 의미가 없습니다. CPU 코어가 많을 수록 병렬로 처리할 수 있습니다.
워커를 여러개 써서 멀티쓰레드 처럼 사용할 수 있으나, 워커는 여전히 싱글 쓰레드입니다.

> 워커는 DOM에 직접 접근하지 못하기때문에 메인 쓰레드와의 메시지를 주고 받아 통신합니다.

```html
//메인 쓰레드 코드
<div id="result"></div>
<button id="btn">run</button>
<script>
    document.querySelector('#btn').addEventListener('click',function(){
        let worker = new Worker('./worker.js');
        worker.addEventListener('message',function(e){
            let div = document.createElement('div');
            div.textContent = e.data;
            document.querySelector('#result').appendChild(div);
            worker.terminate();
        });
    });
    worker.postMessage('워커야 일해 !');
</script>
```

```javascript
//워커 쓰레드 코드
function sleep(){
    let start = new Date().getTime();
    while( new Date().getTime() < start+delay );    
}

self.addEventListener('message',function(e){
    console.log(e.data);
    sleep(3000);
    console.log('워커쓰레드 작업 완료');
    self.postMessage('작업완료했어');
});
```

#### 비동기적으로 실행되는 것을 동기적으로 코딩하는 방법

- Promise

Javascript에서는 대부분의 작업들이 비동기로 이루어진다.
`콜백 중첩을 통해서 비동기적인 실행을 동기적으로 바꿀수 있지만`, 프론트엔드의 규모가 커지면서 `코드 복잡도가 높아지는 상황이 발생`한다.
이를 `해결할 방안으로 Promise 패턴`이 등장하였다.
`Promise패턴은 비동기 작업들을 순차적으로 진행하거나 병렬로 진행하는 등의 컨트롤이 수월`해지며, 예외 처리에 대한 구조가 존재해 오류 처리에 대해서도 가시적으로 관리가 가능하다.
Promise 패턴은 ES6 스펙에 정식 포함되었다.

- Promise의 선언부

Promise의 상태는 다음과 같다. 

pending : 아직 약속을 수행중인 상태(fulfilled or reject되기 전)

fulfilled : 약속이 지켜진 상태

rejected : 약속이 못지켜진 상태

settled : 약속이 지켜졌든 안지켜졌뜬 결론이 난 상태

```javascript
var _promise = function(params){
    return new Promise(function(resolve,reject) {
        setTimeout(function(){
            if(params){
                resolve("해결완료");
            }else{
                reject(Error("실패"));
            }
        },3000);
    });
}
```

> 위의 선언부는 Promise 객체를 리턴하도록 함수로 감싸고 있다.

> new Promise로 Promise 객체가 생성되는 직후부터 resolve,reject 호출되기전까지의 순간을
> pending 상태라 한다.

> 이후 `비동기 작업을 마친뒤 약속대로 잘 줄 수 있다면 resolve함수 호출`, `실패했다면 reject함수를 호출`하는 것이 Promise의 주요개념이다.

- Promise 실행부

```javascript
_promise(true)
.then(function(text){
    //성공시
    console.log(text);
},function(error){
    //실패시
    console.error(error);
})
```

> _promise 호출시 Promise 객체가 리턴되며 해당 객체에는 비동기 작업이 완료 되었을때 호출하는 then이라는 API가 존재합니다.

> then API는 첫번째 파라미터에 성공시 호출함수를 두번째 파라미터에 실패시 호출함수를 선언하면 Promise의 상태에 따라 수행한다.(resolve,reject함수가 바로 then 파라미터로 받은 함수들과 동일하다)

- Promise 에러처리

만약 체이닝형태로 연결된 상태에서 비동기 작업이 중간에 에러가 나면 catch Api를 사용한다.
then.(null,function(){})을 메서드 형태로 바꾼거라고 보면된다.

```javascript
asyncThing1()
    .then(function() { return asyncThing2();})
    .then(function() { return asyncThing3();})
    .catch(function(err){ return asyncRecovery1()})
    .then(function() { return asyncThing4();},function(err) { return asyncRecovery2();})
    .catch(function(err) { console.log("Don't worry about it");})
    .then(function() { console.log("All done");});
```

- Promise.all - 여러 프로미스가 모두 완료될때 실행

```javascript
let promise1 = new Promise(function(resolve,reject){
    setTimeout(function(){
        console.log("promise1");
        resolve("1");
    },3000);
});

let promise2 = new Promise(function(resolve,reject){
    setTimeout(function(){
        console.log("promise2");
        resolve("2");
    },2000);
});

//프로미스 객체를 배열로 넘겨야한다.
Promise.all([promise1,promise2]).then(function(values){
    console.log(values);
})
```