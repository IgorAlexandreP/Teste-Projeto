import React,{Component} from "react";
import{Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditCliModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'cliente',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
        body:JSON.stringify({
            CodCliente: event.target.cod_cliente.value,
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
                                Alterar Clientes
                            </Modal.Title>
                        </Modal.Header>
                            <Modal.Body>

                                <Row>
                                    <Col sm={6}>
                                        <Form onSubmit={this.handleSubmit}>

                                            <Form.Group controlId="cod_cliente">
                                                <Form.Label>Codigo Cliente</Form.Label>
                                                <Form.Control type="text" name="cod_cliente" required
                                                disabled
                                                defaultValue={this.props.cliid}
                                                placeholder="razao_social"/>
                                            </Form.Group>

                                            <Form.Group controlId="razao_social">
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control type="text" name="razao_social" required
                                                defaultValue={this.props.clirazaosocial}
                                                placeholder="Nome do cliente"/>
                                            </Form.Group>

                                            <Form.Group controlId="cnpj_cliente">
                                                <Form.Label>Cnpj</Form.Label>
                                                <Form.Control type="text" name="cnpj_cliente" required
                                                defaultValue={this.props.clicnpjcliente}
                                                placeholder="Cpnj"/>
                                            </Form.Group>
                                            <br/>
                                            <Form.Group>
                                                <Button variant="primary" type="submit">
                                                    Alterar Cliente
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