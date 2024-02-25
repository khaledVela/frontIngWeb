import { Card, Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import MenuNormal from "../../components/MenuNormal";
import { Link } from 'react-router-dom';
import { DeleteInvitadosCasa, GetListaInvitadosCasa, PutInvitadosCasa2 } from "../../services/InvitacionCasaService";
import { INVITACIONCASA_URL } from "../../navigation/Constants";

const InvitacionCasaList = () => {
    const [ListaInvitacionCasa, setListaInvitacionCasa] = useState([]);
    const limite = localStorage.getItem('limite');
    const [invitados, setInvitados] = useState(0);
    useEffect(() => {
        loadInvitacionCasa();
        setInvitados(localStorage.getItem('invitados'));
    }, []);

    const loadInvitacionCasa = () => {
        GetListaInvitadosCasa().then((data) => {
            setListaInvitacionCasa(data);
        });
    }

    const estaDentro = (personainvitada) => {
        PutInvitadosCasa2(personainvitada, {
        }).then(() => {
            loadInvitacionCasa();
        });
    }

    const eliminarInvitacionCasa = (id) => {
        if (window.confirm("¿Estas seguro que deseas eliminar esta InvitacionCasa?")) {
            DeleteInvitadosCasa(id).then(() => {
                loadInvitacionCasa();
            });
        }
    };
    const condicion = invitados < limite;
    return (
        <>
            <MenuNormal />
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Invitacion a Casa List</Card.Title>
                        <Card.Text>
                            This is the Invitacion a casa list page.
                        </Card.Text>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Nombre Completo</th>
                                    <th>Carnet</th>
                                    <th>Placa vehiculo</th>
                                    <th>Fecha</th>
                                    <th>Motivo</th>
                                    <th>Dueño</th>
                                    <th>Qr</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                    <th>Invitacion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ListaInvitacionCasa.map((invitacion) => {
                                    if (localStorage.getItem('rol') == 1 && invitacion.residencial_id == localStorage.getItem('residencial_id'))
                                        return (
                                            <tr key={invitacion.id}>
                                                <td>{invitacion.nombre}</td>
                                                <td>{invitacion.carnet}</td>
                                                <td>{invitacion.placavehiculo}</td>
                                                <td>{invitacion.fecha}</td>
                                                <td>{invitacion.motivo}</td>
                                                <td>{invitacion.dueno_id}</td>
                                                <td>
                                                    <img src="../public/qr.svg" alt="qr" width="150" height="150" />
                                                </td>
                                                <td></td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => {
                                                        eliminarInvitacionCasa(invitacion.id);
                                                    }}>Eliminar</button>
                                                </td>
                                            </tr>
                                        );
                                    if (localStorage.getItem('rol') == 4 && invitacion.residencial_id == localStorage.getItem('residencial_id'))
                                        return (
                                            <tr key={invitacion.id}>
                                                <td>{invitacion.nombre}</td>
                                                <td>{invitacion.carnet}</td>
                                                <td>{invitacion.placavehiculo}</td>
                                                <td>{invitacion.fecha}</td>
                                                <td>{invitacion.motivo}</td>
                                                <td>{invitacion.dueno_id}</td>
                                                <td>
                                                    <img src="../public/qr.svg" alt="qr" width="150" height="150" />
                                                </td>
                                                <td></td>
                                                <td>{invitacion.ingreso == 0 ? (
                                                    <button className="btn btn-warning" onClick={() => {
                                                        estaDentro(invitacion.id);
                                                    }}>Asistio</button>)
                                                    : (
                                                        <button className="btn btn-warning" disabled>Asistio</button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    if (localStorage.getItem('rol') != 1 && invitacion.dueno_id == localStorage.getItem('id'))
                                        return (
                                            <tr key={invitacion.id}>
                                                <td>{invitacion.nombre}</td>
                                                <td>{invitacion.carnet}</td>
                                                <td>{invitacion.placavehiculo}</td>
                                                <td>{invitacion.fecha}</td>
                                                <td>{invitacion.motivo}</td>
                                                <td>{invitacion.dueno_id}</td>
                                                <td>
                                                    <img src="../public/qr.svg" alt="qr" width="150" height="150" />
                                                </td>
                                                <td>
                                                    <Link className="btn btn-primary" to={INVITACIONCASA_URL + '/' + invitacion.id}>Editar</Link>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => {
                                                        eliminarInvitacionCasa(invitacion.id);
                                                    }}>Eliminar</button>
                                                </td>
                                                <td >
                                                    {condicion ? (
                                                        <a href="https://wa.me/?text=https://me-qr.com/es/data/image-pack/96351142" target="blank">
                                                            <button className="btn btn-warning" onClick={() => {
                                                                setInvitados(invitados + 1);
                                                                localStorage.setItem('invitados', invitados);
                                                            }}>Compartir por WhatsApp</button>
                                                        </a>
                                                    ) : (
                                                        <button className="btn btn-warning" disabled>Compartir por WhatsApp</button>
                                                    )
                                                    }
                                                </td>
                                            </tr>
                                        );
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
export default InvitacionCasaList;
