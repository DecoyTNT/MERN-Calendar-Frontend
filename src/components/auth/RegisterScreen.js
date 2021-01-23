import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './auth.css';
import { startRegister } from '../../actions/auth';

const RegisterScreen = () => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password2: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('El nombre es obligatorio'),
            email: Yup.string()
                .required('El correo es obligatorio')
                .email('El email no es valido'),
            password: Yup.string()
                .required('El password es obligatorio')
                .min(6, 'El password debe contener al menos 6 carácteres'),
            password2: Yup.string()
                .test('passwords-match', 'Los passwords deben ser iguales', function (value) {
                    return this.parent.password === value;
                })
        }),
        validateOnChange: false,
        onSubmit: () => {
            dispatch(startRegister(name, email, password));
        }
    });

    const { name, email, password, password2 } = formik.values;

    return (
        <div className="container login-container">
            <div className="col-md-6 login-form-2">
                <h3>Registro</h3>
                <form
                    onSubmit={formik.handleSubmit}
                >
                    {formik.errors.name &&
                        (
                            <div className="alert bg-danger" role="alert">
                                <p className="font-weight-bold text-white">{formik.errors.name}</p>
                            </div>
                        )}
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            name="name"
                            value={name}
                            onChange={formik.handleChange}
                        />
                    </div>
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
                            placeholder="Correo"
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
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.errors.password2 &&
                        (
                            <div className="alert bg-danger" role="alert">
                                <p className="font-weight-bold text-white">{formik.errors.password2}</p>
                            </div>
                        )}
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Repite el password"
                            name="password2"
                            value={password2}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            className="btnSubmit"
                            value="Crear cuenta" />
                    </div>
                    <Link to="/login">Ya tengo cuenta</Link>
                </form>
            </div>
        </div>
    )
}

export default RegisterScreen;
