// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

//import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

// apollo react coding
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';


const LoginForm = (args) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  // apollo 
  const [login, { error }] = useMutation(LOGIN_USER);
 
  const [showAlert, setShowAlert] = useState(false);
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(name);
    setUserFormData({ 
      ...userFormData,
       [name]: value 
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    console.log("hit here");
    //check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;

    try {
      const { data } = await login({
        variables: {...userFormData}
      });


      Auth.login(data.login.token);

    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  }
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>

      {error && <div>Login failed</div>}
    </>
  );
};

export default LoginForm;
