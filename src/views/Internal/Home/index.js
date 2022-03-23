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
import {useNavigation, useRoute} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import axios from 'axios';

//API
import {
  PRODUCTS_ONE,
  CATEGORIES_ALL,
  CATEGORIES_ONE,
  PRODUCTS_ALL,
  PRODUTO_LOJA
} from '../../../config/api';

//ASSETS
import Logo from '../../../assets/icons/logo.png';
import Carr from '../../../assets/icons/carr.png';
import Glass from '../../../assets/icons/glass.png';
import Announcement from '../../../assets/images/mascaraantiviral.jpg';
import FaceShield from '../../../assets/images/faceshield.jpg';

//COMPONENTS
import Options from '../../../Components/ThreePoints';

import CarouselCards from './components/CarouselCards';

export default function Home() {
  const route = useRoute();
  const navigation = useNavigation();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [buscarcategorias, setBuscarCategorias] = useState([]);
  const [item, setItem] = useState(route.params.item);
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
    const resposta = await axios.get(PRODUCTS_ONE+item.id);
    if (resposta.data.error == null) {

      const { produto } = resposta.data;
      setProdutos(produto);
      setCarregado(true);
      
    } else {
      Alert.alert('Erro', 'Algo deu errado ao buscar ali.');
    }
    console.log(resposta.data)
  };


  const moneyFormat = (value) =>
    parseFloat(value)
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  const listaCategorias = async () => {
    setCarregado(false);

    const resposta = await axios.get(CATEGORIES_ONE+item.id);

    if (resposta.data.error == null) {

      const { categorias } = resposta.data;

      setCategorias(categorias);
      setCarregado(true);
    } else {
      Alert.alert('Erro', 'Algo deu errado ao buscar categoria.');
    }
   
    console.log(resposta.data)
    
  };

  const listaBuscarProdutos = async () => {
    //console.log(categorias.id)
    console.log(item.id)
    const resposta = await axios.get(PRODUTO_LOJA+3+'/'+item.id);
    
    //console.log(resposta.data)
  };

  async function buscarcategoriaselecionada(categoria) {
    console.log("id_categoria" + categoria);
    console.log("id_loja" + item.id);
    setCarregado(false)
    const resposta = await axios.get(PRODUTO_LOJA+categoria+'/'+item.id);

    if (resposta.data.error == null) {
      const { produto } = resposta.data;
      setBuscarCategorias(produto);
      setProdutos(produto);
      setCarregado(true)
    } else {
      Alert.alert('Erro', 'Algo deu errado ao buscar la.');
    }
    console.log(resposta.data)
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
        onPress={() => navigation.navigate('Product', {item})}
        style={style.produtHome}>
        <Image style={style.productImageHome} source={{uri: item.foto}} />
        <View style={style.productInfoHome}>
          <Text style={style.productName}>{String(item.nome)}</Text>
          <View style={style.subProductInfo}>
            <Text style={style.productPrice}>R$ {moneyFormat(item.valor)}</Text>
          </View>
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
            <Text style={style.textInputSearch}>Buscar por produto</Text>
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
                    <FlatList
                      initialScrollIndex={p-1}
                      style={style.carrosel}
                      showsHorizontalScrollIndicator={false}
                      data={categorias}
                      keyExtractor={(item) => String(item.id)}
                      renderItem={renderCategorias}
                      horizontal={true}
                      ListHeaderComponent={() => (
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              carregarTudo()
                              setP(0);
                            }}
                          >
                            <Text
                              style={[
                                style.categorias,
                                Object.entries(buscarcategorias).length < 1
                                  ? style.categoriaSelected
                                  : '',
                              ]}>
                              Todos
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    />
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
