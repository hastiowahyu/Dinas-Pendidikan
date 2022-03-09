// import {React, useEffect, useState} from "react";
import "./Foto.css";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Row, Col } from "react-bootstrap";
import moment from "moment-with-locales-es6";
import { useDispatch, useSelector } from 'react-redux' // CLUE
import Loading from 'react-fullscreen-loading'; // CLUE
import { decrement, increment } from "./../../Counter" // CLUE

const Foto = () => {
  const [DataResponse, setDataResponses] = useState(0);
  const axios = require("axios");
    const [LoaderComplete, setLoaderComplete] = useState(true);
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch(); // 3
    useEffect(() => {
      console.log("LoaderComplete", LoaderComplete);
      if (count == 1) {
        setLoaderComplete(false);
      }
    }, [count, LoaderComplete]);

  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=7&per_page=3"
      )
      .then(function (response) {
        dispatch(increment()) // 4
        console.log("console ini galery1: " + response.data.data.data);
        setDataResponses(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Fragment>
      <Loading
        loading={LoaderComplete}
        background='#ffff'
        loaderColor='#3498db'
      />
      <div id='landing'>
        <div id='landing-text'>
          <div id='landing-text-inner'>
            <h1>SELAMAT DATANG DIGALERI</h1>
            <h2>DISDIK LAMPUNG TIMUR</h2>
            <a href='#images' className='btn' id='view-work'>
              View Foto
            </a>
          </div>
        </div>
        <div id='landing-image' />
      </div>
      <div>
        <Box className='style-box'>
          <p className='text-box'>FOTO DISDIK</p>
        </Box>
      </div>
      <div className='wrap' id='images'>
        {DataResponse &&
          DataResponse.map((item, index) => {
            return item.image_gallery_item.map((itm, idx) => {
              return (
                <div>
                  <div className='tile'>
                    <img src={itm.image_file_data} />
                    <div className='text'>
                      <h1>{itm.created_by}</h1>
                      <h2 className='animate-text'>
                        {
                          (moment.locale("id-ID"),
                          moment(itm.created_at).fromNow())
                        }
                      </h2>
                      <p className='animate-text'>{itm.description}</p>
                      <div className='dots'>
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </div>
              );
            });
          })}
      </div>
    </Fragment>
  );
};

export default Foto;
