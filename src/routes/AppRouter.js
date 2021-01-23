import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import RegisterScreen from '../components/auth/RegisterScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from './../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch]);

    if (checking) return <h5>Cargando...</h5>

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        component={LoginScreen}
                        isAuthenticated={!!uid}
                    />
                    <PublicRoute
                        exact
                        path="/register"
                        component={RegisterScreen}
                        isAuthenticated={!!uid}
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        component={CalendarScreen}
                        isAuthenticated={!!uid}
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter;
