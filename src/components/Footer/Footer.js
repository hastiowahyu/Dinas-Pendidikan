import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Footer } from "mdbreact";
import "./Footer.css";
import { useEffect, useState } from "react";



const FooterKita = () => {
    const [DataFoter, setDataFoter] = useState([]);
    const axios = require("axios");
    useEffect(() => {
      axios
        .get("http://adminmesuji.embuncode.com/api/instansi/detail/2")
        .then(function (footer) {
          setDataFoter(footer.data.data);
          console.log("console foter: " + footer.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);
  return (
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
                  <a href='index.html'>
                    <img src='Disdik.png' className='img-fluid' alt='logo' />
                  </a>
                </div>
                <div className='footer-text'>
                  <p>{DataFoter.tentang}</p>
                </div>
                <div className='footer-social-icon'>
                  <span>Follow us</span>
                  <a href='#'>
                    <i className='fab fa-facebook-f facebook-bg' />
                  </a>
                  <a href='#'>
                    <i className='fab fa-twitter twitter-bg' />
                  </a>
                  <a href='#'>
                    <i className='fab fa-google-plus-g google-bg' />
                  </a>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-6 mb-30'>
              <div className='footer-widget'>
                <div className='footer-widget-heading'>
                  <h3>Useful Links</h3>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.346922786506!2d105.52375941576365!3d-5.04738325271603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e4090978ec3a727%3A0xe8ce47b35172a75!2sDinas%20Pendidikan%20Pemuda%20dan%20Olahraga%20Kab.%20Lampung%20Timur!5e0!3m2!1sid!2sid!4v1644394766236!5m2!1sid!2sid'
                    className='style-maps'
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-6 mb-50'>
              <div className='footer-widget'>
                <div className='footer-widget-heading'>
                  <h3>Buku Tamu</h3>
                </div>
                <div className='footer-text mb-25'>
                  <p>
                    Don’t miss to subscribe to our new feeds, kindly fill the
                    form below.
                  </p>
                </div>
                <div className='subscribe-form'>
                  <form action='#'>
                    <input type='text' placeholder='Email Address' />
                    <button>
                      <i className='fab fa-telegram-plane' />
                    </button>
                  </form>
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
                  &copy; {new Date().getFullYear()} Copyright: DINAS PENDIDIKAN
                  KAB. LAMPUNG TIMUR| All Rights Reserved.
                  <>
                    <br />
                    Design by{" "}
                  </>
                  <a href='https://www.instagram.com/hastio.wu/'>Hastio</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterKita;
