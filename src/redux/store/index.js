import { createStore } from 'redux';

const INITIAL_STATE = {
    usuario: {},

    carrinho: {
        produtos: [],
        total: 0,
    },
}

function reducer(state = INITIAL_STATE, action) {

    if(action.type === 'SET_USUARIO')
	{
		return { ...state, usuario: action.usuario };
    }

    if(action.type === 'ATUALIZA_USUARIO') {
        state.usuario.nome = action.usuario.nome;
        state.usuario.email = action.usuario.email;
        state.usuario.data_nascimento = action.usuario.data_nascimento;
        state.usuario.senha = action.usuario.senha;
        console.log(action.usuario);
        return { ...state };
    }

    if(action.type === 'SAIR_CONTA')
	{
        state.usuario = {};
        state.carrinho.produtos = [];
        state.carrinho.total =  0;
		return { ...state};
    }

    if (action.type === 'CADASTRO_ENDERECO') {
        state.usuario.endereco.push({ ...action.endereco });
        return { ...state };
    }

    if (action.type == 'ATUALIZAR_ENDERECO') {
        state.usuario.endereco.filter(item => {
            if (item.id == action.endereco.id) {
                item.estado = action.endereco.estado;
                item.cidade = action.endereco.cidade;
                item.bairro = action.endereco.bairro;
                item.rua = action.endereco.rua;
                item.numero = action.endereco.numero;
                item.complemento = action.endereco.complemento;
                console.log(item);
            }
            return state.usuario.endereco;
        });
        return { ...state };
    }

    if (action.type == 'REMOVER_ENDERECO') {
        for(let posicao = 0; posicao < state.usuario.endereco.length; posicao++) {
            if (state.usuario.endereco[posicao].id == action.id) {
                state.usuario.endereco.splice(posicao, 1);
                break;
            }
        }
        console.log(state.usuario.endereco)
        return {...state}
    }

    if(action.type === 'SET_CARRINHO'){
        action.itens.forEach((item) => {
          state.carrinho.produtos.push({ ...item.produto, unidades: item.quantidade });
          state.carrinho.total +=  (item.quantidade * item.produto.valor)
        });

        console.log(state.carrinho.produtos)

		return { ...state, carrinho: {
            produtos: state.carrinho.produtos,
            total : state.carrinho.total
        }};
    }

    if (action.type == 'ADICIONAR_PRODUTO') {

        let repetido = false; // variável de controle para indicar se o produto já esta no carrinho de produtos (true) ou não (false)

        // filtrando o carrinho de produtos
        state.carrinho.produtos.filter(item => {
            // item.id = id do produto do carrinho
            // action.payload.item.id = id do produto recebido
            if (item.id == action.payload.item.id) {
                // aumenta apenas a quantidade do item
                item.unidades = action.payload.quantidade + item.unidades;
                repetido = true; // indica que o produto recebido já estava no carrinho
            }
            return state.carrinho.produtos;
        });

        // verifica se for a primeira inserção ou se o produto recebido não está repetido
        if(state.carrinho.total == 0 || repetido == false) {
            state.carrinho.produtos.push({ ...action.payload.item, unidades: action.payload.quantidade });
        }

        state.carrinho.total = state.carrinho.total + (action.payload.item.valor * action.payload.quantidade);

        console.log("Total do carrinho", state.carrinho.total);

        return {
            ...state, carrinho: {
                ...state.carrinho,
                produtos: state.carrinho.produtos,
                total: state.carrinho.total,
            }
        };
    }

    if (action.type == 'ATUALIZAR_PRODUTO') {

        // filtrando o carrinho de produtos
        state.carrinho.produtos.filter(item => {
            // item.id = id do produto do carrinho
            // action.payload.item.id = id do produto recebido
            if (item.id == action.payload.item.id) {
                // remove o valor do item com a quantidade antiga do carrinho
                state.carrinho.total = state.carrinho.total - (item.valor * item.unidades);
                // altera apenas a quantidade do item pela quantidade recebida
                item.unidades = action.payload.quantidade;
            }
            return state.carrinho.produtos;
        });

        state.carrinho.total = state.carrinho.total + (action.payload.item.valor * action.payload.quantidade);

        console.log("Total do carrinho", state.carrinho.total);

        return {
            ...state, carrinho: {
                ...state.carrinho,
                produtos: state.carrinho.produtos,
                total: state.carrinho.total,
            }
        };
    }

    if (action.type == 'REMOVER_PRODUTO') {

        for(let posicao = 0; posicao < state.carrinho.produtos.length; posicao++) {
            if (state.carrinho.produtos[posicao].id == action.payload) {
                state.carrinho.total = state.carrinho.total - (state.carrinho.produtos[posicao].valor * state.carrinho.produtos[posicao].unidades);
                // Remoção do produto do carrinho conforme sua posição
                state.carrinho.produtos.splice(posicao, 1);
                break;
            }
        }

        console.log("Total do carrinho: ", state.carrinho.total);

        return {
            ...state, carrinho: {
                produtos: state.carrinho.produtos,
                total: state.carrinho.total,
            }
        }
    }

    if (action.type == 'LIMPA_CARRINHO') {
        state.carrinho.produtos = [];
        state.carrinho.total =  0;
		return { ...state};
    }

    return state;
}

const store = createStore(reducer);

export default store;