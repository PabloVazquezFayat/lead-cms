import React, { useState, useEffect } from "react";
import NavbarModal from "./NavbarModal";

export default function Navbar(props) {


  const [data, setData] = useState(props.data || {});

  const { facebook, instagram, linkedin, tagline, twitter, logo } = data || {};

  useEffect(()=> {
    setData(props.data);
  }, [props.data])

  return (
    <div className="navbar-container navbar-capture">  
      <NavbarModal data={data} setData={setData}/>
      <div className="navbar-header">
        <div className="navbar-header-content">
          <p>{tagline}</p>
          <div className="navbar-sm-links-container">
            <p>follow us</p>
            <ul>
              {facebook ? (
                <li>
                  <i className="fab fa-facebook-f"></i>
                </li>
              ) : (
                ""
              )}
              {instagram ? (
                <li>
                  <i className="fab fa-instagram"></i>
                </li>
              ) : (
                ""
              )}
              {twitter ? (
                <li>
                  <i className="fab fa-twitter"></i>
                </li>
              ) : (
                ""
              )}
              {linkedin ? (
                <li>
                  <i className="fab fa-linkedin-in"></i>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="navbar-content">
        <div className="navbar-logo-container">
          <img src={logo} alt="" />
          <h1>Lead Engineering Contractors</h1>
        </div>

        <div className="navbar-navigation">
          <ul>
            <li>Lead</li>
            <li>About Us</li>
            <li>Projects</li>
            <li>News</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
