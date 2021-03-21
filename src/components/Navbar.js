import React, { Component } from 'react';
import logo from '../images/main-logo.png';
import './App.css';
import AvatarGenerator from 'react-avatar-generator';

class Navbar extends Component {

render(){
return(
  
    <nav className="navbar navbar-dark fixed-top  flex-md-nowrap p-0 shadow c1" style={{backgroundColor:'#313646'}}>
    <a
      className="navbar-brand col-sm-3 col-md-2 mr-0"
      href="http://www.fillmore-xr.com"
      target="_blank"
      rel="noopener noreferrer"
    >
   <img src={logo} className="App-logo" style={{float:'left'}}/>
    </a>
    <div className="mr-auto">
    
      <div className="text-secondary">
      <AvatarGenerator
  colors={['#007bff', '#c900ff', '#ae00a5']}
  backgroundColor="#313646"
  width={21}
  height={21}
/><div id="account"> {this.props.account}</div>
      </div>
    </div>
    
   
  </nav>
  
  );



}
}
export default Navbar;