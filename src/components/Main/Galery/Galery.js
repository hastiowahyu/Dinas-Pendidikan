import React, { Fragment } from "react";
import { Carousel } from "react-bootstrap";
import "./Galery.css";
import { useEffect, useState } from "react";

const Galery = () => {
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
    <Carousel fade className='style-galery'>
      {DataResponse &&
        DataResponse.map((item, idx) => {
          return item.image_gallery_item.map((itm, idx) => {
            return (
              <Carousel.Item key={idx}>
                <img
                  className='d-block w-100 size-img'
                  src={itm.image_file_data}
                />
              </Carousel.Item>
            );
          });
        })}
    </Carousel>
  );
};

export default Galery;
