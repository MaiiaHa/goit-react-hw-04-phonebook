// ========= hooks =========================
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Container from './Container/Container';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import useLocalStorage from './Hooks/UseLocalStoraje';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const newUserData = {
      id: nanoid(10),
      name,
      number,
    };
    const checkedName = contacts.find(({ name }) => name === newUserData.name);
    if (checkedName) {
      alert(`${name} is already in list. Please enter other name.`);
      return;
    }
    setContacts([newUserData, ...contacts]);
  };

  const hendleChangeFilter = e => {
    e.preventDefault(e);
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filteredContacts = getVisibleContacts();

  const deleteContact = userId => {
    setContacts(prevState => prevState.filter(({ id }) => userId !== id));
  };

  return (
    <div>
      <Container title={'Phonebook'}>
        <ContactForm onSubmit={addContact} />
      </Container>
      <Container title={'Contacts'}>
        <Filter value={filter} onChange={hendleChangeFilter} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      </Container>
    </div>
  );
}
//=============================================
// import React, { Component } from 'react';
// import { nanoid } from 'nanoid';
// import Container from './Container/Container';
// import ContactForm from './ContactForm/ContactForm';
// import Filter from './Filter/Filter';
// import ContactList from './ContactList/ContactList';

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const newUserData = {
//       id: nanoid(10),
//       name,
//       number,
//     };

//     const checkedName = this.state.contacts.find(
//       ({ name }) => name === newUserData.name
//     );
//     if (checkedName) {
//       alert(`${name} is already in list. Please enter other name.`);
//       return;
//     }
//     this.setState(prevState => ({
//       contacts: [newUserData, ...prevState.contacts],
//     }));
//   };

//   hendleChangeFilter = event => {
//     event.preventDefault(event);
//     this.setState({ filter: event.currentTarget.value });
//   };

//   deleteContact = userId => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(({ id }) => userId !== id),
//     }));
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const filteredContacts = this.getVisibleContacts();

//     return (
//       <div>
//         <Container title={'Phonebook'}>
//           <ContactForm onSubmit={this.addContact} />
//         </Container>

//         <Container title={'Contacts'}>
//           <Filter
//             value={this.state.filter}
//             onChange={this.hendleChangeFilter}
//           />
//           <ContactList
//             contacts={filteredContacts}
//             deleteContact={this.deleteContact}
//           />
//         </Container>
//       </div>
//     );
//   }
// }

// export default App;
