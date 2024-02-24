import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MenuNormal from "../../components/MenuNormal";
import { useEffect, useState } from "react";
import { LISTAINVITADOSCASA_URL } from "../../navigation/Constants";
import { GetInvitadosCasa, GetListaInvitadosCasa, PostInvitadosCasa, PutInvitadosCasa, GetListaDuenos } from "../../services/InvitacionCasaService";
import { FormSelect } from "react-bootstrap";


const InvitacionCasaForm = () => {
    const { id } = useParams("id");
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)
    const [nombre, setNombre] = useState('');
    const [carnet, setCarnet] = useState('');
    const [placavehiculo, setPlacavehiculo] = useState('');
    const [fecha, setFecha] = useState('');
    const [motivo, setMotivo] = useState('');
    const [dueno_id, setDueno_id] = useState('');
    const [duenos, setDuenos] = useState([]);
    const [invitados, setInvitados] = useState(0);
    useEffect(() => {
        loadDuenos();
        loadInvitadoscasa();
        if (id !== undefined) {
            GetInvitadosCasa(id).then((data) => {
                setNombre(data.nombre);
                setCarnet(data.apellido);
                setPlacavehiculo(data.placavehiculo);
                setFecha(data.fecha);
                setMotivo(data.motivo);
                setDueno_id(data.dueno_id);
            });
        }
    }, [id]);

    const loadDuenos = () => {
        GetListaDuenos().then((data) => {
            setDuenos(data);
        }); 
    }

    const loadInvitadoscasa = () => {
        GetListaInvitadosCasa().then((data) => {
            setInvitados(data);
        });
    }

    const onUserFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        let invitadosC = 0
        invitados.map((invitado) => {
            if (invitado.dueno_id == dueno_id && invitado.fecha == fecha) {
                invitadosC = invitadosC + 1;
                if(invitadosC > 3){
                    isValid = false;
                    alert('No se puede invitar a mas de 3 personas a tu casa en un dia');
                }
            }
        });

        if (isValid === true) {
            if (id === undefined) {
                createInvitacionCasa();
            } else {
                updateInvitacionCasa();
            }
        }
    }
    const createInvitacionCasa = () => {
        if(localStorage.getItem('rol') == 6){
            setDueno_id(localStorage.getItem('id'));
        }
        setShowAlertError(false);
        PostInvitadosCasa({
            nombre,
            carnet,
            placavehiculo,
            fecha,
            motivo,
            dueno_id
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(LISTAINVITADOSCASA_URL);
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
        PutInvitadosCasa(id, {
            nombre,
            carnet,
            placavehiculo,
            fecha,
            motivo,
            dueno_id
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(LISTAINVITADOSCASA_URL);
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

    return (
        <>
            <MenuNormal />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Formulario de Invitaciones a casa
                        </Card.Title>
                        {localStorage.getItem('rol') == 4 || localStorage.getItem('rol')==1? (
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
                                    <label>Motivo</label>
                                    <FormControl value={motivo} required
                                        onChange={(e) => {
                                            setMotivo(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un motivo</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Dueño Id</label>
                                    <FormSelect value={dueno_id} onChange={onChangeDueno} >
                                        {duenos.map((dueno) => {
                                            if(localStorage.getItem('rol') == 6 && dueno.residencial_id == localStorage.getItem('residencial_id')){
                                                return <option key={dueno.id} value={dueno.id}>{dueno.id}</option>
                                            }})}
                                    </FormSelect>
                                </FormGroup>
                                <div className="mt-3">
                                    <Button type="submit">Guardar Invitacion</Button>
                                </div>
                            </Form>
                        </div>
                        ):(
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
                                    <label>Motivo</label>
                                    <FormControl value={motivo} required
                                        onChange={(e) => {
                                            setMotivo(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un motivo</Form.Control.Feedback>
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

export default InvitacionCasaForm;