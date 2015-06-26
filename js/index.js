import React from 'react';
import router from './router';

const rootEl = document.getElementById('todoapp');

router.run((Handler, state) =>
  React.render(<Handler {...state} />, rootEl)
);
