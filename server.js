const net = require('net');
const dotenv = require('dotenv');
const fs = require('fs');

const databaseFile = "./db.json";
const database = JSON.parse(fs.readFileSync(databaseFile, 'utf8'));

dotenv.config();

NUM_PORTA = process.env.PORT || 3333;


const carrinho = [];
const pedidos = [];

//Criar o objeto servidor e registrar a função principal de manipulação da conexão
const server = net.createServer(connectionListener);

server.listen(NUM_PORTA, "0.0.0.0", () => {
    console.log(`Servidor iniciado na porta ${NUM_PORTA}.`);
});

function connectionListener(socket){
    socket.on("data", (data) => {
        const dataString = data.toString().trim();
        const params = dataString.split(" ");

        console.log(params);
        
        switch(params[0]){
            case "LISTAR": //Listar produtos disponíveis
                let result = "";
                for (const key in database) {
                    result += key + ' - ' + database[key].descript + ' - R$ ' + database[key].price.toFixed(2) + '\n';
                }

                socket.write(result + "\n");
                break;

            case "CARRINHO": //Listar produtos do carrinho
                let result2 = "**CARRINHO DE COMPRAS**\n";       
                let preco_total = 0;    

                carrinho.forEach((item) => {
                    let produto = database[item.codigo];
                
                    result2 += `\n--------------------------------------\n| Código: ${item.codigo}  -  Item: ${produto.descript}  -  Preço: R$ ${produto.price.toFixed(2)}  -  Quantidade: ${item.quantidade}`;
                    preco_total += (parseFloat(item.quantidade) * parseFloat(produto.price));
                });

                result2 += `\n--------------------------------------\n| TOTAL: R$ ${preco_total.toFixed(2)}\n--------------------------------------`;

                socket.write(result2 + "\n");
                break;
            
            case "ADICIONAR": //Adicionar produtos ao carrinho
                if(params[1] in database){
                    carrinho.push({
                        codigo: params[1],
                        quantidade: params[2]
                    });
                    socket.write("O produto " + params[1] + " adiconado!\n");
                }else{
                    socket.write("O produto " + params[1] + " não existe!\n");
                }
                break;
            
            case "REMOVER": //Remover produtos do carrinho
                for(let i = 0; i < carrinho.length; i++){
                    if(carrinho[i].codigo === params[1]){
                        carrinho.splice(i, 1);
                    }
                }   
                
                socket.write("Produto " + params[1] + " removido\n");
                break;
            
            case "PAGAR": //Pagar pedido
                let preco_total2 = 0;    
                carrinho.forEach((item) => {
                    let produto = database[item.codigo];
                    preco_total2 += (parseFloat(item.quantidade) * parseFloat(produto.price));
                });

                pedidos.push({
                    codigo: "C"+(pedidos.length+1),
                    valor: preco_total2,
                    status_entrega: false,
                    produtos: carrinho.length
                });

                carrinho.length = 0;     

                socket.write("Pagamento de R$ " + preco_total2.toFixed(2) +" efetuado para o pedido "+ pedidos[pedidos.length-1].codigo +"!\n");
                break;

            case "PEDIDO": //Listar os pedidos realizados pelo cliente
                let result3 = "**PEDIDOS REALIZADOS**\n";       

                pedidos.forEach((pedido) => {
                    let status = pedido.status_entrega === true ? 'Solicitada' : 'Não Solicitada';
                    result3 += `\n--------------------------------------\n| Código: ${pedido.codigo}  -  Produtos: ${pedido.produtos}  -  Valor: R$ ${pedido.valor.toFixed(2)}  -  Status da entrega: ${status}`;
                });

                result3 += `\n--------------------------------------`;

                socket.write(result3 + "\n");
                break;
            
            case "ENTREGA": //Remover produtos do carrinho
                for(let i = 0; i < pedidos.length; i++){
                    if(pedidos[i].codigo === params[1]){
                        pedidos[i].status_entrega = true;
                    }
                }
                    
                socket.write("Solicitação de entrega para o pedido " + params[1] + " confirmada!\n");
                break;
            
            
            case "SAIR":
                socket.end();
                break;
            
            default:
                socket.write("-ERRO Comando não reconhecido!")

        }
    });
}