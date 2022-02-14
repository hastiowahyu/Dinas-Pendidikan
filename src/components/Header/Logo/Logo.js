import React from "react";
import "./Logo.css";
import { Row, Col } from "react-bootstrap";
import Socmed from "./Socmed/Socmed";

const Logo = () => {
  return (
    <Row className='bg-light logo'>
      <Col>
        <div>
          <img className='style-image' src='Disdik.svg' />
        </div>
      </Col>
      <Col>
        <Socmed />
      </Col>
    </Row>
  );
};

export default Logo;
