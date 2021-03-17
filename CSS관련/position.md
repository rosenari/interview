#### CSS 레이아웃 - 위치 속성

position 속성은 요소에 사용되는 위치지정방법의 유형을 정합니다.

- static

요소가 기본적으로 정적으로 배치됩니다.
해당 요소는 top,bottom,left,right 속성의 영향을 받지 않습니다.
페이지의 정적인 흐름에 따라 배치됩니다.

```css
div.static {
  position: static;
  border: 3px solid #73AD21;
}
```

- relative

relative는 상대적으로 위치가 배치됩니다
top,left,right,bottom을 설정하면 해당 요소가 본래 위치에서 멀리 조정됩니다.

```css
div.relative {
  position: relative;
  left: 30px;
  border: 3px solid #73AD21;
}
```

- fixed

뷰포트를 기준으로 배치됩니다.
페이지가 스크롤 되더라도 항상 같은 위치에 유지됩니다.
top,right,bottom,left속성은 요소를 배치하는데 사용됩니다.
고정요소는 일반적으로 위치했을 페이지에 공백을 남기지 않습니다.

```css
div.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  border: 3px solid #73AD21;
}
```

- absolute

가장 가까운 위치에 있는 조상을 기준으로 배치됩니다.
조상이 없는 경우 문서 본문을 사용하고 페이지 스크롤과 함께 이동합니다.

```css
div.relative {
  position: relative;
  width: 400px;
  height: 200px;
  border: 3px solid #73AD21;
}

div.absolute {
  position: absolute;
  top: 80px;
  right: 0;
  width: 200px;
  height: 100px;
  border: 3px solid #73AD21;
}
```

- sticky

사용자의 스크롤 위치에 따라 배치됩니다.
주어진 오프셋 위치가 뷰포트에서 만날떄까지 relative로 배치되며, 만나게되면 fixed됩니다.

```css
div.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  background-color: green;
  border: 2px solid #4CAF50;
}
```