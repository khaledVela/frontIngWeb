import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import { useNavigate,  } from "react-router-dom";
import { useEffect, useState } from "react";
import {LISTAINVITADOSCASA_URL} from "../../navigation/Constants";
import { Login } from "../../services/loginService";
function HomePage() {
    localStorage.clear();
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        localStorage.clear();
        localStorage.setItem('limite', 4);
        getUsers();
    }, []);

    const getUsers = () => {
        Login().then((data) => {
            setUsers(data);
        });
    }
    const onUserFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (isValid===true) {
            doLogin();
        }
    }
    const doLogin = () => {
        let encontrado=users.find((user) => user.usuario === username && user.password === password);
        console.log(encontrado);
        localStorage.setItem('username', username);
        localStorage.setItem('id', encontrado.user_id);
        localStorage.setItem('rol', encontrado.rol_id);
        setShowAlertError(false);
        navigate(LISTAINVITADOSCASA_URL)
    }
    return (
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Login
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}
                            <Form noValidate onSubmit={onUserFormSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Username</label>
                                    <FormControl value={username} required
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un UserName</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Contraseña</label>
                                    <FormControl value={password} required
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }} type="password" />
                                    <Form.Control.Feedback type="invalid">Ingresa un pasword válido</Form.Control.Feedback>
                                </FormGroup>

                                <div className="mt-3">
                                    <Button type="submit">Guardar persona</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
    );
}

export default HomePage;