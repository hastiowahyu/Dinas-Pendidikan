// import {React, useEffect, useState} from "react";
import "./../Foto/Foto.css";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Row, Col } from "react-bootstrap";
import moment from "moment-with-locales-es6";
import { useDispatch, useSelector } from "react-redux"; 
import Loading from "react-fullscreen-loading"; 
import { decrement, increment } from "./../../Counter"; 

const GalleryVidio = () => {
  const [DataVideo, setDataVideo] = useState([]);
  const axios = require("axios");
  const [LoaderComplete, setLoaderComplete] = useState(true);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("LoaderComplete", LoaderComplete);
    if (count == 1) {
      setLoaderComplete(false);
    }
  }, [count, LoaderComplete]);

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/video-gallery?instansi_id=7")
      .then(function (response) {
        dispatch(increment());
        console.log("console ini video: " + response.data.data.data);
        setDataVideo(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Fragment>
      <Loading loading={LoaderComplete} background='#ffff' loaderColor='#3498db' />
      <div id='landing'>
        <div id='landing-text'>
          <div id='landing-text-inner'>
            <h1>SELAMAT DATANG DIGALERI</h1>
            <h2>DINAS PENDIDIKAN LAMPUNG TIMUR</h2>
          </div>
        </div>
        <div id='landing-image' />
      </div>
      <div>
        <Box className='style-box'>
          <p className='text-box'>VIDEO DISDIK</p>
        </Box>
      </div>
      <div className='untuk-vidio' id='vidio'>
        <Row xs={1} md={3} className='g-4 coba'>
          {DataVideo &&
            DataVideo.map((item, index) => {
              return item.image_gallery_item.map((itm, idx) => {
                return (
                  <Col md={6} sm={12} xs={12} lg={4} key={idx} className='style-vid'>
                    <div className='tile-videos'>
                      <iframe id='player' type='text/html' src={`https://www.youtube.com/embed/${itm.video_url}?`} className='player-wrapper' style={{ width: "100%", height: "100%" }} frameBorder='0'></iframe>
                      <div className='text-videos'>
                        <p className='animate-text-videos'>{itm.description}</p>
                      </div>
                    </div>
                  </Col>
                );
              });
            })}
        </Row>
      </div>
    </Fragment>
  );
};

export default GalleryVidio;
