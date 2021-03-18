##### FLUX 패턴

FLUX패턴은 단방향 데이터 흐름이 가장 특징인 패턴입니다.

![image](https://user-images.githubusercontent.com/49670068/111556242-6ce62680-87cd-11eb-9616-344a35d50cdd.png)

위 처럼 Dispatcher => Store => View, View에서 다시 action을 일으키는 단방향의 흐름으로 데이터가 흐릅니다. 이러한 흐름은 데이터 변화를 훨씬 예측하기 쉽게 만듭니다.

- Dispatcher : 모든 데이터 흐름을 관리하며, 액션으로 부터 액션이 넘어오면 스토어에 액션을 보낸다.

- Store : 앱내의 모든 상태와 로직을 담고 있다. Dispatcher로 부터 액션을 받기위해 Dispatcher에 콜백함수를 등록해야하며, Store변경시 view에 변경사실을 알려준다.

- View : Flux에서 View는 컨트롤러의 성격도 가지고 있다. 특히 최상위 view는 스토어에서 데이터를 가져와 자식 view로 내려보내주는 역할도 한다.

- Action : 디스패처에서 데이터가 담긴 객체를 인자로 하는 콜백함수를 통해 스토어 업데이트가 이뤄진다. 이때 이 객체를 action이라한다. 액션은 대체로 액션 생성자에서 만들어진다.

> FACEBOOK에서는 이상적이지 않은 MVC 설계에서 발생하는 복잡한 구조 그리고 그로 인해 발생하는 예기치못하는 버그를 최소화 위해 MVC를 개선하고 프레임워크한 FLUX패턴을 개발,도입하였습니다.
> ![image](https://user-images.githubusercontent.com/49670068/111560970-0239e880-87d7-11eb-8907-a2b138d9d953.png)

##### REACT에 REDUX로 상태관리하기

![react상태변경흐름](https://user-images.githubusercontent.com/49670068/111562337-62318e80-87d9-11eb-9dad-1d53aba6d008.gif)

redux가 없을때 상태변화의 흐름이다.
서로 다른 컴포넌트간에 state를 공유한거나 ,특정 컴포넌트 state변화에 의존하는 경우, 리액트 컴포넌트 구조의 특성상 부모와 자식 컴포넌트간 종속관계가 형성되고, 이에따라 한번의 변경으로 수많은 상태변경 과정이 이루어 지며, 불필요한 렌더링이 발생한다.

![redux흐름](https://user-images.githubusercontent.com/49670068/111562661-ebe15c00-87d9-11eb-8d91-311169c3bfed.gif)

redux를 사용하는 경우 Reducer와 단일 Store를 사용하여 복잡하고 어려운 상태관리를 효율적이고 간단하게 변경할 수 있습니다.
(크고 복잡할 구조를 단방향으로 구성하기 매우 좋음,효율적)
(작고 복잡하지 않다면 REDUX없이도 단방향 구성가능)
이러한 복잡한 구조에서도 단방향 흐름을 만들어냄으로써 버그발견의 시간을 최소화 할 수 있습니다.

##### react에서 redux의 흐름

![redux_detail](https://user-images.githubusercontent.com/49670068/111564661-76778a80-87dd-11eb-877f-c7d345ee6b77.gif)

action: 액션은 저장소로 보내는 데이터 묶음이다. 액션은 반드시 어떤형태의 액션인지 type이 정의되어야한다.(dispatch를 통해 보낼 수 있다)
reducer : 액션(객체)를 받아서 새로운 state 반환한다.
store: store는 애플리케이션의 상태를 저장한다.