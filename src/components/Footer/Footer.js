import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Footer } from "mdbreact";
import "./Footer.css";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

const FooterKita = () => {
  return (
    <Footer className='page-footer'>
      <Container className='text-left'>
        <Row>
          <Col>
            <h5 className='text-uppercase mb-4 mt-3 font-weight-bold'>
              Tentang kami
            </h5>
            <p>
              Dinas Pendidikan merupakan unsur pelaksana otonomi daerah yang
              dipimpin oleh seorang Kepala Dinas yang berkedudukan di bawah dan
              bertanggung jawab kepada Bupati melalui Sekretaris Daerah
              Kabupaten.
            </p>
          </Col>
          <Col>
            <h5 className='text-uppercase mb-4 mt-3 font-weight-bold'>
              Pengaduan Masyarakat
            </h5>
            <FiPhoneCall size={30} /> <>Call Us On </> <br />
            <span className='text-pengaduan'>08125865551</span> <br /> <br />
            <HiOutlineMail size={30} /> <>Email Us</> <br />
            <span className='text-pengaduan'>Dinas_pendidikan@gmail.com</span>
          </Col>
          <Col>
            <h5 className='text-uppercase mb-4 mt-3 font-weight-bold'>Maps</h5>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.346922786506!2d105.52375941576365!3d-5.04738325271603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e4090978ec3a727%3A0xe8ce47b35172a75!2sDinas%20Pendidikan%20Pemuda%20dan%20Olahraga%20Kab.%20Lampung%20Timur!5e0!3m2!1sid!2sid!4v1644394766236!5m2!1sid!2sid'
              className='style-maps'
            />
          </Col>
        </Row>
      </Container>
      <hr />
      <div className='footer-copyright text-center style-copyright'>
        <Container fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <> DINAS PENDIDIKAN KAB. LAMPUNG TIMUR| All Rights Reserved.</>
        </Container>
      </div>
    </Footer>
  );
};

export default FooterKita;
