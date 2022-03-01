import React, { Fragment } from "react";
import "./ThridLine.css";
import { useEffect, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { IoMdCall } from "react-icons/io";
const ThridLine = () => {
  const [DataPimpinan, setDataPimpinan] = useState([]);
  const axios = require("axios");
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/2")
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
    <div>
      <>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12 mt-3'>
              <div className='card'>
                <div className='card-horizontal'>
                  <div className='img-square-wrapper'>
                    <img
                      className=''
                      src={DataPimpinan.foto_kepala}
                      alt='Card image cap'
                    />
                  </div>
                  <div className='card-body'>
                    <h4 className='card-title'>{DataPimpinan.nama_kepala}</h4>
                    <div>
                      <GrLocation />
                      <h5>{DataPimpinan.alamat}</h5>
                      <br />
                    </div>
                    <div>
                      <IoMdCall />
                      <h6>{DataPimpinan.nomor_telepon}</h6>
                    </div>
                    <p className='card-text'>{DataPimpinan.tentang}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 
        <h3>Pimpinan Disidik</h3>
        <hr />
        <Card>
          <Card.Img
            variant='top'
            className='style-pimpinan'
            src={DataPimpinan}
          />
          <Card.Body className='card-body'>
            <Card.Text className='card-text'>
              <h3></h3>
            </Card.Text>
          </Card.Body>
        </Card> */}
      </>
    </div>
  );
};

export default ThridLine;
