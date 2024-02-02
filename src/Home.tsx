import React from 'react';
import s from './assets/styles/style.module.css';
import {Toaster} from 'react-hot-toast';
import {MultiSelectAutocomplete} from "./components";

const Home = () => (
    <div className={s.container}>
      <div className={s.homepage}>
        <MultiSelectAutocomplete/>
        <Toaster position="bottom-right"/>
      </div>
    </div>
);

export default Home;
