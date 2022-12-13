import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Modallogin(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await axios.post('http://localhost:3000/api/auth/login').data({
      username,
      password,
    });

    console.log(username);
    console.log(password);
    console.log(res);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    login();
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                as="input"
                type="text"
                autoFocus
                name="username"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                name="password"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={login}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modallogin;
