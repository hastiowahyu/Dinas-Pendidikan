import React from "react";
import "./DetailArtikel.css";
import { Card, Container, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DetailArtikel = () => {
  const { id } = useParams();
  console.log("first", id);
  const axios = require("axios");
  const [dataDetailArtikel, setDataDetailArtikel] = useState(0);

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/article/" + id)
      .then(function (response) {
        console.log("console detail: " + response.data.data);
        setDataDetailArtikel(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [axios]);

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 offset-md-1'>
            <div className='intro'>
              <h1 className='text-center'>{dataDetailArtikel.title}</h1>
              <p className='text-center'>
                <span className='by'>by </span>
                <a>{dataDetailArtikel.created_by}</a>
                <span> | </span>
                <span className='date'> {dataDetailArtikel.created_at}</span>
              </p>
              <img
                className='img-fluid'
                src={dataDetailArtikel.image_file_data}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <div>
    //     <p>{dataDetailArtikel.intro}</p>
    //   </div>
    // </div>
  );
};

export default DetailArtikel;
