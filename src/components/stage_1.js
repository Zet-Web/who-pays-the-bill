import React, { useState, useContext, useRef } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { MyContext } from '../context';

const Stage1 = () => {
  const context = useContext(MyContext);
  const textInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Form className='mt-4' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Add player Name'
            name='player'
            ref={textInput}
          />
        </Form.Group>
        <Button className='mt-4 miami' variant='primary' type='submit '>
          Add player
        </Button>
      </Form>
    </>
  );
};

export default Stage1;
