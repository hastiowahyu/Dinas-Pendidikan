import React from "react";
import "./DetailArtikel.css";
import "./../Artikel.css";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment-with-locales-es6";
import { MdDateRange } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const DetailArtikel = () => {
  const { id } = useParams();
  console.log("first", id);
  const axios = require("axios");
  const [dataDetailArtikel, setDataDetailArtikel] = useState(0);
  const [DataPopuler, setDataPopuler] = useState([]);

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/article/" + id)
      .then(function (response) {
        console.log("console detail: " + response.data.data);
        setDataDetailArtikel(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [axios]);
  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/article?instansi_id=2&per_page=4&sort_by=total_hit"
      )
      .then(function (response) {
        console.log("console ini1: " + response.data.data.data);
        setDataPopuler(response.data.data.data);
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
    <div className='main-detail'>
      <Row>
        <Col md={6}>
          <Card className='card-deco'>
            <Card.Img variant='top' src={dataDetailArtikel.image_file_data} />
            <Card.Body>
              <Card.Title className='txt-deco'>
                {dataDetailArtikel.title}
              </Card.Title>
              <p className="p-deco">
                <span>
                  {" "}
                  <MdDateRange size={22} />
                  {
                    (moment.locale("id-ID"),
                    moment(dataDetailArtikel.created_at).format("L"))
                  }
                </span>
                &ensp;
                <span>
                  {" "}
                  <HiClipboardList size={22} />{" "}
                  {dataDetailArtikel.news_category_id}{" "}
                </span>
                &ensp;
                <span>
                  {" "}
                  <FaRegEye size={22} /> {dataDetailArtikel.total_hit}x Dibaca{" "}
                </span>
              </p>
              <Card.Text
                dangerouslySetInnerHTML={{
                  __html: dataDetailArtikel.content,
                }}></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <div className='populer-deco'>
            <h3>Artikel Populer</h3>
            {console.log("console ini :" + DataPopuler)}
            {DataPopuler &&
              DataPopuler.map((item, index) => {
                console.log("item", item);
                return (
                  <div className='box post-list'>
                    <div className='content'>
                      <div className='post'>
                        <div className='left'>
                          <img
                            className='style-img-popular'
                            src={item.image_file_data}
                            alt='/'
                          />
                        </div>
                        <div className='right'>
                          <h5>{handleLength(item.title, 30)}</h5>
                          <p className='style-intro'>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: handleLength(item.intro, 80),
                              }}
                            />
                          </p>
                          <p>
                            <span>
                              {" "}
                              <MdDateRange size={22} />
                              {
                                (moment.locale("id-ID"),
                                moment(item.created_at).format("L"))
                              }
                            </span>
                            &ensp;
                            <span>
                              {" "}
                              <HiClipboardList size={22} />{" "}
                              {item.news_category_id}{" "}
                            </span>
                            &ensp;
                            <span>
                              {" "}
                              <FaRegEye size={22} /> {item.total_hit}x Dibaca{" "}
                            </span>
                          </p>
                          <Link
                            to={`/artikel/DetailArtikel/${item.id}`}
                            className='readmore'>
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DetailArtikel;
