import Card from "react-bootstrap/Card";
import "./News.css";
import React, { useEffect, useState, Fragment } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment-with-locales-es6";
import { MdDateRange } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";
import { useDispatch} from "react-redux";
import { increment } from "../../../Counter";

const News = () => {
  const [DataTerbaru, setDataTerbaru] = useState();
  const [DataPopuler, setDataPopuler] = useState();
  const [dataAll, setDataAll] = useState();
  const dispatch = useDispatch(); // 3

  const axios = require("axios");
  // ====== Get API for berita terbaru diberanda======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/news?instansi_id=7&sort_by=created_at&sort_type=desc&per_page=2")
      .then(function (Terbaru) {
        console.log("console ini1: " + Terbaru.data.data.data);
        setDataTerbaru(Terbaru.data.data.data);

        dispatch(increment());
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // ====== Get API for beriita populer diberanda======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/news?instansi_id=7&sort_by=total_hit&sort_type=desc&per_page=5")
      .then(function (Populer) {
        setDataPopuler(Populer.data.data.data);

        dispatch(increment()); // 4
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // ====== Get API for berita umum diberanda======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/article?instansi_id=7&per_page=5")
      .then(function (All) {
        setDataAll(All.data.data.data);

        dispatch(increment());
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
        {/* berita terbaru */}
        <div className='col-12 col-md-5 layout-1833'>
          <div className='style-btn hot-news'>
            <h1 className='text-size'>Berita Terbaru</h1>
          </div>
          <div className='row'>
            {DataTerbaru &&
              DataTerbaru.map((item, index) => {
                return (
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6'>
                    <Card>
                      <Card.Img variant='top' src={item.image_file_data} className='size-image' />
                      <Card.Body>
                        <Card.Title className='card-title'>
                          <Link to={`/news/DetailNews/${item.id}`}>{handleLength(item.title, 50)}....</Link>
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
                        <Card.Text className='card-text'>{handleLength(item.intro, 120)}.... </Card.Text>
                        <Link to={`/news/DetailNews/${item.id}`}>Read More</Link>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
        {/* berita populer */}
        <div className='col-12 col-md-4 layout-1833'>
          <div className='style-btn hot-news'>
            <h1>Berita Populer </h1>
          </div>
          <Container>
            <div className='list-news-container'>
              <div className='main-content'>
                <ul className='list-news'>
                  {DataPopuler &&
                    DataPopuler.map((item, index) => {
                      return (
                        <li className='list-news__item ' key={index}>
                          <a href={`/news/DetailNews/${item.id}`}>
                            <h3 className='news__title'>{handleLength(item.title, 57)}</h3>
                          </a>

                          <p className='news__info'>
                            <span>{moment(item.created_at).startOf("hour").fromNow()}</span>
                            <span className='news__cmt'>{item.total_hit}x dibaca</span>
                            <span className='news__cmt'>{item.news_category_id}</span>
                          </p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </Container>
        </div>
        {/* berita All */}
        <div className='col-12 col-md-3 layout-1833' md={3}>
          <div className='list-news-container-dua'>
            <div className='main-content-dua'>
              <ul className='list-news'>
                {dataAll &&
                  dataAll.map((item, index) => {
                    return (
                      <li className='list-news__item ' key={index}>
                        <a href={`/news/DetailNews/${item.id}`}>
                          <h3 className='news__title'>{handleLength(item.title, 57)}</h3>
                        </a>
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
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div>
            <div>
              <Link to={"/Beranda/Berita"}>
                <p className='tag-p'>Berita Lainnya{">>"}</p>
              </Link>
            </div>
          </div>
        </div>
      </Row>
    </Fragment>
  );
};

export default News;
