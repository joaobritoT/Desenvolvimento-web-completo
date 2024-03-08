class Despesa{
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao 
        this.valor = valor
    }
    validarDados(){
        for(let i in this){
            if(this[i] == null || this[i] == undefined || this[i] == ''){
                return false
            }
        }
        return true
    }
}

class Bd{
    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id',0)
        }
    }
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d){
        let id = this.getProximoId()
        localStorage.setItem(id,JSON.stringify(d))
        localStorage.setItem('id',id)
    }
    carregarDados(){

       let despesas = Array()
       let id = localStorage.getItem('id')
       for(let i =1; i<=id; i++){
        let despesa = JSON.parse(localStorage.getItem(i))
        if(despesa === null){
            continue
        }
        despesas.push(despesa)
       }
       return despesas
    }
}

let bd = new Bd

function cadastrarDespesa(){
    let ano = document.getElementById("ano").value
    let mes = document.getElementById("mes").value
    let dia = document.getElementById("dia").value
    let tipo = document.getElementById("tipo").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value

    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)
    
    validacao = despesa.validarDados()
    if(validacao == true){
        bd.gravar(despesa)
        document.getElementById("motal_titulo").innerHTML = "registro inserido"
        document.getElementById("conteudo").innerHTML = "registro inserido com sucesso"

        $("#registraDespesa").modal('show')
    }
    else{
        document.getElementById("motal_titulo").innerHTML = "falha ao inserir registro"
        document.getElementById("conteudo").innerHTML = "Cheque os dados e tente novamente"
        $("#registraDespesa").modal('show')
    }
    

}

function carregaListaDespesa(){
    let despesas = Array()
    despesas = bd.carregarDados()
    let lista = document.getElementById("listadespesa")
    despesas.forEach(function(d){
        let linha = lista.insertRow()
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        switch(d.tipo){
            case '1' : d.tipo ='Alimentacao'
                break
            case '2' : d.tipo ='Educacao'
                break
            case '3' : d.tipo ='Lazer'
                break
            case '4' : d.tipo ='Saude'
                break
            case '5' : d.tipo ='Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}

