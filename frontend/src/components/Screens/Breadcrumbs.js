import React,{useRef} from "react";
import {Link} from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
// import $ from "jquery";
// import "./jquery.breadcrumbs-generator.min";

const Breadcrumbs = () => {
  const sidebar = useRef("0px");
  const breadcrumbs = useBreadcrumbs();
  // $(function () {
  //   $("#breadcrumb").breadcrumbsGenerator({
  //     sitemaps: "#sitemaps",
  //     index_type:"index.html"
  //   });
  // });

  function openSidebar(){
    sidebar.current.style.width = '250px';
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
          <Link to="#">About Us</Link>
          <Link to="#">Contact Us</Link>
        </div>
      </div>
    </>
  );
};

export default Breadcrumbs;
