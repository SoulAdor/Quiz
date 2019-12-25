import React from 'react'
import { createQuiz } from '../reducers/quizzesReducer'
import { Form, Button } from 'react-bootstrap'

const getId = (questionId, answerId) => `${questionId}/${answerId}`

const CreateQuiz = ({createQuiz}) => {
  const handleCreate = async (event) => {
    event.preventDefault()
    event.persist()
    try {
      const newQuiz = {
        title: event.target.title.value,
        description: event.target.description.value
      }
      // await createQuiz(newQuiz)
      console.log(newQuiz)
    } catch (exception) {
      console.log(exception)
    }
  }

  const AddClicked = async (event) => {
    try {
      const element = document.getElementById("questionAdder")
      const chosenValue = element.options[element.selectedIndex].text
      console.log(chosenValue)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2 className='text-info'>Create new quiz</h2>
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label> Title: </Form.Label>
          <Form.Control type='text' name='title' placeholder="Enter title"/>
        </Form.Group>
        <Form.Group>
          <Form.Label> Description: </Form.Label>
          <Form.Control as='textarea' rows='10'  placeholder="Enter description"/>
        </Form.Group> 
        <Form.Group>
          <label htmlFor="questionAdder">Choose next question</label>
          <select id="questionAdder" className="form-control">
            <option defaultValue>Checkboxes</option>
            <option>Multiple choice</option>
            <option>Text</option>
          </select>
          <Button variant='secondary' onClick={AddClicked}> Add question </Button>
        </Form.Group> 
        <Form.Group>
          <Button variant='primary' type ='sumbit'> Create </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CreateQuiz
