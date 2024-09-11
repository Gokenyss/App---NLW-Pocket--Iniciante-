const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

const mensagemInicial = "Bem vindo ao App de metas! || by:Alessandro"
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
    const meta = await input({ message: "ǫᴜᴀʟ ᴀ ᴍᴇᴛᴀ?" })

    if (meta.length == 0) {
        mensagemDoApp = "ᴀ ᴍᴇᴛᴀ ɴᴀᴏ ᴘᴏᴅᴇ sᴇʀ ᴠᴀᴢɪᴀ!"
        return
    }
    metas.push(
        { value: meta, checked: false }
    )

    mensagemDoApp = "ᴍᴇᴛᴀ ᴄᴀᴅᴀsᴛʀᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ!"

}

const listarMetas = async () => {

    if(metas.length == 0) {
        mensagemDoApp = "ɴᴀᴏ ᴇxɪsᴛᴇᴍ ᴍᴇᴛᴀs!"
        return
    }
    const respostas = await checkbox({
        message: "(ᴜsᴇ ᴀs sᴇᴛᴀs (⭡⭣) ᴘᴀʀᴀ ᴇsᴄᴏʟʜᴇʀ ᴀʟɢᴜᴍᴀ ᴀʟᴛᴇʀɴᴀᴛɪᴠᴀ, ᴏ ᴇsᴘᴀᴄᴏ ᴘᴀʀᴀ sᴇʟᴇᴄɪᴏɴᴀʀ ᴇ ᴏ ᴇɴᴛᴇʀ ᴘᴀʀᴀ ғɪɴᴀʟɪᴢᴀʀ ᴀ ᴏᴘᴇʀᴀᴄᴀᴏ) || sᴇʟᴇᴄɪᴏɴᴇ ᴀs ᴍᴇᴛᴀs ᴄᴏɴᴄʟᴜɪᴅᴀs: ",
        choices: [...metas],
        instructions: false, 

    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        mensagemDoApp = "ɴᴇɴʜᴜᴍᴀ ᴍᴇᴛᴀ ғᴏɪ sᴇʟᴇᴄɪᴏɴᴀᴅᴀ!"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })

        mensagemDoApp = respostas.length + " ᴍᴇᴛᴀ(s) ғᴏʀᴀᴍ ᴍᴀʀᴄᴀᴅᴀ(s) ᴄᴏᴍᴏ ᴄᴏɴᴄʟᴜɪᴅᴀ(s)!"
}

const MetasRealizadas = async () => {

    if(metas.length == 0) {
        mensagemDoApp = "ɴᴀᴏ ᴇxɪsᴛᴇᴍ ᴍᴇᴛᴀs!"
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        mensagemDoApp = 'ɴᴀᴏ ᴇxɪsᴛᴇᴍ ᴍᴇᴛᴀs ʀᴇᴀʟɪᴢᴀᴅᴀs!'
        return
    }

    await select({
        choices: [...realizadas]
    }) 

        mensagemDoApp = realizadas.length +" ᴍᴇᴛᴀs ʀᴇᴀʟɪᴢᴀᴅᴀs!"

}

const MetasPendentes = async () => {

    if(metas.length == 0) {
        mensagemDoApp = "ɴᴀᴏ ᴇxɪsᴛᴇᴍ ᴍᴇᴛᴀs!"
        return
    }

    const pendente = metas.filter((meta) => { 
        return meta.checked != true
    })
    
    if(pendente.length == 0) {
        mensagemDoApp = "ɴᴀᴏ ᴇxɪsᴛᴇᴍ ᴍᴇᴛᴀs ᴘᴇɴᴅᴇɴᴛᴇs!"
        return
    }

    await select({
        choices: [...pendente]
    })

    mensagemDoApp = pendente.length + " ᴍᴇᴛᴀs ᴘᴇɴᴅᴇɴᴛᴇs!"

}

async function DeletarMetas () {

    if(metas.length == 0) {
        mensagemDoApp = "ɴᴀᴏ ᴇxɪsᴛᴇᴍ ᴍᴇᴛᴀs!"
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
        message: "ᴍᴀʀǫᴜᴇ ᴀ ᴍᴇᴛᴀ ǫᴜᴇ ᴅᴇsᴇᴊᴀ ʀᴇᴍᴏᴠᴇʀ",
        choices: [...metas],
        instructions: false, 

    })
    if(itensDeletar.length == 0){
        mensagemDoApp = itensDeletar.length + " ᴍᴇᴛᴀ(s) ғᴏʀᴀᴍ ʀᴇᴍᴏᴠɪᴅᴀ(s)!"
    }

    itensDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })

    })

    mensagemDoApp = itensDeletar.length + 'ᴍᴇᴛᴀ(s) ғᴏʀᴀᴍ ʀᴇᴍᴏᴠɪᴅᴀ(s)!'
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
            message: "ᴍᴇɴᴜ >",
            choices: [
                {
                    name: "ᴄᴀᴅᴀsᴛʀᴀʀ ᴍᴇᴛᴀ",
                    value: "cadastrar"
                },
                { 
                    name: "ʟɪsᴛᴀ ᴅᴇ ᴍᴇᴛᴀs", 
                    value: "listar"
                },
                {
                    name: "ᴍᴇᴛᴀs ᴄᴏɴᴄʟᴜɪᴅᴀs",
                    value: "realizadas"
                },
                {
                    name: "ᴍᴇᴛᴀs ᴘᴇɴᴅᴇɴᴛᴇs",
                    value: "pendentes"
                },
                {
                    name: "ᴅᴇʟᴇᴛᴀʀ ᴍᴇᴛᴀs",
                    value: "deletar"
                },
                {
                    name: "sᴀɪʀ",
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
                console.log("ᴀᴛᴇ ᴀ ᴘʀᴏxɪᴍᴀ!")
                return
        }  
    }
}

start()