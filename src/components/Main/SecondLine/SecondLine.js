import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./SecondLine.css";
import { React, useEffect, useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import { ListGroup } from "react-bootstrap";

const SecondLine = () => {
  const [DataPimpinan, setDataPimpinan] = useState(null);
  const [DataResponse, setDataResponses] = useState(0);
  const [BoxAlbum, setBoxAlbum] = useState([]);
  const [DataDokumen, setDataDokumen] = useState([]);

  const axios = require("axios");
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/2")
      .then(function (pimpinan) {
        setDataPimpinan(pimpinan.data.data.foto_kepala);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=2")
      .then(function (response) {
        rebuildAlbum(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/dokumen?instansi_id=2")
      .then(function (dokumen) {
        console.log("console dokumen: " + dokumen.data.data.data);
        setDataDokumen(dokumen.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function rebuildAlbum(response) {
    let album = [];
    let counterAlbum = 0;
    for (let i = 0; i < response.length; i++) {
      for (let k = 0; k < response[i].image_gallery_item.length; k++) {
        if (counterAlbum < 3) {
          counterAlbum++;
          album.push(response[i].image_gallery_item[k]);
        }
      }
    }
    setBoxAlbum(album);
  }

  function handleLength(valeu, lengths) {
    if (valeu.length < lengths) {
      return valeu;
    } else {
      return valeu.substring(0, lengths);
    }
  }
  return (
    <div className='style-secondline'>
      {" "}
      <Row>
        {console.log("BoxAlbum >> ", BoxAlbum)}
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
                <h3></h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <h3>Gallery___</h3>
          <hr />
          <div className='grid'>
            {BoxAlbum &&
              BoxAlbum.map((item, index) => {
                return (
                  <div>
                    <figure>
                      <img
                        className='style-gambar'
                        src={item.image_file_data}
                        alt='Chaffinch'
                      />
                      <figcaption>
                        {handleLength(item.description, 40)}....
                      </figcaption>
                    </figure>
                  </div>
                );
              })}
          </div>
          <Button variant='primary' size='sm'>
            Lihat Berita Lain
          </Button>
        </Col>
        <Col md={2}>
          <h3>Dokumen___</h3> <hr />
          <ListGroup>
            {DataDokumen &&
              DataDokumen.map((item, idx) => {
                return item.dokumen_item.map((itm, idx) => {
                  return (
                    <ListGroup.Item>
                      <a
                        target='_blank'
                        href={
                          `data:application/pdf;base64,${itm.dokumen_file_data}`
                        }>
                        {itm.dokumen_file_name}
                      </a>
                    </ListGroup.Item>
                  );
                });
              })}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default SecondLine;
