// import {React, useEffect, useState} from "react";
import "./../Foto/Foto.css";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Row, Col } from "react-bootstrap";
import moment from "moment-with-locales-es6";

const GalleryVidio = () => {
  const [DataVideo, setDataVideo] = useState([]);
  const axios = require("axios");

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/video-gallery?instansi_id=2")
      .then(function (response) {
        console.log("console ini video: " + response.data.data.data);
        setDataVideo(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Fragment>
      <div id='landing'>
        <div id='landing-text'>
          <div id='landing-text-inner'>
            <h1>SELAMAT DATANG DIGALERI</h1>
            <h2>DISDIK LAMPUNG TIMUR</h2>
            <a href='#vidio' className='btn' id='view-work'>
              View Video
            </a>
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
                  <Col
                    md={6}
                    sm={12}
                    xs={12}
                    lg={4}
                    key={idx}
                    className='style-vid'>
                    <div className='tile-videos'>
                      <iframe
                        id='player'
                        type='text/html'
                        src={`https://www.youtube.com/embed/${itm.video_url}?`}
                        className='player-wrapper'
                        style={{ width: "100%", height: "100%" }}
                        frameBorder='0'></iframe>
                      <div className='text-videos'>
                        <p>{item.description}</p>
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
