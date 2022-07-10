/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import './movieReviews.css';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      setTitle: '',
      setReview: '',
      setRating: '',
      fetchData: [],
      reviewUpdate: '',
      ratingUpdate: ''
    }
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value
    this.setState({
      [nam]: val
    })
  }

  handleChange2 = (event) => {
    this.setState({
      reviewUpdate: event.target.value,
      // ratingUpdate: event.target.value
    })
  }

  // TODO: allow updates to rating without wiping reviews
  handleChange3 = (event) => {
    this.setState({
      ratingUpdate: event.target.value
    })
  }

  componentDidMount() {
    axios.get("/api/get")
      .then((response) => {
        this.setState({
          fetchData: response.data
        })
      })
  }

  submit = () => {
    axios.post('/api/insert', this.state)
      .then(() => { alert('success post') })
    console.log(this.state)
    document.location.reload();
  }

  delete = (id) => {
    if (confirm("Do you want to delete? ")) {
      axios.delete(`/api/delete/${id}`)
      document.location.reload()
    }
  }

  edit = (id) => {
    axios.put(`/api/update/${id}`, this.state)
    document.location.reload();
  }

  render() {
    let card = this.state.fetchData.map((val, key) => {
      return (
        <React.Fragment>
          <Card style={{ width: '18rem' }} className='m-2'>
            <Card.Body>
              <Card.Title>Title: {val.movie_title}</Card.Title>
              <Card.Text>
                Review: {val.movie_review}
                <br/>
                Rating: {val.movie_rating}
              </Card.Text>
              <input name='reviewUpdate' onChange={this.handleChange2} placeholder='Update Review' ></input>
              <input name='ratingUpdate' onChange={this.handleChange3} placeholder='Update Rating' ></input>
              <Button className='m-2' onClick={() => { this.edit(val.id) }}>Update</Button>
              <Button onClick={() => { this.delete(val.id) }}>Delete</Button>
            </Card.Body>
          </Card>
        </React.Fragment>
      )
    })

    return (
      <div className='App'>
        <h1>Movie Reviews</h1>
        <div className='form'>
          <input name='setTitle' placeholder='Enter Movie Title' onChange={this.handleChange} />
          <input name='setReview' placeholder='Enter Review' onChange={this.handleChange} />
          <input name='setRating' placeholder='Enter Rating' onChange={this.handleChange} />
        </div>

        <Button className='my-2' variant="primary" onClick={this.submit}>Submit</Button> <br /><br />

        <Container>
          <Row>
            {card}
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;