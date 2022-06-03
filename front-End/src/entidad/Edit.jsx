import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { entidadService, alertService } from '@/_services';


function EntidadEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    // form validation rules 
    const validationSchema = Yup.object().shape({
        id: Yup.string()
            .required('Id es obligatorio'),
        label: Yup.string()
            .required('Etiqueta es obligatorio'),
        uri: Yup.string()
            .required('Url es obligatorio'),
        description: Yup.string()
            .required('Descripción es obligatoria'),
        modified: Yup.string()
            .required('Fecha de modificación wikidata es obligatoria')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return update(id, data);
    }

    function update(id, data) {
        return entidadService.update(id, data)
            .then(() => {
                alertService.success('Entidad actualizada', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    const [entidad, setEntidad] = useState({});

    useEffect(() => {

        if (!isAddMode) {
            entidadService.getById(id).then(entidad => {
                const fields = ['id', 'description', 'modified', 'updatedDate','uri','label'];
                fields.forEach(field => setValue(field, entidad[field]));

                setEntidad(entidad);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Agregar' : 'Editar '+entidad.label}</h1>

            <div itemScope itemType="http://schema.org/Thing">
                <div className="form-row" >

                    <div className="form-group col-3">
                        <label>Id</label>
                        <input name="id" type="text" ref={register} className={`form-control ${errors.id ? 'is-invalid' : ''}`} itemProp="identifier" readOnly />
                        <div className="invalid-feedback">{errors.id?.message}</div>
                    </div>
                    <div className="form-group col-3">
                        <label>Etiqueta</label>
                        <input name="label" type="text" ref={register} className={`form-control ${errors.label ? 'is-invalid' : ''}`} itemProp="name" />
                        <div className="invalid-feedback">{errors.label?.message}</div>
                    </div>

                    <div className="form-group col-6">
                        <label>Descripción</label>
                        <input name="description" type="text" ref={register} className={`form-control ${errors.description ? 'is-invalid' : ''}`} itemProp="description" />
                        <div className="invalid-feedback">{errors.description?.message}</div>
                    </div>

                </div>
                <div className="form-row" >
                <div className="form-group col-12">
                        <label>Url</label>
                        <input name="uri" type="text" ref={register} className={`form-control ${errors.uri ? 'is-invalid' : ''}`} itemProp="url" />
                        <div className="invalid-feedback">{errors.uri?.message}</div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-3">
                        <label>Fecha Wikidata</label>
                        <input name="modified" type="text" ref={register} className={`form-control ${errors.modified ? 'is-invalid' : ''}`} readOnly />
                        <div className="invalid-feedback">{errors.modified?.message}</div>
                    </div>
                    <div className="form-group col-3">
                        <label>Última actualización local</label>
                        <input name="updatedDate" type="text" ref={register} className={`form-control ${errors.updatedDate ? 'is-invalid' : ''}`} readOnly />
                        <div className="invalid-feedback">{errors.updatedDate?.message}</div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Guardar
                </button>
                <Link to={'..'} className="btn btn-link">Cancelar</Link>
            </div>
        </form>
    );
}

export { EntidadEdit };