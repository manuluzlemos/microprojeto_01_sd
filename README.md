# Microprojeto 01 - Sistemas Distribuídos 2021.2

***Emanuelle da Luz Lemos***


### **Descrição:**

Implementação de um serviço de supermercado delivery com a API de *Sockets* do Node.js para fins de comunicação entre um cliente e o servidor.


### **Funcionalidades obrigatórias:**

* Listar os produtos disponíveis:
    - listar o código, a descrição e o preço os produtos cadastrados em db.json.
* Adicionar produto ao carrinho:
    - ao adicionar, deve-se fornecer o código do produto e a quantidade de itens do produto.
* Remover produto do carrinho:
    - remover com base no código do produto.
* Pagar o pedido:
    - fornece o total pago;
    - remove itens do carrinho;
    - insere o código, o valor total do pedido e quantidade de produtos em uma lista para posterior solicitação de entrega.
* Solicitar entrega:
    - solicitar a entrega de pedido existentes na lista de pedidos.


### **Funcionalidades extras:**

* Listar os produtos disponíveis do carrinho:
    - listar o código, a descrição, a quantidade e o preço dos produtos do carrinho;
    - apresentar o preço total dos produtos do carrinho.
* Listar os pedidos realizados:
    - listar o código do pedido, o preço total, a quantidade de produtos e o status de entrega.

