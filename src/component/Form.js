import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

function Form () {

    const initialForm = {
        name: '',
        email: '',
        password: '',
        terms: ''
    };

    const [formState, setFormState] = useState(initialForm);
    const [disable, setDisable] = useState(true);

    const schema = yup.object().shape({
        name: yup.string().required('Please enter your name'),
        email: yup.string().email('Please enter a valid email address').required(),
        password: yup.string().required('Please enter your password'),
        terms: yup.boolean().oneOf([true], 'Please accept the terms of service to continue')
    });

    const onChange = event => {
        const newForm = {
            ...formState, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        }
        setFormState(newForm);
    };

    useEffect(() => {
        schema.isValid(formState).then(valid => {
            setDisable(!valid)
        })
    }, [formState])

    return (
        <form>
            <label htmlFor='name'>
                Name:
                <input type='text' name='name' id='name' value={formState.name} onChange={onChange} />
            </label>
            <label htmlFor='email'>
                Email:
                <input type='email' name='email' id='email' value={formState.email} onChange={onChange} />
            </label>
            <label htmlFor='password'>
                Password:
                <input type='password' name='password' id='password' value={formState.password} onChange={onChange} />
            </label>
            <label htmlFor='terms'>
                <input type='checkbox' name='terms' id='terms' checked={formState.terms} onChange={onChange} />
                Terms of Service
            </label>
            <button type='submit' disabled={disable}>Log In</button>
            
        </form>
    )
}

export default Form;