#### CSS 방법론이란 ?

> 웹이 더욱 발전하고 대규모 프로젝트가 많아짐에 따라서 복잡한 설계의 필요성을 느끼지 못했던 CSS도 다양한 방법론들이 생기기시작했다.
> 대표적으로 SMACSS,BEM,OOCSS 3가지 방법론이 있으며, 다음과 같은 지향점을 갖는다.
> - 코드의 재사용성 향상
> - 쉬운 유지보수
> - 확장성 향상
> - 클래스명으로 무슨의미인지 예측되도록 작성

##### SMACSS(Scalable and Modular Architecture for CSS)

정의 : 

- CSS에 대한 확장형 모듈식 구조
- 하나의 스타일 가이드이다.

목적 : 

- class명을 통한 예측
- 재사용성
- 쉬운 유지보수
- 확장 가능

규칙 : 

- 기본스타일에는 !important를 쓰지않는다.
- 레이아웃관련 스타일은 class명에 l-를 붙인다.

```css
.l-fixed #content{
    width: 600px;
    margin-right:10px;
}

.l-fixed #aside{
    width: 200px;
}
```

- 모듈관련 스타일(재사용 요소)는 재사용을 위해 id 셀렉터와 element를 사용하지않는다.
- 만약 element 셀렉터를 사용한다면 child 셀렉터를 사용한다.

```css
.folder > span { 
    padding-left:20px;
    background:url(icon.png);
}
```

- 상태(active,hidden,expend,hover)를 나타내는 스타일은 앞에 is- 또는 s-를 붙인다.

```css
.btn{
    display: inline-block;
    background:#ddd;
    border-radius:4px;
}
.btn.is-active{
    background:#43f837;
}
.btn-is-hidden{
    display:none;
}
```

- 테마관련 스타일은 사이트 전반 look and feel을 제어한다.
- 기존 스타일을 재선언하여 사용할 수 있으며, 적용범위가 넓은 테마는 theme-를 붙여 사용한다.

```css
.mod {
    border: 1px solid;
}

.mod {
    border-color: blue;
}
```

주의사항 : 
- 파생된 css 셀렉터 사용금지
- ID 셀렉터 사용금지
- !important 사용금지
- class이름은 의미있고, 이해가 쉽게 선언

##### BEM(Block, Element, Modifier)

![image](https://user-images.githubusercontent.com/49670068/110444951-f4ae9f80-8100-11eb-9fa0-c9b89a2e95a3.png)


정의 : 

- Block(요소를 덮는 컨테이너), Element(요소들), Modifier(다른 공간에서 동일한 요소에대한 스타일정의)를 규칙에 따라 작성한다.
- OOP와 유사하다.
- 오직 class 명만 사용가능하다.
- 하이픈과 밑줄문자를 사용한다.

Block :

- block은 문단전체에 적용된 element 또는 element를 담는 컨테이너를 말한다.
- 예로는 logo, login form, menu, search form, content, footer 등이 있다.

Element : 

- Element는 block안에서 특정기능을 수행하는 element이다.
- element는 두개의 밑줄표시로 연결해 block 다음에 작성한다.

```css
.header__logo{}
.header__menu{}
.header__search{}
.header__login{}
```

- block 이름이나 element 이름이 길 경우 하이픈으로 연결한다.

```css
.block-name__element-name
```

Modifier :

- Modifier는 block 또는 element의 속성이다.
- 이 속성은 block과 element의 외관 또는 상태를 변경한다.
- class명은 --를 추가해 modifier 추가

```css
.block--modifier{}
.block__element--modifier{}
```

- 탭메뉴가 다른 영역에서 다른 스타일로 사용된다면 메인속성을 복사하거나 sass의 @extend를 활용한다.

```css
.header__navigation {
    background: #008cba;
    padding: 1px 0;
    margin: 2px 0;
}
.header__navigation--secondary{
    @extend .header_navigation;
    background: #dfe0e0;
}
```

- class명은 구체적이고 명료해야한다.

##### OOCSS (Object Oriented CSS)

정의 : 

- CSS를 모듈 방식으로 코딩하여 중복을 최소화하는 기법

주요 원리 : 

- 구조와 외양(skin)을 분리
- 외양을 분리하여 결합 시키면 다양한 결과물을 얻을 수 있음.

```css
.button {
    ...
}
.box {
    ...
}
.widget {
    ...
}
.skin {
    background: linear-gradient(#ccc,#222);
    box-shadow: rgba(0,0,0,.5) 2px 2px 5px;
}
```

- 컨테이너와 컨텐츠 분리

```css
.globalwidth{
    position:relative;
    padding-left:20px;
    ...
    width:980px;
    overflow:hidden;
}
.header-inside{
    padding-top:20px;
    padding-bottom:20px;
    height:260px;
}
```
```html
<div class="header-inside globalwidth"></div>
<div class="main globalwidth"></div>
<div class="footer-inside globalwidth"></div>
```

클래스 이름 규칙 : 

- 짧게
- 스타일 작동방식을 알수 있게
- 어떤 모듈인지
- 대부분 사이트에 적용되게
- 종이나 다른매체가 아닌 모니터 기준으로


```html
//기존 CSS
<style>
.twitterbtn {
    border:3px solid #000;
    padding:10px 20px;
    color:#fff;
    border-radius: 10px;
    background:red;
}

.facebookbtn{
    border:3px solid #000;
    padding: 10px 20px;
    color:#fff;
    border-radius:10px;
    background:gray;
}
</style>

<a href="#" class="twitterbtn">Twitter</a>
<a href="#" class="facebookbtn">Facebook</a>
//OOCSS적용
<style>
.btnbase{
    border:3px solid #000;
    
}
</style>
<a href="#" class="btnbase twitter">Twitter</a>
<a href="#" class="btnbase facebook">Facebook</a>
```
> 중복되는 스타일이 많은경우 다음처럼 OOCSS를 적용하여 간결하게 만들수 있다. 다만 HTML코드는 살짝 복잡해진다.

##### OOSASS (OOCSS + Sass)

- OOCSS의 단점을 극복하기 위해 활용
- @extend를 사용하면 html코드를 간결하게 할수 있다.

```css
.btnbase{
    border:3px solid #000;
    padding:10px 20px;
    color:#fff;
    border-radius:10px;
}
.twitterbtn {
    @extend .btnbash;
    background:red;
}
.facebookbtn {
    @extend .btnbase;
    background:gray;
}
```

```html
<a href="#" class="twitterbtn">Twitter</a>
<a href="#" class="facebookbtn">Facebook</a>
```

##### 결론

- 각 방법론은 장단점이 존재하기 때문에 프로젝트에 따라 최적의 방법론을 사용하거나 조합하여 사용하면 된다.