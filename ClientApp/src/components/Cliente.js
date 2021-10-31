import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'reactstrap';
import { AddCliModal } from './AddCliModal';
import { EditCliModal } from './EditCliModal';
import {FaEdit} from 'react-icons/fa';
import {FaTrashAlt} from 'react-icons/fa';
import './Cliente.css';



export class Cliente extends Component {
  constructor(props){
    super(props);
    this.state={clis:[], addModalShow:false, editModalShow:false}
  }

  refreshList(){
    fetch(process.env.REACT_APP_API+'cliente')
    .then(response=>response.json())
    .then(data=>{this.setState({clis:data});
    });
  }

  componentDidMount(){
    this.refreshList();
  }

  componentDidUpdate(){
    this.refreshList();
  }

  deletarCli(cliid){
    if(window.confirm('Deseja desativar o cliente?')){
      fetch(process.env.REACT_APP_API+'cliente/'+cliid,{
        method:'DELETE',
        headers:{'Accept':'application/json', 
        'Content-Type':'application/json'}
      })
    }
  }

  deletarCliente(cliid){
    if(window.confirm('Deseja desativar o cliente?')){
    fetch(process.env.REACT_APP_API+'cliente',{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        },
    body:JSON.stringify({
        CodCliente: cliid
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
}

  render () {
    const {clis, cliid, clirazaosocial, clicnpjcliente}=this.state;
    let addModalClose=()=>this.setState({addModalShow:false});
    let editModalClose=()=>this.setState({editModalShow:false});
    return (
      <div>  
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <th></th>
            <th>Nome</th>
            <th>Cnpj</th>
            <th>Data Inclusão</th>
            <th>Data Alteração</th>
            <th></th>
          </thead>
          <tbody>
          {clis.map(cli=>
            <tr key={cli.cod_cliente}>
                <td className="text-center">
                  <ButtonToolbar>
                      <Button className="mr-2" variant="info"color="#FFFFFF"
                      onClick={()=>this.setState({editModalShow:true, cliid:cli.cod_cliente, 
                      clirazaosocial:cli.razao_social, clicnpjcliente:cli.cnpj_cliente})}>
                      <FaEdit color="green"/>
                      </Button>
                </ButtonToolbar>
              </td>
              <td>{cli.razao_social}</td>
              <td>{cli.cnpj_cliente}</td>
              <td>{cli.data_inclusao}</td>
              <td>{cli.data_alteracao}</td>
              <td>
                <ButtonToolbar>
                  
                  <Button className="mr-2" variant="danger" color="#FFFFFF"
                  onClick={()=>this.deletarCliente(cli.cod_cliente)}>
                    <FaTrashAlt color="red"/>
                  </Button>

                  <EditCliModal show={this.state.editModalShow}
                  onHide={editModalClose}
                  cliid={cliid}
                  clirazaosocial={clirazaosocial}
                  clicnpjcliente={clicnpjcliente}/>
                </ButtonToolbar>
              </td>
            </tr>)}
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button variant="primary"
          onClick={()=>this.setState({addModalShow:true})}>
            Adicionar Cliente
          </Button>

            
          <AddCliModal show={this.state.addModalShow} onHide={addModalClose}/>
        </ButtonToolbar>
      </div>
    )
  }
}