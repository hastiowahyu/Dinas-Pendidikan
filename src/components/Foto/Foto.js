// import {React, useEffect, useState} from "react";
import "./Foto.css";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";

const Foto = () => {
  const [DataResponse, setDataResponses] = useState(0);
  const axios = require("axios");

  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=2&per_page=3"
      )
      .then(function (response) {
        console.log("console ini galery1: " + response.data.data.data);
        setDataResponses(response.data.data.data);
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
            <a href='#images' className='btn' id='view-work'>
              View Gallery
            </a>
          </div>
        </div>
        <div id='landing-image' />
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
                      <h2 className='animate-text'>{itm.created_at}</h2>
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
