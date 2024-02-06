
function calcular(){
    var nome = document.getElementById("nome").value
    var altura = document.getElementById("altura").value
    var peso = document.getElementById("peso").value

    altura = parseFloat(altura)
    peso = parseFloat(peso)

    altura = altura / 100

    massa_corporal = peso / (altura *2)
    massa_corporal = massa_corporal.toFixed(2)

    if(massa_corporal <16){
        resultado = 'baixo peso muito grave'
    }else if(massa_corporal > 16 && massa_corporal <= 16.99){
        resultado = 'baixo peso grave'
    }else if(massa_corporal >17 & massa_corporal <= 18.49){
        resultado = 'baixo peso'
    }else if(massa_corporal >18,50 && massa_corporal <=24.99){
        resultado = 'peso normal'
    }else if(massa_corporal >25 & massa_corporal <=29.99){
        resultado ='sobrepeso'
    }else if(massa_corporal >30 & massa_corporal <=34.99){
        resultado = 'obesidade grau 1'
    }else if(massa_corporal >35 & massa_corporal <=39.99){
        resultado = 'obesidade grau 2'
    }else{
        resultado = 'obesidade grau 3'
    }

    label = document.getElementById("result")
    str =  `${nome} possui indice de massa corporal de ${massa_corporal} e esta classificado como ${resultado}`
    label.textContent = str

}



