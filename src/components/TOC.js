import React, {Component} from 'react';

class TOC extends Component{
    shouldComponentUpdate(a, b){
      console.log('===> TOC render shouldComponentUpdate');
      if(this.props.data === a.data){
        return false;
      }else{
        return true;
      }
    }

    render(){
        console.log("TOC render");
        var list = this.props.data.map(data=>{
            return <li key={data.id}>
                      <a href={"/content/"+data.id} onClick={function(_id, e){
                        e.preventDefault();
                        this.props.onChangePage(_id);
                      }.bind(this, data.id)}>{data.title}</a>
                  </li>;
        },[]);

      return (
        <nav>
          <ul>
            {list}
          </ul>
        </nav>
      );
    }
}

export default TOC;