import React, { Fragment } from "react";
import "./ThridLine.css";
import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ThridLine = () => {
  const [DataPimpinan, setDataPimpinan] = useState(null);
  const axios = require("axios");

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/7")
      .then(function (pimpinan) {
        setDataPimpinan(pimpinan.data.data);
        console.log("console kepala: " + pimpinan.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(DataPimpinan);

  return (
    <div className='utama-kepala'>
      {DataPimpinan != null ? (

        <div className='row mb-5'>
          <div className='col-md-4 itu-nya'>
            <img
              src={DataPimpinan.foto_kepala}
              width={"100%"}
              className='foto-kepala'
              alt='Foto Kepala'
            />
          </div>
          <div className='col-md-8 rest'>
            <h2 className='kata-pembuka-news'>{DataPimpinan.nama_instansi}</h2>
            <br />
            <p>Tentang Instansi</p>
            <p>{DataPimpinan.tentang}</p>
            <div className='nama-kpla'>
              <h2 className='kata-penutup-news'>
                Kepala {DataPimpinan.nama_instansi}
              </h2>
              <h2 className='kepala-dinas'>{DataPimpinan.nama_kepala}</h2>
            </div>
          </div>
        </div>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default ThridLine;
