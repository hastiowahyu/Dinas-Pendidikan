import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from './Logo/Logo'
import Navbars from './Navbar/Navbars'

const Header = () => {
  return (
    <>
      <Navbars />
      <Logo />
    </>
  );
};

export default Header;
