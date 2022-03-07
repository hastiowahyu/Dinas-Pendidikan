import React from "react";

const coba = () => {
  return (
    <div className='row mb-5'>
      <div className='col-md-4'>
        <img
          src={DataKepala.foto_kepala}
          width={"100%"}
          className='foto-kepala'
          alt='Foto Kepala'
        />
      </div>
      <div className='col-md-8 rest'>
        <h2 className='kata-pembuka-news'>Dinas Pertanian Lampung Timur</h2>
        <p>Tentang Instansi</p>
        <p>{DataKepala.tentang}</p>
        <div className='nama-kpla'>
          <h2 className='kata-penutup-news'>
            Kepala Dinas Pertanian Kabupaten Lampung Timur
          </h2>
          <h2 className='kepala-dinas'>{DataKepala.nama_kepala}</h2>
        </div>
      </div>
    </div>
  );
};

export default coba;
