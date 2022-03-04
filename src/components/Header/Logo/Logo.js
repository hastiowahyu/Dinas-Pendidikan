import React, { Fragment, useRef, useEffect, useState } from "react";
import "./Logo.css";
import { Row, Col } from "react-bootstrap";
import Marquee from "react-fast-marquee";

const Logo = () => {
  let url = window.location.href;
  var lastPart = url.split("/").pop();
  console.log("url", lastPart);
  const logoRef = useRef();
  useEffect(() => {
    if (lastPart == "foto" || lastPart == "vidio") {
      console.log("logoRef", logoRef);
      logoRef.current.hidden = true;
    }
  }, []);

  const [DataPimpinan, setDataPimpinan] = useState([]);
  const axios = require("axios");
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/2")
      .then(function (pimpinan) {
        setDataPimpinan(pimpinan.data.data);
        console.log("console kepala gambar: " + pimpinan.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Row>
      <Col ref={logoRef} className='logo'>
        <Row>
          <Col className='style-marque'>
            <Marquee>
              --Selamat Datang DiDinas Pendidikan Lampung Timur--
            </Marquee>
          </Col>
          {/* <Col md={4}>
            <Socmed />
          </Col> */}
        </Row>
        <hr></hr>
        <Fragment>
          <img className='style-image' src='/Disdik.svg' />
        </Fragment>
      </Col>
    </Row>
  );
};

export default Logo;
