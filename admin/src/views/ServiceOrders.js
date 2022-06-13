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

function ServiceOrders() {
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

  function denyacceptorder(id,status){
    axios.put(`http://localhost:5000/api/serv/accept-deny/${id}/${status}`).then(()=>getProds())

  }
  function editProd() {
    axios
      .put("http://localhost:5000/api/cat/update/" + prodedit, {
        name_cat: name,
        icon: image,
      })
      .then(() => {
        getProds();
        handleClose();
      });
  }
  function deleteprod(id) {
    axios
      .delete("http://localhost:5000/api/cat/delete/" + id)
      .then(() => getProds());
  }

  function addProd() {
    axios
      .post("http://localhost:5000/api/cat/register", {
        name_cat: name,
        icon: image,
      })
      .then(() => {
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
      .get("http://localhost:5000/api/serv/orders")
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
            <Modal.Title>{editable ? "Edit" : "Add"} Category</Modal.Title>
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
                      onChange={(e) => setImage(e.target.value)}
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
                <p style={{ fontSize: 21, margin: 10 }}>Orders</p>
              </div>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th
                      colSpan={3}
                      style={{
                        borderWidth: 1,
                        borderColor: "black",
                        borderStyle: "solid",
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      User
                    </th>
                    <th
                      colSpan={4}
                      style={{
                        borderWidth: 1,
                        borderColor: "black",
                        borderStyle: "solid",
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Order
                    </th>
                    <th
                      colSpan={2}
                      style={{
                        borderWidth: 1,
                        borderColor: "black",
                        borderStyle: "solid",
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th
                      style={{
                        borderLeftWidth: 1,
                        borderLeftStyle: "solid",
                        borderLeftColor: "black",
                      }}
                    >
                      User Name
                    </th>
                    <th className="border-0">User Phone Number</th>
                    <th
                      style={{
                        borderRightWidth: 1,
                        borderRightStyle: "solid",
                        borderRightColor: "black",
                      }}
                    >
                      User Email
                    </th>
                    <th className="border-0">Car Model</th>
                    <th className="border-0">Description</th>
                    <th className="border-0">Etat</th>
                    <th
                      style={{
                        borderRightWidth: 1,
                        borderRightStyle: "solid",
                        borderRightColor: "black",
                      }}
                    >
                      Service
                    </th>
                    <th className="border-0">Deny</th>
                    <th
                      style={{
                        borderRightWidth: 1,
                        borderRightStyle: "solid",
                        borderRightColor: "black",
                      }}
                    >
                      Accept
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prods.map((el) => (
                    <tr>
                      <td>{el.id}</td>
                      <td
                        style={{
                          borderLeftWidth: 1,
                          borderLeftStyle: "solid",
                          borderLeftColor: "black",
                        }}
                      >
                        {el.name}
                      </td>
                      <td>{el.number}</td>
                      <td
                        style={{
                          borderRightWidth: 1,
                          borderRightStyle: "solid",
                          borderRightColor: "black",
                        }}
                      >
                        {el.email}
                      </td>
                      <td>{new Date(el.date).toDateString()}</td>
                      <td> {el.description}</td>
                      <td> {el.etat}</td>
                      <td   style={{
                          borderRightWidth: 1,
                          borderRightStyle: "solid",
                          borderRightColor: "black",
                        }}> {el.servname}</td>
                      <td>
                        <img
                          onClick={() => {
                            denyacceptorder(el.id,0)
                          }}
                          style={{ height: 25, width: 25 }}
                          className="hovericon"
                          alt="..."
                          src={require("assets/img/cancel.png").default}
                        ></img>
                      </td>
                      <td
                        style={{
                          borderRightWidth: 1,
                          borderRightStyle: "solid",
                          borderRightColor: "black",
                        }}
                      >
                        <img
                          onClick={() =>denyacceptorder(el.id,1)
                          }
                          className="hovericon"
                          style={{ height: 25, width: 25 }}
                          alt="..."
                          src={require("assets/img/confirm.png").default}
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

export default ServiceOrders;
