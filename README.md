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
* <a href="#con3">3. 이벤트 및 CRUD 구현 예제</a>
  * <a href="#con3-1">full code 설명</a>
  * <a href="#con3-2">.bind()</a>
  * <a href="#con3-3">concat() vs push()</a>
  * <a href="#con3-4">shouldComponentUpdate</a>
  * <a href="#con3-5">update form에서 data 조작</a>
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
  * **props is read only. it can't be modified.**
  * 상위 컴포넌트 ➡ 하위 컴포넌트로 명령/데이터 전달 : props  
    하위 컴포넌트 ➡ 상위 컴포넌트로 명령/데이터 전달 : setState()

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
### <div id="con3">3. 이벤트 및 CRUD 구현 예제</div>
<span id="con3-1"></span>
[App.js full source↗](https://github.com/m3rri/react_study_egioing/blob/master/src/App.js "GitHub")

```javascript
//App.js concentrate
/* ~ import ~ */
class App extends Component {
  /* constructor()
   * java의 생성자와 같이 클래스의 인스턴스가 생성될 때 가장 먼저 실행되는 함수이다.
   * 그렇기 때문에 이런저런 초기화를 하기 좋음
   */
  constructor(props){
    /* super(props)를 먼저 실행해야 이 다음 행부터 `this`를 사용할 수 있다.
     * props에 아무 값도 전달되지 않더라도 props를 작성해줌(관용적으로..)
     */
    super(props);

    /* 생성자 내부에서 state를 초기화 할 때만 this.state로 접근
     */
    this.state = {
      mode: 'welcome',
      selected_content_id: 1,
      subject: {title: 'WEB', sub: 'world wide web!'},
      welcome: {title: 'welcome', desc:'Hello React!'},
      contents: []
    }
  }

  getReadContent(){
    //this.state.contents에서 selected_content_id에 해당하는 1개 요소만 리턴
  }

  getContent(){
    var _title, _desc, _article = null;
    /* _article : jsx로 작성될 수 있는 component 및 element 자체도 변수로 사용 가능 */

    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    }else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content._title} desc={_content._desc} />;
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        var _contents = Array.from(this.state.contents);
        var maxId = /* ~ calculate max id number ~ */
        this.setState({
          contents: _contents.concat({id: maxId, title: _title, desc: _desc}),
          mode: 'read',
          selected_content_id: maxId
        });
      }.bind(this)}/>
        /* mode가 create였지만 read로 바꿔줌으로써
         * 생성된 id(maxId)의 내용을 바로 read할 수 있도록 setting
         */
    }else if(this.state.mode === 'update'){
      var _content = this.getReadContent();
      _article = <UpdateContent
                    data={_content}
                    onSubmit={function(_id, _title, _desc){
                      var _contents = Array.from(this.state.contents);
                      // ~ set new _contents logic ~                        
                      this.setState({contents: _contents, mode: 'read'});
                    }.bind(this)}
                  />
      /* TOC에서 해당 item을 클릭할 때 이미 selected_id이 변경되어 있으며,
       * mode만 read로 변경하면 업데이트 된 내용을 바로 read할 수 있음
       */
    }
    return _article;
  }

  render(){
    return (
      <div className="App">
        {/* setState({stateName: stateValue, ...})
          * 를 호출하면 리액트가 변화를 감지하여 render()를 다시 실행해줌
          * (this.state.stateName = stateValue;로 직접 변경해도 state가 바뀌긴 함)
          */}
        <Subject
          title={this.state.subject.title}
          sub  ={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode: 'welcome'});
          }.bind(this)}
        />
        {/* onChangePage : title, sub와 같이 props의 이름으로 개발자가 직접 지정할 수 있다.
          * component 내부에서는 아래와 같이 사용하게 됨
            <a href="/" onClick={function(e){ <-onClick : 원래 html에서 지원하는건 onclick인데 이건 리액트 문법임
              this.props.onChangePage(); <- 개발자 지정 함수명으로 호출함
            }.bind(this)}>
          */}
        {/* .bind(this) : Function.protytype.bind()으로 함수 블록 끝에서 사용할 수 있음
          * 함수 내부에서 `this`를 사용하는 경우 그 this를 특정 객체로 고정할 수 있게 됨
          * 추가 설명은 이 code block 다음에 기술
          */}

        <TOC data={this.state.contents} onChangePage={function(id){
          this.setState({
            mode: 'read',
            selected_content_id: id
          });
        }.bind(this)}/>
        {/* onChangePage 함수의 id 파라미터를 넘겨주는 곳은
          * TOC 컴포넌트가 구현된 js 파일에서 확인할 수 있음
          */}

        <Control onChangeMode={function(mode){
          if(mode==='delete'){
            if(window.confirm('Do you want to delete item?')){
              var _content = Array.from(this.state.contents);
              // ~ _content splice logic ~
              this.setState({
                  mode: 'welcome',
                  contents: _content
              });
              alert('deleted!');
            }
          }else{
            this.setState({
              mode: mode
            });
          }
        }.bind(this)}/>
        {/* Control.js 에서 각 링크별로 다른 mode를 onChangeMode 함수에 넘겨준다 */}
        
        {this.getContent()}
        {/* {} 블럭에서 함수도 호출하고 리턴된 jsx 객체를 컴포넌트처럼 사용도 가능 */}
      </div>
    );
  }
}
export default App;
```
* <div id="con3-2">.bind(object)의 구동방식 간단하게 정리</div>
```javascript
var obj = {
    name : 'hrkim',
    speakName: function(){
        console.log(this.name);
    },
    speakOtherName: function(){
        console.log(this.name);
    }.bind(obj2)
}
var obj2 ={
    name: 'hrkim2'
}
obj.speakName();     // hrkim
obj.speakOtherName();// hrkim2
```
* <div id="con3-3">Array.push()와 Array.concat() 비교</div>  

  * concat()은 원본 배열을 바꾸지 않으면서 연산한 뒤 생성되는 배열을 리턴함
  * push()는 원본 배열을 바꾸면서 연산뒤 생성되는 배열의 길이를 리턴함
```javascript
var array1 = [1, 2, 3];
console.log('array1.concat(4) 결과 : ', array1.concat(4));
console.log('array1.push(5) 결과 : ', array1.push(5));
console.log(' ');
array1.forEach(function(a, i){
    console.log(`${i}번째 요소 : ${a}`);
});
/* 결과 🔽
array1.concat(4) 결과 :  (4) [1, 2, 3, 4]
array1.push(5) 결과 :  4
  
0번째 요소 : 1
1번째 요소 : 2
2번째 요소 : 3
3번째 요소 : 5
*/

/* 객체별 깊은 복사 방법 */
var list1 = [1, 2, 3];
var list2 = Array.from(list1);
var list3 = list3;

var object1 = {name: 'hrkim'};
var object2 = Object.assign({}, object1);
var object3 = object1;

console.log(list1===list2);     //false
console.log(list1===list3);     //true
list3.push(4);
console.log(list1);             //[1,2,3,4]

console.log(object1===object2); //false
console.log(object1===object3); //true
object3.name = 'hrkim2';
console.log(object1);           //{name 'hrkim2'}
```
* <div id="con3-4">shouldComponentUpdate</div>  

  * 해당 컴포넌트에 관련된 변경사항은 없는데 상위 컴포넌트에서 render()가 다시 실행되면서 해당 컴포넌트의 render() 함수도 실행이 유도되는 경우를 방지
  * 실행 순서 : `shouldComponentUpdate(newProps, newState)` ➡ `render()`
  * 깊은 동일성 검사(전부 풀어헤쳐서 비교하는?) 또는 JSON.stringfy()를 사용하는 것을 권하지 않음  
  비효율적이고 성능 저하를 유발한다고 함
  * **_~..어떻게 저게 비교가 되는지 이해가 안된다..~_**
```javascript
class SubComponent extends Component {
  shouldComponentUpdate(np, ns){
    if(this.props.data === np.data){
      return false;  /* render()가 호출 되지 않음 */
    }else{
      return true;   /* render()가 호출 됨 */
    }
  }

  render(){
    return (<div></div>)
  }
}
```
* <div id="con3-5">update form에서 data 조작</div>  

  * props 속성은 read only 이기 때문에 `<tag value={this.props.value1}/>` 이렇게 작성하면 리액트에서 아무 작업도 할 수 없게 막는다.  
  따라서 `<tag value={this.state.title} onChange={function(e){this.setState({})}.bind(this)}/>`와 같이 사용하여 변경 가능한 state 속성으로 value를 세팅하고, onChange 이벤트를 사용하여 폼 입력값이 바뀔 때 마다 이벤트 호출되도록 한다.
  * 원래 `<textarea>write something..</textarea>` 이렇게 쓰지만 리액트에서는 `<textarea value='write something..'></textarea>` 이렇게 써야함.
```javascript
class UpdateContent extends Component{
    constructor(props){
      super(props);
      this.state = {
        title: this.props.data.title,
        desc: this.props.data.desc
      }
      this.inputFormHandler = this.inputFormHandler.bind(this);
      //🔼같은 함수가 반복되는 경우 미리 .bind(this)를 해서 여러번 안해도 되도록함
    }

    inputFormHandler(e){
      this.setState({[e.target.name]: e.target.value});
    }

    render(){
      return (
        <article>
          <h2>Update</h2>
          <form action="/create_process"
								method="post"
		            onSubmit={function(e){
		              e.preventDefault();
		              this.props.onSubmit(e.target.title.value, e.target.desc.value);
		            }.bind(this)}
          >
            <p>
              <input
                type="text"
                name="title"
                placeholder='title'
                value={this.state.title}
                onChange={this.inputFormHandler}
              />
            </p>
            <p>
              <textarea
                name="desc"
                placeholder='description'
                value={this.state.desc}
                onChange={this.inputFormHandler}
              >
              </textarea>
            </p>
            <p><input type="submit"/></p>
          </form>
        </article>
      );
    }
}
```
