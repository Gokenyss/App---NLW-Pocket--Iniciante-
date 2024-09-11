const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {}
let metas = [meta]

async function cadastrarMeta() {
    const meta = await input({ message: "ǫᴜᴀʟ ᴀ ᴍᴇᴛᴀ?" })

    if (meta.length == 0) {
        console.log("ᴀ ᴍᴇᴛᴀ ɴᴀᴏ ᴘᴏᴅᴇ sᴇʀ ᴠᴀᴢɪᴀ!")
        return
    }
    metas.push(
        { value: meta, checked: false }
    )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "(ᴜsᴇ ᴀs sᴇᴛᴀs (⭡⭣) ᴘᴀʀᴀ ᴇsᴄᴏʟʜᴇʀ ᴀʟɢᴜᴍᴀ ᴀʟᴛᴇʀɴᴀᴛɪᴠᴀ, ᴏ ᴇsᴘᴀᴄᴏ ᴘᴀʀᴀ sᴇʟᴇᴄɪᴏɴᴀʀ ᴇ ᴏ ᴇɴᴛᴇʀ ᴘᴀʀᴀ ғɪɴᴀʟɪᴢᴀʀ ᴀ ᴏᴘᴇʀᴀᴄᴀᴏ) || sᴇʟᴇᴄɪᴏɴᴇ ᴀs ᴍᴇᴛᴀs ᴄᴏɴᴄʟᴜɪᴅᴀs: ",
        choices: [...metas],
        instructions: false, 

    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        console.log("ɴᴇɴʜᴜᴍᴀ ᴍᴇᴛᴀ ғᴏɪ sᴇʟᴇᴄɪᴏɴᴀᴅᴀ!")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })

        console.log(respostas.length + " ᴍᴇᴛᴀ(s) ғᴏʀᴀᴍ ᴍᴀʀᴄᴀᴅᴀ(s) ᴄᴏᴍᴏ ᴄᴏɴᴄʟᴜɪᴅᴀ(s)!")
}

const MetasRealizadas = async () => {

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log('ɴᴀᴏ ᴇxɪsᴛᴇᴍ ᴍᴇᴛᴀs ʀᴇᴀʟɪᴢᴀᴅᴀs!')
        return
    }

    await select({
        message: realizadas.length +" ᴍᴇᴛᴀs ʀᴇᴀʟɪᴢᴀᴅᴀs!",
        choices: [...realizadas]
    })
}

const MetasPendentes = async () => {
    const pendente = metas.filter((meta) => { 
        return meta.checked != true
    })
    
    if(pendente.length == 0) {
        console.log("ɴᴀᴏ ᴇxɪsᴛᴇᴍ ᴍᴇᴛᴀs ᴘᴇɴᴅᴇɴᴛᴇs!")
        return
    }

    await select({
        message: pendente.length + " ᴍᴇᴛᴀs ᴘᴇɴᴅᴇɴᴛᴇs!",
        choices: [...pendente]
    })
}

async function DeletarMetas () {

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
        console.log(itensDeletar.length + " ᴍᴇᴛᴀs ғᴏʀᴀᴍ ʀᴇᴍᴏᴠɪᴅᴀs!")
    }

    itensDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })

    })

    console.log(`${itensDeletar.length} ᴍᴇᴛᴀ(s) ғᴏʀᴀᴍ ʀᴇᴍᴏᴠɪᴅᴀ(s)!`)
}

const start = async () => {
    
    while(true){
        
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