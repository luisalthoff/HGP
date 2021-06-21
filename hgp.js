
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hgp.db');
 
function init()
{
    
    let sql = 'SELECT * FROM alunos';
    db.get(sql); // [], (err, row) => {
        document.getElementById("Tot").innerText=56; 
    //});
    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();
    document.getElementById("Mes").selectedIndex=mesAtual;
    document.getElementById("Ano").value=anoAtual;
    geraCalendario(anoAtual, mesAtual);
}



function geraCalendario(ano, mes) 
{
    limpaCalendario();

    const dia1 = new Date(ano, mes-1, 1).getDay();  //dia da semana do primeiro dia do mes
    const dia31 = new Date(ano, mes, 0).getDate(); //nmro de dias no mes
    const tbl = document.getElementById("tblCal");

    let n = 1;
    for (var i = 0; i < 5; i++) 
    {
        var lin = document.createElement("tr");
        for (var j = 1; j < 6; j++) 
        {
            var cel = document.createElement("td");
            cel.id = "td"+ n
            cel.setAttribute('onclick', 'mudaCor(event)');
            lin.appendChild(cel);
            n++;
        }
         tbl.appendChild(lin);
    }

    let dia = 1;
    let n2 = 1;
    
    if (dia1 == 0)
    {
        dia=2;
    }
    else if (dia1 == 6)
    {
        dia=3;
    }
    else
    {
        n2 = dia1;
    }

    for (i = n2; i <= dia31; i++)
    { 
        if (dia > dia31)
        {
            break;
        }
        else
        {
        var cel = document.getElementById('td' + i);
        var txt = document.createTextNode(dia);
        cel.appendChild(txt);
        dia++;
        if (i % 5 == 0){dia=dia+2}  //somar 2 dias sabado e domingo
        }
    } 
    
    if (document.getElementById('td21').innerHTML == ''){     
        tbl.deleteRow(5);}

}

function limpaCalendario()
{
    var lin = 1;
    var table = document.getElementById('tblCal');
    var contaLin = table.rows.length;
    for (var i = lin; i < contaLin; i++) 
    {
        table.deleteRow(lin);
    }
}

function mudaCor(e)
{
    var target = e.target,
    status = e.target.classList.contains('active');

    e.target.classList.add(status ? 'inactive' : 'active');
    e.target.classList.remove(status ? 'active' : 'inactive');
    contaDias();
}

function contaDias()
{
    var tbl = document.getElementById("tblCal");
    var ndias = 0;
    for (let row of tbl.rows) 
    {
        for(let cell of row.cells) 
        {
            if(cell.classList.contains('active')){ndias++;}; 
            
        }
    }

    if (ndias == 1){
        tdias = " dia = R$";}
    else if (ndias < 1){
        ndias = ""; 
        tdias = "";}
    else {tdias = " dias = R$";}
        
    document.getElementById('Tot').innerText = ndias + tdias + (ndias*180);

}
