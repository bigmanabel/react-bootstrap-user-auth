import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';
import reactLogo from '../reactLogo.png';

const Register = () => {
  return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <Card style={{width: '400px'}} className='m-auto px-3'>
            <Card.Body>
                <div className='align-items-center text-center mb-4'>
                <Image 
                src={reactLogo} 
                rounded
                width='60px'
                >
                </Image>
                <h4>Register</h4>
                </div>

                <Form>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control size='sm' type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Control size='sm' type="password" placeholder=" Enter Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control size='sm' type="password" placeholder=" Confirm Password" />
                    </Form.Group>
                    <div className='text-center align-items-center'>
                    <Button size='sm' variant="primary" type="submit" className='mx-auto'>
                    Register
                    </Button>
                    </div>
                    <br />
                    <div className='text-center'>
                    <Form.Text className="text-muted text-center">
                            Already have an account yet? <Link className='text-decoration-none' to='/'>Log in</Link>
                    </Form.Text>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    </div>
  )
}

export default Register;