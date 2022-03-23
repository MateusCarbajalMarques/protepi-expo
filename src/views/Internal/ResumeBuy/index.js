import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {RadioButton, Provider, TextInput} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {connect} from 'react-redux';
import CurrencyInput from 'react-native-currency-input';
import axios from 'axios';

//API
import {
  SELECT_CART_ITEMS,
  REGISTER_BUY,
  REGISTER_VERY_BUY_ITEMS,
} from '../../../config/api';

//STYLE
import style from './style';

//ASSETS
import Back from '../../../assets/icons/back.png';
import CartIcon from '../../../assets/icons/cart-icon.png';

//COMPONENTS
import Options from '../../../Components/ThreePoints';

// export default function ResumeBuy() {
function ResumeBuy({usuario, dispatch}) {
  const route = useRoute();
  const navigation = useNavigation();
  const [pagamento, setPagamento] = useState('');
  const [totalCarrinho, setTotalCarrinho] = useState(0.0);
  const [produtos, setProdutos] = useState([]);
  const [endereco, setEndereco] = useState(route.params.enderecoSelecionado);
  const [modalidade, setModalidade] = useState(route.params.modalidade);
  const [totalcompra, setTotalCompra] = useState();
  const [troco, setTroco] = useState(false);
  const [modal, setModal] = useState(false);

  const [carregado, setCarregado] = useState(false);

  const referencia_troco = createRef();

  let valortroco = 0;

  const adicionaZero = (numero) => (numero <= 9 ? '0' + numero : numero);
  let dataAtual = new Date();
  let diaAtual =
    adicionaZero(dataAtual.getDate().toString()) +
    '/' +
    adicionaZero(dataAtual.getMonth() + 1).toString() +
    '/' +
    dataAtual.getFullYear();
  let horaAtual =
    adicionaZero(dataAtual.getHours()) +
    ':' +
    adicionaZero(dataAtual.getMinutes()) +
    ':' +
    adicionaZero(dataAtual.getSeconds());

  useEffect(() => {
    itemsCarrinho();
  }, []);

  const moneyFormat = (value) =>
    parseFloat(value)
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  async function cadastrar() {
    // valortroco = parseFloat(valortroco);
    // se o usuário digitou alguma vírgula, ela vai ser trocada para ponto
    // e depois o valor convertido para float
    valortroco = parseFloat(String(valortroco).replace(',', '.'));

    if (pagamento !== '') {
      if (troco && valortroco === 0) {
        Alert.alert('Atenção', 'Informe um valor para lhe enviarmos o troco.');
        return;
      }

      if (troco && valortroco < totalcompra) {
        Alert.alert(
          'Atenção',
          'O valor precisa ser maior que o total da compra',
        );
        return;
      }

        // console.log('valor que a pessoa vai pagar');
        // console.log(valortroco);
        // return;

      console.log('\n\n\n\n\n\n\n\n\n\n\n\n\nDADOS QUE SERAO CADASTRADOS');
      const resposta = await axios.post(REGISTER_BUY, {
        id_usuario: usuario.id,
        pagamento_dinheiro: valortroco > 0 ? valortroco: null,
        troco: valortroco > 0 ? valortroco - totalcompra : null,
        total: totalcompra,
        data_status_pedido_realizado: diaAtual,
        hora_status_pedido_realizado: horaAtual,
        data_status_pedido_aceito: '',
        hora_status_pedido_aceito: '',
        data_status_pedido_cancelado: '',
        hora_status_pedido_cancelado: '',
        data_status_pedido_transporte: '',
        hora_status_pedido_transporte: '',
        data_status_pedido_entregue: '',
        hora_status_pedido_entregue: '',
        status_atual: 'Realizado',
        modalidade_frete: modalidade.tipoModalide,
        valor_frete: modalidade.precoModalide,
        forma_pagamento: '',
        taxa_pagamento: pagamento,
        estado: endereco.estado,
        cidade: endereco.cidade,
        bairro: endereco.bairro,
        rua: endereco.rua,
        numero: endereco.numero,
        complemento: endereco.complemento,
      });
      console.log(
        '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n DADOS QUE FORAM CADASTRADOS',
      );
      console.log(resposta.data);

      if (resposta.data.error == null) {
        // Alert.alert('Sucesso', 'Seja bem-vindo ao app.');
        console.log('compra id: ', resposta.data.compra.id);
        console.log('Itens: \n', produtos);
        const respostaItensCarrinho = await axios.post(
          REGISTER_VERY_BUY_ITEMS,
          {
            id_compra: resposta.data.compra.id,
            id_carrinho: usuario.carrinho.id,
            itens: produtos,
          },
        );

        if (respostaItensCarrinho.data.error == null) {
          navigation.navigate('HistoricoPedidos', {vindo: 'resumebuy'});
        } else {
          Alert.alert('Erro', 'Erro ao criar itens na compra');
        }
      } else {
        Alert.alert('Atenção', 'Falha ao cadastrar, tente novamente.');
      }
    } else {
      Alert.alert('Modo de Pagamento', 'Escolha uma opção.');
    }
  }

  async function itemsCarrinho() {
    setCarregado(false);
    const resposta = await axios.post(SELECT_CART_ITEMS, {
      id_carrinho: usuario.carrinho.id,
    });

    let total = 0,
      listprodutos = [];
    resposta.data.item.forEach((item) => {
      listprodutos.push({...item.produto, unidades: item.quantidade});
      total += item.quantidade * item.produto.valor;
    });
    total = total + parseFloat(modalidade.precoModalide);
    setProdutos(listprodutos);
    setTotalCarrinho(total);
    setTotalCompra(total);
    setCarregado(true);
  }

  const handleTotalCompra = (pagamento) => {
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\ntotal compra: ');
    console.log(moneyFormat(parseFloat(totalCarrinho) + parseFloat(pagamento)));
    setTotalCompra(parseFloat(totalCarrinho) + parseFloat(pagamento));
    if (pagamento === '0') {
      setTroco(true);
      // setModal(true);
    } else {
      if (troco) {
        // setModal(false);
        setTroco(false);
      }
    }
  };

  const renderProducts = ({item}) => {
    return (
      <View style={[style.produt, {width: '100%'}]}>
        <Image style={style.productImage} source={{uri: item.foto}} />
        <View style={style.productInfo}>
          <Text style={style.productName}>{String(item.nome)}</Text>
          <View style={style.subProductInfo}>
            <Text style={style.productPrice}>
              R${' '}
              {moneyFormat(parseFloat(item.valor) * parseFloat(item.unidades))}
            </Text>
            <Text style={style.productAmount}>{item.unidades} unidade (s)</Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Product')}> */}
            {/* <Text style={style.details}>Mais Detalhes</Text> */}
            {/* </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  };
  function valor(x) {
    valortroco = x;
    console.log(valortroco);
  }

  const Campovalor = () => {
    if (troco) {
      useEffect(()=> {
        referencia_troco.current.focus();
      }, []);

      return (
        <View>
          <Text style={[style.textModality, style.textValor]}>Troco para</Text>
          <TextInput
            style={style.inputValor}
            label="Valor"
            mode="flat"
            theme={{
              colors: {
                primary: '#899DAC',
                background: 'transparent',
                text: '#373739',
              },
            }}
            ref={referencia_troco}
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            onChangeText={(x) => valor(x)}
          />
        </View>
      );
    } else {
      return (
        <View>
          <></>
        </View>
      );
    }
  };

  function ModalPicture() {
    return (
      <View style={[style.backModalPicture, style.container]}>
        <View style={style.body}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={produtos}
            keyExtractor={(item) => String(item.id)}
            ListHeaderComponent={() => (
              <View style={style.group}>
                <Text style={style.textModality}>Produtos</Text>
              </View>
            )}
            renderItem={renderProducts}
            ListEmptyComponent={() => (
              <View>
                <Text style={style.noAdress}>Erro ao carregar produtos</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      {modal ? <ModalPicture /> : <></>}
      {
        carregado ?
          <Provider>
            <View style={style.headerModel}>
              <View style={style.identifyScreen}>
                <TouchableOpacity
                  style={style.tochBack}
                  onPress={() => navigation.goBack()}>
                  <Image
                    style={style.iconModelTitle}
                    source={Back}
                    resizeMode="contain"
                  />
                  <Text style={style.action}>Voltar</Text>
                </TouchableOpacity>
              </View>
              <Options />
            </View>
            <View style={style.body}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={produtos}
                keyExtractor={(item) => String(item.id)}
                ListHeaderComponent={() => (
                  <View style={style.group}>
                    <Text style={style.textModality}>Produtos</Text>
                  </View>
                )}
                renderItem={renderProducts}
                ListFooterComponent={() => (
                  <View>
                    <Text style={style.textModality}>Entregar em</Text>
                    <Text style={style.texConteudo}>
                      {endereco.rua}, {endereco.numero}, {endereco.bairro},{' '}
                      {endereco.complemento ? endereco.complemento + ', ' : ''}
                      {endereco.cidade}, {endereco.estado}
                    </Text>
                    <Text style={style.textModality}>Modalidade de entrega</Text>
                    <Text style={style.texConteudo}>{modalidade.tipoModalide}</Text>

                    <Text style={style.textModality}>Valores</Text>
                    <View style={style.spaceBetween}>
                      <Text style={style.texConteudo}>Produtos</Text>
                      <Text style={style.texConteudo}>
                        R${' '}
                        {moneyFormat(
                          parseFloat(totalCarrinho) -
                            parseFloat(modalidade.precoModalide),
                        )}
                      </Text>
                    </View>

                    <View style={style.spaceBetween}>
                      <Text style={style.texConteudo}>Frete</Text>
                      <Text style={style.texConteudo}>
                        R$ {moneyFormat(parseFloat(modalidade.precoModalide))}
                      </Text>
                    </View>

                    <View style={style.pagamento}>
                      <View style={style.viewTitlePagamento}>
                        <View style={style.lineBlue}></View>
                        <Text style={style.texTitle}>PAGAMENTO</Text>
                        <View style={style.lineBlue}></View>
                      </View>

                      <RadioButton.Group
                        onValueChange={(pagamento) => {
                          handleTotalCompra(pagamento);
                          setPagamento(pagamento);
                        }}
                        value={pagamento}>
                        <View style={style.spaceBetween}>
                          <View style={style.spaceBetween}>
                            <RadioButton
                              value="0"
                              color="#3AABFD"
                              uncheckedColor="#3AABFD"
                            />
                            <Text style={style.textRadio}>Dinheiro</Text>
                          </View>
                          <Text style={style.textRadio}>Sem taxa</Text>
                        </View>

                        <View style={style.spaceBetween}>
                          <View style={style.spaceBetween}>
                            <RadioButton
                              value="2.00"
                              color="#3AABFD"
                              uncheckedColor="#3AABFD"
                            />
                            <Text style={style.textRadio}>Cartão de Crédito</Text>
                          </View>
                          <Text style={style.textRadio}>Taxa R$ 2,00</Text>
                        </View>

                        <View style={style.spaceBetween}>
                          <View style={style.spaceBetween}>
                            <RadioButton
                              value="1.00"
                              color="#3AABFD"
                              uncheckedColor="#3AABFD"
                            />
                            <Text style={style.textRadio}>Cartão de Débito</Text>
                          </View>
                          <Text style={style.textRadio}>Taxa R$ 1,00</Text>
                        </View>

                        <Campovalor />

                        <Text style={style.textNote}>
                          Nota: pagamento no momento da entrega do produto
                        </Text>
                      </RadioButton.Group>
                    </View>
                  </View>
                )}
                ListEmptyComponent={() => (
                  <View>
                    <Text style={style.noAdress}>Erro ao carregar produtos</Text>
                  </View>
                )}
              />
            </View>

            <View style={style.viewFixed}>
              <View style={style.datesBuy}>
                <Text style={style.textDefaultButton}>VALOR TOTAL DA COMPRA</Text>
                <Text style={style.textDefaultButton}>
                  R$ {moneyFormat(parseFloat(totalcompra))}
                </Text>
              </View>

              <TouchableOpacity
                style={style.button}
                onPress={cadastrar}
                activeOpacity={0.5}>
                <Text style={style.textDefaultButton}>FINALIZAR COMPRA</Text>
              </TouchableOpacity>
            </View>
          </Provider>
        :
          <View
            style={{
              flex :1,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent :'center',
            }}
          >
            <ActivityIndicator size="large" color="#1389DF" />
          </View>
      }
    </SafeAreaView>
  );
}

export default connect((state) => ({usuario: state.usuario}))(ResumeBuy);
