import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./News.css";
import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import { Badge, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// import { Scrollbar } from "react-scrollbars-custom";

const News = (params) => {
  const [DataResponse, setDataResponses] = useState();
  const [DataUmum, setDataUmum] = useState();
  const [dataKategori, setDataKategori] = useState();

  const axios = require("axios");
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/news?instansi_id=2&per_page=6")
      .then(function (Umum) {
        console.log("console ini0: " + Umum.data.data.data);
        setDataUmum(Umum.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/news?instansi_id=2&per_page=3")
      .then(function (response) {
        console.log("console ini1: " + response.data.data.data);
        setDataResponses(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/news/categories/2")
      .then(function (response) {
        console.log("console ini2: " + response.data.data);
        setDataKategori(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function handleLength(valeu, lengths) {
    if (valeu.length < lengths) {
      return valeu;
    } else {
      return valeu.substring(0, lengths);
    }
  }
  return (
    <Fragment>
      <Row>
        <Col sm={5}>
          <h1 className='text-size'>Berita Terbaru___ </h1>
          <hr />
          <div className='style'>
            {console.log("console ini :" + DataResponse)}
            {DataResponse &&
              DataResponse.map((item, index) => {
                console.log("item", item);
                return (
                  <Fragment>
                    <Card>
                      <Card.Img
                        variant='top'
                        src={item.image_file_data}
                        className='size-image'
                        size-image
                      />
                      <Card.Body>
                        <Card.Title className='card-title'>
                          {handleLength(item.title, 50)}....
                        </Card.Title>
                        <Card.Text className='card-text'>
                          {handleLength(item.intro, 120)}....{" "}
                        </Card.Text>
                        <Link to={""}>see more</Link>
                      </Card.Body>
                    </Card>
                  </Fragment>
                );
              })}
          </div>
        </Col>
        <Col md={4}>
          <h1>Berita Umum</h1> <hr />
          {/* <Scrollbar className='style-scroll'> */}
          <Card className='style-accordion'>
            <Accordion>
              {console.log("console ini kategori:" + DataUmum)}
              {DataUmum &&
                DataUmum.map((item, index) => {
                  console.log("terbaru", item);
                  return (
                    <>
                      <>
                        <Accordion.Item eventKey={index}>
                          <Accordion.Header>{item.title}</Accordion.Header>
                          <Accordion.Body>{item.intro}</Accordion.Body>
                        </Accordion.Item>
                      </>
                    </>
                  );
                })}
            </Accordion>
            <Container>
              <Button variant='primary' size='sm'>
                Lihat Berita Lain
              </Button>
            </Container>
          </Card>
          {/* </Scrollbar> */}
        </Col>

        <Col md={3}>
          <h1>Kategori___</h1>
          <hr />
          <ListGroup as='ol' numbered>
            {console.log("console ini kategori33:" + dataKategori)}
            {dataKategori &&
              dataKategori.map((item, index) => {
                console.log("kategori", item);
                return (
                  <>
                    <ListGroup.Item
                      as='li'
                      className='d-flex justify-content-between align-items-start'>
                      <div className='ms-2 me-auto'>
                        <div className='fw-bold'>{item.nama_kategori}</div>
                      </div>
                      <Badge bg='primary' pill>
                        14
                      </Badge>
                    </ListGroup.Item>
                  </>
                );
              })}
          </ListGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default News;
