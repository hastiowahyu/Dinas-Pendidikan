import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./SecondLine.css";
import { React, useEffect, useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const SecondLine = () => {
  const [DataPimpinan, setDataPimpinan] = useState(null);
  const [DataResponse, setDataResponses] = useState(0);
  const [BoxAlbum, setBoxAlbum] = useState([]);
  const [DataDokumen, setDataDokumen] = useState([]);

  const axios = require("axios");

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
        <Col md={8}>
          <h3>Gallery___</h3>
          <hr />
          <Card>
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
            <div className='style-btn'>
              <Link to={"/Beranda/GalleryFoto"} className='style-button'>
                Lihat Gambar Lain {">>"}
              </Link>
            </div>
          </Card>
        </Col>
        <Col md={4}>
          <h3>Dokumen___</h3> <hr />
          <ListGroup>
            {DataDokumen &&
              DataDokumen.map((item, idx) => {
                return item.dokumen_item.map((itm, idx) => {
                  return (
                    <ListGroup.Item>
                      <a
                        target='_blank'
                        href={`data:application/pdf;base64,${itm.dokumen_file_data}`}>
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
