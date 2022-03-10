import React from "react";
import "./HalamanStatis.css";
import { useEffect, useState } from "react";

const HalamanStatis = () => {
  const [DataStatis, setDataStatis] = useState([]);
  const [DataPimpinan, setDataPimpinan] = useState([]);
  const axios = require("axios");
  //====== get API for static page======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/static-page/7_profilSKPD")
      .then(function (Umum) {
        setDataStatis(Umum.data.data);
        console.log("statis: " + Umum.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  //====== get API for Data kepala dinas======//
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
    <>
      <header className='header-statis'>
        <h2 className='h-dua'>{DataStatis.title}</h2>
      </header>
      <main className='main-statis'>
        {/* ====== menampilkan kepala dinas distatic page====== */}
        <article className='article-statis'>
          <h4 className='h-empat'>Kepala {DataPimpinan.nama_instansi}</h4>
          <h5 className='h-lima'>{DataPimpinan.nama_kepala}</h5>
          <img src={DataPimpinan.foto_kepala}  className="img-statis"/>
          <p className='p-statis'>{DataPimpinan.tentang}</p>
        </article>
        {/* ====== menampilkan static page====== */}
        <section className='section-statis'>
          <h3 className='h-tiga'>SECCIÓN DE INFORMACIÓN DESTACADA</h3>
          <h5 className='h-lima'>Título del artículo 2</h5>
          <p
            className='p-statis'
            dangerouslySetInnerHTML={{
              __html: DataStatis.content,
            }}
          />
        </section>
      </main>
    </>
  );
};

export default HalamanStatis;
