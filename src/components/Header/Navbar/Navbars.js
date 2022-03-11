import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Navbars = (params) => {
  const [DataResponse, setDataResponses] = useState(null);
  const axios = require("axios");

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/menus?instansi_id=7")
      .then(function (response) {
        setDataResponses(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Fragment>
      {console.log(DataResponse)}
      <Navbar className='bg-white style-navbar' expand='lg' fixed='top'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='m-auto'>
            {DataResponse &&
              DataResponse.map((m, i) => {
                console.log("DataResponse22", DataResponse);
                return (
                  <>
                    {m.children.length > 0 ? (
                      <>
                        <NavDropdown title={m.name}>
                          {m.children &&
                            m.children.map((h, k) => {
                              {
                                console.log("Nama Children " + h.name);
                              }
                              return (
                                <>
                                  {h.children.length > 0 ? (
                                    <>
                                      <NavDropdown title={h.name}>
                                        {h.children &&
                                          h.children.map((j, o) => {
                                            return (
                                              <>
                                                {j.children.length > 0 ? (
                                                  <>
                                                    <NavDropdown title={j.name}>
                                                      {j.children &&
                                                        j.children.map((k, l) => {
                                                          return (
                                                            <NavDropdown.Item eventKey='4.1' href={k.url}>
                                                              {k.name}
                                                            </NavDropdown.Item>
                                                          );
                                                        })}
                                                    </NavDropdown>
                                                  </>
                                                ) : m.static_page != null ? (
                                                  <Nav.Link href={"/" + m.static_page}>{m.name}</Nav.Link>
                                                ) : (
                                                  <Nav.Link href={j.url}>{j.name}</Nav.Link>
                                                )}
                                              </>
                                            );
                                          })}
                                      </NavDropdown>
                                    </>
                                  ) : m.static_page != null ? (
                                    <Nav.Link href={"/" + m.static_page}>{m.name}</Nav.Link>
                                  ) : (
                                    <Nav.Link href={h.url}>{h.name}</Nav.Link>
                                  )}
                                </>
                              );
                            })}
                        </NavDropdown>
                      </>
                    ) : m.static_page != null ? (
                      <Nav.Link href={'/' + m.static_page}>{m.name}</Nav.Link>
                    ) : (
                      <Nav.Link href={m.url}>{m.name}</Nav.Link>
                    )}
                  </>
                );
              })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default Navbars;
