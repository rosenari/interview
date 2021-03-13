#### HTML5

HTML5는 HTML의 새로운 버전으로 Client Side Technology의 중심이 되는 마크업 언어입니다.
과거 웹문서에서 HTML만으로 웹서비스를 구성하는 것이 불가능하였습니다.
HTML5로 넘어 오면서 `클라이언트와 서버와의 통신이 가능`하며 이에대한 부가기능을 제공함으로써 다른 외부 `Active-X와같은 플러그인을 사용하지 않고도 웹서비스를 제공`할 수 있게 되었습니다.

> Active-X란 ?

> - 과거 웹브라우저는 html문서만으로 동영상이나 음악감상 은행업무등 다양한 인터넷 서비스 제공이 불가능하였습니다. 
> - 그래서 추가프로그램(플러그인)을 설치하도록하여 서비스를 제공하였는데,
> - 인터넷 익스플로러용 추가 프로그램이 바로 Active-X입니다.

#### HTML5 주요기능

- Device Access : 카메라,동작센서등 H/W기능을 웹에서 직접제어 할 수 있습니다.
- WebSocket : 웹에서 서버측과 직접적인 양방향 통신이 가능합니다.
- 3D,Graphics & effects : 다양한 2차원 및 3차원 그래픽 기능을 지원합니다.
- CSS3 : 글씨체,색상,배경등 다양한 스타일 및 이펙트를 제공합니다.
- MULTIMEDIA : 비디오 및 오디오 기능을 자체적으로 지원합니다.
- OFFLINE : 네트워크 미지원 환경에서도 웹을 사용할 수 있습니다.
- WEB STORAGE : 클라이언트에 데이터를 저장할 수 있습니다.
- Geo-location : GPS 없이도 단말기의 지리적 위치정보를 제공합니다.
- SEMANTIC : 웹자료에 의미를 부여해 사용자 의도에 맞는 맞춤형 검색을 제공합니다.

#### HTML5 디자인 원칙

- 콘텐츠 호환성 : HTML5이전버전으로 제작된 콘텐츠도 문제없이 이용할수 있어야합니다.
- 이전 브라우저와의 호환성 : HTML5가 지원되지 않는 이전 버전 브라우저에서도 이용가능해야합니다.
- 이용방법 호환성 : 기존 HTML태그를 쵣한 사용가능하도록 해야합니다.
- 기능 재사용 : 각 브라우저에서만 사용가능한 기능을 통합해 공통적으로 사용할 수 있어야합니다.
- 발전 우선 : 기존 HTML을 재구성하기 쉽도록 합니다.

#### Syntax(구문)

- HTML5 문서 작성시 최상단에 DOCTYPE을 작성해야합니다.
- Meta태그를 통해 Encoding을 명시합니다.
- HTML5에서는 수식기술언어 MathML,그래픽언어 SVG를 사용할 수 있습니다.

#### 새롭게 추가된 SEMANTIC TAG들

- Header
- Footer
- Nav : 문서내 네비게이션 요소가 있을때 사용
- Section : 문서의 영역구성
- Article : 뉴스기사 or 블로그 아티클과 같은 독립된 콘텐츠 표시
- Aside : 주요 컨텐츠 이외의 참고가 될 수 있는 컨텐츠 구성시 사용
- Figure : 그림 비디오와 같은 포함된 컨텐츠의 Caption을 표시할때 사용
- Figcaption : 캡션에 사용

#### 이외 추가된 TAG들

- Audio,Video : 멀티미디어 컨텐츠 표시
- Embed : Plugin 컨텐츠 표시
- Progress : 작업 진행상황 나타냄
- Time : 시간,날짜 표시
등등

#### 새로 추가된 속성

- data-* : DOM을 통해 요소를 참조하는 경우 dataset프로퍼티를 통해 접근가능하다.
- draggable : drag & drop api에서 사용가능
- hidden : element가 없을때 사용
등등

#### 사라진 element

- font,u,big,center등 
- Frame관련 element : frame,frameset,noframes
등등

#### 추가된 API

- Video, Audio Element 와 함께 Video, Audio 를 재생
- Offline 을 지원하는 API
- Web Application 이 특정 프로토콜 또는 Media Type 을 등록할 수 있는 API
- Drag & Drop API
- History 정보를 노출하는 API