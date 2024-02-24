import { Card, Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import MenuNormal from "../../components/MenuNormal";
import { Link } from 'react-router-dom';
import { INVITACIONAREACOMUN_URL } from "../../navigation/Constants";
import { Deleteinvitadosareacomun, GetListainvitadosareacomun, Putinvitadosareacomun2 } from "../../services/InvitacionAreaComunService";

const InvitacionAreacomunList = () => {
    const [ListaInvitacionAreacomun, setListaInvitacionAreacomun] = useState([]);
    useEffect(() => {
        loadInvitacionAreacomun();
    }, []);

    const loadInvitacionAreacomun = () => {
        GetListainvitadosareacomun().then((data) => {
            setListaInvitacionAreacomun(data);
        });
    }


    const estaDentro = (personainvitada) => {
        Putinvitadosareacomun2(personainvitada, {
        }).then(() => {
            loadInvitacionAreacomun();
        });
    }

    const eliminarInvitacionAreacomun = (id) => {
        if (window.confirm("¿Estas seguro que deseas eliminar esta InvitacionAreacomun?")) {
            Deleteinvitadosareacomun(id).then(() => {
                loadInvitacionAreacomun();
            });
        }
    };
    return (
        <>
            <MenuNormal />
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Invitacion a Areacomun List</Card.Title>
                        <Card.Text>
                            This is the Invitacion a Areacomun list page.
                        </Card.Text>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Nombre Completo</th>
                                    <th>Carnet</th>
                                    <th>Placa vehiculo</th>
                                    <th>Fecha</th>
                                    <th>Dueño id</th>
                                    <th>Area Comun</th>
                                    <th>Qr</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                    <th>Invitacion</th>
                                </tr>
                            </thead>
                            {ListaInvitacionAreacomun.map((invitacion) => {
                                if (localStorage.getItem('rol') == 1 || localStorage.getItem('rol') == 4 && invitacion.residencial_id == localStorage.getItem('residencial_id'))
                                    return (
                                        <tr key={invitacion.id}>
                                            <td>{invitacion.nombre}</td>
                                            <td>{invitacion.carnet}</td>
                                            <td>{invitacion.placaVehiculo}</td>
                                            <td>{invitacion.fecha}</td>
                                            <td>{invitacion.dueo_id}</td>
                                            <td>
                                                <img src="../public/qr.svg" alt="qr" width="150" height="150" />
                                            </td>
                                            <td></td>
                                            {(localStorage.getItem('rol') == 1) ? (
                                                <td>
                                                    <button className="btn btn-outline-danger" onClick={() => {
                                                        eliminarInvitacionAreacomun(invitacion.id);
                                                    }}>Eliminar</button>
                                                </td>
                                            ) : (
                                                <td>
                                                </td>
                                            )}
                                            {localStorage.getItem('rol') == 4 && invitacion.ingreso == 0 ? (
                                                <td>
                                                    <button className="btn btn-outline-warning" onClick={() => {
                                                        estaDentro(invitacion.id);
                                                    }}>Asistio</button>
                                                </td>
                                            ) : (
                                                localStorage.getItem('rol') == 4 && invitacion.ingreso == 1 ? (
                                                    <td>
                                                        <button className="btn btn-outline-warning" disabled onClick={() => {
                                                            estaDentro(invitacion.id);
                                                        }}>Asistio</button>
                                                    </td>
                                                ) : null
                                            )}
                                        </tr>
                                    )
                                if (localStorage.getItem('rol') == 6 && invitacion.dueo_id == localStorage.getItem('id'))
                                    return (
                                        <tr key={invitacion.id}>
                                            <td>{invitacion.nombre}</td>
                                            <td>{invitacion.carnet}</td>
                                            <td>{invitacion.placaVehiculo}</td>
                                            <td>{invitacion.fecha}</td>
                                            <td>{invitacion.dueo_id}</td>
                                            <td>{invitacion.areacomun_id}</td>
                                            <td>
                                                <img src="../public/qr.svg" alt="qr" width="150" height="150" />
                                            </td>
                                            <td>
                                                <Link to={INVITACIONAREACOMUN_URL + "/" + invitacion.id}>
                                                    <button className="btn btn-outline-primary">Editar</button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-danger" onClick={() => {
                                                    eliminarInvitacionAreacomun(invitacion.id);
                                                }}>Eliminar</button>
                                            </td>
                                            <td>
                                                <a href="https://wa.me/?text=https://me-qr.com/es/data/image-pack/96351142" target="blank">
                                                    <button className="btn btn-outline-warning">Compartir por WhatsApp</button>
                                                </a>
                                            </td>
                                        </tr>
                                    )
                            })}
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
export default InvitacionAreacomunList;