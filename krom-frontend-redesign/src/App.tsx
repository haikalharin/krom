import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
// import Detail from './pages/Detail';
import Add from './pages/Add';
import FileUpload from './components/FileUpload';

const App = () => {
    return (
        <div style={{ padding: 20 }}>
            <Router>
                <nav>
                    <Link to="/">Home</Link> | <Link to="/add">Add Applicant</Link>
                </nav>
                <hr />
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/*<Route path="/applicant/:id" component={Detail} />*/}
                    <Route path="/add" component={Add} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
