import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogin, startChecking } from './../../actions/auth';
import './auth.css';

const LoginScreen = () => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('El correo es obligatorio')
                .email('El email no es valido'),
            password: Yup.string()
                .required('El password es obligatorio')
                .min(6, 'El password debe contener al menos 6 carácteres')
        }),
        onSubmit: () => {
            dispatch(startLogin(email, password));
            dispatch(startChecking());
        }
    });

    const { email, password } = formik.values;

    return (
        <div className="container login-container">
            <div className="col-md-6 login-form-1">
                <h3>Ingreso</h3>
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            name="email"
                            value={email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btnSubmit"
                            value="Login"
                        />
                    </div>
                    <Link to="/register">Crear nueva cuenta</Link>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen;