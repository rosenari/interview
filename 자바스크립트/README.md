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

- Async/Await

Promise만 쓰는것 보다 휼륭한 비동기 처리방안을 고안하였는데, 그것이 바로 async,await이다.(async/await은 어짜피 Promise를 같이 사용한다..)
function 키워드 앞에 async를 붙여주면되고 function 내부의 promise를 반환하는 비동기 처리함수 앞에 await을 붙여준다.
async/await은 Promise보다 비동기 코드의 겉모습을 더 깔끔하게 한다.

```javascript
async function makeRequest() {
    try{
        const data = await getData();
        if(data && data.needMoreRequest) {
            const moreData = await makeMoreRequest(data);
            console.log(moreData);
            return moreData;
        }else {
            console.lg(data);
            return data;
        }
    } catch(error) {
        console.log('Error while getData',error);
    }
}
```

#### Document Object Model Event

- Event

웹에서는 수많은 Event가 발생하고 흐른다.
1. 브라우저(user agent)로부터 발생하는 이벤트
2. 사용자 행동(interaction)에 의해 발생하는 이벤트
3. DOM의 변화로 인해 발생하는 이벤트

발생하는 이벤트는 그저 브라우저의 Event Interface에 맞춰 구현된 `자바스크립트 객체`일 뿐이다. 

```javascript
element.addEventListener('click',() => {
    console.log('clicked');
});
//사용자가 element를 클릭했을때 콜백함수가 실행된다.

element.click();
//사용자가 클릭하지않았어도 임의로 트리거 될 수 있다.
```

> 사용자가 클릭하던, 실행되건 두가지 방법으로 발생한 Click Event는 Event interface기반으로 구현된 type이 click인 Event객체를 의미한다.

> 해당 객체는 웹문서에 전파될 것이며, 전파되는 객체가 element라는 DOM Element에 도달했을떄 이벤트 핸들러가 실행된다.

- Custom Event

정의된 이벤트 외에도 자신만의 이벤트를 정의하고 만들수도있다.

```javascript
const boom = new CustomEvent('boom');//커스텀 이벤트 생성

element.addEventListener('boom',() => { //boom이벤트 가 도달하면 호출
    console.log('boom !!!')
});

element.dispatchEvent(boom); //boom이벤트 전파
```

- Event Flow

여러 DOM Element로 구성된 하나의 웹 페이지는 window를 최상위로 하는 트리를 생성한다.
이벤트는 각각이 갖게되는 전파경로(propagation path)를 따라 전파된다. 전파경로는 자기자신을 포함하여 그 부모 엘리먼트에 의존한다.

- Propagation path

전파 경로는 자기 자신을 포함하여 그 부모 엘리먼트에 의존한다.
이를 기반으로 경로가 리스트 형식으로 구성되며 이 리스트의 마지막 값은 Event Phase(이벤트 단계)에 따라 달라진다.(단계에 따라 리스트가 각각 구성 ?)
실제로 event가 targeting된 DOM 엘리먼트에 의해 그 리스트가 결정된다.

event handler에 전달되는 event 객체를 통해 currentTarget프로퍼티(이벤트가 등록된 DOM 엘리먼트)에 접근가능하다.
그리고 현재 이벤트가 전파될 DOM 엘리먼트를 event target 이라고 부르며 event handler에서 전달되는 event객체에서 target프로퍼티로 접근가능하다.

- Event Phase(이벤트 단계)

![image](https://user-images.githubusercontent.com/49670068/111157358-241a4c00-85da-11eb-8d1f-9108727c0978.png)

전파경로가 결정되고 나면 이벤트 객체는 Event phase에 따라 전달된다. 브라우저에서는 총 세 단계의 Event phase를 지원하고 있다.

1. Capture phase

이벤트 객체가 `Window`부터 이벤트가 등록된 요소까지 전달되는 단계이다. 전파경로는 window부터 시작되며 마지막은 이벤트가 등록된 요소이다.

2. Target phase

이벤트 객체가 event target에 도달한 단계다.
만약 Event type이 다음 phase를 지원하지 않는 경우 다음 단계는 넘어가고 전파가 종료된다.

3. Bubble phase

이벤트 객체가 capture 단계에서 전달되었던 순서의 반대로 진행되는 단계다. 부모 엘리먼트로 전달이 진행되면서 최종적으로 window까지 이벤트가 전달된다. 이 단계에서 window가 전파경로의 마지막이 되는 것이다.

위 어느 Event phase에서 이벤트 핸들러를 발생시킬 것인가에 따라 그 목적이 달라질 수 있다.

> Not support phase

> 이벤트에 따라 지원하는 phase가 있고, 지원하지 않는 phase가 존재한다.
> 그래서 위 단계별로 이벤트가 진행될때, 지원하지 않는 phase는 건너뛴다.
> 그 외 전파되는 이벤트 객체는 개발자가 강제로 멈추지 않으면 전파경로 그대로 전파된다.

> 예를 들어 focus 이벤트 타입은 버블링 되지 않는다.

```html
<div id="parent">
    <label for="inner">Inner :</label>
    <input
    id="inner"
    type="text"
    onfocus="console.log('inner input focusing')"
    onclick="console.log('inner input clicked')"
    />
</div>
<script>
    const parent = $('#parent');
    parent.on('focus',() => console.log('parent focusing'));
    parent.on('click',() => console.log('parent clicked'));
//#inner 클릭시
//캡처링단계에서는 기본적으로 동작하지않도록 option.capture값이 false이다.
//버블링의 경우 focus 타입은 지원하지 않으므로, 부모에 등록된 focus 이벤트 핸들러가 실행되지않는다.
</script>
```

- 이벤트 핸들러 동작 Event phase 설정

```typescript
interface AddEventListenerOption{
    capture?: boolean,
    once?: boolean,
    passive?: boolean
}

const option = {capture:true}

element.addEventListener(
    'click',
    () => {
        console.log('click!!')
    },
    option
)
//이벤트 핸들러는 캡처링 단계에서 실행된다.
```

> option.capture는 false가 기본값이며, 이벤트 핸들러는 기본적으로 버블링 단계에서 발생하도록 등록된다.

- Cancelable Event (기본동작 막기)

```javascript
aTag.addEventListener('click',e => {
    e.preventDefault();
})
```
> 이벤트 객체의 preventDefault메서드를 호출시
> a 태그를 클릭시 href 속성에 정의한 url로 이동하지 않는다.
> `preventDefault 메서드는` Event 객체의 cancelable property값이 true일때만 호출가능하다. 해당 메서드는 `내부적으로 Event객체의 defaultPrevented값을 true로 바꾸는 데`, 이것은 이벤트가 dispatch될때 기본동작을 할것인지에 대한 속성이다. `defaultPrevented값이 true일때 기본동작을 발생시키지않는다`.

> passive 
> option.passive는 기본값으로 false를 갖는다. true로 지정할 경우 이벤트 발생시점에서 defaultPrevented값을 무시한다.
> 즉 true로 바뀌어도 무시하는 것(기본동작을 할까 ?)

- Trusted Event

사용자에 의해 발생한 이벤트인지 브라우저에 의해 발생한 것인지 Event 객체의 isTrusted 속성을 통해 판단 가능하다.
true일경우 : 사용자 클릭에 의해 발생
false일 경우 : 브라우저에 의해 발생(.click()메서드를 통해)

- Stop propagation

Event 객체에는 stopPropagation 메서드가 있으면 이벤트 전파를 멈출수있다.

```javascript
element.addEventListener('click',e=> {
    e.stopPropagation();
});
```

이벤트 핸들러 안에서 stopPropagation메서드 호출시 다음 진행예정인 Event phase(단계별 중단이 아닌 바로 다음 이벤트 전파가 중단)가 진행되지 않는다.(전파중단)

1. 상황 1

```html
<div id="parent" onclick="console.log('hello')">
    <button id="bubbling-stop-button">stop</button>
</div>
<script>
    $('#bubbling-stop-button').on('click', e=> {
        e.stopPropagation();
        console.log("I'm bubbling-stop-button");
    });
</script>
```

> 위상황에서 버튼 클릭시 parent 의 이벤트 핸들러는 실행되지 않는다.캡처링단계에서는 기본적으로 핸들러가 동작하지 않고 e.stopPropagation메서드 호출로 인해 다음 이벤트 단계가 실행되지 않는다.

2. 상황 2

```html
<div id="capture">
    <button id="bubbling-stop-button">stop</button>
</div>
<script>
    $('#capture').on(
        'click',
        e => {
            console.log('hello !')
        },
        {capture: true}
    )
    $('#bubbling-stop-button').on('click',e=>{
        e.stopPropagation();
        console.log("I'm bubbling-stop-button")
    });
</script>
```

> 위 상황에서는 상위 엘리먼트에 이벤트 핸들러 capture 옵션을 true로 설정하면서 캡처링 단계에서 실행되도록 하였다.
> bubbling-stop-button에서 stopPropagation을 호출해도 버블링 단계로 넘어가지 못해도 부모 엘리먼트는 캡처링단계에서 실행되게 설정되어있어 상관없다.
> 출력은 hello와 I'm bubbling-stop-button이 순차적으로 출력된다.

3. 상황 3

capturing: true로 등록된 이벤트 핸들러에서 이벤트 전파를 막게되면 하위 엘리먼트에 등록된 동일한 타입의 이벤트 핸들러가 동작하지 않을 수 있다.

```html
<div id="capture-stop">
    <button id="prevented-button">stop</button>
</div>
<script>
    $('#capture-stop').on(
        'click',
        e => {
            e.stopPropagation()
            console.log('I prevent capturing phase')
        },
        { capture: true }
    )

    $('#prevented-button').on('click',e => {
        console.log("I'm prevented-button");
    });
</script>
```

> 위상황에서 버튼 클릭시 부모 엘리먼트 핸들러는 동작하나 버튼에 붙은 핸들러는 동작하지 않는다.

4. 상황 4

stopPropagation 메서드는 다음 Phase로의 이벤트 전파를 막는다.
Event phase중 target phase에서 이벤트 전파를 막기 위해서는 stopImmediatePropagation 메서드를 사용할 수 있다.

```html
<button id="multiclick-button">multi</button>
<script>
    const el = $('#multiclick-button')

    el.on('click', e => {
        console.log('first'); 
    });

    el.on('click', e => {
        console.log('second'); 
        e.stopImmediatePropagation();
    });

//이 뒤는 실행되지 않는다.
    el.on('click', e => {
        console.log('third'); 
    });

    el.on('click', e => {
        console.log('fourth'); 
    });
</script>
```

#### 실행 컨텍스트

##### 실행 컨텍스트와 콜스택

실행 컨텍스트는 실행 가능한 코드가 실행되기 위해 필요한 환경이다.
실행가능한 코드란 ?
전역 코드 : 전역 영역에 존재하는 코드
Eval 코드 : eval함수로 실행되는 코드
함수 코드 : 함수 내에 존재하는 코드
일반적으로 전역코드와 함수코드를 말한다.

JS엔진은 코드 실행을 위해 다음과 같은 실행에 필요한 정보를 알아야한다.
변수 : 전역변수,지역변수,매개변수,객체프로퍼티
함수 선언
변수의 유효범위(Scope)
this
위 정보를 형상화하고 구분하기 위해 JS엔진은 실행컨텍스트를 물리적 객체의 형태로 관리한다.

```javascript
var x = 'xxx';

function foo() {
    var y = 'yyy';
    
    function bar() {
        var z ='zzz';
        console.log(x + y + z);
    }
    bar();
}
foo();
```

위 코드 실행시 아래와 같이 콜스택에 실행컨텍스트가 쌓입니다.

![image](https://user-images.githubusercontent.com/49670068/111250242-58c8ea80-8650-11eb-8499-0adf228a3730.png)

1. 전역코드로 컨트롤(제어권)이 진입하면 전역 실행 컨텍스트가 생성되고, 콜스택에 쌓입니다. 전역 실행 컨텍스트는 앱(웹페이지)이 종료될떄까지 유지됩니다.
2. 함수를 호출하면 해당 함수의 실행컨텍스트가 직전에 생성된 컨텍스트 위에 쌓입니다.
4. 함수실행이 끝나면 함수의 실행컨텍스트를 파기하고 직전 실행컨텍스트에 컨트롤(제어권)을 반환합니다.

##### 실행 컨텍스트의 프로퍼티

실행컨텍스트는 실행가능 코드를 형상화하고 구분하는 물리적 객체 형태를 가지며, 3가지 프로퍼티를 소유합니다.

- VO(Variable Object - 변수객체) 

VO는 변수,매개변수와 인수정보,함수선언 정보를 갖는 객체를 가르킵니다.
전역 컨텍스트의 경우 전역객체(Global Object / GO)를,함수 컨텍스트의 경우 활성객체(Activation Object / AO)를 가르킵니다.

> 전역객체
> ![image](https://user-images.githubusercontent.com/49670068/111250957-a85be600-8651-11eb-8684-fa4662082d94.png)
> 전역객체는 전역함수와 전역변수를 프로퍼티로 갖고 있습니다.

> 활성객체
> ![image](https://user-images.githubusercontent.com/49670068/111251024-c75a7800-8651-11eb-9e85-e860511495d5.png)
> 활성 객체는 매개변수를 프로퍼티로 인수들의 정보를 배열로 갖고있고, 내부함수와 지역변수도 프로퍼티로 갖고있습니다.

- Scope Chain(SC)

스코프 체인은 전역객체와 중첩된 함수의 스코프의 레퍼런스를 리스트의 형태로 차례로 저장하고 있습니다. 즉, 전역객체와 활성객체의 리스트를 가르킵니다.

![image](https://user-images.githubusercontent.com/49670068/111251314-4fd91880-8652-11eb-958f-78fc0acb3a88.png)

현재 AO를 첫번째로하여 순차적으로 상위 컨텍스트의 AO를 가르키며, 마지막 리스트는 전역객체를 가르킵니다.

> 스코프 체인은 변수를 검색하는 메커니즘이며, 프로퍼티를 검색하는 메커니즘은 프로토타입 체인입니다.

자바스크립트 엔진은 스코프 체인을 통해 렉시컬 스코프(선언시 결정된 현재,상위 스코프)를 파악합니다.
함수 실행중 변수를 만나면 현재 스코프(AO)부터 시작하여, 찾을때까지 전역객체까지 검색을 해나갑니다. 검색실패시 참조 에러가 발생합니다.
스코프 체인은 함수의 숨김 프로퍼티인 `[[Scope]]`로 참조할 수 있습니다.

- this value

this 프로퍼티에는 this값이 할당된다. this에 할당되는 값은 함수 호출패턴에 의해 결정된다.

##### 실행 컨텍스트 생성과정

```javascript
var x = 'xxx';

function foo(){
    var y = 'yyy';
    
    function bar() {
        var z = 'zzz';
        console.log(x+y+z);
    }

    bar();
}

foo();
```

위 코드를 통해 실행 컨텍스트의 생성과정을 알아본다.

###### 전역코드 진입과정

1. 전역객체가 생성된다. 초기 전액객체는 빌트인객체(Math,String,Array등)와 BOM,DOM이 설정되어 있다.

![image](https://user-images.githubusercontent.com/49670068/111254892-5dde6780-8659-11eb-91e3-0f3e9d50b8fb.png)


2. 전역객체 생성후 전역코드로 컨트롤이 진입하면 전역 실행 컨텍스트가 생성되며, 콜스택에 쌓인다.

![image](https://user-images.githubusercontent.com/49670068/111254907-69ca2980-8659-11eb-9b8f-75bc0c0b0ac9.png)

> 실행 컨텍스트는 다음 처리과정을 거친다.
> 1. 스코프체인 생성과 초기화
> 2. Variable Instantiate(변수 객체화) 실행
> 3. this value 결정

3. 전역 실행 컨텍스트 생성 이후 가장 먼저 `스코프 체인 생성과 초기화`가 실행된다. 해당 스코프체인(리스트)에는 전역객체의 레퍼런스가 포함된다.

![image](https://user-images.githubusercontent.com/49670068/111255078-bdd50e00-8659-11eb-9a6f-d890cf25e1be.png)

4. 스코프 체인 생성과 초기화가 종료되면 Variable Instatiable가 실행된다.
이 절차는 변수와,매개변수,인수정보,함수선언을 VO에 추가하여 객체화하는 것을 말한다. 전역코드의 경우 VO는 GO를 가르킨다.

![image](https://user-images.githubusercontent.com/49670068/111255412-5a97ab80-865a-11eb-8f55-7f5a5729ee8a.png)

> Variable Instatiable는 아래의 순서로 프로퍼티와 값을 셋한다.
> 1. (함수 코드인경우) 매개변수가 VO의 프로퍼티로,인수가 값으로 설정된다.
> 2. 코드내 함수선언을 대상으로 함수명이 VO의 프로퍼티로, 함수객체가 값으로 설정된다.(함수 호이스팅)
> 3. 코드내 변수 선언을 대상으로 변수명이 VO의 프로퍼티로 값이 undefined로 설정된다.(변수 호이스팅)

4-1. 함수 foo 선언 처리

foo(함수명)은 VO의 프로퍼티로 생성된 함수객체는 값으로 설정된다.
생성된 함수 객체는 `[[Scope]]` 프로퍼티를 갖는데, 해당 프로퍼티는 자신의 실행환경과 자신을 포함하는 외부 함수의 실행환경과 전역객체(스코프 체인이 가르키는 리스트)를 가르킨다.
외부 함수 컨텍스트가 소멸하여도 `[[Scope]]`프로퍼티가 가르키는 외부함수의 AO는 소멸하지않고 참조가능하다. 이것이 `클로저`이다.

![image](https://user-images.githubusercontent.com/49670068/111257539-a8161780-865e-11eb-8555-26d5f7a68746.png)

4-2. 변수 X의 선언처리

var 키워드로 선언된 변수는 VO에 변수를 등록하고, undefined로 초기화한다.
따라서 변수 선언문 이전에 변수에 접근가능하며, undefined로 출력된다.
이를 변수 호이스팅이라한다.
이후 변수 할당문에 도달하면 비로소 값이 할당된다.

![image](https://user-images.githubusercontent.com/49670068/111257767-178c0700-865f-11eb-95ce-8b1ede4ef879.png)

4-3. this value 결정

this는 기본적으로 전역객체를 가르킨다. 런타임에 함수호출 패턴에 의해 this에 할당되는 값이 결정된다.

![image](https://user-images.githubusercontent.com/49670068/111257867-41ddc480-865f-11eb-8374-a8488465e022.png)

###### 전역코드 진입실행과정

위처럼에서 코드 진입시 실행환경이 갖추어 지고, 코드실행과정이 이루어진다.

1. 전역변수 x에 문자열 'xxx'를 할당할때 스코프체인 리스트 0번(GO)부터 검색해 변수명에 해당하는 프로퍼티가 발견되면 xxx를 할당한다.

![image](https://user-images.githubusercontent.com/49670068/111258170-c892a180-865f-11eb-8030-25913213b109.png)

2. foo 함수가 실행되기 시작하면, 새로운 함수 컨텍스트가 실행되며, 전역코드와 동일하게 스코프체인 생성초기화 -> 변수 객체화 -> this value설정 과정이 함수코드 룰로 적용되어 순차적으로 진행된다.

3. foo 함수에 해당하는 AO가 생성되며 스코프 체인의 선두에 설정된다.

![image](https://user-images.githubusercontent.com/49670068/111258570-9766a100-8660-11eb-921d-6c57c5cf95e9.png)

1. 이후 전역 컨텍스트의 스코프 체인이 참조하는 GO객체가 foo 실행컨텍스트의 스코프체인에 push된다. foo 함수를 실행하게되면 변수탐색의경우 AO와 GO를 순차적으로 참조한다.

![image](https://user-images.githubusercontent.com/49670068/111258818-14921600-8661-11eb-8468-b364d589e3a9.png)

5. 스코프 체인 생성과 초기화 과정이 끝나면 변수 객체화 과정이 진행된다.
AO 객체를 VO에 바인딩하며, 함수선언부 초기화(함수명이 프로퍼티로 값은 함수객체,함수 객체의 `[[Scope]]`프로퍼티는 스코프체인이 가르키는 리스트를 가르킨다.) 및 프로퍼티 초기화(y:undefined가 AO에 설정)가 진행된다.

![image](https://user-images.githubusercontent.com/49670068/111259588-8fa7fc00-8662-11eb-817a-a9f00dfb4b0f.png)

6. this는 전역객체로 설정되며 이후 this값은 런타임에 함수 호출패턴에 의해 결정된다.

![image](https://user-images.githubusercontent.com/49670068/111259640-ab130700-8662-11eb-8ce8-3fe291302cdf.png)


7. foo 실행 컨텍스트가 초기화된후 foo함수코드가 실행된다.
위에서 생성된 y프로퍼티에 yyy값을 할당한다.

![image](https://user-images.githubusercontent.com/49670068/111259709-d4339780-8662-11eb-807d-817690c2d611.png)

8. bar 함수가 실행되면 bar에 해당하는 새로운 실행컨텍스트가 생성되며, foo 실행과정과 동일하게 1.스코프체인 생성,초기화 -> 변수 객체화 -> this value 결정이 순차적으로 실행된다.

9. bar 함수 실행단계에서 console.log(x+y+z)의 결과는 xxxyyyzzz가 된다.

![image](https://user-images.githubusercontent.com/49670068/111259900-3391a780-8663-11eb-985f-0bb0f2b4ab1e.png)

> x : AO-2에서 검색 실패 -> AO-1에서 검색실패 -> GO에서 검색성공

> y : AO-2에서 검색 실패 -> AO-1에서 검색성공

> z : AO-2에서 검색 성공

#### 모듈시스템과 require와 import의 차이점

기본적으로 자바스크립트는 파일마다 독립적으로 파일스코프를 갖지 않고, 하나의 전역 객체를 공유한다. 이로 인해 전역변수 중복문제가 발생한다. 
이러한 문제들은 해결하기 위해 나온 것이 AMD와 CommonJS입니다.

AMD는 비동기 모듈 선언의 약자로 이를 구현한 가장 유명한 스크립트가 RequireJS입니다.

AMD 특징

- 모듈을 비동적으로 불러온다.
- 브라우저에서 많이 사용된다.

> 사용법 requirejs를 다운받아 스크립트로 넣고, 코드를 작성하면된다.

```javascript
<script src="require.js"></script>

//의존성 모듈들을 첫번째 파라미터에 넣는다.
//package/lib은 함수의 lib 파라미터에 담긴다.
define(['package/lib'],function(lib){
    function greeting(){
        //로드된 모듈을 아래와 같이 사용할 수 있다.
        lib.log('hello world');
    }

    //함수 노출
    return {
        greetingbar: greeting
    }
});
```

```javascript
//위처럼 정의된 모듈은 다음과 같이 require로 사용할 수 있다.
require(['package/myModule'],function(myModule){
    myModule.greetingbar();
});
```

CommonJS는 Nodejs에서 채택한 방식으로 유명합니다.

CJS 특징

- Nodejs의 모듈시스템
- 모듈을 동기적으로 불러옴

> 사용법

```javascript
//require를 통해 package/lib 모듈을 변수에 담을 수 있따.
let lib = require('package/lib');

//가져온 모듈은 아래와 같이 사용가능하다.
function greeting(){
    lib.log('hello world!');
}

//함수 노출
exports.greetingbar = greeting;
```

UMD는 AMD와 Commonjs와 같은 다양한 모듈 시스템을 함께 사용하기위해 만들어 졌습니다.

ESM은 ES6에서 등장한 모듈 방식이며, 표준 자바스크립트 모듈시스템으로 기획됐다.
CJS와 AMD의 장점을 채택하여 만들어졌다.

- script 태그에 type="module"을 추가하면 로드된 자바스크립트 모듈로서 동작합니다.
- type="module"로 선언된 스크립트는 HTML이 모두 렌더링 된 이후에 로드 됩니다.
- module타입의 스크립트들은 파일 스코프를 갖습니다.(전역객체를 통한 공유를 하지않음)
- import와 export 키워드를 사용해 모듈 로드 및 내보내기가 가능합니다.

> 사용법

```javascript
//say.js
function sayHello(){
    console.log("hello");
}

export {
    sayHello
}
```

```html
<script type="module">
    import { sayHello } from "./say.js";
    
    sayHello();
</script>
```

> require와 import의 차이점

> - require는 Commonjs 방식이고 import는 ES6 모듈 방식이다.
> - import는 ES6를 아직 지원하지 않는 브라우저가 많으므로 바벨과 함께 사용한다.
> - import는 필요한 부분만 로드하여 메모리 절약이 가능합니다.

#### arrow function

화살표 함수 표현식은 기존의 function 표현방식보다 간결하다.
또한 항상 익명이며, 자신의 this,arguments,super,new.target을 바인딩 하지 않는다. 그래서 생성자로 사용할 수 없다.

- 화살표 함수 도입이유 : 짧은 표현, 상위 스코프 this를 함수내 this로 사용

> 짧은 표현

```javascript
let arr = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium'
];

//기존 function 표현
arr.map(function(v){
    return v.length;
})

arr.map((v) => {
    return v.length;
});

arr.map(({length}) => length);
```

> 상위 스코프 this

```javascript
function Person(){
    //생성자 함수의 this는 자기자신이다.
    this.age = 0;

    setInterval(()=> {
        //(상위 스코프인 생성자 함수 실행컨텍스트의 AO의 this를 그대로 사용한다.)
        //즉, this는 person 객체를 참조한다.
        this.age++;
    },1000);
}

var p = new Person();
```

