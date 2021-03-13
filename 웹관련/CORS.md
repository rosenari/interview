##### 동일 출처 정책(Same-Origin Policy)

- 다른 웹페이지에 접근할 때, 같은 출처(same origin)의 페이지에만 접근가능 한 정책이다.
- 같은 출처란 프로토콜,호스트명,포트가 같다는 것을 의미
- 즉, 웹페이지 스크립트는 해당 페이지와 같은 주소로만 ajax 요청이 가능함. 

##### CORS(교차 도메인 자원 공유)

- 초기에는 동일출처정책이 웹사이트 보안을 위한 좋은 방법으로 생각되었으나, 요즘에는 여러 도메인에 걸친 구성이 많아지다 보니 거추장 스러운 정책이 되었다.
- 그래서 나온 추가 정책이 CORS이다. 이 정책은 서버에서 외부 요청을 허용할 경우 ajax 요청이 가능해진다.

##### 서버의 설정없이 동일 출처 정책을 회피하는 방법

1. 웹 브라우저 실행시 외부 요청 허용 옵션 사용

> 크롬의 경우 --disable-web-security 옵션 추가

2. 외부 요청 가능하게 해주는 플러그인 설치

> 응답을 가로채서 header에 Access-Control-Allow-Origin: *을 추가하여 정상적으로 응답을 받을수 있도록 처리한다.

3. JSONP 방식으로 요청

> 브라우저는 css나 js와 같은 리소스파일들을 동일 출처정책의 영향을 받지 않는다. 고로 js파일을 통해 응답을 전달받아 json으로 변환하여 처리하는 방법이 있다.
> 단 이방법은 GET 메서드로만 사용가능하다.

##### CORS 동작 방식

1. 요청하려는 url이 외부 도메인일 경우 웹 브라우저는 preflight 요청을 먼저 날리게 된다.

> preflight 요청을 실제 요청 경로와 같은 url에 대하여 option메서드로 요청을 미리 날려보고 요청 권한이 있는지 확인한다.

2. 서버는 날라온 preflight 요청에 대해 응답하여 실제 요청을 날릴수 있도록해야하는데 그 방법이 응답에 특정 header를 첨부하는 것이다.

> Access-Control-Allow-Origin 값이 * 인 경우 모든 도메인의 요청을 허용하는 것으로 판단한다.
> 서버에서의 응답헤더는 밑과 같다.
> - Access-Control-Allow-Origin : 요청 허용 출처
> - Access-Control-Allow-Credentials : 클라이언트가 쿠키를 통해 자격증명을 해야하는 경우, 쿠키값 포함여부
> - Access-Control-Expose-Header : 클라이언트 요청에 포함되어도 되는 사용자 정의 헤더
> - Access-Control-Max-Age : 클라이언트에서 preflight 요청결과를 저장할 기간
> - Access-Control-Allow-Methods : 요청 허용 메서드
> - Access-Control-Allow-Headers : 요청 허용 헤더
