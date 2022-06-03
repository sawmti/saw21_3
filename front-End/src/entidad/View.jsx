import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { browserName, browserVersion } from "react-device-detect";

import { entidadService } from '@/_services';


function EntidadView({ history, match }) {
    const { id } = match.params;


    const { setValue } = useForm({

    });
    const [entidad, setEntidad] = useState({});

    useEffect(() => {


        entidadService.getById(id).then(entidad => {
            const fields = ['id', 'description', 'modified', 'updatedDate'];
            fields.forEach(field => setValue(field, entidad[field]));

            setEntidad(entidad);
        });

    }, []);

    return (
        <div itemScope itemType="http://schema.org/Thing" >
            {console.log(`${browserName} ${browserVersion}`)}
            <span itemProp="name"> <h1>{entidad.label} </h1></span>
            <div className="form-row">
                <div className="form-group col-3" >
                    <label><strong>Id :</strong>&emsp;</label>
                    <span itemProp="identifier">{entidad.id}</span>
                </div>

                <div className="form-group col-9" >
                    <label><strong>Descripción :</strong>&emsp;</label>
                    <span itemProp="description">{entidad.description}</span>
                </div>

            </div>
            <div className="form-row">
                <div className="form-group col-12" >
                    <label><strong>Url :</strong>&emsp;</label>
                    <span itemProp="url"><a href={entidad.uri} target="_blank">{entidad.uri}</a></span>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-6" >
                    <label><strong>Fecha Wikidata :</strong>&emsp;</label>
                    <span>{entidad.modified}</span>
                </div>
                <div className="form-group col-6">
                    <label><strong>Última actualización local :</strong>&emsp; </label>
                    <span>{entidad.updatedDate}</span>

                </div>
            </div>
        </div>

    );
}

export { EntidadView };