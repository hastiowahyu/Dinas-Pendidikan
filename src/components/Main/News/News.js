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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ListIcon from "@mui/icons-material/List";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const News = () => {
  const [DataResponse, setDataResponses] = useState();
  const [DataUmum, setDataUmum] = useState();
  const [dataKategori, setDataKategori] = useState();

  const axios = require("axios");
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/news?instansi_id=7&per_page=6")
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
        "http://adminmesuji.embuncode.com/api/news?instansi_id=7&per_page=2 +"
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
      .get("http://adminmesuji.embuncode.com/api/news/categories/7")
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
            {DataResponse != null ? (
              DataResponse &&
              DataResponse.map((item, index) => {
                console.log("item", item);
                return (
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6'>
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
              })
            ) : (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
          </div>
        </div>
        <div className='col-12 col-md-4 layout-1833'>
          <div className='style-btn hot-news'>
            <h1>Berita Populer </h1>
          </div>

          <Container className='style-accordion'>
            <Accordion>
              {console.log("console ini kategori:" + DataUmum)}
              {DataUmum != null ? (
                DataUmum &&
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
                })
              ) : (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              )}
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
          <List
            sx={{
              borderRadius: "10px",
              width: "100%",
              maxWidth: "100%",
              bgcolor: "rgba(224, 246, 255, 0.63)",
              paddingLeft: "5px",
              paddingRight: "5px",
            }}>
            {dataKategori != null ? (
              dataKategori &&
              dataKategori.map((item, index) => {
                return (
                  <>
                    <ListItem className='list-item-mui'>
                      <ListItemAvatar>
                        <Avatar>
                          <ListIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.nama_kategori} />
                      <Badge bg='primary' pill>
                        {item.news_count}
                      </Badge>
                    </ListItem>
                  </>
                );
              })
            ) : (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
          </List>
        </div>
      </Row>
    </Fragment>
  );
};

export default News;
