import React, { useState } from 'react';
import './App.css';
import { useFormState } from 'react-use-form-state';
import { some } from 'lodash';
import { validateEmailArray } from './validate-email-array';

const serverUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : '/';

function App() {
  const [formState, {text}] = useFormState({
    to: '', cc: '', bcc: '', body: '', subject: '',
  });
  const [submitInProgress, setSubmitInProgress] = useState(false);


  const isInValid = some(formState.validity, v => !v);

  const isValidationVisible = key => (!formState.validity[key] || formState.errors[key]) && formState.touched[key];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitInProgress(true);

    const response = await fetch(`${serverUrl}email`, {method: 'POST', body: formState.values, mode: 'no-cors'});
    setSubmitInProgress(false);

    if(response.status !== 200) {
      return alert('Counld not send email');
    }

    return alert('Email sent');
  };

  return (
    <div className="app">
      <h1>Lets send an email! </h1>
      <p>You can have multiple to, CC and BCC recipients by comma separating the addresses</p>
      <hr/>
      <form onSubmit={handleSubmit}>

        <div className="form-field">
          <label htmlFor="body">To</label>
          <input {...text({name: 'to', validateOnBlur: true, validate: validateEmailArray})} required/>
          {isValidationVisible('to') && <div style={{color: 'red'}}>Please enter a valid email</div>}
        </div>

        <div className="form-field">
          <label htmlFor="body">CC</label>
          <input {...text({name: 'cc', validateOnBlur: true, validate: validateEmailArray})} />
          {isValidationVisible('cc') && <div style={{color: 'red'}}>Please enter a valid email</div>}
        </div>

        <div className="form-field">
          <label htmlFor="body">BCC</label>
          <input {...text({name: 'bcc', validateOnBlur: true, validate: validateEmailArray})} />
          {isValidationVisible('bcc') && <div style={{color: 'red'}}>Please enter a valid email</div>}
        </div>

        <div className="form-field">
          <label htmlFor="body">Subject</label>
          <input {...text('subject')} required/>
          {isValidationVisible('subject') && <div style={{color: 'red'}}>Please add a subject</div>}
        </div>

        <div className="form-field">
          <label htmlFor="body">Body</label>
          <textarea {...text('body')} required/>
          {isValidationVisible('body') && <div style={{color: 'red'}}>Please type something in the body</div>}
        </div>

        {submitInProgress ? <span>Submitting...</span> :
          <button disabled={isInValid} type="submit">Send <span>🚀</span></button>}
      </form>
    </div>
  );
}


export default App;
