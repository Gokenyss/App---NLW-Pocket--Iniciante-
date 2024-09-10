function start() {
    let count = 1
    while(true){
        let opção = "sair"
        switch(opção) {
            case "cadastrar":
                console.log("Vamos cadastrar")
                break
            case "listar":
                console.log("Vamos listar")
                break
            case "sair":
                return
        }  
    }
}

start()