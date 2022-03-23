import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Alert,
} from 'react-native';
import style from './style';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import axios from 'axios';

//API
import {DELETE_CART_ITEMS, SELECT_CART_ITEMS} from '../../../config/api';

//ASSETS
import Back from '../../../assets/icons/back.png';

//COMPONENTS
import Options from '../../../Components/ThreePoints';

function Cart({usuario, carrinho, dispatch}) {
  const navigation = useNavigation();
  const route = useRoute();
  const [listaProdutos, setListaProdutos] = useState([]);
  const [totalCarrinho, setTotalCarrinho] = useState(0.0);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    origemCarrinho();
    navigation.addListener('focus', () => setLoad(!load));
  }, [load, navigation]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // navigation.navigate('Home');
        if (route.params.tela === 'product') {
          navigation.goBack();
        } else {
          navigation.navigate('Home');
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  async function origemCarrinho() {
    // se usuário estiver logado
    if (Object.entries(usuario).length > 0) {
      console.log('Veio do banco');
      const resposta = await axios.post(SELECT_CART_ITEMS, {
        id_carrinho: usuario.carrinho.id,
      });

      if (resposta.data.error == null) {
        let total = 0,
          produtos = [];
        resposta.data.item.forEach((item) => {
          produtos.push({...item.produto, unidades: item.quantidade});
          total += item.quantidade * item.produto.valor;
        });
        setListaProdutos(produtos);
        setTotalCarrinho(total);
      }
    } else {
      console.log('Veio do redux');
      setListaProdutos(carrinho.produtos);
      setTotalCarrinho(carrinho.total);
    }
  }

  function VerificaLogin() {
    if (Object.entries(usuario).length > 0) {
      navigation.navigate('Delivery');
    } else {
      navigation.navigate('Login');
    }
  }

  function tiraProdutoCarrinho(id) {
    return {
      type: 'REMOVER_PRODUTO',
      payload: id,
    };
  }

  async function removerProdutoCarrinho(id) {
    if (Object.entries(usuario).length > 0) {
      const resposta = await axios.post(DELETE_CART_ITEMS, {
        id_carrinho: usuario.carrinho.id,
        id_produto: id,
      });

      if (resposta.data.error == null) {
        console.log('Produto de id ' + id + ' removido');
      } else {
        console.log('erro ao atualizar item ao removido');
      }
    } else {
      dispatch(tiraProdutoCarrinho(id));
    }
    setLoad(!load);
  }

  const moneyFormat = (value) =>
    parseFloat(value)
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  const totalPrice = (value, amount) =>
    moneyFormat(parseFloat(value) * parseInt(amount));

  function renderListProducts({item}) {
    return (
      <View style={style.produt}>
        <Image style={style.productImage} source={{uri: item.foto}} />
        <View style={style.productInfo}>
          <Text style={style.productName}>{String(item.nome)}</Text>

          <View style={style.subProductInfoP}>
            <Text style={style.productPrice}>
              R$ {totalPrice(item.valor, item.unidades)}
            </Text>
            <Text style={style.productAmount}>{item.unidades} unidade (s)</Text>
          </View>

          <View style={style.subProductInfoP}>
            <TouchableOpacity onPress={() => removerProdutoCarrinho(item.id)}>
              <Text style={[style.action, style.remove]}>Remover</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.push('Product', {item})}>
              <Text style={[style.action, style.change]}>Alterar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      <Provider>
        <View style={style.headerModel}>
          <View style={style.identifyScreen}>
            <TouchableOpacity
              style={style.tochBack}
              onPress={() => {
                if (route.params.tela === 'product') {
                  navigation.goBack();
                } else {
                  navigation.navigate('Home');
                }
              }}>
              <Image
                style={style.iconModelTitle}
                source={Back}
                resizeMode="contain"
              />
              <Text style={style.action}>Voltar</Text>
            </TouchableOpacity>
            {/* <Text style={style.texTitle}>Carrinho</Text> */}
          </View>
          <Options />
        </View>

        <View style={style.productList}>
          <FlatList
            data={listaProdutos}
            keyExtractor={(item, index) => String(index)}
            renderItem={renderListProducts}
            ListEmptyComponent={() => (
              <View style={style.emptyCart}>
                <Text style={[style.productName, style.emptyCartText]}>
                  Carrinho vazio
                </Text>
              </View>
            )}
          />
        </View>
      </Provider>
      {totalCarrinho != 0 ? (
        <View>
          <View style={style.infoPreco}>
            <Text style={style.textInfoTitle}>VALOR TOTAL DA COMPRA</Text>
            <Text style={style.textInfoBoby}>
              R$ {moneyFormat(totalCarrinho)}
            </Text>
          </View>

          <TouchableOpacity
            style={[style.continuarComprando, style.datesBuyMod]}
            onPress={() => navigation.navigate('Home')}>
            <Text style={style.textDefaultButton}>CONTINUAR COMPRANDO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.defaultButtonFixedEnd}
            activeOpacity={0.5}
            onPress={VerificaLogin}>
            <Text style={style.textDefaultButton}>
              AVANÇAR PARA FINALIZAR COMPRA
              {/* <Icon name="arrow-forward" size={20} color="#fff" /> */}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}

export default connect((state) => ({
  usuario: state.usuario,
  carrinho: state.carrinho,
}))(Cart);
