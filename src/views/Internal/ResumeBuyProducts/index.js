import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {connect} from 'react-redux';
import axios from 'axios';

//API
import {SELECT_CART_ITEMS} from '../../../config/api';

//STYLE
import style from './style';

const ResumeBuyProducts = ({usuario, dispatch}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    itemsCarrinho();
  }, []);


  async function itemsCarrinho() {
    const resposta = await axios.post(SELECT_CART_ITEMS, {
      id_carrinho: usuario.carrinho.id,
    });

    let total = 0,
      listprodutos = [];
    resposta.data.item.forEach((item) => {
      listprodutos.push({...item.produto, unidades: item.quantidade});
      total += item.quantidade * item.produto.valor;
    });
    // total = total + parseFloat(modalidade.precoModalide);
    // setProdutos(listprodutos);
    // setTotalCarrinho(total);
    // setTotalCompra(total);
  }

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
  

  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor="#026AB6" barStyle="light-content" />
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
      
    </SafeAreaView>
  );
};

export default connect((state) => ({usuario: state.usuario}))(ResumeBuyProducts);
