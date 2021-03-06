import React, { Component } from 'react';
import AvatarGenerator from 'react-avatar-generator';
class Main extends Component {
  constructor(props) {
    super(props);
    this.avatarGenerator = null;
  }
  
 


render(){
return(
    <div className="container-fluid mt-5">
    <div className="row">
      <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth:'500px'}}>
        <div className="content mr-auto ml-auto" >
        <h3 style={{marginTop:'30px', textAlign:'center', fontWeight:'700'}}>Welcome to our Social App</h3>
        <p style={{textAlign:'center'}}>Feel free to Express yourself!!!</p>
<form onSubmit={(event) =>{
    event.preventDefault()
    const content = this.postContent.value
  this.props.createPost(content)
}}>
<div className="form-group mr-sm-2">
    <input
    id="postContent"
    type="text"
    ref={(input) =>{this.postContent = input}}
    className="form-control"
    placeholder="What's on your mind" 
    required/>
</div>
<button type="submit" className="btn  btn-block shadow" onClick={this.randomize}>SHARE</button>



</form>
<p></p>
         {this.props.posts.map((post, key ) => {
           return (
            <div className="card mb-4" key={key}>
              <div className="card-header" >
              <AvatarGenerator
               ref={(el) => {
                this.avatarGenerator = el;
              }}
              colors={['#007bff', '#c900ff', '#ae00a5']}
              backgroundColor="#313646"
              width={20}
              height={20}
              />  <small className="c1 bold">{post.author}</small>
              </div>
              <ul id="postList" className="list-group list-group-flush">
              <li className="list-group-item">
                <p>{post.content}</p>
              </li>
              <li key={key} className="list-group-item py-2">
               <small className="float-left mt-1 text-muted">
                TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
               </small>
               <button className="btn btn-link btn-sm float-right "
               name={post.id}
               onClick={(event) => {
                 let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                 console.log(event.target.name, tipAmount)
                 this.props.tipPost(event.target.name, tipAmount)
               }}
               
               >
               
                   TIP 0.1 ETH
                
               </button>
              </li>
              </ul>



            </div>)
         
          })}
        </div>
      </main>
    </div>
    </div>
   
  
  );



}
}
export default Main;