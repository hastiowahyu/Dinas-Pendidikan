import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { Container } from "react-bootstrap";
import "./Dokumen.css";
import moment from "moment-with-locales-es6";

function Dokumen() {
  const [DataDokumen, setDataDokumen] = useState([]);

  const axios = require("axios");
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/dokumen?instansi_id=8")
      .then(function (dokumen) {
        console.log("dokumen: " + dokumen.data.data.data);
        setDataDokumen(dokumen.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  },);
  return (
    <div>
      {DataDokumen &&
        DataDokumen.map((item, index) => {
          return item.dokumen_item.map((itm, idx) => {
            return (
              <Container>
                <div className='row offerList'>
                  <div className='col-md-12'>
                    <div className='media p-2'>
                      <img
                        className='d-flex mr-3 image-dok'
                        src='./dokumen.jpg'
                        
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
                          <span className='text_blue'>
                            Created on: {moment(itm.created_at).format("L")}
                          </span>

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
              </Container>
            );
          });
        })}
    </div>
  );
}
export default Dokumen;
