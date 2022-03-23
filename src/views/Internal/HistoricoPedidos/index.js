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
  RefreshControl
} from 'react-native';
import {useNavigation, useRoute, useFocusEffect} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import axios from 'axios';
import {connect} from 'react-redux';

//API
import {BUY_ALL} from '../../../config/api';

//STYLE
import style from './style';

//ASSETS
import Back from '../../../assets/icons/back.png';
import Frete from '../../../assets/images/delivery.png';
import Options from '../../../Components/ThreePoints';

const HistoricoPedidos = ({usuario, dispatch}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [compras, setCompras] = useState([]);
  const [carregado, setcarregado] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    listaCompras();
  }, []);

  useFocusEffect(
		useCallback(() => {
      const onBackPress = () => {
        if(route.params.vindo === 'resumebuy') {
          navigation.navigate('Home')
        }else{
          navigation.goBack();
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);

		}, []),
	);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    listaCompras().then(() => setRefreshing(false));
  }, []);

  const moneyFormat = (value) =>
    parseFloat(value)
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  async function listaCompras() {
    setcarregado(false);
    const resposta = await axios.post(BUY_ALL, {
      id_usuario: usuario.id,
    });
    if (resposta.data.error === null) {
      setCompras(resposta.data.compras);
      setcarregado(true);
    }
  }

  const renderCompras = ({item}) => {
    return (
      <View>
          <TouchableOpacity onPress={() => navigation.navigate('OrderData', { item })}>
          <View style={style.produt}>
            <View>
              <Image
                style={style.productImage}
                source={Frete}
                resizeMode="contain"
              />
            </View>
            <View style={style.productInfo}>
              <Text style={style.productName}>N° pedido 000{item.id}</Text>
              <Text style={style.productName2}>{item.status_atual}</Text>
              <Text style={style.productName}>R$ {moneyFormat(item.total)} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <Provider>
        {
          carregado ?
            <FlatList
              data={compras}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderCompras}
              ListHeaderComponent={() => (
                <View style={style.headerModel}>
                  <View style={style.identifyScreen}>
                  <TouchableOpacity onPress={() => {
                    if(route.params.vindo === 'resumebuy') {
                      navigation.navigate('Home')
                    }else{
                      navigation.goBack();
                    }
                  } }>
                    <Image
                      style={style.iconModelTitle}
                      source={Back}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                    <Text style={style.texTitle}>Meus pedidos</Text>
                  </View>
                  <Options />
                </View>
              )}
              ListEmptyComponent={() => (
                <View>
                  <Text style={style.noDates}>
                    Você ainda não realizou nenhuma compra. :(
                  </Text>
                </View>
              )}
              refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#1389DF", "#1389DF", "#1389DF"]} />
                }
            />
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
      </Provider>
    </SafeAreaView>
  );
};

export default connect((state) => ({usuario: state.usuario}))(HistoricoPedidos);
