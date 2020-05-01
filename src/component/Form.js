import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

function Form (props ) {
    const { users, setUsers } = props;

    const initialForm = {
        name: '',
        email: '',
        password: '',
        role: '',
        terms: false
    };

    const [formState, setFormState] = useState(initialForm);
    const [disable, setDisable] = useState(true);
    const [errors, setErrors] = useState(initialForm);

    const schema = yup.object().shape({
        name: yup.string().required('Please enter your name'),
        email: yup.string().email('Please enter a valid email address').required(),
        password: yup.string().required('Please enter your password'),
        role: yup.string().required('Please select a role'),
        terms: yup.boolean().oneOf([true], 'Please accept the terms of service to continue')
    });

    const onChange = event => {
        event.persist()
        const newForm = {
            ...formState, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        }
        lineValidation(event);
        setFormState(newForm);
    };

    const lineValidation = event => {
        yup
            .reach(schema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                setErrors({...errors, [event.target.name]: ''});
            })
            .catch(err => {
                setErrors({...errors, [event.target.name]: err.errors[0] });
            })
    };

    useEffect(() => {
        schema.isValid(formState).then(valid => {
            setDisable(!valid)
        })
    }, [formState])

    const submit = event => {
        event.preventDefault();
    
        
        axios
          .post("https://reqres.in/api/users", formState)
          .then(response => {
            console.log('response', response)
            setUsers([...users, response.data])
            setFormState(initialForm);
          })    
      };

    return (
        <form onSubmit={submit}>
            <label htmlFor='name'>
                Name:
                <input type='text' name='name' id='name' value={formState.name} onChange={onChange} data-cy="name"/>
            </label>
            <label htmlFor='email'>
                Email:
                <input type='email' name='email' id='email' value={formState.email} onChange={onChange} data-cy="email"/>
            </label>
            <label htmlFor='password'>
                Password:
                <input type='password' name='password' id='password' value={formState.password} onChange={onChange} data-cy="password" />
            </label>
            <label htmlFor="role">
                Role:
                <select id="role" name="role" onChange={onChange}>
                    <option value="">--Please choose an option--</option>
                    <option value="Student">Student</option>
                    <option value="Team Lead">Team Lead</option>

                    <option value="instructor">Instructor</option>

                    <option value="Administrator">Administrator</option>
                </select>
            </label>
            <label htmlFor='terms'>
                <input type='checkbox' name='terms' id='terms' checked={formState.terms} onChange={onChange} />
                Terms of Service
            </label>

            <button type='submit' disabled={disable}>Log In</button>

            {errors.name.length > 0 ? <p>{errors.name}</p> : null}
            {errors.email.length > 0 ? <p>{errors.email}</p> : null}
            {errors.password.length > 0 ? <p>{errors.password}</p> : null}
            {errors.role.length > 0 ? <p>{errors.role}</p> : null}
           
            
        </form>
    )
}

export default Form;