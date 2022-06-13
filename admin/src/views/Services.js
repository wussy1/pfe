import axios from "axios";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Form,
  Modal,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Services() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const [prodedit, setProdEdit] = useState(null);
  const [editable, setEditable] = useState(false);
  const handleClose = () => {
    setShow(false);
    clearstate();
  };
  const handleShow = () => {
    setShow(true);
    clearstate();
  };

  function editProd() {
      axios.put("http://localhost:5000/api/serv/update/"+prodedit,{name:name,icon:image}).then(() => {
        getProds();
        handleClose();
      }); 
  }
  function deleteprod(id) {
    axios.delete("http://localhost:5000/api/serv/delete/"+id).then(() => getProds());
 }

  function addProd() {
  axios.post("http://localhost:5000/api/serv/add",{name:name,icon:image}).then(() => {
        getProds();
        handleClose();
      });
  }
  function clearstate() {
    setName("");
    setImage("");
  }
  function getProds() {
    axios
      .get("http://localhost:5000/api/serv/")
      .then((result) => setProds(result.data));
  }

  const [prods, setProds] = useState([]);
  useEffect(() => {
    getProds();
  }, []);

  return (
    <>
      <>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editable ? "Edit" : "Add"} Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col className="pl-1" md="6">
                  <Form.Group>
                    <label>Name</label>
                    <Form.Control
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      placeholder="Category name"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                
              </Row>

              
             
              <Row>
                <Col md="12">
                  <Form.Group>
                    <label>Icon</label>
                    <Form.Control
                      value={image}
                      onChange={(e)=>setImage(e.target.value)}
                      placeholder="Image here"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                editable ? editProd() : addProd();
              }}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Container fluid>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontSize: 21, margin: 10 }}>Services Table</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setEditable(false);
                    handleShow();
                  }}
                >
                  Add Service
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Name</th>
                    <th className="border-0">Icon</th>
                    <th className="border-0">Edit</th>
                    <th className="border-0">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {prods.map((el) => (
                    <tr>
                      <td>{el.id}</td>
                      <td>{el.name}</td>
                      <td>
                        <img
                          style={{ width: 80, height: 80 }}
                          src={el.icon}
                        />
                      </td>
                      <td>
                        <img
                          onClick={() => {
                            setProdEdit(el.id);
                            handleShow();
                            setEditable(true);
                            setName(el.name); 
                            setImage(el.icon);

                          }}
                          style={{ height: 25, width: 25 }}
                          className="hovericon"
                          alt="..."
                          src={require("assets/img/edit.png").default}
                        ></img>
                      </td>
                      <td>
                        <img
                          onClick={() => deleteprod(el.id)}
                          className="hovericon"
                          style={{ height: 25, width: 25 }}
                          alt="..."
                          src={require("assets/img/delete.png").default}
                        ></img>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
}

export default Services;
