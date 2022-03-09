import React from "react";
import { useEffect, useState } from "react";
import "./../Artikel/Artikel.css";
import { Pagination } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { Badge } from "react-bootstrap";
import moment from "moment-with-locales-es6";
import { MdDateRange } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"; // CLUE
import Loading from "react-fullscreen-loading"; // CLUE
import { decrement, increment } from "./../../Counter"; // CLUE

const Berita = () => {
  const [DataResponse, setDataResponses] = useState(0);
  const [DataPopuler, setDataPopuler] = useState([]);
  const axios = require("axios");
  const [dataKategori, setDataKategori] = useState();

  const [Items, setItems] = useState([]);
  let items = [];
  const [, updateState] = React.useState();
  const forceUpdtae = React.useCallback(() => updateState({}), []);
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
    gettingData(1);
  }, []);

  let tooglePaginate = true;
  function gettingData(page) {
    setDataResponses(null);
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/news?instansi_id=7&per_page=4&page=" +
          page
      )
      .then(function (response) {
        dispatch(increment()); // 4
        setDataResponses(response.data.data.data);
        items = [];
        for (let number = 1; number <= response.data.data.last_page; number++) {
          items.push(
            <Pagination.Item
              onClick={() => gettingData(number)}
              key={number}
              active={number == response.data.data.current_page}>
              {number}
            </Pagination.Item>
          );
          console.log("test " + items);
          setItems(items);
          tooglePaginate = false;
        }
        forceUpdtae();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleLength(valeu, lengths) {
    if (valeu.length < lengths) {
      return valeu;
    } else {
      return valeu.substring(0, lengths);
    }
  }

  function convvertDate(timeResponse) {
    var date = new Date(timeResponse);
    return date.toLocaleString("en-GB", { hour12: false });
  }

  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/news?instansi_id=7&per_page=4&sort_by=total_hit"
      )
      .then(function (response) {
        console.log("console ini1: " + response.data.data.data);
        setDataPopuler(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/news/categories/7")
      .then(function (response) {
        console.log("console ini2: " + response.data.data);
        setDataKategori(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className='style-artikel'>
      <Loading
        loading={LoaderComplete}
        background='#ffff'
        loaderColor='#3498db'
      />
      <Row>
        <Col md={6}>
          <h1> Berita Terbaru___ </h1> <hr />
          <div>
            {DataResponse &&
              DataResponse.map((item, index) => {
                return index % 2 === 0 ? (
                  <div className='blog-card'>
                    <div className='meta'>
                      <img
                        className='photo'
                        src={item.image_file_data}
                        alt='/'
                      />
                      <ul className='details'>
                        <li className='date'>
                          {
                            (moment.locale("id-ID"),
                            moment(item.created_at).format("L"))
                          }
                        </li>
                        <li className='tags'>{item.news_category_id}</li>
                        <li className='author'>{item.created_by}</li>
                      </ul>
                    </div>
                    <div className='description'>
                      <a href={`/berita/DetailNews/${item.id}`}>
                        <h2>{handleLength(item.title, 30)}</h2>
                      </a>

                      <p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: handleLength(item.intro, 200),
                          }}
                        />
                      </p>
                      <p className='read-more'>
                        <a href={`/berita/DetailNews/${item.id}`}>Read More</a>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className='blog-card alt'>
                    <div className='meta'>
                      <img
                        className='photo'
                        src={item.image_file_data}
                        alt='/'
                      />
                      <ul className='details'>
                        <li className='date'>
                          {
                            (moment.locale("id-ID"),
                            moment(item.created_at).format("L"))
                          }
                        </li>
                        <li className='tags'>{item.news_category_id}</li>
                        <li className='author'>{item.created_by}</li>
                      </ul>
                    </div>
                    <div className='description'>
                      <h2>{handleLength(item.title, 30)}</h2>
                      <p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: handleLength(item.intro, 200),
                          }}
                        />
                      </p>
                      <p className='read-more'>
                        <a href={`/berita/DetailNews/${item.id}`}>Read More</a>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
          <Row>
            <Col className='text-center-costum'>
              <Pagination>{Items}</Pagination>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <div className='main'>
            {/* Actual search box */}
            <div className='form-group has-search'>
              <span className='fa fa-search form-control-feedback' />
              <input
                type='text'
                className='form-control'
                placeholder='Cari Berita'
              />
            </div>
          </div>
          <h1>Berita Populer__</h1> <hr />
          <Row>
            <div>
              {/* {console.log("console ini :" + DataPopuler)} */}
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
          </Row>
          <Row>
            <hr />
            <h1>Kategori___</h1>
            <hr />
            <ListGroup as='ol' numbered>
              {console.log("console ini kategori33:" + dataKategori)}
              {dataKategori &&
                dataKategori.map((item, index) => {
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
                          {item.artikel_count}
                        </Badge>
                      </ListGroup.Item>
                    </>
                  );
                })}
            </ListGroup>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Berita;
