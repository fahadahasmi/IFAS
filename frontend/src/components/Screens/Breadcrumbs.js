import React,{useRef} from "react";
import {Link} from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const Breadcrumbs = () => {
  const sidebar = useRef("0px");
  const breadcrumbs = useBreadcrumbs();
  

  function openSidebar(){
    sidebar.current.style.width = '300px';
  }

  function closeSidebar(){
    sidebar.current.style.width = '0px';
  }

  return (
    <>
      <div>
        <div className="breadcum">
          <ul id="breadcumb">
            <li>
            {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
            </li>
          </ul>
          <span id="openNav" onClick={openSidebar}>
            <img src="https://img.icons8.com/fluency-systems-regular/25/000000/menu--v1.png"  alt="img"/>
          </span>
        </div>
        <div id="sideNav" ref={sidebar} >
          <Link to="#" id="closeNav" onClick={closeSidebar}>
            ×
          </Link>
          <div className="Profile">
            <img src="https://img.icons8.com/color/48/000000/test-account.png" alt="img"></img>
            <h2>ABCD</h2>
            <p>AnasImamShaikh@gmail.com</p>
          </div>
          <hr>
          </hr>
          
          <Link to="#">About Us</Link>
          <Link to="#">Contact Us</Link>
          <Link to="#">Help</Link>
          <Link to="#">About Developers</Link>
        </div>
      </div>
    </>
  );
};

export default Breadcrumbs;
