import React from "react";
import "./../../../Artikel/DetailArtikel/DetailArtikel.css";
import "./../../../Artikel/Artikel.css";
import { Card, Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment-with-locales-es6";
import { MdDateRange } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";
import { browserName } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux"; // CLUE
import Loading from "react-fullscreen-loading"; // CLUE
import { increment } from "./../../../../Counter"; // CLUE

const DetailNews = () => {
  const { id } = useParams();
  console.log("dtlart", id);
  const axios = require("axios");
  const [dataDetailNews, setDataDetailNews] = useState(0);
  const [DataPopuler, setDataPopuler] = useState([]);

  // CLUE
  const [LoaderComplete, setLoaderComplete] = useState(true);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch(); // 3
  useEffect(() => {
    console.log("LoaderComplete", LoaderComplete);
    if (count == 1) {
      setLoaderComplete(false);
    }
  }, [count, LoaderComplete]);
  // CLUE

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/news/" + id)
      .then(function (response) {
        dispatch(increment()); // 4
        console.log("console detail: " + response.data.data);
        setDataDetailNews(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [axios]);

  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/news?instansi_id=7&per_page=4&sort_type=desc&sort_by=total_hit"
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

  useEffect(() => {
    const getIPAddress = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");
      axios
        .post(
          "http://adminmesuji.embuncode.com/api/news/hit?news_id=" +
            id +
            "&ip=" +
            res.data.IPv4 +
            "&device=" +
            browserName
        )
        .then(function (response) {
          console.log("console ini2: " + response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getIPAddress();
  }, []);
  return (
    <div className='main-detail'>
      <Row>
        <Col md={6}>
          <Card className='card-deco'>
            <Card.Img variant='top' src={dataDetailNews.image_file_data} />
            <Card.Body>
              <Card.Title className='txt-deco'>
                {dataDetailNews.title}
              </Card.Title>
              <p className='p-deco'>
                <span>
                  {" "}
                  <MdDateRange size={22} />
                  {
                    (moment.locale("id-ID"),
                    moment(dataDetailNews.created_at).format("L"))
                  }
                </span>
                &ensp;
                <span>
                  {" "}
                  <HiClipboardList size={22} />{" "}
                  {dataDetailNews.news_category_id}{" "}
                </span>
                &ensp;
                <span>
                  {" "}
                  <FaRegEye size={22} /> {dataDetailNews.total_hit}x Dibaca{" "}
                </span>
              </p>
              <Card.Text
                dangerouslySetInnerHTML={{
                  __html: dataDetailNews.content,
                }}></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <div className='populer-deco'>
            <h3>Berita Populer</h3>
            {console.log("console ini :" + DataPopuler)}
            {DataPopuler &&
              DataPopuler.map((item, index) => {
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
                          <a href={`/berita/DetailNews/${item.id}`}>
                            <h5>{handleLength(item.title, 30)}</h5>
                          </a>
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
                          <a
                            href={`/berita/DetailNews/${item.id}`}
                            className='readmore'>
                            Read More
                          </a>
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

export default DetailNews;
