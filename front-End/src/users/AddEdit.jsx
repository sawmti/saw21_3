import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    // form validation rules 
    const validationSchema = Yup.object().shape({
        rut: Yup.string()
            .required('Rut es requerido'),
        nombre: Yup.string()
            .required('Nombre es requerido'),
        apellido: Yup.string()
            .required('Apellido es requerido'),
        email: Yup.string()
            .email('Email es inválido')
            .required('Email es requerido'),
        fono: Yup.string()
            .required('Fono es requerido'),
        cargo: Yup.string()
            .required('Cargo es requerido'),
        empresa: Yup.string()
            .required('Empresa es requerido'),
        perfil: Yup.string()
            .required('Perfil es requerido'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .concat(isAddMode ? Yup.string().required('Password is requerido') : null)
            .min(6, 'Password debe tener al menos 6 caracteres '),
        confirmPassword: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .when('password', (password, schema) => {
                if (password || isAddMode) return schema.required('Debe confirmar el password');
            })
            .oneOf([Yup.ref('password')], 'Passwords no coinciden')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(id, data);
    }

    function createUser(data) {
        return userService.create(data)
            .then(() => {
                alertService.success('Usuario creado', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('Usuario actualizado', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            userService.getById(id).then(user => {
                const fields = ['rut', 'nombre', 'apellido', 'email', 'fono', 'cargo', 'empresa', 'perfil'];
                fields.forEach(field => setValue(field, user[field]));
                setUser(user);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Agregar Usuario' : 'Editar Usuario'}</h1>
            <div className="form-row">
                <div className="form-group col">
                    <div className="form-group col-5">
                        <label>Rut</label>
                        <input name="rut" type="text" ref={register} className={`form-control ${errors.rut ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.rut?.message}</div>
                    </div>
                    <div className="form-group col-5">
                        <label>Nombre</label>
                        <input name="nombre" type="text" ref={register} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.nombre?.message}</div>
                    </div>
                    <div className="form-group col-5">
                        <label>Apellido</label>
                        <input name="apellido" type="text" ref={register} className={`form-control ${errors.apellido ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.apellido?.message}</div>
                    </div>
                    <div className="form-group col-5">
                        <label>Email</label>
                        <input name="email" type="text" ref={register} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                    <div className="form-group col-5">
                        <label>Fono</label>
                        <input name="fono" type="text" ref={register} className={`form-control ${errors.fono ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.fono?.message}</div>
                    </div>
                    <div className="form-group col-5">
                        <label>Cargo</label>
                        <input name="cargo" type="text" ref={register} className={`form-control ${errors.cargo ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.cargo?.message}</div>
                    </div>
                    <div className="form-group col-5">
                        <label>Empresa</label>
                        <input name="empresa" type="text" ref={register} className={`form-control ${errors.empresa ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.empresa?.message}</div>
                    </div>
                    <div className="form-group col-5">
                        <label>Perfil</label>
                        <select name="perfil" ref={register} className={`form-control ${errors.perfil ? 'is-invalid' : ''}`}>
                            <option value=""></option>
                            <option value="LABORATORISTA">Laboratorista</option>
                            <option value="TOPOGRAFO">Topógrafo</option>
                            <option value="ADMINISTRADOR">Administrador</option>
                        </select>
                        <div className="invalid-feedback">{errors.perfil?.message}</div>
                    </div>
                </div>
            </div>

            {!isAddMode &&
                <div>
                    <h3 className="pt-3">Cambiar password</h3>
                    <p>Dejar en blanco para mantener el mismo password</p>
                </div>
            }
            <div className="form-row">
                <div className="form-group col">
                    <label>
                        Password
                        {!isAddMode &&
                            (!showPassword
                                ? <span> - <a onClick={() => setShowPassword(!showPassword)} className="text-primary">Show</a></span>
                                : <em> - {user.password}</em>
                            )
                        }
                    </label>
                    <input name="password" type="password" ref={register} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Confirme Password</label>
                    <input name="confirmPassword" type="password" ref={register} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };