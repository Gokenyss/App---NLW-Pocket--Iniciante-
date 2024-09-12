const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

const mensagemInicial = "Bem vindo ao App de metas! || by: @4lessandro_084"
let mensagemDoApp = "ㅤ" 
let metas

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
    metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

async function cadastrarMeta() {
    const meta = await input({ message: "Qual é a meta?" })

    if (meta.length == 0) {
        mensagemDoApp = "A meta não pode ser vazia!"
        return
    }
    metas.push(
        { value: meta, checked: false }
    )

    mensagemDoApp = "Meta cadastrada com sucesso!"

}

const listarMetas = async () => {

    if(metas.length == 0) {
        mensagemDoApp = "Não existem metas!"
        return
    }
    const respostas = await checkbox({
        message: "Selecione as metas concluídas: ",
        choices: [...metas],
        instructions: false, 

    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        mensagemDoApp = "Nenhuma meta foi selecionada!"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })

        mensagemDoApp = respostas.length + " Meta(s) foram marcada(s) como concluída(s)!"
}

const MetasRealizadas = async () => {

    if(metas.length == 0) {
        mensagemDoApp = "Não existem metas!"
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        mensagemDoApp = 'Não existem metas realizadas!'
        return
    }

    await select({
        choices: [...realizadas]
    }) 

        mensagemDoApp = realizadas.length +" Metas realizadas!"

}

const MetasPendentes = async () => {

    if(metas.length == 0) {
        mensagemDoApp = "Não existem metas!"
        return
    }

    const pendente = metas.filter((meta) => { 
        return meta.checked != true
    })
    
    if(pendente.length == 0) {
        mensagemDoApp = "Não existem metas pendentes!"
        return
    }

    await select({
        choices: [...pendente]
    })

    mensagemDoApp = pendente.length + " Metas pendentes!"

}

async function DeletarMetas () {

    if(metas.length == 0) {
        mensagemDoApp = "Não existem metas!"
        return
    }

    ///Remover marcação no Checkbox
    metas.forEach((m) => {
        m.checked = false
    })

    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const itensDeletar = await checkbox({
        message: "Marque a meta que deseja remover: ",
        choices: [...metas],
        instructions: false, 

    })
    if(itensDeletar.length == 0){
        mensagemDoApp = itensDeletar.length + " Meta(s) foram removida(s)!"
    }

    itensDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })

    })

    mensagemDoApp = itensDeletar.length + ' Meta(s) foram removida(s)!'
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagemDoApp != "") { 
        console.log(mensagemInicial)
        console.log("")
        console.log(mensagemDoApp)
        console.log("")
        mensagemDoApp = ""
    }
}

const start = async () => {
    await carregarMetas()

    while(true){
        mostrarMensagem()
        await salvarMetas()
        const opção = await select({
            message: "MENU >",
            choices: [
                {
                    name: "CADASTRAR METAS",
                    value: "cadastrar"
                },
                { 
                    name: "LISTA DE METAS", 
                    value: "listar"
                },
                {
                    name: "METAS CONCLUÍDAS",
                    value: "realizadas"
                },
                {
                    name: "METAS PENDENTES",
                    value: "pendentes"
                },
                {
                    name: "DELETAR METAS",
                    value: "deletar"
                },
                {
                    name: "SAIR",
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
            case "realizadas":
                await MetasRealizadas()
                break
            case "pendentes": 
                await MetasPendentes()
                break
            case "deletar":
                await DeletarMetas()
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }  
    }
}

start()