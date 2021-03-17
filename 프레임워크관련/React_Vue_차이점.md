### DOM API를 사용하는 법

```javascript
const button = document.createElement('button')
const text = document.createElement('p')
element.innerText = 'Click!';
element.addEventListener('click',() => {
    text.innerText = '클릭했습니다 !'
})
const root = document.getElementById('root')
root.appendChild(button)
root.appendChild(text)
```

> 권장되는 방법이나, 복잡하고 귀찮다.

### HTML 문자열을 사용하는 방법

```
const context = {
    text:'',
}

const render = () => {
    document.getElementById('root').innerHTML = `
        <button onclick="handleClick()">눌러</button>
        <p>${context.text}</p>
    `
}

const handleClick = () => {
    context.text = '눌렀다.'
    redner()
}

render();
```

> 이벤트핸들링을 인라인으로 넣어야한다.
> 이말은 모든함수가 전역변수여야하며, 전역스코프에서 함수 이름이 겹치지않아야한다는 것이다.

### JSX : React의 해결방법

```javascript
const render({text,handleClick}) => {
    return (
        <>
            <button onClick={handleClick}>
                클릭버튼
            </button>
            <p>{text}</p>
        </>
    )
}
```

> React는 JSX라고 하는 자신들만의 특별한 언어로 기존문제를 해결한다.
> 해당코드는 실제로 DOM API를 사용한 방식으로 변환된다.
> JSX는 HTML문법도 자바스크립트문법도 아니다.
> JSX는 DOM을 생성하는 함수가 어떻게 실행되야할지 알려주는 명령문이다.

### HTML을 해석해서 변환하기 : Vue의 해결방법

```javascript
    <div id="root">
        <button v-on:click="handleClick">Click!</button>
        <p>{{text}}</p>
    </div>
```

> Vue도 역시 위 코드는 DOM 생성하는 함수들로 변환된다.
> 허나 위 코드는 JSX와 달리 `HTML호환성이 좋다.`
> 그 말은 특별한 `개발환경없이도, Vue를 사용해 DOM API로 변환할 수 있다는 뜻이다.(HTML문법과 호환성 좋음)`
> 위 이유로 `레거시 프로젝트에 쉽게 적용이 가능`하다.

### JSX의 장점 : 유연한 렌더링

- 예를 들어 표를 만든다고 할떄 각각의 컬럼은 컴포넌트들로 표현될 수 있다.
- 이때 JSX는 `render함수를 통해 유연하게 렌더링이 가능`하다.
- `Vue에서 slot으로는 동적으로 html 렌더링하는 것이 안되기에` 다른 컴포넌트로 표현 위해서는 존재하는 컴포넌트 경우만큼 `if문을 사용해 처리`해야한다.

```javascript
//JSX 방법
const Table = ({rows ,columns}) => {
    return (
        <table>
            {
                rows.map(row => (
                    <tr>
                        {
                            columns.map(({render,key}) => (
                                <td key={key}>
                                    {render(row[key])}
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </table>
    )
}

const Page = () => {
    const columns = [
        {
            key:'id',
            render:(value) => <Link href={`/item/${id}`}>#{id}</Link>
        },
        {
            key:'name',
            render:(value) => (
                <input value={value} onChange={(ev) =>
                 console.log(ev.target.value)} />
            )
        },
        {
            key:'isGoold',
            render: (value) => value ? '좋음':'안좋음'
        }
    ]

    const rows = [
        { id:123, name: '김빵빵', isGood: false },
        { id:45, name: '강칠칠', isGood: true },
        { id:678, name: '왕만두', isGood: false },
    ]

    return (
        <div>
            <Table columns={columns} rows={rows} />
        </div>
    )
}
```

```html
//Vue slot방법
//slot은 상위컴포넌트의 템플릿을 하위컴포넌트에 주입하는 기능

//하위 컴포넌트
<template>
    <table>
        <tr v-for="row in rows">
            <td v-for="column in columns" key="column">
                <slot :column="column" :value="row[column]"></slot>
            </td>
        </tr>
    </table>
</template>

<script>
    export default{
        data:{
            rows: Array,
            columns: Array,
        },
    }
</script>

//상위 컴포넌트
<template>
    <Table :columns="columns" rows="rows">
        <template v-slot="{ value, column }">
            <Link v-if="column === 'link'" :href="`/item/${value}`">{{value}}</Link>
            <input v-if="column === 'name'" :value="value" @change="log($event.target.value)" />
            <span v-if="column ==='isGood'">{{value ? '좋음':'나쁨'}}</span>
        </template>
    </Table>
</template>

<script>
    const columns = ['id','name','isGood']

    const rows = [
        {id:123,name:'김빵빵',isGood:false},
        {id:45,name:'강칠칠',isGood:true},
        {id:678,name:'왕만두',isGood:false},
    ]

    export default {
        data: {
            columns,
            rows,
        },
        methods: {
            log(e) {
                console.log(e)
            }
        },
    }
</script>
```

- Vue와 React 공통 장점

> Virtual Dom으로 빠른 렌더링

> 경량 라이브러리

> Reactive Component

> Server Side Rendering

> 라우터 번들러 상태관리와 결합이 쉬움

> 개발 커뮤니티와 지원

- Vue의 장점

> Template와 Render Function(Vue도 2.x부터 render()를 지원)을 모두 사용할 수 있다.

> 간편한 구문,구조와 프로젝트 설정

> 빠른 렌더링과 작은 용량

- React의 장점

> 대규모 프로젝트에 적합, 테스팅이 수월

> 웹과 모바일 모두 개발 가능

> 더큰 개발자 생태계에서 오는 많은 레퍼런스와 도구들