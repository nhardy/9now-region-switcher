import React from 'react';

import Australia from 'src/components/Australia';
import SelectStateForm from 'src/components/SelectStateForm';

import 'src/assets/font.styl';
import styles from './styles.styl';


const App = () => {
  return (
    <div className={styles.root}>
      <h1>Choose Your State for 9Now</h1>
      <Australia />
      <SelectStateForm />
      <p>
        DISCLAIMER: Please note that use of this application is not not endorsed, nor
        condoned by Nine Digital Pty Ltd, Nine Entertainment Co. or any related entities.
      </p>
    </div>
  );
};

export default App;
