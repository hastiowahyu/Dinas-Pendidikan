import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./SecondLine.css";
import { React, useEffect, useState, Fragment } from "react";

const SecondLine = () => {
  const [DataPimpinan, setDataPimpinan] = useState(null);
  const [DataResponse, setDataResponses] = useState(0);

  const axios = require("axios");
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/2")
      .then(function (pimpinan) {
        console.log("console pimpinan: " + pimpinan.data.data.foto_kepala);
        setDataPimpinan(pimpinan.data.data.foto_kepala);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=2&per_page=1"
      )
      .then(function (response) {
        console.log("console ini galery1: " + response.data.data.data);
        setDataResponses(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className='style-secondline'>
      {" "}
      <Row>
        <Col md={3}>
          <h3>Pimpinan Disidik</h3>
          <hr />
          <Card>
            <Card.Img
              variant='top'
              className='style-pimpinan'
              src={DataPimpinan}
            />
            <Card.Body className='card-body'>
              <Card.Text className='card-text'>
                <h3>sosok pimpinan disdik</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <h3>Gallery___</h3>
          <hr />
          <div className='grid'>
            {DataResponse &&
              DataResponse.map((item, index) => {
                return item.image_gallery_item.map((itm, idx) => {
                  return (
                    <div>
                      <figure>
                        <img
                          className='style-gambar'
                          src={itm.image_file_data}
                          alt='Chaffinch'
                        />
                        <figcaption>
                          {itm.description}
                        </figcaption>
                      </figure>
                    </div>
                  );
                });
              })}
          </div>
        </Col>
        <Col md={2}>
          <h3>Dokumen___</h3> <hr />
        </Col>
      </Row>
    </div>
  );
};

export default SecondLine;
