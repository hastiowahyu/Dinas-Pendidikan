import React, { Fragment } from "react";
import "./ThridLine.css";
import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
const ThridLine = () => {
  const [DataPimpinan, setDataPimpinan] = useState([]);
  const axios = require("axios");
  
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/2")
      .then(function (pimpinan) {
        setDataPimpinan(pimpinan.data.data);
        console.log("console kepala: " + pimpinan.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(DataPimpinan);

  return (
    <div>
      <hr />
      <Row>
        <Col md={5}>
          <Container>
            <img
              className='img-kepala'
              src={DataPimpinan.foto_kepala}
              alt='Card image cap'
            />
          </Container>
        </Col>
        <Col md={7}>
          <div className='card-body'>
            <h5 className='text-kepala'>Kepala {DataPimpinan.nama_instansi}</h5>
            <br />
            <h4 className='card-title'>
              {DataPimpinan.nama_kepala}
              <hr />
            </h4>
            <br />
            <h5>Tentang Instansi</h5>
            <p className='card-text'>{DataPimpinan.tentang}</p>
          </div>
        </Col>
      </Row>
      <hr />
    </div>
  );
};

export default ThridLine;
