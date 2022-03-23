import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import axios from 'axios';

//API
import {
  PRODUCTS_ALL,
  CATEGORIES_ALL,
  CATEGORIES_ONE,
} from '../../../config/api';

//ASSETS
import Logo from '../../../assets/icons/logo.png';
import Carr from '../../../assets/icons/carr.png';
import Glass from '../../../assets/icons/glass.png';


//COMPONENTS
import Options from '../../../Components/ThreePoints';

import CarouselCards from './components/CarouselCards';

export default function Home() {
  const navigation = useNavigation();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [buscarcategorias, setBuscarCategorias] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [p, setP] = useState(0);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    carregamento();
  }, []);

  async function carregamento() {
    listaProdutos();
    listaCategorias();
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    carregamento().then(() => setRefreshing(false));
  }, []);

  const listaProdutos = async () => {
    setCarregado(false);
    const resposta = await axios.get(PRODUCTS_ALL);
    if (resposta.data.error == null) {
      const {loja} = resposta.data;
      setProdutos(loja);
      setCarregado(true);
    } else {
      Alert.alert('Erro', 'Algo deu errado ao buscar Loja.');
    }
    console.log(loja);
  };

  const moneyFormat = (value) =>
    parseFloat(value)
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  const listaCategorias = async () => {
    setCarregado(false);
    const resposta = await axios.get(CATEGORIES_ALL);
    if (resposta.data.error == null) {
      const {categorias} = resposta.data;
      setCategorias(categorias);
      setCarregado(true);
    } else {
      Alert.alert('Erro', 'Algo deu errado ao buscar produtos.');
    }
  };

  async function buscarcategoriaselecionada(categoria) {
    setCarregado(false)
    const resposta = await axios.post(CATEGORIES_ONE, {
      id: categoria,
    });

    if (resposta.data.error == null) {
      setBuscarCategorias(resposta.data.categorias);
      setProdutos(resposta.data.categorias[0].produto);
      setCarregado(true)
    } else {
      Alert.alert('Erro', 'Algo deu errado ao buscar produtos.');
    }
  }

  const carregarCategorias = (categoria) => {
    buscarcategoriaselecionada(categoria);
  };

  // const scrollToItem = (i=0) => {
  //  flatList.current.scrollToIndex({ animated: true, index: i });
  // };

  const renderCategorias = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            carregarCategorias(item.id);
            setP(index);
          }}
          // style={style.produtHome}
        >
          <Text
            style={[
              style.categorias,
              Object.entries(buscarcategorias).length > 0
                ? buscarcategorias[0].id == item.id
                  ? style.categoriaSelected
                  : ''
                : '',
            ]}>
            {item.nome}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const carregarTudo = () => {
    listaProdutos();
    setBuscarCategorias([]);
  };

  const renderProducts = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Home', {
          item
        })}
        style={style.produtHome}>
        <Image style={style.productImageHome} source={{uri: item.foto}} />
        <View style={style.productInfoHome}>
          <View style={style.subProductInfo}>
            <Text style={style.productPrice}>{String(item.razao_social)}</Text>
          </View>
          <Text style={style.productName}>{String(item.endereco)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <Provider>
        <View style={style.headerModel}>
          <Image
            style={style.imageModelTitle}
            source={Logo}
            resizeMode="contain"
          />

          <View style={style.subHeaderModel}>
            <TouchableOpacity onPress={() => navigation.navigate('Cart', {tela : 'home'})}>
              <Image
                style={style.imageModelTitle}
                source={Carr}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Options />
          </View>
        </View>

        <TouchableOpacity
          style={style.compSearch}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('SearchProduct')}>
          <View style={style.inputSearch}>
            <Text style={style.textInputSearch}>Buscar por Lojas</Text>
            <Image
              style={style.iconModelTitle}
              source={Glass}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        <View style={style.productList}>
          {
            carregado == true ?
              <FlatList
                numColumns="2"
                data={produtos}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderProducts}
                ListHeaderComponent={() => (
                  <View>
                    <View>
                      <CarouselCards />
                    </View>
                  </View>
                )}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#1389DF', '#1389DF', '#1389DF']}
                  />
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
        </View>
      </Provider>
    </SafeAreaView>
  );
}
