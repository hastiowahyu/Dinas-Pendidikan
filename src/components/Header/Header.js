import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from './Logo/Logo'
import Navbars from './Navbar/Navbars'
import './Header.css'

const Header = () => {
  return (
    <div className="style-header">
      <Navbars />
      <Logo />
    </div>
  );
};

export default Header;
