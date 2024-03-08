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
        despesa.id = i
        despesas.push(despesa)
       }
       return despesas
    }
    pesqusiar(despesa){
        let despesas_filtradas = Array()
        despesas_filtradas = this.carregarDados()

        if(despesa.ano !=''){
           despesas_filtradas = despesas_filtradas.filter(d => d.ano == despesa.ano)
        }

        if(despesa.mes !=''){
            despesas_filtradas = despesas_filtradas.filter(d => d.mes == despesa.mes)
        }

        if(despesa.dia !=''){
            despesas_filtradas = despesas_filtradas.filter(d => d.dia == despesa.dia)
        }

        if(despesa.tipo !=''){
            despesas_filtradas = despesas_filtradas.filter(d => d.tipo == despesa.tipo)
        }
        if(despesa.descricao !=''){
            despesas_filtradas = despesas_filtradas.filter(d => d.descricao == despesa.descricao)
        }
        if(despesa.valor !=''){
            despesas_filtradas = despesas_filtradas.filter(d => d.valor == despesa.valor)
        }
        
        return despesas_filtradas
        
    }

    remover(id){
        localStorage.removeItem(id)
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
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
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

        let btn = document.createElement("button")
        btn.className = "btn btn-danger"
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_','')
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)

    })
}

function pesqusiarDespesa(){
    let ano = document.getElementById("ano").value
    let mes = document.getElementById("mes").value
    let dia = document.getElementById("dia").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value
    let tipo  = document.getElementById("tipo").value

    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)
    let despesas = bd.pesqusiar(despesa)

    let lista = document.getElementById("listadespesa")
    lista.innerHTML = ''
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

