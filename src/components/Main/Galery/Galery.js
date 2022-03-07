import React, { Fragment } from "react";
import { Carousel } from "react-bootstrap";
import "./Galery.css";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Galery = () => {
  const [DataResponse, setDataResponses] = useState();
  const axios = require("axios");

  

  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=7&per_page=3"
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
      {DataResponse != null ? (
        DataResponse &&
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
        })
      ) : (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </Carousel>
  );
};

export default Galery;
