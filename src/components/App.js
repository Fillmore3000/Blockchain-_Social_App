import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json';
import Navbar from './Navbar';
import Main from './Main';
import loader from '../images/loader.gif';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()

}



  async loadWeb3(){
  if(window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.send('eth_requestAccounts') 
  }
else if (window.web3){
  window.web3 = new Web3(window.web3.currentProvider)
}
else {
window.alert('Non-Ethereum browser detected. you should consider trying meta mask')
}
}

async loadBlockchainData(){
 const web3 = window.web3
 const accounts = await web3.eth.getAccounts()
this.setState({account: accounts[0]})
console.log(accounts)
const networkId = await web3.eth.net.getId()
const networkData = SocialNetwork.networks[networkId]
if(networkData){
 const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
this.setState({socialNetwork})
const postCount = await socialNetwork.methods.postCount().call()
this.setState({postCount})
//load posts
for (var i = 1; i <= postCount; i++){
const post = await socialNetwork.methods.posts(i).call()
this.setState ({
posts: [...this.state.posts, post]
})
}
this.setState({
  posts: this.state.posts.sort((a,b) => b.tipAmount - a.tipAmount )
})
this.setState({ loading: false})
} else {
  window.alert('SocialNetwork contract not deployed to detected network')
}
}
createPost(content){
  this.setState({loading: true})
this.state.socialNetwork.methods.createPost(content).send({from: this.state.account})
.once('receipt', (receipt) => {
  this.setState({loading: false})
})

}
tipPost(id, tipAmount) {
  this.setState({ loading: true })
  this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
  .once('receipt', (receipt) => {
    this.setState({ loading: false })
  })
}

constructor(props){
super(props)
this.avatarGenerator = null;
this.state = {
  account:'',
  socialNetwork: null,
  postCount: 0,
  posts: [],
  loading: true,
  
}
this.createPost = this.createPost.bind(this)
this.tipPost = this.tipPost.bind(this)
}

  


  render() {
    return (
      <div>
       <Navbar account={this.state.account}/>
       {this.state.loading
       ? <div id="loader" className="text-center mt-6" style={{marginTop:'230px', textAlign:'center', fontWeight:'700'}}>
          <img src={loader} className="loader" style={{}}/>
         <p>Loading...</p></div>
       : <Main 
        posts={this.state.posts}
        createPost={this.createPost}
        tipPost={this.tipPost}
        avatarGenerator={this.avatarGenerator}
        />
       }
     
       
      </div>
    );
  }
}

export default App;
