import React, { Component } from 'react';
import fork from '../fork.svg';
import './Header.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Home from "../Containers/Home";
import TablesPage from "../Containers/Tables";
import Login from "../Login";
import API from "../utils/API";

export default class Header extends Component {
 

  constructor(props){
    super(props);

    this.state ={
      headers: null,
    };
  }
  

  async componentDidMount(){
    const response = await API.get("/")
    //console.log(response);
    const headerData = response.data;
    //console.log(headerData);
    this.setState({headers: headerData}); 
  }
  /*async componentDidUpdate(){ //Will cause infinite loop because of setState use

      const response = await API.get("/")
      //console.log(response);
      const headerData = response.data;
      //console.log(headerData);
      this.setState({headers: headerData}); 

  }*/

  render() {
    if(this.state.headers == null) return <p>loading...</p>;
    const fRoute = "/" + this.state.headers.head3;
    return (
      <HashRouter>
        <header className="Header">
          <img src={fork} className="App-logo" alt="logo" />
          <nav className="navbar">
            <NavLink to="/Home">{this.state.headers.head1}</NavLink>
            <NavLink to="/Tables">{this.state.headers.head2}</NavLink>
            <NavLink to={fRoute}>{this.state.headers.head3}</NavLink>
          </nav>
        </header>
        <div className="Content">
          <Route path="/Home" component={Home}/>
          <Route path="/Tables" component={TablesPage}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Signout" component={Home}/>
        </div>
      </HashRouter>
    );
    }
}
