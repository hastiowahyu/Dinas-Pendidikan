import React from "react";
import "./DetailNews.css";
import { Card, Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment-with-locales-es6";

const DetailNews = () => {
  const { id } = useParams();
  console.log("dtlart", id);
  const axios = require("axios");
  const [dataDetailNews, setDataDetailNews] = useState(0);

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/news/" + id)
      .then(function (response) {
        console.log("console detail: " + response.data.data);
        setDataDetailNews(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [axios]);

  return (
    <div>
      <Row>
        <Col md={9}>
          <Container>
            <Card>
              <Card.Img variant='top' src={dataDetailNews.image_file_data} />
              <Card.Body>
                <Card.Title>{dataDetailNews.title}</Card.Title>
                <span>
                  {
                    (moment.locale("id-ID"),
                    moment(dataDetailNews.created_at).fromNow())
                  }
                </span>
                &emsp;
                <span>{dataDetailNews.news_category_id}</span>
                <Card.Text
                  dangerouslySetInnerHTML={{
                    __html: dataDetailNews.content,
                  }}></Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </Col>
        <Col md={3}>
          <h1>Popular Post</h1>
        </Col>
      </Row>
    </div>
  );
};

export default DetailNews;
