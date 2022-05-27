import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Nav, NavDropdown, Dropdown , NavItem} from "react-bootstrap";


function Navi() {


    const handleLogout = () => {
        sessionStorage.clear();
        window.location.replace('/login');
    }
    return (
        <Nav className="navbar navbar-expand navbar-dark bg-dark" variant="pills">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-link">Home</NavLink>
                <NavDropdown title="Parametrización" id="nav-dropdown">
                    <NavDropdown.Item as={NavLink} to="/users">Usuarios</NavDropdown.Item>
                </NavDropdown>
                <NavLink to="/entidad" className="nav-item nav-link">Entidades Wikidata</NavLink> 
                <button className="btn btn-link" type="button" style={{ color: 'red' }} onClick={() => handleLogout()} > <FontAwesomeIcon icon={faSignOutAlt} /> </button>
            </div>
        </Nav>
    );
}

export { Navi };