import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import './SecondLine.css';

const SecondLine = () => {
  return (
    <div>
      {" "}
      <Row>
        <Col className='style-pimpinan'>
          <Card>
            <Card.Img
              variant='top'
              src='https://th.bing.com/th/id/R.a1e9e23da22ac1312bc6d6d1edd6837b?rik=c83n6ooVnrnHTA&riu=http%3a%2f%2fluthfan.com%2fwp-content%2fuploads%2f2017%2f08%2fFoto-Orang-Ganteng-di-Lampung.jpg&ehk=D6hvNsr1eTA78IJbp2bIQxJmH%2bYyLIqBq3OL%2fKAqS44%3d&risl=&pid=ImgRaw&r=0'
            />
            <Card.Body>
              <Card.Text>
                <h3>sosok pimpinan disdik</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SecondLine;