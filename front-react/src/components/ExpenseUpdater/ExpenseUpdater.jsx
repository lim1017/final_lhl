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
          <option value='food'>Food</option>
          <option value='transporation'>Transporation</option>
          <option value='home'>Home</option>
          <option value='utilities'>Utilities</option>
          <option value='entertainment'>Entertainment</option>
          <option value='medical'>Medical</option>
          <option value='debt'>Debt</option>
          <option value='misc'>Misc</option>

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