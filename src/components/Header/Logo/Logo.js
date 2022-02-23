import React, { Fragment } from "react";
import "./Logo.css";
import { Row, Col } from "react-bootstrap";
import Socmed from "./Socmed/Socmed";

const Logo = () => {
  return (
    <Row>
      <Col className='logo'>
        <Fragment>
          <img className='style-image' src='Disdik.svg' />
          <Socmed />
        </Fragment>
      </Col>
    </Row>
  );
};

export default Logo;
