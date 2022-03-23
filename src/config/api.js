
//-----------------BASE URL API
//LOCAL
const BASE_API = 'http://192.168.1.105:3000/';
//PRODUCTION ROSIVAN
// export const BASE_API = 'http://rosivancardoso.com.br/';

//PRODUCTION PROTEPI
//export const BASE_API = 'http://protepidelivery.com.br/';


//------------------ROUTES USERS

export const LOGIN_ROUTE = BASE_API + 'usuarios/autenticacao';
export const CHECK_EMAIL = BASE_API + 'usuarios/verificaemail';
export const REGISTER_USER = BASE_API + 'usuarios/cadastro';
export const NEW_PASSWORD = BASE_API + 'usuarios/mudaSenha';
export const CHECK_CURRENT_PASSWORD = BASE_API + 'usuarios/senhaatual';
export const UPDATE_USER = BASE_API + 'usuarios/update';

//ADRESS
export const DELETE_ADRESS = BASE_API + 'enderecos/remocao';
export const REGISTER_ADRESS = BASE_API + 'enderecos/cadastro';
export const UPDATE_ADRESS = BASE_API + 'enderecos/atualizacao';

//RECOVER PASSWORD
export const REGISTER_CODE_RECOVER_PASSWORD = BASE_API + 'recuperarsenha/cadastro';
export const CHECK_CODE_CONFIRMATION = BASE_API + 'recuperarsenha/busca';

//CART ITEMS
export const REGISTER_CART_ITEMS = BASE_API + 'itemcarrinhos/cadastro';
export const REGISTER_VERY_CART_ITEMS = BASE_API + 'itemcarrinhos/cadastromuitos';
export const DELETE_CART_ITEMS = BASE_API + 'itemcarrinhos/remove';
export const UPDATE_CART_ITEMS = BASE_API + 'itemcarrinhos/atualizacao';
export const SELECT_CART_ITEMS = BASE_API + 'itemcarrinhos/seleciona';

//CREATE CART
export const CREATE_CART = BASE_API + 'carrinhos/cadastro';

//------------------ROUTERS PRODUCTS
//VIEW ALL
export const PRODUCTS_ALL = BASE_API + 'lista/lojas';
export const PRODUCTS_ONE = BASE_API + 'produtos/buscarproduto/';
//BUY_ALL
export const REGISTER_BUY = BASE_API + 'compras/cadastro';
export const BUY_ALL = BASE_API + 'compras/seleciona';
export const SELECT_ONE_BUY = BASE_API + 'compras/seleciona/unica';

// BUY ITENS
export const REGISTER_VERY_BUY_ITEMS = BASE_API + 'itemcompras/cadastromuitos';
export const SELECT_BUY_ITEMS = BASE_API + 'itemcompras/seleciona';



//CATEGORIES
export const CATEGORIES_ALL = BASE_API + '/categorias/all/';

export const CATEGORIES_ONE = BASE_API + 'categorias/select/';

export const PRODUTO_LOJA = BASE_API + 'categorias/all/'


