import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
      <Navbar className='bg-white style-navbar' expand='lg' fixed='top'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='m-auto'>
            {DataResponse &&
              DataResponse.map((m, i) => {
                return (
                  <Fragment key={i}>
                    {m.children.length > 0 ? (
                      <>
                        <NavDropdown title={m.name}>
                          {m.children &&
                            m.children.map((h, k) => {
                              return (
                                <Fragment key={k}>
                                  {h.children.length > 0 ? (
                                    <>
                                      <NavDropdown title={h.name}>
                                        {h.children &&
                                          h.children.map((j, o) => {
                                            return (
                                              <Fragment key={o}>
                                                {j.children.length > 0 ? (
                                                  <>
                                                    <NavDropdown title={j.name}>
                                                      {j.children &&
                                                        j.children.map((k, l) => {
                                                          return (
                                                            <NavDropdown.Item eventKey='4.1' href={k.url} key={l}>
                                                              {k.name}
                                                            </NavDropdown.Item>
                                                          );
                                                        })}
                                                    </NavDropdown>
                                                  </>
                                                ) : j.static_page != null ? (
                                                  <Link to={"/static/" + j.static_page}>{j.name}</Link>
                                                ) : (
                                                  <Nav.Link href={j.url}>{j.name}</Nav.Link>
                                                )}
                                              </Fragment>
                                            );
                                          })}
                                      </NavDropdown>
                                    </>
                                  ) : h.static_page != null ? (
                                    <Link to={"/static/" + h.static_page}>{h.name}</Link>
                                  ) : (
                                    <Nav.Link href={h.url}>{h.name}</Nav.Link>
                                  )}
                                </Fragment>
                              );
                            })}
                        </NavDropdown>
                      </>
                    ) : m.static_page != null ? (
                      <Link to={"/static/" + m.static_page}>{m.name}</Link>
                    ) : (
                      <Nav.Link href={m.url}>{m.name}</Nav.Link>
                    )}
                  </Fragment>
                );
              })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default Navbars;
