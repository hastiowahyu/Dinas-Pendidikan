import React from "react";
import "./ProfileDisdik.css";
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { SiGooglemaps } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import Loading from "react-fullscreen-loading";
import { increment } from "./../../Counter";

const ProfileDisdik = () => {
  const [DataPimpinan, setDataPimpinan] = useState([]);
  const axios = require("axios");
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

  //====== get API for Detail Instansi======//
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/7")
      .then(function (pimpinan) {
        dispatch(increment()); // 4
        setDataPimpinan(pimpinan.data.data);
        console.log("console kepala: " + pimpinan.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <Container className='containernya-profil'>
      {/* ====== menampilkan Loading full screen didetail artikel====== */}
      <Loading loading={LoaderComplete} background='#ffff' loaderColor='#3498db' />
      {/* ===== Menampilkan Logo Instansi ===== */}
      <div className='wrapper' id='app'>
        <div className='card-form'>
          <div className='card-list'>
            <div className='card-item -front'>
              <div className='card-item__side'>
                <div className='card-item__cover'>
                  <img src={DataPimpinan.logo_instansi} className='card-item__bg' />
                </div>
              </div>
            </div>
          </div>
          <div className='card-form__inner'>
            <h4 className='p-didik-profile'>{DataPimpinan.nama_instansi}</h4>
            <p className='p-didik-profile'>{DataPimpinan.tentang}</p>
          </div>
        </div>
      </div>
      {/* ===== Menampilkan profil kepala Instansi ===== */}
      <div id='next'>
        <div className='outside'>
          <div className='card-wrapper-profile'>
            <div className='card-img-profile'>
              <img src={DataPimpinan.foto_kepala} alt='picture' />
            </div>
            <div className='card-info'>
              <h3>{DataPimpinan.nama_kepala}</h3>
              <p className='card-description'>Kepala {DataPimpinan.nama_instansi}</p>
            </div>
          </div>
        </div>
      </div>
      {/* ===== Menampilkan jajaran pengurus Instansi ===== */}
      <div>
        <div className='whole-wrap'>
          <div className='container'>
            <div className='section-top-border'>
              <h3 className='mb-30 title_color' />
              <Row>
                <Col>
                  <div className='courses-container'>
                    <div className='course' style={{ width: 500 }}>
                      <div className='course-preview'>
                        <img src={DataPimpinan.foto_wakil_kepala} width='500px' height='100%' />
                      </div>
                      <div className='course-info'>
                        <h2>Wakil Kepala</h2>
                        <p className='ride'>{DataPimpinan.nama_wakil_kepala}</p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className='courses-container'>
                    <div className='course' style={{ width: 500 }}>
                      <div className='course-preview'>
                        <img src={DataPimpinan.foto_sekretaris} width='500px' height='100%' />
                      </div>
                      <div className='course-info'>
                        <h2>Sekertaris</h2>
                        <p className='ride'>{DataPimpinan.nama_sekretaris}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      {/* menampilkan social media */}
      <div className='pembungkus-social-media'>
        <h1 className='judul-social'>Sosial Media Resmi Kami</h1>
        <div className='social-icons'>
          <a href={DataPimpinan.twitter} className='social-icon social-icon--twitter'>
            <i className='fab fa-twitter' />
            <div className='tooltip'>Twitter</div>
          </a>
          <a href={DataPimpinan.instagram} className='social-icon social-icon--instagram'>
            <i className='fab fa-instagram' />
            <div className='tooltip'>Instagram</div>
          </a>
          <a href={DataPimpinan.youtube} className='social-icon social-icon--youtube'>
            <i className='fab fa-youtube' />
            <div className='tooltip'>Youtube</div>
          </a>
          <a href={DataPimpinan.facebook} className='social-icon social-icon--facebook'>
            <i className='fab fa-facebook' />
            <div className='tooltip'>Facebook</div>
          </a>
        </div>
      </div>
      <div className='main-maps-disdik'>
        <p>
          <span>
            <h1>
              Peta Lokasi <SiGooglemaps size={40} />
            </h1>
          </span>
        </p>
        <h5>{DataPimpinan.alamat}</h5>

        <iframe src={DataPimpinan.google_map} className='maps-profile-disdik' />
      </div>
    </Container>
  );
};

export default ProfileDisdik;
