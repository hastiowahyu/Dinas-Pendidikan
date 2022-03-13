import React, { Fragment, useEffect, useState } from "react";
import "./Artikel.css";
import { Row, Col, Pagination, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment-with-locales-es6";
import { MdDateRange } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListIcon from "@mui/icons-material/List";
import { useDispatch, useSelector } from "react-redux";
import Loading from "react-fullscreen-loading";
import { increment } from "../../Counter";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Artikel = () => {
  const [DataTerbaru, setDataTerbaru] = useState();
  const [DataPopuler, setDataPopuler] = useState([]);
  const [dataKategori, setDataKategori] = useState();
  const [ArticleCategories, setArticleCategories] = useState();
  const [Adaisi, setAdaisi] = useState(0); //clue
  const axios = require("axios");

  const [Items, setItems] = useState([]);
  let items = [];
  const [, updateState] = React.useState();
  const forceUpdtae = React.useCallback(() => updateState({}), []);

  //====== menghitung API yang sedang diproses, untuk menentukan loading full screen======//

  const [LoaderComplete, setLoaderComplete] = useState(true);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  useEffect(() => {
    if (count == 1) {
      setLoaderComplete(false);
    }
  }, [count, LoaderComplete]);

  useEffect(() => {
    gettingData(1);
  }, []);

  // ======Get Api untuk artikel dan set fungsu paginasi + view article category======//
  let tooglePaginate = true;

  function gettingData(page, slug, title) {
    let urlTitle = "";
    if (title != null) {
      urlTitle = "&title=" + title;
    } else {
      urlTitle = "";
    }
    setDataTerbaru(null);
    let url = "";
    if (slug == null) {
      url = "http://adminmesuji.embuncode.com/api/article?instansi_id=7" + urlTitle + "&per_page=4&page=" + page;
    } else {
      url = "http://adminmesuji.embuncode.com/api/article?instansi_id=7" + urlTitle + "&per_page=4&slug=" + slug + "&page=" + page;
    }

    axios
      .get(url)
      .then(function (response) {
        dispatch(increment());
        setDataTerbaru(response.data.data.data);
        items = [];
        for (let number = 1; number <= response.data.data.last_page; number++) {
          items.push(
            <Pagination.Item onClick={() => gettingData(number)} key={number} active={number == response.data.data.current_page}>
              {number}
            </Pagination.Item>
          );

          setItems(items);
          tooglePaginate = false;
        }
        forceUpdtae();
        setAdaisi(response.data.data.total);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function handleArticleChange(artikelSlug) {
    gettingData(1, artikelSlug);

    setArticleCategories(artikelSlug);
  }

  function handleLength(valeu, lengths) {
    if (valeu.length < lengths) {
      return valeu;
    } else {
      return valeu.substring(0, lengths);
    }
  }

  // ======Get Api untuk artikel populer======//
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

  // ======Get Api untuk kategori artikel======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/article/categories/7")
      .then(function (response) {
        setDataKategori(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //clue Awal//
  function handleSearchChange(value) {
    if (value.key === "Enter") {
      if (value.target.value != "") {
        gettingData(1, null, value.target.value);
      } else {
        gettingData(null, null);
      }
    }
  }
  //clue Akhir//

  return (
    <div className='style-artikel'>
      {/* ====== menampilkan Loading full screen page artikel====== */}
      <Loading loading={LoaderComplete} background='#ffff' loaderColor='#3498db' />
      {/* ====== menampilkan list artikel terbaru====== */}
      <Row>
        <Col md={6}>
          {/* ====== Menampilkan Actual search box artikel =======*/}
          <div className='pembungkus-search'>
            <div className='main'>
              <div className='form-group has-search'>
                <span className='fa fa-search form-control-feedback' />
                <input onKeyDown={handleSearchChange} type='text' className='form-control' placeholder='Cari Artikel' />
              </div>
            </div>
          </div>
          {/* ====== menampilkan list artikel====== */}
          <div>
            {DataTerbaru != null ? (
              Adaisi != 0 ? (
                DataTerbaru &&
                DataTerbaru.map((item, index) => {
                  return index % 2 === 0 ? (
                    <div className='blog-card pembungkus-artikel-main' key={index}>
                      <div className='meta'>
                        <img className='photo' src={item.image_file_data} alt='/' />
                        <ul className='details'>
                          <li className='date'>{(moment.locale("id-ID"), moment(item.created_at).format("L"))}</li>
                          <li className='tags'>{item.news_category_id}</li>
                          <li className='author'>{item.created_by}</li>
                        </ul>
                      </div>
                      <div className='description'>
                        <a href={`/artikel/DetailArtikel/${item.id}`}>
                          <h2>{handleLength(item.title, 30)}</h2>
                        </a>
                        <>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: handleLength(item.content, 200),
                            }}
                          />
                        </>
                        <p className='read-more'>
                          <a href={`/artikel/DetailArtikel/${item.id}`}>Read More</a>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className='blog-card alt pembungkus-artikel-main' key={index}>
                      <div className='meta'>
                        <img className='photo' src={item.image_file_data} />
                        <ul className='details'>
                          <li className='date'>{(moment.locale("id-ID"), moment(item.created_at).format("L"))}</li>
                          <li className='tags'>{item.news_category_id}</li>
                          <li className='author'>{item.created_by}</li>
                        </ul>
                      </div>
                      <div className='description'>
                        <h2>{handleLength(item.title, 30)}</h2>
                        <>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: handleLength(item.content, 200),
                            }}
                          />
                        </>
                        <p className='read-more'>
                          <a href={`/artikel/DetailArtikel/${item.id}`}>Read More</a>
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className='search-error-bg d-flex justify-content-center align-items-center'>
                  <div className='col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 search-error d-flex flex-column justify-content-center align-items-center'>
                    <img src='oops.png' alt='searc img' className='img-fluid search-error-img' />
                    <p className='search-error-heading text-center'>Sorry, we couldn't find a word match</p>
                    <p className='search-error-text text-center'>Please try searching with another words</p>
                  </div>
                </div>
              )
            ) : (
              <Box sx={{ width: "75%" }}>
                <LinearProgress />
              </Box>
            )}
            <Row>
              <Col className='text-center-costum'>
                <Pagination>{Items}</Pagination>
              </Col>
            </Row>
          </div>
        </Col>

        <Col md={6}>
          {/* ====== Menampilkan Kategori Artikel ======= */}
          <Row>
            <h3>Kategori Artikel</h3>
            <List
              sx={{
                borderRadius: "10px",
                width: "900px",
                maxWidth: "100%",
                bgcolor: "rgba(224, 246, 255, 0.63)",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}>
              {dataKategori &&
                dataKategori.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {ArticleCategories === item.slug ? (
                        <ListItem as='li' onClick={() => handleArticleChange(item.slug)} className='d-flex justify-content-between align-items-start kategori-list-article kategori-list-article-active  list-item-mui' key={index}>
                          <ListItemAvatar>
                            <Avatar>
                              <ListIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={item.nama_kategori} />
                          <Badge bg='primary' pill>
                            {item.artikel_count}
                          </Badge>
                        </ListItem>
                      ) : (
                        <ListItem as='li' onClick={() => handleArticleChange(item.slug)} className='d-flex justify-content-between align-items-start kategori-list-article list-item-mui'>
                          <ListItemAvatar>
                            <Avatar>
                              <ListIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={item.nama_kategori} />
                          <Badge bg='primary' pill>
                            {item.artikel_count}
                          </Badge>
                        </ListItem>
                      )}
                    </Fragment>
                  );
                })}
            </List>
          </Row>
          {/* ====== menampilkan list artikel populer ====== */}
          <h1>Artikel Populer__</h1> <hr />
          <Row>
            <div>
              {DataPopuler &&
                DataPopuler.map((item, index) => {
                  return (
                    <div className='box post-list' key={index}>
                      <div className='content'>
                        <div className='post'>
                          <div className='left'>
                            <img className='style-img-popular' src={item.image_file_data} alt='/' />
                          </div>
                          <div className='right'>
                            <Link to={`/artikel/DetailArtikel/${item.id}`}>
                              <h5>{handleLength(item.title, 30)}</h5>
                            </Link>
                            <div className='style-intro'>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: handleLength(item.intro, 80),
                                }}
                              />
                            </div>
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
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Artikel;
