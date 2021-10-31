using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data.Entity;
using System.Data;
using Ar3Project.Models;

namespace Ar3Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ClienteController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult List()
        {
            string query = @"
            select cod_cliente, razao_social, cnpj_cliente, data_inclusao, data_alteracao, status_cliente from dbo.tbClientes where (status_cliente = 's')";
            DataTable tabela = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Ar3ProjetoConn");
            SqlDataReader mLeitura;
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using(SqlCommand comando = new SqlCommand(query, conn))
                {
                    mLeitura = comando.ExecuteReader();
                    tabela.Load(mLeitura); ;

                    mLeitura.Close();
                    conn.Close();
                }
            }

            return new JsonResult(tabela);
        }

     [HttpPost]

     public JsonResult Criar(Cliente cli)
        {
            cli.StatusCliente = 's';
            cli.DataInclusao = DateTime.Now;
            string query = @"
            insert into dbo.tbClientes
            (razao_social, cnpj_cliente, status_cliente, data_inclusao)
            values
            (
            '" + cli.RazaoSocial + @"'
            ,'" + cli.CnpjCliente + @"'
            ,'" + cli.StatusCliente + @"'
            ,'" + cli.DataInclusao + @"'
            )
            ";
            DataTable tabela = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Ar3ProjetoConn");
            SqlDataReader mLeitura;
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand comando = new SqlCommand(query, conn))
                {
                    mLeitura = comando.ExecuteReader();
                    tabela.Load(mLeitura); ;

                    mLeitura.Close();
                    conn.Close();
                }
            }

            return new JsonResult("Cliente adicionado");
        }

        [HttpPut]
        public JsonResult Atualizar(Cliente cli)
        {
            cli.DataAlteracao = DateTime.Now;
            string query = @"
            update dbo.tbClientes set
            razao_social = '" + cli.RazaoSocial + @"'
            ,cnpj_cliente = '" + cli.CnpjCliente + @"'
            ,data_alteracao = '" + cli.DataAlteracao + @"'
            where cod_cliente = " + cli.CodCliente + @"
            ";
            DataTable tabela = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Ar3ProjetoConn");
            SqlDataReader mLeitura;
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand comando = new SqlCommand(query, conn))
                {
                    mLeitura = comando.ExecuteReader();
                    tabela.Load(mLeitura); ;

                    mLeitura.Close();
                    conn.Close();
                }
            }

            return new JsonResult("Cliente atualizado");
        }

        [HttpDelete]
        public JsonResult Deletar(Cliente cli)
        {
            cli.StatusCliente = 'n';
            string query = @"
            update dbo.tbClientes set
            status_cliente = '" + cli.StatusCliente + @"'
            where cod_cliente = " + cli.CodCliente + @"
            ";
            DataTable tabela = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Ar3ProjetoConn");
            SqlDataReader mLeitura;
            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();
                using (SqlCommand comando = new SqlCommand(query, conn))
                {
                    mLeitura = comando.ExecuteReader();
                    tabela.Load(mLeitura); ;

                    mLeitura.Close();
                    conn.Close();
                }
            }

            return new JsonResult("Cliente desabilitado");
        }

    }
}
