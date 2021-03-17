#### REACT 생명주기

REACT에서 컴포넌트가 생성되고 업데이트되고 사라질때까지,사전 정의된 몇단계 과정을 거치는 데 이를 `생명주기`라 합니다.
REACT는 클래스형 , 함수형 컴포넌트 두가지가 있으며, 각각의 생명주기가 존재합니다.
컴포넌트는 크게 `생성` => `업데이트` => `제거`의 생명주기를 갖습니다.

##### 클래스형 컴포넌트 생명주기

![image](https://user-images.githubusercontent.com/49670068/111476813-d8020f80-8771-11eb-9291-21a83d8d06a7.png)

###### 마운트(생성)
컴포넌트의 인스턴스가 생성되어 DOM에 삽입될 때 순서대로 호출됩니다.

- constructor() : 메서드를 바인딩하거나 , state를 초기화합니다.,생성자 구현시 this.props에 초기설정을 위해서 this를 사용하기전에 super(props)`this.props초기화`를 호출해야합니다.

> 자바스크립트는 언어적 제약사항으로 생성자에서 super를 호출하기 전까지는 this를 사용할수 없다.

- static getDerivedStateFromProps()
- 
- render() : 반드시 구현돼야하는 메서드이며, this.props와 this.state값을 이용해 컴포넌트를 DOM에 부착합니다.

- componentDidMount() : 컴포넌트가 마운트 된 직후에 호출됩니다. , DOM 노드가 있어야되는 초기화 작업이 들어갑니다. 요소에 이벤트리스너 달기등.. 또는 비동기 요청

###### 업데이트
props나 state가 변경되면 렌더(갱신)가 진행되며 순서대로 호출된다.

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate() : 갱신이 일어난 직후 호출되며 최초 렌더링에는 호출되지 않습니다.

###### 마운트 해제(제거)
아래 메서드는 컴포넌트가 DOM에서 제거될떄 호출됩니다.

- componentWillUnmount() : 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 비동기 작업 취소,타이머 제거,이벤트 제거등을 수행하는 데 적합한 메서드입니다.


##### 함수형 컴포넌트 생명주기

리액트 훅이라고 불리는 useEffect를 사용하여 함수형 컴포넌트에서도 생명주기를 다룰수 있습니다.
훅이 등장하면서 함수형 컴포넌트가 클래스형 컴포넌트를 대체할 수 있게되었습니다.
최신 프로젝트들은 함수형 컴포넌트와 useEffect조합으로 빠르게 개발을 하고 있습니다.

- 컴포넌트가 첫렌더링될때 실행되고, 그다음부터는 의존성배열에 추가된 state값이 변할때마다 실행됩니다.

```javascript
useEffect(()=> {
    console.log('state1 changed');
},[state1]);
```

- 리턴되는 함수는 componenetWillUnmount의 역할을 대신합니다. (useEffect함수가 호출되기 직전과 컴포넌트가 사라진 후에 호출됩니다.)

```javascript
useEffect(()=> {
    console.log('hidden change');

    return () => {
        console.log('hidden 변경 예정');
    }
},[hidden]);
```

- 처음 한번만 실행하고 싶다면 의존성배열을 빈배열로 넣으면 됩니다.(단 컴포넌트가 언마운트될때는 return 함수가 실행됩니다.)

```javascript
useEffect(()=> {
    console.log('mounted');
    return () => {
        console.log('unmount');
    }
},[]);
```

- 배열을 아예 넣지 않으면 데이터와 관계없이 리렌더링시마다 실행됩니다.

```javascript
    useEffect(() => {
        console.log('rendered');
    });
```

- useRef로 생성한 데이터는 리렌더링 여부와 상관없이 항상 같은 값이 유지됩니다. 또한 그 값을 바꿔도 화면이 리렌더링 되지않습니다.(ref값을 가져올때는 .current프로퍼티로 가져와야합니다)

```javascript
const Basic = () => {
    let data = 0;
    const onClick = useCallback(()=> {
        data++;
    },[data]);

    return <div onClick={onClick}>Basic</div>;
}
```

> 다음 코드가 있다고 할때 리렌더링 될때마다 data가 0으로 초기화 되므로 제대로 동작할수 없습니다.

```javascript
const Basic = () => {
    const dataRef = useRef(0);
    const onClick = useCallback(()=> {
        dataRef.current++;
    },[]);

    return <div onClick={onClick}>Basic</div>;
}
```

> 다음코드는 리렌더링을 해도 초기 ref값이 초기화되지 않으므로 정상 동작합니다.