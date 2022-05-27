import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { entidadService } from '@/_services';

import swal from 'sweetalert';

function EntidadList({ match }) {
    const { path } = match;
    const [entidades, setEntidades] = useState(null);

    useEffect(() => {
        entidadService.getAll().then(x => setEntidades(x));
    }, []);

    function _delete(id) {
        swal({
            title: "¿Está seguro?",
            text: "Una vez eliminado la entidad no será posible recuperarla",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setEntidades(entidades.map(x => {
                    if (x.id === id) { x.isDeleting = true; }
                    return x;
                }));
                entidadService.delete(id).then(() => {
                    setEntidades(entidades => entidades.filter(x => x.id !== id));
                });
                swal("El entidad fue eliminada", {
                    icon: "success",
                });
            }
        });
    }

    return (
        <div>
            <h1>Vacunas Covid-19 (Q84263196)</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Agregar Entidad</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>Id</th>
                        <th style={{ width: '40%' }}>Descripción</th>
                        <th style={{ width: '20%' }}>Fecha WikiData</th>
                        <th style={{ width: '20%' }}>Fecha Local</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {entidades && entidades.map(ent =>
                        <tr key={ent.id}>
                            <td>{ent.id}</td>
                            <td>{ent.description}</td>
                            <td>{ent.modified}</td>
                            <td>{ent.updatedDate}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${ent.id}`} className="btn btn-sm btn-primary mr-1">Editar</Link>
                                <button onClick={() => _delete(ent.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={ent.isDeleting}>
                                    {ent.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Borrar</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!entidades &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {entidades && !entidades.length &&
                        <tr>
                            <td colSpan="8" className="text-center">
                                <div className="p-2">Sin Entidades que mostrar</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { EntidadList };