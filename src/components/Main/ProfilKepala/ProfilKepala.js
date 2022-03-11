import React from "react";
import "./ProfilKepala.css";
import { useEffect, useState } from "react";

const ThridLine = () => {
  const [DataPimpinan, setDataPimpinan] = useState([]);
  const axios = require("axios");

  //====== get API for Detail Instansi======//
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

  return (
    // ====== Menampilkan Profil Pimpinan Kepala Dinas======
    <div className='utama-kepala'>
      <div className='row mb-5'>
        <div className='col-md-4 itu-nya'>
          <img src={DataPimpinan.foto_kepala} width={"100%"} className='foto-kepala' alt='Foto Kepala' />
        </div>
        <div className='col-md-8 rest'>
          <h2 className='kata-pembuka-news'>{DataPimpinan.nama_instansi}</h2>
          <br />
          <p>Tentang Instansi</p>
          <p>{DataPimpinan.tentang}</p>
          <div className='nama-kpla'>
            <h4 className='bagian_nama'>Kepala {DataPimpinan.nama_instansi}</h4>
            <h2 className='kepala-dinas'>{DataPimpinan.nama_kepala}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThridLine;
