import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import { useEffect, useState } from "react";

const FooterKita = () => {
  const [DataFoter, setDataFoter] = useState([]);
  const [DataInstansi, setDataInstansi] = useState([]);

  const axios = require("axios");
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/7")
      .then(function (footer) {
        setDataFoter(footer.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi")
      .then(function (instansi) {
        setDataInstansi(instansi.data.data);
        console.log("console foter: " + instansi.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <footer className='footer-section'>
        <div className='container'>
          <div className='footer-cta pt-5 pb-5'>
            <div className='row'>
              <div className='col-xl-4 col-md-4 mb-30'>
                <div className='single-cta'>
                  <i className='fas fa-map-marker-alt' />
                  <div className='cta-text'>
                    <h4>Find us</h4>
                    <span>{DataFoter.alamat}</span>
                  </div>
                </div>
              </div>
              <div className='col-xl-4 col-md-4 mb-30'>
                <div className='single-cta'>
                  <i className='fas fa-phone' />
                  <div className='cta-text'>
                    <h4>Call us</h4>
                    <span>{DataFoter.nomor_telepon}</span>
                  </div>
                </div>
              </div>
              <div className='col-xl-4 col-md-4 mb-30'>
                <div className='single-cta'>
                  <i className='far fa-envelope-open' />
                  <div className='cta-text'>
                    <h4>Mail us</h4>
                    <span>{DataFoter.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='footer-content pt-5 pb-5'>
            <div className='row'>
              <div className='col-xl-4 col-lg-4 mb-50'>
                <div className='footer-widget'>
                  <div className='footer-logo'>
                    <a href='/' className='a-su'>
                      <img
                        src={DataFoter.logo_instansi}
                        className='img-fluid'
                        alt='logo'
                      />
                    </a>
                  </div>
                  <h4>{DataFoter.nama_instansi}</h4>
                  <div className='footer-text'>
                    <p>{DataFoter.tentang}</p>
                  </div>
                  <div className='footer-social-icon'>
                    <span>Follow us</span>
                    <a href={DataFoter.facebook}>
                      <i className='fab fa-facebook-f facebook-bg' />
                    </a>
                    <a href={DataFoter.youtube}>
                      <i class='fab fa-youtube youtube-bg'></i>
                    </a>
                    <a href={DataFoter.instagram}>
                      <i class='fab fa-instagram instagram-bg' />
                    </a>
                  </div>
                </div>
              </div>
              <div className='col-xl-4 col-lg-4 col-md-6 mb-30'>
                <div className='footer-widget'>
                  <div className='footer-widget-heading'>
                    <h3>Maps</h3>
                    <iframe src={DataFoter.google_map} className='style-maps' />
                  </div>
                </div>
              </div>
              <div className='col-xl-4 col-lg-4 col-md-6 mb-50'>
                <div className='footer-widget'>
                  <div className='footer-widget-heading'>
                    <h3>Dinas Terkait</h3>
                    <div style={{ height: "300px", overflowY: "scroll" }}>
                      <ul>
                        {console.log("console ini :" + DataInstansi)}
                        {DataInstansi &&
                          DataInstansi.map((item, index) => {
                            return <li>{item.nama_instansi}</li>;
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='copyright-area'>
          <div className='container'>
            <div className='row'>
              <div className=' text-center text-lg-left'>
                <div className='copyright-text'>
                  <p>
                    &copy; {new Date().getFullYear()} Copyright:{" "}
                    {DataFoter.nama_instansi}| All Rights Reserved.
                    {"-"} <a href='https://www.instagram.com/hastio.wu/'>710</a>
                    {"-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterKita;
