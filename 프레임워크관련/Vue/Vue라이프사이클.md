#### Vue 라이프사이클

Vue 인스턴스나 컴포넌트가 생성될 때, 미리 사전에 정의된 몇단계의 과정을 거치는데 이를 `라이프 사이클`이라 합니다. 즉, vue인스턴스가 생성되고 눈에 보이고 사라지기까지의 과정입니다.

> 공식문서 라이프 사이클 다이어그램

![image](https://user-images.githubusercontent.com/49670068/111465724-c6b30600-8765-11eb-9f52-678eff70bbfd.png)

Vue인스턴스는 크게 생성(create)되고, DOM에 부착(Mount)되고, 업데이트(Update)되며, 없어지는(Destroy) 4가지의 과정을 거칩니다.

- beforeCreate

```javascript
var app = new Vue({
    el: '#app',
    data() {
        return {
            msg: 'hello';
        }
    },
    beforeCreate(function(){
        console.log(this.msg); //undefined - data에 접근불가
    })
})
```

가장 먼저 실행되는 훅입니다.
Vue 인스턴스가 초기화 된 직후에 발생됩니다. `컴포넌트가 DOM에 추가되기 전이어서 this.$el에도 접근 할수 없습니다.` 또한 data,event,watcher에도 접근하기 전이라 `data,methods에도 접근할 수 없습니다.`

- created

```javascript
var app = new Vue({
    el: '#app',
    data() {
        return {
            msg: 'hello';
        }
    },
    created(function(){
        console.log(this.msg); //hello
    })
})
```

created 훅에서는 data를 추적할 수 있게되며, computed,methods,watch등이 활성화 되어 접근가능합니다.
하지만 아직까지 DOM에는 추가되지 않은 상태입니다.

- beforeMount

```javascript
var app = new Vue({
    el: '#app',
    beforeMount(function() {
        console.log('beforeMount');
    })
})
```

DOM에 부착하기 직전에 호출되는 훅입니다. 가상DOM이 생성되어 있으나, 실제 DOM에는 부착되지 않은 상태입니다.

- mounted

```javascript
var app = new Vue({
    el: '#app',
    mounted(function(){ //모든 화면이 렌더링된후 실행됩니다.
        //요소에 이벤트리스너를 달기 좋은 훅입니다.
        console.log('mounted')
    })
})
```

일반적으로 가장많이 사용하는 훅이니다. 가상 DOM의 내용이 실제 DOM에 부착되고 난 이후에 실행되므로, this.$el을 비롯한 data,computed,methods,watch등 모든 요소에 접근가능합니다.

- beforeUpdate

```javascript
var app = new Vue({
    el: '#app',
    beforeUpdate(function() {
        console.log('beforeUpdate');
    })
})
```

컴포넌트에서 사용되는 data의 값이 변하여 DOM에도 그 변화를 적용시켜야할때 변화 직전 호출되는 훅입니다.

- updated

```javascript
var app = new Vue({
    el: '#app',
    updated(function(){
        console.log('beforeUpdate');
    })
})
```

가상 DOM을 렌더링하고 실제 DOM이 변경된 이후에 호출되는 훅입니다.
즉, 변경된 data가 DOM에 적용된 상태입니다.

- beforeDestory

```javascript
var app = new Vue({
    el: '#app',
    beforeDestroy(function(){
        console.log('beforeDestroy');
    })
})
```

인스턴스가 해체되기 직전 호출됩니다.
인스턴스는 작동하기 때문에 모든 속성에 접근 가능합니다.
이단계에서 보통 이벤트 리스너를 해제합니다.

- destroyed

```javascript
var app = new Vue({
    el: '#app',
    destroyed(function(){
        console.log('destroyed');
    })
})
```

인스턴스가 해체되고 난 직후에 호출되는 훅입니다.
해당 훅에서는 인스턴스 속성에 접근할수 없으며 하위 Vue인스턴스도 삭제됩니다.