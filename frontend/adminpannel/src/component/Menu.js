import React,{Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticated} from "../auth/helper";

const activeTab = (history, path)=>{
  let parts = history.location.pathname.split('/');
  parts.pop();
  let pathname = parts.join('/');
  if (pathname === path){
      return "dropdown active"
  }else{
      return "dropdown"
  }
}
const activeList = (history, path)=>{
  if (history.location.pathname === path){
    return "active"
  }else{
    return ""
  }
}
const listdisplay = [
  {
    displayname:"Category",
    url:"/admin/category",
    icon:"fa fa-list"
  },
  {
    displayname:"product",
    url:"/admin/product",
    icon:"fa fa-user"
  },
]

 const Menu = ({
     history
 }) =>(
    <div className="main-sidebar sidebar-style-2">
    <aside id="sidebar-wrapper">
      <div className="sidebar-brand">
        <a href="index.html"> <img alt="site-logo" src="assets/img/logo.png" className="header-logo" /> <span
            className="logo-name">Otika</span>
        </a>
      </div>
      <ul className="sidebar-menu">
        <hr/>
        <li className={activeTab(history,"/admin")}>
          <Link   className="nav-link" to="/admin/dashboard"><i className="fa fa-database"></i><span>Dashboard</span></Link>
        </li>
        <li className="menu-header">Component</li>
        {listdisplay.map((list,index)=>{
            return(
              <li key={index} className={activeTab(history,list.url)}>
                <a href="" className="menu-toggle nav-link has-dropdown">
                  <i className={list.icon}></i>
                  <span>{list.displayname}</span>
                </a>
                <ul className="dropdown-menu">
                  <li className={activeList(history,list.url.concat("/create"))}>
                    <Link   className="nav-link" to={list.url.concat("/create")}> Create </Link>
                  </li>
                  <li className={activeList(history,list.url.concat("/create"))}>
                    <Link   className="nav-link" to={list.url.concat("/list")}> List </Link>
                  </li>
                </ul>
              </li>
            )
          })}
      </ul>
    </aside>
  </div>
);
export default withRouter(Menu);