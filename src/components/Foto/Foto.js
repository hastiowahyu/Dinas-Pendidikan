// import {React, useEffect, useState} from "react";
import "./Foto.css";
import React from "react";
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
    <div>
      <div>
        <div className='style-foto'>
          <h2 className='text-center'>
            Gallery Dinas Pendidikan Lampung Timur
          </h2>
          <div className='lightbox-gallery'>
          {DataResponse &&
            DataResponse.map((item, index) => {
              return item.image_gallery_item.map((itm, idx) => {
                return (
                    <div>
                      <img
                        src={itm.image_file_data}
                        data-image-hd='https://picsum.photos/id/343/600/600'
                        className='gallery-image'
                        alt='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, quae, quam. Ut dolorum quia, unde dicta at harum porro officia obcaecati ipsam deserunt fugit dolore delectus quam, maxime nisi quo.'
                      />
                    </div>
                );
              });
            })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Foto;
