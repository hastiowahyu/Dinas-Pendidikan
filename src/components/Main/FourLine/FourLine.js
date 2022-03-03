import React from "react";
import "./FourLine.css";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Col, Container, Row, Button } from "react-bootstrap";

const FourLine = () => {
  const [DataArtikel, setDataArtikel] = useState();

  const axios = require("axios");
  useEffect(() => {
    axios
      .get(
        "http://adminmesuji.embuncode.com/api/article?instansi_id=2&per_page=3"
      )
      .then(function (Umum) {
        console.log("console artikel: " + Umum.data.data.data);
        setDataArtikel(Umum.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <Container>
      <Row>
        <Col md={5}>
          <h1>Artikel Populer</h1>
          <hr />
          <Card className="card-nya">
            {console.log("console ini kategori:" + DataArtikel)}
            {DataArtikel &&
              DataArtikel.map((item, index) => {
                console.log("terbaru", item);
                return (
                  <div className="jarak">
                    <Card className='text-center'>
                      <Card.Header>Featured</Card.Header>
                      <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </Card.Text>
                        <Button variant='primary'>Go somewhere</Button>
                      </Card.Body>
                      <Card.Footer className='text-muted'>
                        2 days ago
                      </Card.Footer>
                    </Card>
                  </div>
                );
              })}
          </Card>
        </Col>
        <Col>
          <h1>Artikel Terbaru</h1>
          <hr />
          <div>
            {console.log("console ini kategori:" + DataArtikel)}
            {DataArtikel &&
              DataArtikel.map((item, index) => {
                console.log("terbaru", item);
                return (
                  <>
                    <Card>
                      <Card.Img variant='top' src={item.image_file_data} className="ukuran-img" />
                      <Card.Body>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <br />
                  </>
                );
              })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FourLine;
