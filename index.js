//Hello World (Comentário) 

let nome = "Alessandro"
console.log(nome);

// arrays, objetos 

let metas = ["Alessandro", "Alô"]
console.log(metas[1] + ", " + metas[0]);

let meta = {
    value: 'ler um livro por mês',
    checked: false

}

console.log(meta.value)
 

// function // arrow function 

const criarmeta=() => {} 

let meta2 = {
    value: 'ler dois livro por mês',
    checked: false,
    isChecked: (info) => {
        console.log(info)
    }
}

meta2.isChecked(meta2.value)

function criarMeta () {} 
