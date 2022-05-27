import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { entidadService, alertService } from '@/_services';



function EntidadAdd({ history, match }) {

    // form validation rules 
    const validationSchema = Yup.object().shape({
        id: Yup.string()
            .required('Id es obligatorio')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return create(data);
    }

    function create(data) {
        return entidadService.create(data)
            .then(() => {
                alertService.success('Entidad cargada', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>Agregar entidad</h1>
            <div className="form-row">

                <div className="form-group col-3">
                    <label>Id</label>
                    <input name="id" type="text" ref={register} className={`form-control ${errors.id ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.id?.message}</div>
                </div>
            </div>

            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Cargar
                </button>
                <Link to={'.'} className="btn btn-link">Cancelar</Link>
            </div>
        </form>
    );
}

export { EntidadAdd };