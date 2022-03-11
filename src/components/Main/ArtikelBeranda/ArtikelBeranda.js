import React from "react";
import "./ArtikelBeranda.css";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";
import moment from "moment-with-locales-es6";
import { MdDateRange } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

const ArtikelBeranda = () => {
  const [DataArtikel, setDataArtikel] = useState();
  const [DataPopuler, setDataPopuler] = useState();

  const axios = require("axios");
  // ====== Get API for artikel terbaru diberanda======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/article?instansi_id=7&per_page=3&sort_type=desc&sort_by=created_at")
      .then(function (Terbaru) {
        setDataArtikel(Terbaru.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // ====== Get API for artikel terbaru diberanda======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/article?instansi_id=7&per_page=4&sort_type=desc&sort_by=total_hit")
      .then(function (populer) {
        setDataPopuler(populer.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Row>
        {/* ====== Menampilkan artikel populer diberanda====== */}
        <Col md={6}>
          <div className='style-btn hot-news'>
            <h1>Artikel Populer</h1>
          </div>
          <div className='main-pop'>
            {DataPopuler &&
              DataPopuler.map((item, index) => {
                return (
                  <div class='cards-type'>
                    <div class='card__image'>
                      <img src={item.image_file_data} alt='' className='image-card-type' />
                    </div>
                    <div class='card__info'>
                      <Link to={`/Beranda/DetailArtikel/${item.id}`}>
                        <h5>{item.title}</h5>
                      </Link>
                      <p>{item.intro}</p>
                      <p>
                        <span>
                          {" "}
                          <MdDateRange size={20} />
                          {(moment.locale("id-ID"), moment(item.created_at).format("L"))}{" "}
                        </span>
                        |
                        <span>
                          {" "}
                          <HiClipboardList size={20} /> {item.news_category_id}{" "}
                        </span>
                        |
                        <span>
                          {" "}
                          <FaRegEye size={20} /> {item.total_hit}x dibaca{" "}
                        </span>
                      </p>
                      <p className='read-more-nya'>
                        <a href={`/Beranda/DetailArtikel/${item.id}`}>Read More</a>
                      </p>
                      <hr />
                    </div>
                  </div>
                );
              })}
          </div>
        </Col>
        {/* ====== Menampilkan artikel terbaru diberanda====== */}
        <Col>
          <div className='style-btn hot-news'>
            <h1>Artikel Terbaru</h1>
          </div>
          <div>
            {DataArtikel &&
              DataArtikel.map((item, index) => {
                return (
                  <>
                    <Card>
                      <Card.Img variant='top' src={item.image_file_data} className='ukuran-img image-card-type' />
                      <Card.Body>
                        <Card.Title className='title-nya'>
                          <a href={`/Beranda/DetailArtikel/${item.id}`}>{item.title}</a>
                        </Card.Title>
                        <p>
                          <span>
                            {" "}
                            <MdDateRange size={20} />
                            {(moment.locale("id-ID"), moment(item.created_at).format("L"))}{" "}
                          </span>
                          |
                          <span>
                            {" "}
                            <HiClipboardList size={20} /> {item.news_category_id}{" "}
                          </span>
                          |
                          <span>
                            {" "}
                            <FaRegEye size={20} /> {item.total_hit}x dibaca{" "}
                          </span>
                        </p>
                        <Card.Text>{item.intro}</Card.Text>
                        <p className='read-more-nya'>
                          <a href={`/Beranda/DetailArtikel/${item.id}`}>Read More</a>
                        </p>
                      </Card.Body>
                    </Card>
                    <br />
                  </>
                );
              })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ArtikelBeranda;
