
var altura = 0
var largura = 0
var vidas = 1
function ajusta_tamanho(){
    altura = window.innerHeight
    largura = window.innerWidth

}

ajusta_tamanho()

function posicao(){

    if(document.getElementById("mosca")){

        document.getElementById("mosca").remove()

        if(vidas > 3){
            window.location.href = 'fim_de_jogo.html'
        }
        document.getElementById("v" + vidas).src="recursos/coracao_vazio.png"
        vidas++
    } 

    var posi_x = Math.floor(Math.random() * largura) - 90
    var posi_y = Math.floor(Math.random() * altura) - 90

    posi_x = posi_x < 0 ? 0 : posi_x
    posi_y = posi_y < 0 ? 0 : posi_y

    var mosquito = document.createElement('img')
    mosquito.src = 'recursos/mosca.png'
    mosquito.className = tamanho_aleatorio() + ' ' + lado_aleatorio()
    mosquito.style.left = posi_x + 'px'
    mosquito.style.top = posi_y + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosca'
    mosquito.onclick = function(){
        this.remove()
    }

    document.body.appendChild(mosquito)
}

function tamanho_aleatorio(){
    var classe = Math.floor(Math.random() * 3)

    switch (classe){
        case 0:
            return 'mosca1'
        case 1:
            return 'mosca2'
        case 2:
            return 'mosca3'
    }
}

function lado_aleatorio(){
    var classe = Math.floor(Math.random() * 2)

    switch (classe){
        case 0:
            return 'lado_a'
        case 1:
            return 'lado_b'
    }
}
