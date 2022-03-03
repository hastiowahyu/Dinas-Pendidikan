import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { ListGroup } from "react-bootstrap";
import { Container} from "react-bootstrap";

function Dokumen() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [DataDokumen, setDataDokumen] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const axios = require("axios");
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/dokumen?instansi_id=8")
      .then(function (dokumen) {
        console.log("dokumen: " + dokumen.data.data.data);
        setDataDokumen(dokumen.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  console.log("first", DataDokumen);
  return (
    <div>
      {DataDokumen &&
        DataDokumen.map((item, index) => {
          return item.dokumen_item.map((itm, idx) => {
            return (
              <Container>
                <ListGroup>
                  <ListGroup.Item>
                    <a
                      href={
                        "/pdf/" +
                        item.slug +
                        "/" +
                        itm.dokumen_file_name.replace(/\s/g, "")
                      }>
                      {itm.dokumen_file_name}
                    </a>
                  </ListGroup.Item>
                </ListGroup>
              </Container>
            );
          });
        })}
    </div>
  );
}
export default Dokumen;
