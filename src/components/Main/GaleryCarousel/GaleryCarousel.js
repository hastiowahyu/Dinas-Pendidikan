import React, { Fragment } from "react";
import { Carousel } from "react-bootstrap";
import "./GaleryCarousel.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { increment } from "../../../Counter";

const Galery = () => {
  const [DataResponse, setDataResponses] = useState();
  const axios = require("axios");
  const dispatch = useDispatch();

  // ====== Get API foto untuk ditampilkan di carousel ======
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=7&per_page=3")
      .then(function (response) {
        setDataResponses(response.data.data.data);

        dispatch(increment());
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
                <img className='d-block w-100 size-img' src={itm.image_file_data} />
              </Carousel.Item>
            );
          });
        })}
    </Carousel>
  );
};

export default Galery;
