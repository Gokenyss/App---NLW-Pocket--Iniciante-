//Hello World (Comentário) 

let nome = "Alessandro"
console.log(nome);

// arrays, objetos 

let metas = ["Alessandro", "Alô"]
console.log(metas[1] + ", " + metas[0]);

let meta = {
    value: 'ler um livro por mês',
    checked: true,

}

console.log(meta.value)
 

// function // arrow function 

const criarmeta=() => {} 

let meta2 = [
    meta,
    {
    value: 'ler dois livro por mês',
    checked: false,
    isChecked: (info) => {
        console.log(info)
    }
}
]

console.log(meta2[1].value)

//function criarMeta () {} 

