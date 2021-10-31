using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ar3Project.Models
{
    public class Cliente
    {
        public int CodCliente { get; set; }

        public string RazaoSocial { get; set; }

        public string CnpjCliente { get; set; }

        public DateTime DataInclusao { get; set; }

        public DateTime DataAlteracao { get; set; }

        public Char StatusCliente { get; set; }

    }
}
