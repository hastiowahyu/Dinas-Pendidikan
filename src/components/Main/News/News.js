import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./News.css";

const News = () => {
  const content =
    "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.";
  const MAX_LENGTH = 150;
  return (
      <Row>
        <Col className='berita-terbaru'>
          <h3>Berita Terbaru ____</h3>
          {/* menampilkan news */}
          <Row xs={1} md={3} className='g-4'>
            {Array.from({ length: 3 }).map((_, idx) => (
              <Col className='style-card'>
                <Card>
                  <Card.Img
                    variant='top'
                    src='https://uloom.id/wp-content/uploads/2019/10/Masjid-islamic-centre-lampung-1024x650.jpg'
                  />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    {content.length > MAX_LENGTH ? (
                      <>
                        <Card.Text>{`${content.substring(
                          0,
                          MAX_LENGTH
                        )}...`}</Card.Text>
                        <Button variant='primary'>Read More</Button>
                      </>
                    ) : (
                      <Card.Text>{content}</Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col className='berita-umum'>
          <h2>Berita Umum</h2>
          <Card className='text-center'>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <Button variant='primary'>Read More</Button>
            </Card.Body>
            <Card.Footer className='text-muted'>2 days ago</Card.Footer>
          </Card>
        </Col>
      </Row>
  );
};

export default News;
