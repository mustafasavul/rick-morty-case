import React from 'react';
import s from './assets/styles/style.module.css';
import MultiSelectAutocomplete from './components/MultiSelectAutoComplete';
import { Toaster } from 'react-hot-toast';

const Home = () => (
  <div className={s.homepage}>
    <MultiSelectAutocomplete />
    <Toaster position="bottom-right" />
  </div>
);

export default Home;
