import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import reactLogo from '../reactLogo.png';
import { useState } from 'react';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = {email, password}
        
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json()

        if (!response.ok) {
            setError(data.error);
            console.log(data.error);
        }

        if (response.ok) {
            setEmail('');
            setPassword('');
            setError(null);
            localStorage.setItem('user', JSON.stringify(data));
            console.log(data)
        }
      
    }
  return (
        <Card style={{width: '400px'}} className='m-auto px-3'>
        <Card.Body>
            <div className='align-items-center text-center mb-4'>
            <Image 
            src={reactLogo} 
            rounded
            width='60px'
            >
            </Image>
            <h4>Login</h4>
            </div>

            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Control 
                    size='sm' 
                    type="email" 
                    placeholder="Enter email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control 
                    size='sm' 
                    type="password" 
                    placeholder=" Enter Password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    />
                </Form.Group>

                <div className='text-center align-items-center'>
                <Button size='sm' variant="primary" type="submit" className='mx-auto'>
                Log in
                </Button>
                </div>

                {error && (
                        <Alert variant='danger' className='mt-3 text-center align-items-center d-flex justify-content-center' style={{height: '20px'}}>
                            {error}
                        </Alert>
                )}

                <br />
                
                <div className='text-center'>
                <Form.Text className="text-muted text-center">
                        Don't have an account yet? <Link className='text-decoration-none' to='/register'>Register</Link>
                </Form.Text>
                </div>
            </Form>
        </Card.Body>
    </Card>
  )
}