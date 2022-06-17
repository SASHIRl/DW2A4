import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import {Tips} from './Tips'

import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Tips />
  </React.StrictMode>
)
