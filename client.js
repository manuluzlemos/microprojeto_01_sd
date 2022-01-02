const net = require('net');

const socket = new net.Socket();

const delayFunction = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
}

const connectionListener = async () => {
    console.log("Conectado ao servidor!");

    socket.on("data", (data) => {
        const dataString = data.toString().trim();

        console.log("\nResposta do servidor: \n" + dataString);
    });

    const bufferDelay = 2;
    socket.write("LISTAR\r\n");
    await delayFunction(bufferDelay);

    socket.write("CARRINHO\r\n");
    await delayFunction(bufferDelay);
    
    socket.write("ADICIONAR P10 5\r\n");
    await delayFunction(bufferDelay);
    
    socket.write("ADICIONAR P04 7\r\n");
    await delayFunction(bufferDelay);
    
    socket.write("ADICIONAR P09 8\r\n");
    await delayFunction(bufferDelay);

    socket.write("CARRINHO\r\n");
    await delayFunction(bufferDelay);

    socket.write("REMOVER P04\r\n");
    await delayFunction(bufferDelay);

    socket.write("CARRINHO\r\n");
    await delayFunction(bufferDelay);

    socket.write("ADICIONAR P03 4\r\n");
    await delayFunction(bufferDelay);
    
    socket.write("CARRINHO\r\n");
    await delayFunction(bufferDelay);

    socket.write("PAGAR\r\n");
    await delayFunction(bufferDelay);

    socket.write("CARRINHO\r\n");
    await delayFunction(bufferDelay);

    socket.write("PEDIDO\r\n");
    await delayFunction(bufferDelay);

    socket.write("ENTREGA C1\r\n");
    await delayFunction(bufferDelay);

    socket.write("PEDIDO\r\n");
    await delayFunction(bufferDelay);


    /*
    let valor = -1;
    while (valor !== 0) {
        valor = await menu();
        switch (valor) {
            case "1":
                socket.write("LISTAR\r\n");
                await delayFunction(bufferDelay);
                break;

            case "2":
                socket.write("CARRINHO\r\n");
                await delayFunction(bufferDelay);
                break;

            case "3":
                codigo = "P10";
                quantidade = 10;
                socket.write("ADICIONAR" + codigo + " " + quantidade + "\r\n");
                await delayFunction(bufferDelay);
                break;

            case "4":
                codigo = "P10";
                socket.write("REMOVER" + codigo + "\r\n");
                await delayFunction(bufferDelay);
                break;

            case "0":
                socket.write("SAIR\r\n");
                break;

            default:
                console.log("Operação não disponível!")
        }

        console.log("Deseja prosseguir? S para SIM ou N para NÃO.")
        var x = console.log(prompt('Input'));
        if (x == 'N') valor = 0;
    }*/


}

const menu = async () => {
    console.log("\n\n*** SUPERMECADO DELIVERY ***\n");
    console.log("Selecione uma das opções abaixo: ");
    console.log("1 - LISTAR PRODUTOS DISPONÍVEIS");
    console.log("2 - LISTAR PRODUTOS NO CARRINHO");
    console.log("3 - ADICIONAR PRODUTOS AO CARRINHO");
    console.log("4 - REMOVER PRODUTOS DO CARRINHO");
    console.log("5 - PAGAR O PEDIDO");
    console.log("6 - SOLICITAR ENTREGA");
    console.log("0 - SAIR");
    return "1";
}

socket.connect(8100, "127.0.0.1", connectionListener);