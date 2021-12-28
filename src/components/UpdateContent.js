import React, {Component} from 'react';

class UpdateContent extends Component{
    constructor(props){
      super(props);
      this.state = {
        title: this.props.data.title,
        desc: this.props.data.desc
      }
      this.inputFormHandler = this.inputFormHandler.bind(this);
    }

    inputFormHandler(e){
      this.setState({[e.target.name]: e.target.value});//최신 js 문법
    }

    render(){
        console.log("UpdateContent render");
      return (
        <article>
          <h2>Update</h2>
          <form action="/create_process" method="post"
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
                /*value={this.props.data.title}
                이렇게 작업하면 react가 아무 작업도 못하게 만듬
                왜냐하면 props는 read only라서!
                */
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
                {/* {this.state.desc} 그냥 html과는 다르기 때문에 각 태그별로 다시 공부..*/}
              </textarea>
            </p>
            <p><input type="submit"/></p>
          </form>
        </article>
      );
    }
}

export default UpdateContent;