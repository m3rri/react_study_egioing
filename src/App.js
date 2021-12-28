import React, {Component} from 'react';
import './App.css';
import Subject from './components/Subject';
import TOC from './components/TOC';
import Control from './components/Control';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  //render() 보다 먼저 실행되면서 render()에서 사용할 변수를 미리 정의하는 부분임. 생성자 함수니까
  constructor(props){
    super(props);
    //생성자 내부에서는 this.state로 직접 할당하여 초기화 할 수 있으며, 생성자 외부에서 사용할 때는
    //반드시 this.setState()를 사용해야함
    this.state = {
      mode: 'welcome',
      selected_content_id: 1,
      subject: {title: 'WEB', sub: 'world wide web!'},
      welcome: {title: 'welcome', desc:'Hello React!'},
      contents: [
        {id: 1, title: 'HTML', desc: 'HTML is HyperText ...'},
        {id: 2, title: 'CSS', desc: 'CSS is for design ...'},
        {id: 3, title: 'JS', desc: 'JS is for interactive ...'}
      ]
    }
  }

  getReadContent(){
    return this.state.contents.filter(function(c){
      return c.id === this.state.selected_content_id;
    }.bind(this))[0];
  }

  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    }else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      if(_content){
        _title = _content.title;
        _desc = _content.desc;
      }
      _article = <ReadContent title={_title} desc={_desc} />;
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        var _contents = Array.from(this.state.contents);
        var maxId = Math.max(..._contents.map(function(c){
          return c.id;
        }))+1;
        this.setState({
          contents: _contents.concat({id: maxId, title: _title, desc: _desc}),
          mode: 'read',
          selected_content_id: maxId
        });
      }.bind(this)}/>
    }else if(this.state.mode === 'update'){
      var _content = this.getReadContent();
      if(_content){
        _article = <UpdateContent
                      data={_content}
                      onSubmit={function(_id, _title, _desc){
                        var _contents = Array.from(this.state.contents);
                        _contents.forEach(function(c, i){
                          if(c.id === _id){
                            _contents[i] = {id: _id, title: _title, desc: _desc};
                          }
                        });
                        
                        this.setState({contents: _contents, mode: 'read'});
                      }.bind(this)}
                   />
      }
    }

    return _article;
  }

  render(){
    console.log("App render");

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function(){//개발자 지정 이름
            this.setState({mode: 'welcome'});
          }.bind(this)}
        />
        <TOC data={this.state.contents} onChangePage={function(id){
          this.setState({
            mode: 'read',
            selected_content_id: id
          });
        }.bind(this)}/>
        <Control onChangeMode={function(mode){
          if(mode==='delete'){
            if(window.confirm('Do you want to delete item?')){
              var _content = Array.from(this.state.contents);
              var i = 0;
              while(i<_content.length){
                if(_content[i].id === this.state.selected_content_id){
                  _content.splice(i,1);
                  break;
                }
                i++;
              }
              this.setState({mode: 'welcome', contents: _content});
              alert('deleted!');
            }
          }else{
            this.setState({
              mode: mode
            });
          }
        }.bind(this)}/>
        {this.getContent()}
      </div>
    );
  }
}

export default App;