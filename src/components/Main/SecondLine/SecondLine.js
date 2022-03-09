import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SecondLine.css";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment-with-locales-es6";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../../Counter";

const SecondLine = () => {
  const [BoxAlbum, setBoxAlbum] = useState();
  const [DataDokumen, setDataDokumen] = useState();
  const dispatch = useDispatch();
  const axios = require("axios");

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=7")
      .then(function (response) {
        rebuildAlbum(response.data.data.data);

        dispatch(increment());
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/dokumen?instansi_id=7&per_page=4"
      )
      .then(function (dokumen) {
        console.log("console dokumen: " + dokumen.data.data.data);
        setDataDokumen(dokumen.data.data.data);

        dispatch(increment());
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function rebuildAlbum(response) {
    let album = [];
    let counterAlbum = 0;
    for (let i = 0; i < response.length; i++) {
      for (let k = 0; k < response[i].image_gallery_item.length; k++) {
        if (counterAlbum < 3) {
          counterAlbum++;
          album.push(response[i].image_gallery_item[k]);
        }
      }
    }
    setBoxAlbum(album);
  }

  function handleLength(valeu, lengths) {
    if (valeu.length < lengths) {
      return valeu;
    } else {
      return valeu.substring(0, lengths);
    }
  }
  return (
    <div className='style-secondline'>
      {" "}
      <Row>
        <Col md={9}>
          <div className='style-btn hot-news'>
            <h3>Gallery</h3>
          </div>

          <div className='grid'>
            {BoxAlbum &&
              BoxAlbum.map((item, index) => {
                return (
                  <div>
                    <figure className='figure'>
                      <img
                        className='style-gambar'
                        src={item.image_file_data}
                        alt='Chaffinch'
                      />
                      <figcaption>
                        {handleLength(item.description, 40)}....
                      </figcaption>
                    </figure>
                  </div>
                );
              })}
          </div>
          <div className='khusus-gambar'>
            <Link to={"/Beranda/GalleryFoto"}>
              <p className='tag-p'>Gambar Lainnya {">>"}</p>
            </Link>
          </div>
        </Col>
        <Col>
          <div className='style-btn hot-news'>
            <h3>Dokumen Terbaru</h3>
          </div>
          <div className='dokumen-bg'>
            {DataDokumen &&
              DataDokumen.map((item, index) => {
                return item.dokumen_item.map((itm, idx) => {
                  return (
                    <>
                      <div className='row offerList'>
                        <div className='col-md-12'>
                          <div className='media p-2'>
                            <img
                              className='d-flex mr-3 image-dok'
                              src='./dokumen.jpg'
                              alt='Generic placeholder image'
                            />
                            <div className='media-body'>
                              <h5 className='mt-0'>
                                <a
                                  href={
                                    "/pdf/" +
                                    item.slug +
                                    "/" +
                                    itm.dokumen_file_name.replace(/\s/g, "")
                                  }>
                                  {itm.dokumen_file_name}
                                </a>
                              </h5>
                              <p className='text_grey mb-0 '>
                                <span className='text_blue'>Created on: </span>

                                {moment(itm.created_at).format("L")}
                                {/* {itm.created_at} | */}
                                <span className='text_blue'> Created by: </span>
                                {itm.created_by}
                              </p>
                              <span className='badge badge-pill badge-primary'>
                                {" "}
                                Update By: {itm.updated_by}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                });
              })}
          </div>
          <div>
            <Link to={"/Beranda/Dokumen"}>
              <p className='tag-p'>Dokumen Lainnya {">>"}</p>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SecondLine;
