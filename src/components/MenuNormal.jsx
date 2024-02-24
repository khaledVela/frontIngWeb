import {Container, Nav,Navbar, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HOME_URL, INVITACIONAREACOMUN_URL, INVITACIONCASA_URL, LISTAINVITADOSAREACOMUN_URL, LISTAINVITADOSCASA_URL } from '../navigation/Constants';
const MenuNormal = ()=>{
    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Condominios el Belatacu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to={HOME_URL}>Log Out</Link>
                        <NavDropdown title="Invitados casa" id="basic-nav-dropdown">
                            <Link to={LISTAINVITADOSCASA_URL} className='dropdown-item' >Lista</Link>
                            <Link to={INVITACIONCASA_URL} className='dropdown-item' >Crear</Link>
                        </NavDropdown>
                        <NavDropdown title="Invitados Area Comun" id="basic-nav-dropdown">
                            <Link to={LISTAINVITADOSAREACOMUN_URL} className='dropdown-item' >Lista</Link>
                            <Link to={INVITACIONAREACOMUN_URL} className='dropdown-item' >Crear</Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MenuNormal;