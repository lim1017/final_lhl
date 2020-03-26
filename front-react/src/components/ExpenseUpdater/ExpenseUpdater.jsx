import React from 'react'
import { Form } from 'semantic-ui-react'
import TextField from '@material-ui/core/TextField';


function ExpenseUpdater(props) {
 
  const formStyle = {
    background: 'steelblue'
  }
  

 return(
   <div style={formStyle}>

    <Form>
      <Form.Group widths='equal'>
        <Form.Field label='Name' control='input' />
        <Form.Field label='Type' control='select'>
          <option value='Food'>Food</option>
          <option value='Transportation'>Transportation</option>
          <option value='Home'>Home</option>
          <option value='Utilities'>Utilities</option>
          <option value='Entertainment'>Entertainment</option>
          <option value='Medical'>Medical</option>
          <option value='Debt'>Debt</option>
          <option value='Misc'>Misc</option>

        </Form.Field>
        <Form.Field label='Amount' control='input' />
      </Form.Group>
      <Form.Field control='button'>
        Submit
      </Form.Field>
    </Form>
  </div>
 )


}


export default ExpenseUpdater;