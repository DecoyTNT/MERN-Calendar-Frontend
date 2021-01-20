import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import RegisterScreen from '../components/auth/RegisterScreen';

const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/register" component={RegisterScreen} />
                    <Route exact path="/" component={CalendarScreen} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter;
