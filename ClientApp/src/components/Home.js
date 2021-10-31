import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className="mt-5 d-flex justify-content-left">
        Projeto desenvolvido para teste visando gerenciamento de clientes
      </div>
    );
  }
}
