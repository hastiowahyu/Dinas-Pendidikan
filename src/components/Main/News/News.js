import Card from "react-bootstrap/Card";
import "./News.css";
import React, { useEffect, useState, Fragment } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import { Badge, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment-with-locales-es6";
import { MdDateRange } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";

const News = () => {
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
      .get(
        "http://adminmesuji.embuncode.com/api/news?instansi_id=2&per_page=3 +"
      )
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
        <div className='col-12 col-md-5 layout-1833'>
          <div className='style-btn hot-news'>
            <h1 className='text-size'>Berita Terbaru</h1>
          </div>

          <div className='row'>
            {console.log("console ini :" + DataResponse)}
            {DataResponse &&
              DataResponse.map((item, index) => {
                console.log("item", item);
                return (
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4'>
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
                        <p className='card-date'>
                          <span>
                            {" "}
                            <MdDateRange size={20} />
                            {moment(item.created_at).format("L")}
                          </span>
                          &nbsp;
                          <span>
                            {" "}
                            <HiClipboardList size={20} />{" "}
                            {item.news_category_id}{" "}
                          </span>
                        </p>
                        <Card.Text className='card-text'>
                          {handleLength(item.intro, 120)}....{" "}
                        </Card.Text>
                        <Link to={`/news/DetailNews/${item.id}`}>
                          Read More
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
        <div className='col-12 col-md-4 layout-1833'>
          <div className='style-btn hot-news'>
            <h1>Berita Populer </h1>
          </div>

          <Container className='style-accordion'>
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

                          <Link to={`/news/DetailNews/${item.id}`}>
                            <Accordion.Body>{item.intro}</Accordion.Body>
                          </Link>
                        </Accordion.Item>
                      </>
                    </>
                  );
                })}
            </Accordion>
            <div>
              <Link to={"/Beranda/Berita"}>
                <p className='tag-p'>Berita Lainnya{">>"}</p>
              </Link>
            </div>
          </Container>
        </div>

        <div className='col-12 col-md-3 layout-1833' md={3}>
          <div className='style-btn hot-news'>
            <h1>Kategori Berita</h1>
          </div>
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
                        <div className='fw-bold'>
                          <a href='#'>{item.nama_kategori}</a>
                        </div>
                      </div>
                      <Badge bg='primary' pill>
                        {item.news_count}
                      </Badge>
                    </ListGroup.Item>
                  </>
                );
              })}
          </ListGroup>
        </div>
      </Row>
    </Fragment>
  );
};

export default News;
