import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Alert,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Posts() {
  const [post, setPost] = useState([]);
  const [hasToken, setHasToken] = useState(true);
  const getAllposts = async () => {
    const res = await axios.get('http://localhost:3000/api/posts');
    setPost(res.data.data);
  };

  useEffect(() => {
    getAllposts();
  }, []);

  const checkToken = () => {
    if (!localStorage.getItem('token')) {
      setHasToken(false);
    }
  };

  const createPostHandler = (e) => {
    e.preventDefault();
    checkToken();
  };

  return (
    <Container className="my-4">
      {!hasToken && (
        <Alert variant="danger">
          You need to be logged in to post{' '}
          <a href="" className="fw-bold">
            Create Account here
          </a>
        </Alert>
      )}

      <Form method="POST" onSubmit={createPostHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="h5">New post</Form.Label>
          <Form.Control
            as="input"
            rows={3}
            name="title"
            placeholder="Title"
            className="mb-2"
            required
          />
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            placeholder="Content"
            required
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
  );
}

export default Posts;
