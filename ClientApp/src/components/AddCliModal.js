import React,{Component} from "react";
import{Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class AddCliModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'cliente',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
        body:JSON.stringify({
            CodCliente: 0,
            RazaoSocial: event.target.razao_social.value,
            CnpjCliente: event.target.cnpj_cliente.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">
                <Modal
                {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                        <Modal.Header clooseButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Adicionar Clientes
                            </Modal.Title>
                        </Modal.Header>
                            <Modal.Body>

                                <Row>
                                    <Col sm={6}>
                                        <Form onSubmit={this.handleSubmit}>
                                            <Form.Group controlId="razao_social">
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control type="text" name="razao_social" required
                                                placeholder="Nome do cliente"/>
                                            </Form.Group>

                                            <Form.Group controlId="cnpj_cliente">
                                                <Form.Label>Cnpj</Form.Label>
                                                <Form.Control type="text" name="cnpj_cliente" required
                                                placeholder="Cpnj"/>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group>
                                                <Button variant="primary" type="submit">
                                                    Adicionar Cliente
                                                </Button>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                            </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={this.props.onHide}>Fechar</Button>
                        </Modal.Footer>
                </Modal>
            </div>
        )
    }
}