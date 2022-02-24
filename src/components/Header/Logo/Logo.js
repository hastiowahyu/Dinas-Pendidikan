import React, { Fragment, useRef, useEffect } from "react";
import "./Logo.css";
import { Row, Col } from "react-bootstrap";
import Socmed from "./Socmed/Socmed";

const Logo = () => {
  let url = window.location.href;
  var lastPart = url.split("/").pop();
  console.log("url", lastPart);
const logoRef = useRef();
  useEffect(() => {
    if (lastPart == 'gallery') {
      console.log('logoRef', logoRef)
      logoRef.current.hidden = true
    }
  }, [])



  return (
    <Row>
      <Col ref={logoRef} className='logo'>
        <Row>
          <Socmed />
        </Row>
        <Fragment>
          <img className='style-image' src='Disdik.svg' />
        </Fragment>
      </Col>
    </Row>
  );
};

export default Logo;
