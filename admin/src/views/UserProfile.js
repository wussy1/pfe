import axios from "axios";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Table,
  Row,
  Col,
} from "react-bootstrap";

function User() {
  const [users, setUsers] = useState([]);

  function getUsers() {
    axios
      .get("http://localhost:5000/api/user")
      .then((result) => setUsers(result.data));
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Container fluid>
        <Card>
          <div>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Name</th>
                    <th className="border-0">Email</th>
                    <th className="border-0">Number</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((el) => (
                    <tr>
                      <td>{el.id}</td>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.number}</td>
                    </tr>
                  ))}
                
                </tbody>
              </Table>
            </Card.Body>
          </div>
        </Card>
      </Container>
    </>
  );
}

export default User;
