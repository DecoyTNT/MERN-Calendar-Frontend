import React from 'react';
import './auth.css';

const LoginScreen = () => {
    return (
        <div className="container login-container">
            <div className="col-md-6 login-form-1">
                <h3>Ingreso</h3>
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Correo"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btnSubmit"
                            value="Login"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen;