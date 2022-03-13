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
import { browserName } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import Loading from "react-fullscreen-loading";
import { increment } from "./../../../Counter";

const DetailArtikel = () => {
  const { id } = useParams();

  const axios = require("axios");
  const [dataDetailArtikel, setDataDetailArtikel] = useState(0);
  const [DataPopuler, setDataPopuler] = useState([]);

  //====== untuk menghitung API yang sedang diproses, untuk menentukan loading full screen======//
  const [LoaderComplete, setLoaderComplete] = useState(true);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  useEffect(() => {
    if (count == 1) {
      setLoaderComplete(false);
    }
  }, [count, LoaderComplete]);

  //====== get API for Detail Artikel======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/article/" + id)
      .then(function (response) {
        dispatch(increment()); // 4
        setDataDetailArtikel(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [axios]);

  //====== get API untuk artikel terpopuler======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/article?instansi_id=7&per_page=4&sort_by=total_hit")
      .then(function (response) {
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

  //====== get API untuk menambah jumlah pembaca======//
  useEffect(() => {
    const getIPAddress = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");
      axios
        .post("http://adminmesuji.embuncode.com/api/article/hit?artikel_id=" + id + "&ip=" + res.data.IPv4 + "&device=" + browserName)
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    };
    getIPAddress();
  }, []);

  return (
    <div className='main-detail'>
      {/* ====== menampilkan Loading full screen didetail artikel====== */}
      <Loading loading={LoaderComplete} background='#ffff' loaderColor='#3498db' />

      {/* ====== menampilkan detail artikel====== */}
      <Row>
        <Col md={6}>
          <Card className='card-deco'>
            <Card.Img variant='top' src={dataDetailArtikel.image_file_data} />
            <Card.Body>
              <Card.Title className='txt-deco'>{dataDetailArtikel.title}</Card.Title>
              <p className='p-deco'>
                <span>
                  {" "}
                  <MdDateRange size={22} />
                  {(moment.locale("id-ID"), moment(dataDetailArtikel.created_at).format("L"))}
                </span>
                &ensp;
                <span>
                  {" "}
                  <HiClipboardList size={22} /> {dataDetailArtikel.news_category_id}{" "}
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

        {/* ====== menampilkan artikel populer didetail artikel====== */}
        <Col>
          <div className='populer-deco'>
            <h3>Artikel Populer</h3>

            {DataPopuler &&
              DataPopuler.map((item, index) => {
                return (
                  <div className='box post-list'>
                    <div className='content'>
                      <div className='post'>
                        <div className='left'>
                          <img className='style-img-popular' src={item.image_file_data} alt='/' />
                        </div>
                        <div className='right'>
                          <a href={`/artikel/DetailArtikel/${item.id}`}>
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
                              {(moment.locale("id-ID"), moment(item.created_at).format("L"))}
                            </span>
                            &ensp;
                            <span>
                              {" "}
                              <HiClipboardList size={22} /> {item.news_category_id}{" "}
                            </span>
                            &ensp;
                            <span>
                              {" "}
                              <FaRegEye size={22} /> {item.total_hit}x Dibaca{" "}
                            </span>
                          </p>
                          <a href={`/artikel/DetailArtikel/${item.id}`} className='readmore'>
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

export default DetailArtikel;
