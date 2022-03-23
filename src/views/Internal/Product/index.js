import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Menu, Provider} from 'react-native-paper';
import {connect} from 'react-redux';
import axios from 'axios';
import {REGISTER_CART_ITEMS, UPDATE_CART_ITEMS} from '../../../config/api';

//STYLE
import style from './style';
//ASSETS
import Back from '../../../assets/icons/back.png';

import Carr from '../../../assets/icons/carr.png';

//COMPONENTS
import Options from '../../../Components/ThreePoints';

function Product({usuario, carrinho, dispatch}) {
  const route = useRoute();
  const navigation = useNavigation();
  const [item, setItem] = useState(route.params.item);
  const [quantidade, setQuantidade] = useState(
    item.unidades ? item.unidades : 1,
  );
  const [total, setTotal] = useState(0.0);

  console.log(item);

  useEffect(() => {
    setTotal(quantidade * item.valor);
  }, [quantidade]);

  function adicionarProduto() {
    return {
      type: 'ADICIONAR_PRODUTO',
      payload: {item: item, quantidade: quantidade},
    };
  }

  function atualizaProdutoCarrinho(id) {
    return {
      type: 'ATUALIZAR_PRODUTO',
      payload: {item: item, quantidade: quantidade},
    };
  }

  function verificaQuantidadeEstoque(acao) {
    const quantidadeCarrinho = item.unidades ? item.unidades : 0;
    if (acao === 'adicao') {
      if (quantidade < item.quantidade - quantidadeCarrinho) {
        // muda o sinal aqui
        return true;
      } else {
        Alert.alert(
          'Quantidade indisponível',
          'A quantidade que você solicitou excede a quantidade no estoque atual do produto.',
        );
        return false;
      }
    } else {
      if (quantidade <= item.quantidade - quantidadeCarrinho) {
        // muda o sinal aqui
        return true;
      } else {
        Alert.alert(
          'Quantidade indisponível',
          'A quantidade que você solicitou excede a quantidade no estoque atual do produto.',
        );
        return false;
      }
    }
  }

  const aumentaQuantidade = () => {
    console.log(quantidade);

    if (verificaQuantidadeEstoque('adicao')) {
      setQuantidade(quantidade + 1);
    }
  };
  const diminuiQuantidade = () =>
    quantidade > 1 && setQuantidade(quantidade - 1);
  const moneyFormat = (value) =>
    parseFloat(value)
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  async function adiciona() {
    if (verificaQuantidadeEstoque('compra')) {
      // se não existe é tela de adição, se não é de atualização
      if (!item.unidades) {
        // se usuário estiver logado
        if (Object.entries(usuario).length > 0) {
          const resposta = await axios.post(REGISTER_CART_ITEMS, {
            id_carrinho: usuario.carrinho.id,
            id_produto: item.id,
            quantidade,
          });

          if (resposta.data.error == null) {
            console.log('Produto de id ' + item.id + ' criado');
            navigation.navigate('Cart', {tela: 'add'});
            // Alert.alert("Sucesso", "Produto adicionado ao carrinho!");
          } else {
            console.log('erro ao cadastrar item ao carrinho');
            Alert.alert(
              'Erro',
              'Não foi possível adicionar produto ao carrinho',
            );
          }
        } else {
          dispatch(adicionarProduto());
          navigation.navigate('Cart', {tela: 'add'});
          // Alert.alert("Sucesso", "Produto adicionado ao carrinho!");
        }
      } else {
        // se usuário estiver logado
        if (Object.entries(usuario).length > 0) {
          const resposta = await axios.post(UPDATE_CART_ITEMS, {
            id_carrinho: usuario.carrinho.id,
            id_produto: item.id,
            quantidade,
          });

          if (resposta.data.error == null) {
            console.log('Produto de id ' + item.id + ' atualizado');
            Alert.alert('Sucesso', 'Produto atualizado no carrinho!');
          } else {
            console.log('erro ao atualizar item ao carrinho');
            Alert.alert(
              'Erro',
              'Não foi possível atualizar produto do carrinho',
            );
          }
        } else {
          dispatch(atualizaProdutoCarrinho());
          Alert.alert('Sucesso', 'Produto atualizado no carrinho!');
        }
        navigation.goBack();
      }
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <Provider>
        <View style={style.headerModel}>
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

          <View style={style.subHeaderModel}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart', {tela: 'product'})}>
              <Image
                style={style.imageModelTitle}
                source={Carr}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Options />
          </View>
        </View>
        <ScrollView>
          <View style={style.subContainer}>
            <Image
              style={style.productImage}
              // source={require("../../../assets/images/photo-max.png")}
              source={{uri: item.foto}}
            />

            <Text style={style.productName}>{item.nome}</Text>

            <Text style={style.productPrice}>R$ {moneyFormat(item.valor)}</Text>

            <Text style={style.sectionTitle}>Descrição</Text>

            <Text style={style.sectionText}>- {String(item.detalhes)}</Text>

            {/* <Text style={style.sectionTitle}>
							Comentários
						</Text>

						<Text style={style.sectionText}>
							<Text style={style.sectionTitle}>Roberto Aguiar: </Text>
							Produto de ótima qualidade!
						</Text>

						<Text style={style.sectionText}>
							<Text style={style.sectionTitle}>Marcos Rodrigues: </Text>
							Produto de excelentíssima qualidade e entrega de acordo com prazo estipulado!
						</Text> */}

            <View style={style.productQuantity}>
              <TouchableOpacity style={style.productQuantityButton}>
                <Text
                  style={style.productQuantitySignals}
                  onPress={diminuiQuantidade}>
                  -
                </Text>
              </TouchableOpacity>

              <Text style={style.productQuantityText}>{quantidade}</Text>

              <TouchableOpacity style={style.productQuantityButton}>
                <Text
                  style={style.productQuantitySignals}
                  onPress={aumentaQuantidade}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Provider>
      <TouchableOpacity
        style={style.defaultButtonFixedEnd}
        activeOpacity={0.5}
        onPress={adiciona}>
        <Text style={style.textDefaultButton}>
          {item.unidades ? 'ALTERAR NO CARRINHO' : 'ADICIONAR AO CARRINHO'}
        </Text>
        <Text style={style.textDefaultButton}>R$ {moneyFormat(total)}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default connect((state) => ({
  usuario: state.usuario,
  carrinho: state.carrinho,
}))(Product);
