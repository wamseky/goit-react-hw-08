import { useSelector } from 'react-redux';
import { useAutoAnimate } from '@formkit/auto-animate/react';
// import { selectNameFilter } from '../../redux/filters/selectors';
import { selectFilteredContacts } from '../../redux/contacts/selectors'
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

// const selectContacts = state => state.contacts.items;

export default function ContactList() {
  const [parent] = useAutoAnimate({ easing: 'linear', duration: 300 });
  // const contacts = useSelector(selectContacts);
  // const filter = useSelector(selectNameFilter);
  const filteredContacts = useSelector(selectFilteredContacts);

  // const filteredContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase())
  // );

  return (
    <ul ref={parent} className={css.list}>
      {filteredContacts.map(contact => (
        <li className={css.item} key={contact.id}>
          <Contact {...contact} />
        </li>
      ))}
    </ul>
  );
}