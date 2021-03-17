#### SASS,SCSS란 ?

SCSS와 SASS는 CSS를 사용할때 발생하는 `선택자의 과용과 연산기능의 한계, 구문의 부재등 프로젝트 규모가 커지면서 복잡해지는 CSS작업을 쉽게`해주며, `가독성과 재사용성을 높여` 유지보수를 도와준다.
또한 태생적 한계를 보완하기 위해 다음과 같은 기능들을 제공한다.

- 변수사용

```scss
$color-primary: #e96900;
$url-images: "/assets/images/";
$w: 200px;

.box {
  width: $w;
  margin-left: $w;
  background: $color-primary url($url-images + "bg.jpg");
}
```

- 조건문 반복문

```scss
$width: 90px;
div {
  @if not ($width > 100px) {
    height: 300px;
  }
}
```

- Import

```scss
@import "header", "footer";
```

> css import와 sass import는 다르다.
> - css import는 호출마다 http요청으로 성능저하를 야기한다.
> - scss import는 css자체에 파일이 포함되어 성능저하가 없다.
> 다음의 경우는 CSS import 되는 경우이다.
> 1. 파일확장자가 css
> 2. 파일이름이 http://로 시작하는경우
> 3. url이 붙은경우
> 4. 미디어 쿼리가 있는경우

- Nesting(중첩)

```scss
.section {
  width: 100%;
  .list {
    padding: 20px;
    li {
      float: left;
    }
  }
}
```

> Complied to : 
> ```css
> .section {
>   width: 100%;
> }
> .section .list {
>   padding: 20px;
> }
> .section .list li {
>   float: left;
> }
> ```


- Mixin(재활용)

```scss
@mixin large-text {
  font-size: 22px;
  font-weight: bold;
  font-family: sans-serif;
  color: orange;
}
```

```scss
div {
  @include large-text;
}
```

- Extend/Inheritance : 기본 선택자의 속성을 상속받을 수 있습니다.

```scss
.btn {
  padding: 10px;
  margin: 10px;
  background: blue;
}
.btn-danger {
  @extend .btn;
  background: red;
}
```

> SASS와 SCSS의 차이점

> SCSS가 더 넓은 범용성과 CSS호환성을 장점으로 SCSS가 차후에 나왔다. (SCSS 사용권장)

SCSS를 전처리기라고도 하는데, 이는 SCSS자체로 브라우저에 적용되지 않고 CSS문법으로 컴파일을 통해 바꾼뒤 적용해야한다.

> webpack에서 sass-loader(node-sass도 설치)를 사용하여 변환이 가능하다.