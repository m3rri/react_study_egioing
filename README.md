### 생활코딩 강의 참조
#### url▶ https://www.youtube.com/playlist?list=PLuHgQVnccGMCRv6f8H9K5Xwsdyg4sFSdi
***
### 목차
* <a href="#con1">1. 개발환경</a>
* <a href="#con2">2. 컴포넌트 제작</a>
  * <a href="#con2-1">컴포넌트</a>
  * <a href="#con2-2">prop</a>
  * <a href="#con2-3">state</a>
  * <a href="#con2-4">key</a>
* <a href="#con3">3. 이벤트</a>
***
### <div id="con1">1. 개발환경</div>
* Create React App 설치하여 사용하였음
```
>npm install -g create-react-app
```
* terminal에서 app 실행  
결과는 http://localhost:3000 으로 참조. public/index.html이 실행된 결과가 나옴
```
>npm run start
```
* index.html 및 index.js에서 id="root"를 확인하여 구조를 파악  
각 react component에서 return 할때는 반드시 하나의 태그로 감싸줘야함 (`<div className="App"></div>`)
```html
<!-- index.html -->
<div id="root"></div>
```
```javascript
//index.js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
//App.js
class App extends Component {
  render(){
    return (
      <div className="App">
      </div>
    );
  }
}
```
* 배포
```
>npm run build         :: index.html 파일을 압축 및 번들링. 실제 운영시에는 build directory를 사용하게 됨
>npm install -g serve  :: 웹서버 설치
>npm serve -s build    :: 웹서버 실행. -s build : build directory를 root directory로 사용하겠다는 의미
```
***
### <div id="con2">2. 컴포넌트 제작</div>
* <div id="con2-1">컴포넌트란???</div>
```html
<!-- pure.html -->
<html>
    <body>
        <header>
            <h1>WEB</h1>
            world wide web!...
        </header>

        <nav>
            <ul>
                <li><a href="1.html">HTML</a></li>
                <li><a href="2.html">css</a></li>
                <li><a href="3.html">js</a></li>
            </ul>
        </nav>
        <!--? <Navigation /> ?-->

        <article>
            <h2>HTML</h2>

            HTML is hypertext markup language.
        </article>
        <!--? <Article /> ?-->
    </body>
</html>
```
__🔼 내용을 🔽와 같이 React 컴포넌트화 할 수 있음__
```javascript
//Subject.js
Class Subject extends Component{
    render(){
        return (
            <header>
                <h1>WEB</h1>
                world wide web!...
            </header>
        )
    }
}
//TOC.js
Class TOC extends Component{
    render(){
        return (
            <nav>
                <ul>
                    <li><a href="1.html">HTML</a></li>
                    <li><a href="2.html">css</a></li>
                    <li><a href="3.html">js</a></li>
                </ul>
            </nav>
        )
    }
}
//Content.js
Class Content extends Component{
    render(){
        return (
            <article>
                <h2>HTML</h2>

                HTML is hypertext markup language.
            </article>
        )
    }
}
```
__🔼내용을 🔽와 같이 상위 컴포넌트에서 적용하면 됨__
```javascript
import Subject from './components/Subject';
import TOC from './components/TOC';
import Content from './components/Content';

class App extends Component {
    render(){
        return (
            <div className="App">
                <Subject />
                <TOC />
                <Content />
            </div>
        )
    }
}
```
* <div id="con2-2">props 란???</div>  

  * 같은 컴포넌트를 사용하여도 data에 따라 다른 결과를 보여주기 위해 사용됨<br/>
    `{this.props.propName}`

```javascript
//Subject.js
Class Subject extends Component{
    render(){
        return (
            <header>
                <h1>{/*WEB*/}{this.props.title}</h1>
                {/*world wide web!...*/}{this.props.sub}
            </header>
        )
    }
}
//App.js
class App extends Component {
    render(){
        return (
            <div className="App">
                <Subject title="WEB" sub="world wide web!..."/>
                <TOC />
                <Content />
            </div>
        )
    }
}
```
* <div id="con2-3">state 란???</div>  

  * 컴포넌트가 살아있는 동안 변화가 가능한 객체. props와 유사하게 data에 따라 다른 렌더링을 하기 위해서 사용됨  
  * state의 값이 변경되면 해당 컴포넌트의 render()가 다시 실행됨  
  ▶ 그러므로 render()함수 내부에서 변경된 state에 따라 props 및 state를 다시 작성하여 하위 컴포넌트를 렌더링 할 수 있음
  * 생성자 함수 내부에서는 `this.state = {state1: 'value1', state2: 'value2'};` 와 같이 초기화 가능
  * 생성자 함수 외부에서는 `this.setState({state1: 'val1', state2: 'val2'});` 와 같이 값 할당 해야함  
  ❔ : `this.stste.stateName = 'some value';` 이렇게 해도 리액트에서 값이 변경된 것을 모르기 때문에 자동으로 다시 렌더링되지 않음
  * React에서는 최신 JS 문법에서 ``${jsVariable}`` 이렇게 썼던것에서 backtick과 $를 생략하고 변수룰 `{jsVariable}`과 같이 사용할 수 있음
```javascript
//App.js
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            subject: {title: 'WEB', sub:'world wide web!...'}
        }
    }
    render(){
        return (
            <div className="App">
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                />
                <TOC />
                <Content />
            </div>
        )
    }
}
```
* <div id="con2-4">key 란???</div>  

  * React가 어떤 항목`:형제 node의 관계에 있는 동일한 element`을 변경|추가|삭제할 때 그들을 식별하기 위해서 사용함
  * 직접적으로 HTMLelement에 어떤 id나 property를 주지는 않는다.  
  react code 작성할 때 `key={해당 노드의 식별할 수 있는 id값}` 을 추가해줘야 react 에러가 발생하지 않음
***
### <div id="con3">3. 이벤트</div>
