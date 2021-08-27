import React, { useState, useContext, useRef } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { MyContext } from '../context';

const Stage1 = () => {
  const context = useContext(MyContext);
  const textInput = useRef();
  const [error, setError] = useState([false, '']);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value;
    const validate = validateInput(value);
    if (validate) {
      setError([false, '']);
      textInput.current.value = '';
      context.addPlayer(value);
      // context.state.players.push(value);

      console.log(value);
    } else {
      console.log('error');
    }
  };

  const validateInput = (value) => {
    if (value === '') {
      setError([
        true,
        'Sorry, you need to add something, value can not be blank',
      ]);
      return false;
    } else if (value.length <= 2) {
      setError([true, 'Sorry, you need 3 char at least']);
      return false;
    }
    return true;
  };
  console.log(context);
  return (
    <>
      <Form className='mt-4' onSubmit={handleSubmit}>
        <Form.Group className='mb-4'>
          <Form.Control
            type='text'
            placeholder='Add player Name'
            name='player'
            ref={textInput}
          />
        </Form.Group>

        {error[0] ? <Alert variant={'danger'}>{error[1]}</Alert> : null}

        <Button className='miami' variant='primary' type='submit '>
          Add player
        </Button>

        {context.state.players && context.state.players.length > 0 && (
          <>
            <hr />
            <div>
              <ul className='list-group'>
                {context.state.players.map((player, idx) => (
                  <li
                    className='list-group-item d-flex justify-content-between align-items-center list-group-item-action'
                    key={idx}
                  >
                    {player}
                    <span
                      className='badge badge-danger'
                      // onClick={context.removePlayer}
                      onClick={() => context.removePlayer(idx)}
                    >
                      x
                    </span>
                  </li>
                ))}
              </ul>
              <div className='action_button' onClick={() => context.next()}>
                {context.state.players.length > 0 && <div>Next</div>}
              </div>
            </div>
          </>
        )}
      </Form>
    </>
  );
};

export default Stage1;
