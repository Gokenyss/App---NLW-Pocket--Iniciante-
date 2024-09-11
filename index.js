const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {}
let metas = [meta]

async function cadastrarMeta() {
    const meta = await input({ message: "Qual é a meta?" })

    if (meta.length == 0) {
        console.log("A meta não pode ser vazia!")
        return
    }
    metas.push(
        { value: meta, checked: false }
    )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar e desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false, 

    })

    if(respostas.length == 0){
        console.log("Nenhuma meta foi selecionada!")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })

        console.log("Meta(s) foram marcada(s) como concluida(s)!")
}

async function MetasRealizadas () {

    const realizadas = metas.filter((meta) => (
        return meta.checked
    ))

    if(realizadas.length == 0) {
        console.log('Não existe metas realizadas')
        return
    }

    await select({
        message: "Metas realizadas",
        choices: [...realizadas]
    })
}


const start = async () => {
    
    while(true){
        
        const opção = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                { 
                    name: "Listar metas", 
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas pendentes",
                    value: "pendentes"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opção) {
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizdas":
                await MetasRealizadas()
                break
            case "pendentes": 
                await MetasPendentes()
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }  
    }
}

start()