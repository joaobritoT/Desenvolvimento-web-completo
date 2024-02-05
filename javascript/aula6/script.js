n1 = prompt("Digite o primeiro numero")
n2 = prompt("Digite o segundo numero")

if(n1 > n2){
    document.write("O primeiro numero eh maior")
}else if(n2 > n1){
    document.write("O segundo numero eh maior")
}else{
    document.write("os numeros sao iguais")
}

nota = parseInt(prompt("digite a nota do aluno: "))
faltas = parseInt(prompt("Digite as faltas do aluno"))

limite_faltas = 10
document.write("<hr>")
if(nota > 7 && faltas< limite_faltas){
    document.write("aprovado")
}else{
    document.write("reprovado")
}