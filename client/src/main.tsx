import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './pages/App/App';
import './index.css';

const rootDiv = document.getElementById('root')!;

ReactDOM.createRoot(rootDiv).render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);
