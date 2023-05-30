import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../components/styles/registerLogin.css'
import {MdAccountCircle, MdEmail, MdMedicalServices, MdKey} from 'react-icons/md'


export default function Login() {
    return (
        <>
            <Container fluid className="bg">            
            <Form className="form">
                <h3 class="_h3">Regístrate</h3>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="nameInput">
                            <Form.Label><MdAccountCircle className="_icon"/></Form.Label>
                            <Form.Control type="text" placeholder="Ingrese su nombre"></Form.Control>
                            <Form.Text></Form.Text>
                        </Form.Group>
                    </Col>                    
                    <Col>
                        <Form.Group className="mb-3" controlId= "lastnameInput">
                            <Form.Label><MdAccountCircle className="_icon"/></Form.Label>
                            <Form.Control type="text" placeholder="Ingrese su apellido"></Form.Control>
                            <Form.Text></Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Col>
                    <Form.Group className="mb-3" controlId="emailInput">
                        <Form.Label><MdEmail className="_icon"/></Form.Label>
                        <Form.Control type="email" placeholder="Ingrese su correo electrónico"></Form.Control>
                        <Form.Text></Form.Text>
                    </Form.Group>                
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="professionInput">
                        <Form.Label><MdMedicalServices className="_icon"/></Form.Label>
                        <Form.Select>
                            <option selected disabled>Seleccione una profesión</option>
                            <option value="Médico">Médico</option>
                            <option value="Enfermero">Enfermero</option>
                            <option value="Odontológo">Odontólogo</option>
                            <option value="Nutricionista">Nutricionista</option>
                            <option value="Psicólogo">Psicólogo</option>
                            <option value="Kinesiólogo">Kinesiólogo</option>
                            <option value="Fisioterapeuta">Fisioterapeuta</option>
                            <option value="TerapeutaOcupacional">Terapeuta Ocupacional</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="passInput">
                        <Form.Label><MdKey className="_icon"/></Form.Label>
                        <Form.Control type="password" placeholder="Ingrese su contraseña"></Form.Control>
                        <Form.Text></Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="repassInput">
                        <Form.Label><MdKey className="_icon"/></Form.Label>
                        <Form.Control type="email" placeholder="Ingrese nuevamente su contraseña"></Form.Control>
                        <Form.Text></Form.Text>
                    </Form.Group>
                </Col>
                <Button type="submit" className="_button">Crear Cuenta</Button>
                <Col>
                    <Form.Group className="mb-3" controlID="acceptTermsInput">
                        <Form.Check type="checkbox" label="Acepta las Condiciones de Uso y Política de Privacidad"></Form.Check>                        
                    </Form.Group>
                </Col>
                <p class="text-center">¿Ya tienes una cuenta? <a href="/login">Ingresa Aquí</a></p>
            </Form>
            </Container>
        </>
    )
} 