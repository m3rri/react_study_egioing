### 생활코딩 강의 참조
#### url▶ https://www.youtube.com/playlist?list=PLuHgQVnccGMCRv6f8H9K5Xwsdyg4sFSdi
***
#### 1. 개발환경
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
#### 2. 컴포넌트 제작
