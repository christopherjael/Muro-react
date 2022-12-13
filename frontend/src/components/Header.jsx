import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Modal,
  Alert,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Outlet, Link } from 'react-router-dom';
import ModalLogin from './Modallogin';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Header(props) {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const req = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (req.status == 400) {
      return setShowAlert(true);
    }
    const data = await req.json();
    const token = data.token;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setShow(false);
    setIsLogin(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    login();
  };

  const verifyLogin = () => {
    if (localStorage.getItem('token')) {
      setIsLogin(true);
      setUsername(localStorage.getItem('username'));
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Mi-Posts</Navbar.Brand>
          {!isLogin && (
            <Button variant="primary" onClick={() => setShow(true)}>
              Login
            </Button>
          )}
          {isLogin && (
            <>
              <p className="text-light">
                <i className="bi bi-person-circle me-2"> {username}</i>
              </p>
              <Button
                variant="danger"
                onClick={() => {
                  localStorage.removeItem('username');
                  localStorage.removeItem('token');
                  setIsLogin(false);
                }}
              >
                <i className="bi bi-door-open-fill"></i>
                Logout
              </Button>
            </>
          )}
        </Container>
      </Navbar>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => submitHandler(e)}>
            {showAlert && (
              <Alert variant="danger">Username or Password incorrect</Alert>
            )}

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onFocus={() => setShowAlert(false)}
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
                onFocus={() => setShowAlert(false)}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                name="password"
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Login
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
