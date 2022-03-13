import React from "react";
import "./Socmed.css";
import { useEffect, useState } from "react";

const Socmed = () => {
  const [DataFoter, setDataFoter] = useState([]);

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

  return (
    <div id='fixed-social'>
      <div>
        <a href={DataFoter.facebook} className='fixed-facebook' target='_blank'>
          <i className='fab fa-facebook' />
        </a>
      </div>
      <div>
        <a href={DataFoter.youtube} className='fixed-youtube' target='_blank'>
          <i className='fab fa-youtube' />
        </a>
      </div>
      <div>
        <a href='#' className='fixed-twitter' target='_blank'>
          <i className='fab fa-twitter' />
        </a>
      </div>
      <div>
        <a href={DataFoter.instagram} className='fixed-instagrem' target='_blank'>
          <i className='fab fa-instagram' />
        </a>
      </div>
    </div>
  );
};

export default Socmed;
