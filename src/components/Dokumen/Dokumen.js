import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./Dokumen.css";
import moment from "moment-with-locales-es6";
import { useDispatch, useSelector } from "react-redux";
import Loading from "react-fullscreen-loading";
import { increment } from "./../../Counter";
import FieldAPI from "../FieldAPI/FieldAPI";

function Dokumen() {
  const [DataDokumen, setDataDokumen] = useState([]);
  //====== untuk menghitung API yang sedang diproses, untuk menentukan loading full screen======//
  const [LoaderComplete, setLoaderComplete] = useState(true);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch(); // 3
  useEffect(() => {
    console.log("LoaderComplete", LoaderComplete);
    if (count == 1) {
      setLoaderComplete(false);
    }
  }, [count, LoaderComplete]);

  const axios = require("axios");

  //====== get API for Document======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/dokumen?instansi_id=7")
      .then(function (dokumen) {
        dispatch(increment());
        console.log("dokumen: " + dokumen.data.data.data);
        setDataDokumen(dokumen.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {/* ====== menampilkan Loading full screen didetail artikel====== */}
      <Loading loading={LoaderComplete} background='#ffff' loaderColor='#3498db' />

      {/* ====== menampilkan seluruh dokumen====== */}
      {DataDokumen.length > 0 ? (
        DataDokumen &&
        DataDokumen.map((item, index) => {
          return item.dokumen_item.map((itm, idx) => {
            return (
              <Container>
                <div className='row offerList'>
                  <div className='col-md-12'>
                    <div className='media p-2'>
                      <img className='d-flex mr-3 image-dok' src='./dokumen.jpg' />
                      <div className='media-body'>
                        <h5 className='mt-0'>
                          <a href={"/pdf/" + item.slug + "/" + itm.dokumen_file_name.replace(/\s/g, "")}>{itm.dokumen_file_name}</a>
                        </h5>
                        <p className='text_grey mb-0 '>
                          <span className='text_blue'>Created on: {moment(itm.created_at).format("L")}</span>

                          <span className='text_blue'> Created by: </span>
                          {itm.created_by}
                        </p>
                        <span className='badge badge-pill badge-primary'> Update By: {itm.updated_by}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            );
          });
        })
      ) : (
        <FieldAPI />
      )}
    </div>
  );
}
export default Dokumen;
