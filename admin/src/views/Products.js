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

function Products() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [prodedit,setProdEdit]=useState(null);
  const [editable, setEditable] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const handleClose = () => {
    setShow(false);
    clearstate();
  };
  const handleShow = () => {
    setShow(true);
    clearstate();
  };

  function editProd() {
    axios
      .put("http://localhost:5000/api/product/update/" + prodedit, {
        prod_name: name,
        prix: price,
        description: description,
        quantity: quantity,
        discount: discount,
        prod_image: image,
        id_cat: selectedCat,
      })
      .then(() => {getProds();handleClose()});
  }
  function deleteprod(id) {
    axios
      .delete("http://localhost:5000/api/product/delete/" + id)
      .then(() => getProds());
  }

  function addProd() {
    axios
      .post("http://localhost:5000/api/product/register", {
        prod_name: name,
        prix: price,
        description: description,
        quantity: quantity,
        discount: discount,
        prod_image: image,
        id_cat: selectedCat,
      })
      .then(() => {
        getProds();
        handleClose();
      });
  }
  function clearstate() {
    setName("");
    setDescription("");
    setDiscount(0);
    setImage("");
    setPrice("");
    setQuantity("");
  }
  function getProds() {
    axios
      .get("http://localhost:5000/api/product/")
      .then((result) => setProds(result.data));
  }
  function getCategoriest() {
    axios
      .get("http://localhost:5000/api/cat/")
      .then((result) => {setCategories(result.data);setSelectedCat(result.data[0].id_cat)});
  }

  const [prods, setProds] = useState([]);
  useEffect(() => {
    getProds();
    getCategoriest();
  }, []);

  return (
    <>
      <>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editable ? "Edit" : "Add"} Product</Modal.Title>
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
                      placeholder="Product name"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pl-1" md="6">
                  <Form.Group>
                    <label>Description</label>
                    <Form.Control
                                          value={description}

                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Product description"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col className="pr-1" md="6">
                  <Form.Group>
                    <label>Price</label>
                    <Form.Control
                    value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="100"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pl-1" md="6">
                  <Form.Group>
                    <label>Discount</label>
                    <Form.Control
                    value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      placeholder="Discount in numbers"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="pl-1" md="6">
                  <Form.Group>
                    <label>Quantity</label>
                    <Form.Control
                    value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Product description"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pl-1" md="6">
                  <Form.Group>
                    <label>Category</label>
                    <Form.Control
                      as="select"
                      value={selectedCat}
                      onChange={(e) => {
                        setSelectedCat(e.target.value);
                      }}
                    >
                      {categories.map((el) => (
                        <option value={el.id_cat}>{el.name_cat}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Form.Group>
                    <label>Image</label>
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
                <p style={{ fontSize: 21, margin: 10 }}>Products Table</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setEditable(false);
                    handleShow();
                  }}
                >
                  Add Product
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Name</th>
                    <th className="border-0">Description</th>
                    <th className="border-0">Price</th>
                    <th className="border-0">Discount</th>
                    <th className="border-0">Quantity</th>
                    <th className="border-0">Image</th>
                    <th className="border-0">Edit</th>
                    <th className="border-0">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {prods.map((el) => (
                    <tr>
                      <td>{el.id_prod}</td>
                      <td>{el.prod_name}</td>
                      <td>{el.description}</td>
                      <td>{el.prix}</td>
                      <td>{el.discount ? `${el.discount} %` : "0%"}</td>
                      <td>{el.quantity}</td>

                      <td>
                        <img
                          style={{ width: 80, height: 80 }}
                          src={el.prod_image}
                        />
                      </td>
                      <td>
                        {" "}
                        <img
                          onClick={() => {
                            setProdEdit(el.id_prod);
                            handleShow();
                            setEditable(true);
                            setName(el.prod_name);
                            setDescription(el.description);
                            setSelectedCat(el.id_cat)
                            setPrice(el.prix);
                            setImage(el.prod_image);
                            setQuantity(el.quantity);
                            setDiscount(el.discount);

                          }}
                          style={{ height: 25, width: 25 }}
                          className="hovericon"
                          alt="..."
                          src={require("assets/img/edit.png").default}
                        ></img>
                      </td>
                      <td>
                        {" "}
                        <img
                          onClick={() => deleteprod(el.id_prod)}
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

export default Products;
