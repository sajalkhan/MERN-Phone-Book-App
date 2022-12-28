import React, { useEffect, useState } from 'react';
import { Grid, Menu, Input, Button, Table, Segment, Modal, Form, Message } from 'semantic-ui-react';

import './App.css';

//Redux
import { connect } from 'react-redux';
import { GetAllContact, UpdateContact, DeleteContact, AddNewContact } from './Action/ContactAction';


const App = ({ GetAllContact, UpdateContact, contacts, DeleteContact, AddNewContact, errorMsg }) => {

  const [state, setState] = useState({ name: '', phone: '', id: '' });
  const [contactState, setContactState] = useState({ filterContact: '' });

  const [openAddmodel, setAddModel] = useState(false);
  const [openEditmodel, setEditModel] = useState(false);
  const [openDeletemodel, setDeleteModel] = useState(false);

  
  useEffect(() => {
    GetAllContact();

  }, [GetAllContact]);

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const filterItem = (e) => {
    const contactList = contacts;
    const filterData = contactList.filter(item =>
      item.phone.includes(e.target.value)
    );

    setContactState({ filterContact: filterData });
  }

  const deletefilterContact = (id) => {

    if(contactState.filterContact.length> 0)
    {
      const filterData = contactState.filterContact.filter(item =>
        item._id !== id
      );

      setContactState({ filterContact: filterData });
    }
  }

  const editContact = (id, name, phone) => {

    if (contactState.filterContact.length > 0) {
      const index = contactState.filterContact.findIndex(item => item._id === id);
      contactState.filterContact[index].name = name;
      contactState.filterContact[index].phone = phone;
    }
  }

  return (
    <>
      <Grid textAlign="center" verticalAlign="top" className="app">
        <Grid.Column style={{ maxWidth: 900 }}>

          <Menu inverted color='grey'>

            <Menu.Item name="Manage PhoneBook" />

            <Menu.Menu position='right'>
              <Menu.Item>
                <Button color='green' onClick={() => { setAddModel(true); setState({})}} content='Add New Contact' icon='add square' labelPosition='left' />
              </Menu.Item>

              <Menu.Item>
                <Input icon={{ name: 'search', circular: true, link: true }} onChange={filterItem} type='text' maxLength="14" placeholder='Search...' />
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          <Segment color='grey' inverted stacked>
            <Table celled color='violet' inverted selectable textAlign="center">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name 2</Table.HeaderCell>
                  <Table.HeaderCell>phone Number 2</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  !contactState.filterContact.length ? contacts.length > 0 && contacts.map((item) => (
                    <Table.Row key={item._id}>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.phone}</Table.Cell>
                      <Table.Cell>

                        <Button size='small' icon='edit' color='yellow' onClick={() => { setState({ name: item.name, phone: item.phone, id: item._id }); setEditModel(true) }} />
                        <Button size='small' icon='delete' color='red' onClick={() => { setDeleteModel(true); setState({ id: item._id }) }} />
                      </Table.Cell>
                    </Table.Row>
                  )) :
                    contactState.filterContact.length>0 && contactState.filterContact.map((item) => (
                      <Table.Row key={item._id}>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>{item.phone}</Table.Cell>
                        <Table.Cell>

                          <Button size='small' icon='edit' color='yellow' onClick={() => { setState({ name: item.name, phone: item.phone, id: item._id }); setEditModel(true); editContact(item._id, item.name, item.phone) }} />
                          <Button size='small' icon='delete' color='red' onClick={() => { setDeleteModel(true); setState({ id: item._id }) }} />
                        </Table.Cell>
                      </Table.Row>
                    ))
                }
              </Table.Body>
            </Table>
          </Segment>

          {
            errorMsg.error && <Message color={errorMsg.color}>
              <Message.Header>{errorMsg.header}</Message.Header>
              <h4>{errorMsg.message}</h4>
            </Message>
          }

        </Grid.Column>
      </Grid>

      <Modal
        dimmer='blurring'
        size='mini'
        open={openAddmodel}
        onClose={() => setAddModel(false)}>

        <Modal.Header>Add New Contact</Modal.Header>
        <Modal.Content>

          <Modal.Description>

            <Form>
              <Form.Field>
                <Input fluid type='text' name='name' maxLength="20" onChange={handleInputChange} placeholder='User Name' icon='user' iconPosition='left' />
              </Form.Field>
              <Form.Field>
                <Input fluid type='text' name='phone' maxLength="14" onChange={handleInputChange} placeholder='Phone Number' icon='phone' iconPosition='left' />
              </Form.Field>
            </Form>
          </Modal.Description>

        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setAddModel(false)}>Cancle</Button>
          <Button positive onClick={() => { AddNewContact(state.name, state.phone); setAddModel(false); setContactState({ filterContact: [] }) }}>Add</Button>
        </Modal.Actions>
      </Modal>

      <Modal
        dimmer='blurring'
        size='mini'
        open={openEditmodel}
        onClose={() => setEditModel(false)}>

        <Modal.Header>Edit Contact Info</Modal.Header>
        <Modal.Content>

          <Modal.Description>

            <Form>
              <Form.Field>
                <Input fluid type='text' name='name' maxLength="20" onChange={handleInputChange} value={state.name || ''} placeholder='User Name' icon='user' iconPosition='left' />
              </Form.Field>
              <Form.Field>
                <Input fluid type='text' name='phone' maxLength="14" onChange={handleInputChange} value={state.phone || ''} placeholder='Phone Number' icon='phone' iconPosition='left' />
              </Form.Field>
            </Form>
          </Modal.Description>

        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setEditModel(false)}>Cancle</Button>
          <Button positive onClick={() => { UpdateContact(state.name, state.phone, state.id); setEditModel(false); editContact(state.id, state.name, state.phone) }}>Update</Button>
        </Modal.Actions>
      </Modal>

      <Modal
        size='mini'
        dimmer='blurring'
        open={openDeletemodel}
        onClose={() => setDeleteModel(false)}
      >
        <Modal.Header>Delete This Contact</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete This Contact?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setDeleteModel(false)}>No</Button>
          <Button positive onClick={() => { setDeleteModel(false); DeleteContact(state.id); deletefilterContact(state.id) }}>Yes</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {

  return {
    contacts: state.GetAllContact,
    errorMsg: state.Display_Error
  }
}

export default connect(mapStateToProps, { GetAllContact, UpdateContact, DeleteContact, AddNewContact })(App);
