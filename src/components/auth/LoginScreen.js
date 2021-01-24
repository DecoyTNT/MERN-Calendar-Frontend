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
        validateOnChange: false,
        onSubmit: async () => {
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
                    {formik.errors.email &&
                        (
                            <div className="alert bg-danger" role="alert">
                                <p className="font-weight-bold text-white">{formik.errors.email}</p>
                            </div>
                        )}
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Introduce tu correo"
                            name="email"
                            value={email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.errors.password &&
                        (
                            <div className="alert bg-danger" role="alert">
                                <p className="font-weight-bold text-white">{formik.errors.password}</p>
                            </div>
                        )}
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Introduce tu password"
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