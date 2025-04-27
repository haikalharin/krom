import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/home/Home';
import Add from './pages/addApplicants/Add';
import './pages/styles.css'; // Assuming you have a global CSS file

const App = () => {
    return (
        <div className="app-container">
            <Router>
                <div className="sidebar">
                    <nav className="navbar">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/add" className="nav-link">Add Applicant</Link>
                    </nav>
                </div>

                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/add" component={Add} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
