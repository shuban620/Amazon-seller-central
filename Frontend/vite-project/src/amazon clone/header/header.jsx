import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./header.css";
import "./bootstrap.min.css";
import { Link } from "react-router-dom";
import { set } from "mongoose";

const header = () => {
  // const [sidenavWidth, setSidenavWidth] = useState("0");

  // const toggleSidenav = () => {
  //   setSidenavWidth(sidenavWidth === "250px" ? "0" : "250px");
  // };

  // const closeNav = () => {
  //   setSidenavWidth("0");
  // };

  const toggleDropdown = (e) => {
    const dropdownContent = e.target.nextElementSibling;
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  };

  const secondtoggleDropdown = (e) => {
    const dropdownContent = e.target.nextElementSibling;
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  };

  return (
    <header className="header shadow-sm" style={{ position: "fixed",zIndex:'999', top: "0", left: "0", width: "100%"}}>
      

      <div className="container-fluid d-flex align-items-center justify-content-between border-bottom">
        <div className="d-flex align-items-center gap-3">
          <div>
            <span className="openbtn border-end p-3" 
            // onClick={toggleSidenav}ru
            >&#9776;</span>
          </div>

          {/* <--------------image title of the website----------> */}
          <img src="/Amazon-seller-central.svg" style={{ width: '25%' }} className="" alt="" />
          <div className="border-start p-2">
            <p className="bg-white rounded-1 p-1 m-1 text-dark border-0" >IMMERSE WING & CO STORE | U...</p>
          </div>
        </div>

        <div className="d-flex justify-content-between" style={{gap:'10rem'}}>
          <div className="d-flex justify-content-center gap-0">
            <input type="search" className="searchbar my-2 p-2" placeholder="Search" /><div className="p-2 my-2" style={{ backgroundColor: '#008096' }}><i className="fa-solid fa-magnifying-glass"></i></div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="nav-link" href="#">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="nav-link" href="#">
              <i className="fa-solid fa-gear"></i>
            </div>
            <div className="nav-link">
              <button className="dropdown-btn btn text-white d-flex gap-2 text-start fs-6" onClick={secondtoggleDropdown}>
                <a>EN</a> <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-container btn" style={{ display: "none", backgroundColor: "#ffffff" }}>
                <div>
                  <a href="#" className="text-dark text-start fs-6">
                    URDU
                  </a>
                </div>
                <div>
                  <a href="#" className="text-dark text-start fs-6">
                    English
                  </a>
                </div>
                <div>
                  <a href="#" className="text-dark text-start fs-6">
                    FRENCH
                  </a>
                </div>
                <div>
                  <a href="#" className="text-dark text-start fs-6">
                    SPANISH
                  </a>
                </div>
              </div>
            </div>
            <div>
              <a className="text-white text-decoration-none">Help</a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4">
        <nav className="d-flex justify-content-between gap-5" aria-label="breadcrumb">
          <div className="d-flex gap-1">
            <div>
              <button className="p-2" style={{ backgroundColor: "#002f35", color: "#ffffff", border: "none" }}><i className="fa-solid fa-bookmark"></i></button>
            </div>
            <div>
              <button className="p-2" style={{ backgroundColor: "#002f35", color: "#ffffff", border: "none" }}>Campaign Manager</button>
            </div>
            <div>
              <button className="p-2" style={{ backgroundColor: "#002f35", color: "#ffffff", border: "none" }}>Bussiness Reports</button>
            </div>
            <div>
              <button className="p-2" style={{ backgroundColor: "#002f35", color: "#ffffff", border: "none" }}>Manage Orders</button>
            </div>
            <div>
              <button className="p-2" style={{ backgroundColor: "#002f35", color: "#ffffff", border: "none" }}>FBA Inventory</button>
            </div>
            <div>
              <button className="p-2" style={{ backgroundColor: "#002f35", color: "#ffffff", border: "none" }}>Shipments</button>
            </div>
            <div>
              <button className="p-2" style={{ backgroundColor: "#002f35", color: "#ffffff", border: "none" }}>Promotions</button>
            </div>
            <div>
              <button className="p-2" style={{ backgroundColor: "#002f35", color: "#ffffff", border: "none" }}>Brand Analytics</button>
            </div>
          </div>
          <div>
            <button className="p-1 m-2" style={{ backgroundColor: "#002f35", color: "#ffffff", border: '2px solid #55767d' }}>Edit</button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default header;