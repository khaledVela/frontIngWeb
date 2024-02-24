import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MenuNormal from "../../components/MenuNormal";
import { useEffect, useState } from "react";
import { FormSelect } from "react-bootstrap";
import { GetListaAreasComunes, GetListaDuenos, Getinvitadosareacomun, GetListainvitadosareacomun, Postinvitadosareacomun, Putinvitadosareacomun } from "../../services/InvitacionAreaComunService";
import { LISTAINVITADOSAREACOMUN_URL } from "../../navigation/Constants";


const InvitacionAreaComun = () => {
    const { id } = useParams("id");
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)
    const [nombre, setNombre] = useState('');
    const [carnet, setCarnet] = useState('');
    const [placavehiculo, setPlacavehiculo] = useState('');
    const [fecha, setFecha] = useState('');
    const [dueno_id, setDueno_id] = useState('');
    const [duenos, setDuenos] = useState([]);
    const [areascomunes, setAreascomunes] = useState([]);
    const [areascomunes_id, setAreascomunes_id] = useState('');
    const [invitadosareacomun, setInvitadosareacomun] = useState([]);
    useEffect(() => {
        loadDuenos();
        loadAreaComun();
        loadInvitadosareacomun();
        if (id !== undefined) {
            Getinvitadosareacomun(id).then((data) => {
                setNombre(data.nombre);
                setCarnet(data.apellido);
                setPlacavehiculo(data.placavehiculo);
                setFecha(data.fecha);
                setAreascomunes_id(data.areacomun_id);
                setDueno_id(data.dueo_id);
            });
        }
    }, [id]);

    const loadDuenos = () => {
        GetListaDuenos().then((data) => {
            setDuenos(data);
        });
    }

    const loadInvitadosareacomun = () => {
        GetListainvitadosareacomun().then((data) => {
            setInvitadosareacomun(data);
        });
    }

    const loadAreaComun = () => {
        GetListaAreasComunes().then((data) => {
            setAreascomunes(data);
        });
    }

    const onUserFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (localStorage.getItem('rol') == 6) {
            setDueno_id(localStorage.getItem('id'));
        }
        invitadosareacomun.map((invitado) => {
            if (invitado.nombre == nombre && invitado.carnet == carnet && invitado.fecha == fecha) {
                isValid = false;
                window.confirm("ya existe un invitado con los mismos datos en la fecha seleccionada")
            }
            if (invitado.areacomun_id == areascomunes_id) {
                let contador = parseInt(localStorage.getItem('contadorinvitadosareacomun'));
                localStorage.setItem('contadorinvitadosareacomun', contador + 1);
            }
        })
        areascomunes.map((area) => {
            if (area.AreaComun_id == areascomunes_id) {
                console.log('encontramos el area')
                if (parseInt(localStorage.getItem('contadorinvitadosareacomun')) >= area.capacidad) {
                    isValid = false;
                    window.confirm("estas exediendo de la capasidad maxima del area seleccionada")
                }
            }
        })

        if (isValid === true) {
            if (id === undefined) {
                createInvitacionCasa();
            } else {
                updateInvitacionCasa();
            }
        }
    }
    const createInvitacionCasa = () => {
        setShowAlertError(false);
        Postinvitadosareacomun({
            nombre,
            carnet,
            placavehiculo,
            fecha,
            areascomunes_id,
            dueno_id,
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(LISTAINVITADOSAREACOMUN_URL);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }

    const updateInvitacionCasa = () => {
        setShowAlertError(false);
        Putinvitadosareacomun(id, {
            nombre,
            carnet,
            placavehiculo,
            fecha,
            areascomunes_id,
            dueno_id,
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(LISTAINVITADOSAREACOMUN_URL);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }

    const onChangeDueno = (e) => {
        setDueno_id(e.target.value);
    }

    const onChangeAreaComun = (e) => {
        setAreascomunes_id(e.target.value);
    }

    const onChangeAreaComun2 = (e) => {
        localStorage.setItem('contadorinvitadosareacomun', 0);
        setAreascomunes_id(e.target.value);
    }

    return (
        <>
            <MenuNormal />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Formulario de Invitaciones a casa
                        </Card.Title>
                        {localStorage.getItem('rol') == 4 || localStorage.getItem('rol') == 1 ? (
                            <div>
                                {showAlertError && <Alert variant="danger">
                                    Error al enviar enviar datos, por favor intente nuevamente
                                </Alert>}
                                <Form noValidate onSubmit={onUserFormSubmit} validated={validated}>
                                    <FormGroup>
                                        <label>Nombre Completo</label>
                                        <FormControl value={nombre} required
                                            onChange={(e) => {
                                                setNombre(e.target.value);
                                            }} />
                                        <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Carnet</label>
                                        <FormControl value={carnet} required
                                            onChange={(e) => {
                                                setCarnet(e.target.value);
                                            }} />
                                        <Form.Control.Feedback type="invalid">Necesitas un carnet</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Placa Vehiculo</label>
                                        <FormControl value={placavehiculo}
                                            onChange={(e) => {
                                                setPlacavehiculo(e.target.value);
                                            }} />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Fecha</label>
                                        <FormControl type="date" value={fecha} required
                                            onChange={(e) => {
                                                setFecha(e.target.value);
                                            }} />
                                        <Form.Control.Feedback type="invalid">Necesitas una fecha</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Dueño Id</label>
                                        <FormSelect value={dueno_id} onChange={onChangeDueno} >
                                            <option value="">Seleccione un dueño</option>
                                            {duenos.map((dueno) => {
                                                if (dueno.rol_id == 6 && dueno.residencial_id == localStorage.getItem('residencial_id'))
                                                    return <option key={dueno.id} value={dueno.id}>{dueno.id}</option>
                                            })}
                                        </FormSelect>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Area Comun</label>
                                        <FormSelect value={areascomunes_id} onChange={onChangeAreaComun} >
                                            <option value="">Seleccione un area comun</option>
                                            {areascomunes.map((area) => {
                                                if(localStorage.getItem('residencial_id') == area.residencial_id)
                                                return <option key={area.id} value={area.id}>{area.nombre}</option>
                                            })}
                                        </FormSelect>
                                    </FormGroup>
                                    <div className="mt-3">
                                        <Button type="submit">Guardar Invitacion</Button>
                                    </div>
                                </Form>
                            </div>
                        ) : (
                            <div>
                                {showAlertError && <Alert variant="danger">
                                    Error al enviar enviar datos, por favor intente nuevamente
                                </Alert>}
                                <Form noValidate onSubmit={onUserFormSubmit} validated={validated}>
                                    <FormGroup>
                                        <label>Nombre Completo</label>
                                        <FormControl value={nombre} required
                                            onChange={(e) => {
                                                setNombre(e.target.value);
                                            }} />
                                        <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Carnet</label>
                                        <FormControl value={carnet} required
                                            onChange={(e) => {
                                                setCarnet(e.target.value);
                                            }} />
                                        <Form.Control.Feedback type="invalid">Necesitas un carnet</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Placa Vehiculo</label>
                                        <FormControl value={placavehiculo}
                                            onChange={(e) => {
                                                setPlacavehiculo(e.target.value);
                                            }} />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Fecha</label>
                                        <FormControl type="date" value={fecha} required
                                            onChange={(e) => {
                                                setFecha(e.target.value);
                                            }} />
                                        <Form.Control.Feedback type="invalid">Necesitas una fecha</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Area Comun</label>
                                        <FormSelect value={areascomunes_id} onChange={onChangeAreaComun2} >
                                            <option value='0'>Seleccione un area comun</option>
                                            {areascomunes.map((area) => {
                                                if (area.user_id == localStorage.getItem('id'))
                                                    return <option key={area.id} value={area.id}>{area.nombre}</option>
                                            })}
                                        </FormSelect>
                                    </FormGroup>
                                    <div className="mt-3">
                                        <Button type="submit">Guardar Invitacion</Button>
                                    </div>
                                </Form>
                            </div>

                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default InvitacionAreaComun;