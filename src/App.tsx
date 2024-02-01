import React from 'react';
import MultiSelectAutocomplete from './components/MultiSelectAutoComplete';
import s from './assets/styles/style.module.css';

const App = () => (
  <div className={s.homepage}>
    <MultiSelectAutocomplete />
  </div>
);

export default App;
