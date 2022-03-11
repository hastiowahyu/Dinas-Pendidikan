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
    if (lastPart == "foto" || lastPart == "vidio" || lastPart == "pdf" || lastPart == "ProfileDisdik") {
      console.log("logoRef", logoRef);
      logoRef.current.hidden = true;
    }
  }, []);

  const [DataPimpinan, setDataPimpinan] = useState([]);
  const axios = require("axios");
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/7")
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
              --Selamat Datang Di {DataPimpinan.nama_instansi}--
            </Marquee>
          </Col>
        </Row>
        <hr></hr>
        <div className='pembungkus-logo'>
          <div className='pembungkus-gambar'>
            <img className='style-image' src={DataPimpinan.logo_instansi} />
          </div>
          <div className='text-logo'>
            <h1>{DataPimpinan.nama_instansi}{" "}Kabupaten Lampung Timur</h1>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Logo;
