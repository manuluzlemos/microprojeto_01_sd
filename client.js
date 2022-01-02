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

    socket.write("REMOVER P01\r\n");
    await delayFunction(bufferDelay);

    socket.write("CARRINHO\r\n");
    await delayFunction(bufferDelay);

    socket.write("ADICIONAR P33 4\r\n");
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
}

socket.connect(8100, "127.0.0.1", connectionListener);