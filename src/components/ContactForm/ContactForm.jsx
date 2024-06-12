import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { addContact } from '../../redux/contacts/operations';
import * as Yup from 'yup';
import css from './ContactForm.module.css';
import toast from 'react-hot-toast';

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short')
    .max(50, 'Too long')
    .required('This field is required'),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, 'Invalid number format')
    .required('This field is required'),
});

const initialValues = {
  name: '',
  number: '',
};

export default function ContactEditor() {
  const dispatch = useDispatch();
  const [parent] = useAutoAnimate({
    easing: 'linear',
    duration: 300,
  });

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        toast.success('Contact successfully added.', {
          icon: '✍️',
        });

        actions.resetForm();
      })
      .catch(error => {
        console.error('Failed to add contact:', error.message);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div ref={parent} className={css.wrapper}>
          <label htmlFor="name">Name</label>
          <Field className={css.input} type="text" name="name" />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>
        <div ref={parent} className={css.wrapper}>
          <label htmlFor="number">Number</label>
          <Field
            className={css.input}
            type="text"
            name="number"
            placeholder="XXX-XX-XX"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>
        <button className={css.formButton} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}