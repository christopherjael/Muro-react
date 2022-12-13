import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Alert,
  Modal,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Posts() {
  const [post, setPost] = useState([]);
  const [hasToken, setHasToken] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const getAllposts = async () => {
    const res = await axios.get('http://localhost:3000/api/posts');
    setPost(res.data.data);
  };

  const createPosts = async () => {
    const req = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token').toString(),
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    getAllposts();
  };

  const createUser = async () => {
    const req = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        lastname,
        username,
        password,
      }),
    });

    if (req.status == 400) {
      setShowAlert(true);
    }
    handleClose();
    setHasToken(true);
  };

  useEffect(() => {
    getAllposts();
  }, []);

  const checkToken = () => {
    if (!localStorage.getItem('token')) {
      return setHasToken(false);
    }
    createPosts();
  };

  const createPostHandler = (e) => {
    e.preventDefault();
    checkToken();
  };

  const createUserHandler = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <>
      <Container className="my-4">
        {!hasToken && (
          <Alert variant="danger">
            You need to be logged in to post{' '}
            <a href="#" onClick={() => handleShow()}>
              Create Account here
            </a>
          </Alert>
        )}

        <Form onSubmit={createPostHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="h5">New post</Form.Label>
            <Form.Control
              as="input"
              rows={3}
              name="title"
              placeholder="Title"
              className="mb-2"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              placeholder="Content"
              required
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="d-grid gap-2">
              <Button className="mt-2" variant="success" type="submit">
                Post
              </Button>
            </div>
          </Form.Group>
        </Form>
        <hr />
        <h1 className="h5">Feed</h1>
        {post.map((data) => {
          return (
            <Container className="shadow-lg p-3 mb-5 bg-body rounded border border-secondary">
              <div className="d-flex justify-content-between">
                <p>
                  {' '}
                  <i className="bi bi-person-circle me-2"></i>
                  {data.postedBy}
                </p>
                <p>
                  {' '}
                  <i className="bi bi-calendar me-2"></i>
                  {new Date(data.createAt).toDateString()}
                </p>
              </div>
              <hr />
              <h6>{data.title}</h6>
              {data.content}
            </Container>
          );
        })}
      </Container>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createUserHandler(e)}>
            {showAlert && (
              <Alert variant="danger">Username is already registered</Alert>
            )}

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onFocus={() => setShowAlert(false)}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                as="input"
                type="text"
                autoFocus
                name="name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                onFocus={() => setShowAlert(false)}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                as="input"
                type="text"
                autoFocus
                name="lastname"
                required
              />
            </Form.Group>

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
                Create
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Posts;
