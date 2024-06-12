import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div>
      <h1 className={css.title}>Welcome to the club, buddy!</h1>
      <p className={css.text}>
        This app is built with React technology. You can use it as a notebook
        for your contacts. Each account will save the contacts you add to it.
        Enjoy!
      </p>
    </div>
  );
}