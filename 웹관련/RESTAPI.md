##### REST API 의 등장

2000년도 HTTP의 저자 중 한사람인 로이 필딩이 당시 `웹(HTTP) 설계의 우수성`에 비해 제대로 사용되어지지 못하는 모습에 안타까워하며 `웹의 장점을 최대한 활용할 수 있는 REST 아키텍처를 발표`하였다.

##### REST의 구체적 개념

 `HTTP URL을 통해 자원을 명시`하고, `HTTP Method(POST, GET, DELETE, PUT)를 통해 해당 자원에 대한 CRUD(CREATE, READ, UPDATE, DELETE)` 오퍼레이션을 적용하는 것

##### REST의 특징

- 한정적인 인터페이스로 수행하는 아키텍처 스타일

> params를 사용해 url을 구성하는 경우 site.com/@rosenari?auth=admin 과 같이 관리자 페이지 리소스에는 접근하였는데 이것을 또 어찌할 것인지는 params로 또 넘겨주어야한다.
> 허나 한정적 인터페이스를 사용할 경우 HTTP METHOD를 사용하여,
> GET site.com/@rosenari/admin은 사용자 조회
> PUT site.com/@rosenari/admin은 정보 수정과같이 간편하게 표현 할 수 있다.

- 무상태성

> 작업을 위한 상태정보를 별도로 저장하지않는다. 서버는 들어오는 요청을 단순히 처리만 한다. 
> 서비스 자유도는 높아지고, 서버 구현이 단순해 진다.

- 캐시 가능

> HTTP가 가진 캐싱 기능을 적용할 수있다.

- 자체표현구조

> 자체표현구조란 REST API만 보고도 어떠한 요청을 하는 것인지를 쉽게 이해할수 있는 것을 말한다.

- 클라이언트 - 서버 구조

> 서버는 API 제공 Client는 사용자인증,세션,로그인정보등을 직접관리하는 구조, `서버와 클라이언트 역할이 명확히 나뉘어 각 필드에서 개발해야할 점이 명확해 지고 서로간의 의존성이 줄어든다.`

- 계층형 구조

> REST 서버는 다중 계층으로 구성될수 있으며, 보안,로그밸런싱,암호화 계층등을 추가하여 구조상 유연성을 둘 수 있으며, Proxy, 게이트웨이와 같은 네트워크 기반 중간매체를 사용할 수 있다.

##### REST API 설계 규칙

- URL은 정보의 자원을 표현해야한다.
- 자원에 대한 행위는 HTTP METHOD(GET,POST,PUT,DELETE)로 표현한다.

##### REST API 설계시 주의점

- 슬러시 구분자(/)는 계층 관계를 나타낼때 사용

> site.com/@rosenari/product/food/salad
> salad는 food에 속하고 food는 product에 속함


- URL의 마지막 문자로 슬래시는 포함하지 않는다.

- 긴 URL 사용시 하이픈을 사용해 가독성을 높힌다.

- 밑줄은 URL에 사용하지 않는다.

- URL 경로에는 소문자가 적합하다.

- 파일 확장자는 URL에 포함시키지 않는다.

> site.com/member/rosenari/photo.jpg (x)
> 대신 Accept Header를 사용한다.
> GET / member/rosenari/photo HTTP/1.1 Host: site.com Accept: image/jpg
> * Accept 헤더란 ?
> http 요청에 대한 응답으로 받고 싶은 미디어 타입을 명시하는 헤더