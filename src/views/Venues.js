import React from 'react';
import { connect } from 'react-redux';
import { Table, Input, Container, Button, Row, Form, FormGroup, Alert } from 'reactstrap';
import { lunchPlaceActions } from '../_actions/lunchplace.actions';
import _ from 'lodash';

/**
 * @class Venues
 * 
 * @extends {React.Component}
 */
export class Venues extends React.Component {
  /**
   * @description Creates an instance of Venues.
   *
   * @param {object} props
   *
   * @memberof Venues
   */
  constructor(props) {
    super(props);
    this.state = {
      query: 'lunch',
      near: '',
      v: 20190724,
      limit: 3,
      newestParticipant: '',
      votedVenue: '',
      currentParticipant: 0,
      participantInformation: [{ name: '', positionOfParticipant: '', indexOfVote: '' }]
    };
  }


  /**
   * @description fetch venues from API
   * 
   * @return {array} list of venues 
   * 
   * @memberof Venues
   */
  handleSearch = () => {
    const { query, near, v, limit } = this.state

    this.setState({
      participantInformation: [{ name: '', positionOfParticipant: '', indexOfVote: '' }],
      currentParticipant: 0,
      newestParticipant: ''
    })

    const params = {
      query,
      near,
      v,
      limit,
    }
    this.props.dispatch(lunchPlaceActions.getLunchPlaces(params))
  }

  /**
    * @description adds new participants
    *
    * @returns {null} null
    *
    * @memberof Venues
    */
  handleAddParticipants = () => {
    this.setState({
      participantInformation: this.state.participantInformation.concat({
        name: '',
        positionOfParticipant: '',
        indexOfVote: ''
      }),
      currentParticipant: this.state.currentParticipant + 1,
      newestParticipant: ''
    })
  }

  /**
    *
    * @returns {null} null
    * 
    * @param {(string\|object)}
    * 
    * @memberof Venues
    */
  handleChangeParticipant = (index) => (evt) => {
    this.setState({ newestParticipant: evt.target.value, votedVenue: '' })

    const newItem = this.state.participantInformation.map((item, participantIndex) => {
      if (index !== participantIndex) return item;
      return { ...item, name: evt.target.value, positionOfParticipant: participantIndex };
    });

    this.setState({ participantInformation: newItem });
  }


  /**
    *
    * @returns {null} null
    * 
    * @param {string}
    * 
    * @memberof Venues
    */
  handleVoteVenue = (index, sindex) => {
    const { currentParticipant, participantInformation } = this.state;
    if (currentParticipant - 1 !== sindex) {
      return;
    }
    this.setState({ votedVenue: index });

    const newItem = participantInformation.map((item, participantIndex) => {
      if (sindex !== participantIndex) return item;
      return { ...item, indexOfVote: index };
    });
    this.setState({ participantInformation: newItem });
  }

  /**
    *
    * @returns {null} null
    * 
    * @param {object} e
    * 
    * @memberof Venues
    */
  handleChange = (e) => {
    e.persist()
    this.setState({ [e.target.name]: e.target.value })
  }

  renderErrorResponse(error) {
    if (error) {
      return (<Alert color="danger" className="mx-auto d-block">{error}</Alert>);
    }
  }

  /**
   *
   * @memberof Venues
   *
   * @return {ReactElement} markup
   */
  render() {
    const { lunchPlaces, requesting, errorResponse } = this.props
    const { currentParticipant, newestParticipant, participantInformation, near } = this.state

    return (
      <React.Fragment>
        <Container className='my-5'>
          <h4 className='py-5'>Lunch Place</h4>
          <Row>
            <Form inline className='m-3'>
              <FormGroup>
                <Input type='text' value={near} name='near' onChange={this.handleChange} placeholder="Type Venue Here" className='my-2' />
                <Button color='primary' className='ml-2' onClick={this.handleSearch} >{requesting ? 'Searching...' : 'Search'}</Button>
              </FormGroup>
            </Form>
          </Row>

          <Row>
            {this.renderErrorResponse(errorResponse)}
          </Row>

          {!errorResponse && (lunchPlaces.length > 0) && <Table hover bordered className='py-3'>
            <thead>
              <tr className='text-center'>
                <th>Participants</th>
                {lunchPlaces.map((item, index) =>
                  <th key={index}>{item.name} <p className='text-info'>{item.categories[0].name}</p></th>
                )}
              </tr>
            </thead>
            <tbody>
              {participantInformation.map((participant, participantIndex) =>
                <tr>
                  <Input type='text' onChange={this.handleChangeParticipant(participantIndex)} placeholder="Type Here" disabled={(participantIndex !== currentParticipant)} className='my-2' key={participant} />
                  {lunchPlaces.map((venue, index) =>
                    <td
                      key={index}
                      onClick={() => this.handleVoteVenue(index, participantIndex)}>
                      {(participant.indexOfVote === index) &&
                        <i className='fa fa-check text-success text-center mx-auto d-block' style={{ fontSize: '35px' }}></i>}
                    </td>
                  )}
                </tr>
              )}
            </tbody>
          </Table>}

          {!errorResponse && (lunchPlaces.length > 0) && <Button color='primary' onClick={this.handleAddParticipants} disabled={!newestParticipant} >Add Participants</Button>}
        </Container>
      </React.Fragment>
    );
  }
}


function mapStateToProps(state) {
  const { lunchPlaces, errorResponse } = state
  const { requesting } = state.api
  return {
    requesting,
    lunchPlaces,
    errorResponse
  }
}

export default connect(mapStateToProps)(Venues);


