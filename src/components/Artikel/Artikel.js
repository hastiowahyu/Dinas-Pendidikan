import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import "./Artikel.css";
import { Container, Pagination } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import DetailArtikel from "./DetailArtikel/DetailArtikel";
import { Link } from "react-router-dom";

const Artikel = () => {
  const [DataResponse, setDataResponses] = useState(0);
  const axios = require("axios");

  const [Items, setItems] = useState([]);
  let items = [];
  const [, updateState] = React.useState();
  const forceUpdtae = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    gettingData(1);
  }, []);

  let tooglePaginate = true;
  function gettingData(page) {
    setDataResponses(null);
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/article?instansi_id=2&per_page=4&page=" +
          page
      )
      .then(function (response) {
        setDataResponses(response.data.data.data);
        items = [];
        for (let number = 1; number <= response.data.data.last_page; number++) {
          items.push(
            <Pagination.Item
              onClick={() => gettingData(number)}
              key={number}
              active={number == response.data.data.current_page}>
              {number}
            </Pagination.Item>
          );
          console.log("test " + items);
          setItems(items);
          tooglePaginate = false;
        }
        forceUpdtae();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleLength(valeu, lengths) {
    if (valeu.length < lengths) {
      return valeu;
    } else {
      return valeu.substring(0, lengths);
    }
  }

  function convvertDate(timeResponse) {
    var date = new Date(timeResponse);
    return date.toLocaleString("en-GB", { hour12: false });
  }

  return (
    <div className='style-artikel'>
      <Row>
        <Col md={6}>
          <h1> Artikel </h1> <hr />
          <div>
            {console.log("first", DataResponse)}
            {DataResponse != null
              ? DataResponse &&
                DataResponse.map((item, index) => {
                  return index % 2 === 0 ? (
                    <div className='blog-card'>
                      <div className='meta'>
                        <img className='photo' src={item.image_file_data} />
                        <ul className='details'>
                          <li className='date'>
                            {convvertDate(item.created_at)}
                          </li>
                        </ul>
                      </div>
                      <div className='description'>
                        <h2>{handleLength(item.title, 30)}</h2>
                        <p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: handleLength(item.content, 200),
                            }}
                          />
                        </p>
                        <p className='read-more'>
                          <Link to='/artikel/DetailArtikel'>ReadMore</Link>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className='blog-card alt'>
                      <div className='meta'>
                        <img className='photo' src={item.image_file_data} />
                        <ul className='details'>
                          <li className='date'>{item.created_at}</li>
                        </ul>
                      </div>
                      <div className='description'>
                        <h2>{handleLength(item.title, 30)}</h2>
                        <p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: handleLength(item.content, 200),
                            }}
                          />
                        </p>
                        <p className='read-more'>
                          <Link to='/DetaiArtikel'>ReadMore</Link>
                        </p>
                      </div>
                    </div>
                  );
                })
              : "loading ..."}
          </div>
          <Row>
            {console.log("items", Items)}
            <Col className='text-center-costum'>
              <Pagination>{Items}</Pagination>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <div>
            <h1>Artikel Tebaru__</h1> <hr />
            <div>
              {DataResponse &&
                DataResponse.map((item, index) => {
                  return (
                    <Card className='bg-dark text-white img-overlay'>
                      <Card.Img src={item.image_file_data} />
                      <Card.ImgOverlay>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>
                          {handleLength(item.content, 120)}....
                        </Card.Text>
                        <Card.Text>Last updated 3 mins ago</Card.Text>
                      </Card.ImgOverlay>
                    </Card>
                  );
                })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Artikel;
