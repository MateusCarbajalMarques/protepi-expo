import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Provider} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

//API
import {SELECT_ONE_BUY, SELECT_BUY_ITEMS} from '../../../config/api';

//STYLE
import style from './style';

//ASSETS
import AdressIcon from '../../../assets/icons/adress.png';
import LineTime from '../../../assets/icons/lineTime.png';
import LineTimeDesabled from '../../../assets/icons/lineTimeDesabled.png';
import EndLineTime from '../../../assets/icons/endLineTime.png';
import EndLineTimeDesabled from '../../../assets/icons/endLineTimeDesabled.png';

import Photo from '../../../assets/images/package.png';

// endLineTime

//COMPONENTS
import Options from '../../../Components/ThreePoints';

function OrderData() {
  const route = useRoute();
  const navigation = useNavigation();
  const [compra, setCompra] = useState(route.params.item);
  const [dadoscompra, setDadosCompra] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [carregado, setcarregado] = useState(false);
  const [limite, setLimite] = useState(0);

  const listaStatus = {
    "Realizado" : 0,
    "Aprovado" : 1,
    "Saiu para entrega" : 2,
    "Entregue" : 3,
    "Cancelado" : 4,
  };

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setcarregado(false);
    await dadosCompra();
    await dadosProduto();
    setcarregado(true);
  }

  async function dadosCompra() {
    const resposta = await axios.post(SELECT_ONE_BUY, {
      id: compra.id,
      id_usuario: compra.id_usuario,
    });
    if (resposta.data.error === null) {
      setDadosCompra(resposta.data.compras);
      setLimite(listaStatus[resposta.data.compras.status_atual]);
    } else {
      Alert.alert('Ops!!', 'ALgo deu errado, tente novamente mais tarde.');
    }
  }

  async function dadosProduto() {
    const resposta = await axios.post(SELECT_BUY_ITEMS, {
      id_compra: compra.id,
    });
    if (resposta.data.error === null) {
      setProdutos(resposta.data.itemcompra);
    } else {
      Alert.alert('Ops!!', 'ALgo deu errado, tente novamente mais tarde.');
    }
  }

  const moneyFormat = (value) =>
    parseFloat(value)
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    carregar().then(() => setRefreshing(false));
  }, []);

  const renderProducts = ({item}) => {
    return (
      <View style={[style.produt, {width: '100%'}]}>
        <Image
          style={{
            alignSelf: 'center',
          }}
          source={Photo}
        />
        <View style={style.productInfo}>
          <Text style={style.productName}>{item.nome}</Text>
          <Text style={style.productName}>
            QTD {item.quantidade}, UND R$ {moneyFormat(item.valor)}
          </Text>
          <View style={style.subProductInfo}>
            <Text style={style.productPrice}>
              R$ {moneyFormat(item.valor * item.quantidade)}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={style.container}>
      {
        carregado ?
          <Provider>
            <View style={style.headerModel}>
              <View style={style.identifyScreen}>
                <Image
                  style={style.iconModelTitle}
                  source={AdressIcon}
                  resizeMode="contain"
                />
                <Text style={style.texTitle}>N° Pedido 000{dadoscompra.id}</Text>
              </View>
              <Options />
            </View>

            <View style={style.body}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={produtos}
                keyExtractor={(item) => String(item.id)}
                ListHeaderComponent={() => (
                  <View>
                    <Text style={style.textModality}>Produtos</Text>
                  </View>
                )}
                renderItem={renderProducts}
                ListFooterComponent={() => (
                  <View>
                    <View style={style.part}>
                      <Text style={style.textModality}>Histórico</Text>
                      <View style={style.itemPedido}>
                        <Image source={LineTime}></Image>
                        <View>
                          <Text style={[style.itemTitle, style.able]}>
                            Pedido Realizado
                          </Text>
                          <Text style={style.itemData}>
                            {dadoscompra.data_status_pedido_realizado === '' || limite < 0
                              ? ''
                              : 'Em ' +
                                dadoscompra.data_status_pedido_realizado +
                                ' às ' +
                                dadoscompra.hora_status_pedido_realizado}
                          </Text>
                        </View>
                      </View>

                      <View style={style.itemPedido}>
                        <Image
                          source={
                            dadoscompra.data_status_pedido_aceito === '' || limite < 1
                              ? LineTimeDesabled
                              : LineTime
                          }></Image>
                        <View>
                          <Text
                            style={[
                              style.itemTitle,
                              dadoscompra.data_status_pedido_aceito === '' || limite < 1
                                ? style.disabled
                                : style.able,
                            ]}>
                            Pedido Aceito
                          </Text>
                          <Text style={style.itemData}>
                            {dadoscompra.data_status_pedido_aceito === '' || limite < 1
                              ? ''
                              : 'Em ' +
                                dadoscompra.data_status_pedido_aceito +
                                ' às ' +
                                dadoscompra.hora_status_pedido_aceito}
                          </Text>
                        </View>
                      </View>

                      <View style={style.itemPedido}>
                        <Image
                          source={
                            dadoscompra.data_status_pedido_transporte === '' || limite < 2
                              ? LineTimeDesabled
                              : LineTime
                          }></Image>
                        <View>
                          <Text
                            style={[
                              style.itemTitle,
                              dadoscompra.data_status_pedido_transporte === '' || limite < 2
                                ? style.disabled
                                : style.able,
                            ]}>
                            Pedido Saiu para Entrega
                          </Text>
                          <Text style={style.itemData}>
                            {dadoscompra.data_status_pedido_transporte === '' || limite < 2
                              ? ''
                              : 'Em ' +
                                dadoscompra.data_status_pedido_transporte +
                                ' às ' +
                                dadoscompra.hora_status_pedido_transporte}
                          </Text>
                        </View>
                      </View>

                      <View style={style.itemPedido}>
                        <Image
                          source={
                            dadoscompra.data_status_pedido_entregue === '' || limite < 3
                              ? EndLineTimeDesabled
                              : EndLineTime
                          }></Image>
                        <View>
                          <Text
                            style={[
                              style.itemTitle,
                              dadoscompra.data_status_pedido_entregue === '' || limite < 3
                                ? style.disabled
                                : style.able,
                            ]}>
                            Pedido Entregue
                          </Text>
                          <Text style={style.itemData}>
                            {dadoscompra.data_status_pedido_entregue === '' || limite < 3
                              ? ''
                              : 'Em ' +
                                dadoscompra.data_status_pedido_entregue +
                                ' às ' +
                                dadoscompra.hora_status_pedido_entregue}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={style.part}>
                      <Text style={style.textModality}>Frete</Text>
                      <Text style={style.productName}>
                        Modalidade : {dadoscompra.modalidade_frete}
                      </Text>
                      <Text style={style.productName}>
                        Valor: R$ {moneyFormat(dadoscompra.valor_frete)}
                      </Text>
                    </View>
                    <View style={style.part}>
                      <Text style={style.textModality}>Entrega</Text>
                      <Text style={style.titleAdress}>Pedido enviado para</Text>
                      <Text style={style.itemAdress}>
                        {dadoscompra.rua}, {dadoscompra.numero},{' '}
                        {dadoscompra.bairro}, { dadoscompra.complemento ? dadoscompra.complemento+', ' : ''}
                        {dadoscompra.cidade}, {dadoscompra.estado}
                      </Text>
                    </View>

                    <View style={style.part}>
                      <Text style={style.textModality}>Pagamento</Text>
                      {
                        (dadoscompra.troco && dadoscompra.troco > 0.0)?
                          <View>
                            <Text style={style.productName}>
                                Dinheiro
                              </Text>
                            <Text style={style.productName}>
                              Valor: R$ {moneyFormat(dadoscompra.pagamento_dinheiro)}
                            </Text>
                          </View>
                        :
                          (dadoscompra.taxa_pagamento === 1.0) ?
                            <View>
                              <Text style={style.productName}>
                                Cartão de Débito
                              </Text>
                            </View>
                          :
                            <View>
                              <Text style={style.productName}>
                                Cartão de Crédito
                              </Text>
                            </View>
                      }
                    </View>

                    <View style={style.part}>
                      <Text style={style.textModality}>Total compra</Text>
                      <Text style={style.titleAdress}>
                        R$ {moneyFormat(dadoscompra.total)}
                      </Text>
                    </View>

                  {
                    (dadoscompra.troco && dadoscompra.troco > 0.0)?
                      <View style={style.part}>
                        <Text style={style.textModality}>Troco</Text>
                        <Text style={style.productName}>
                          R$ {moneyFormat(dadoscompra.troco)}
                        </Text>
                      </View>
                    :
                      <></>
                  }
                  </View>
                )}
                ListEmptyComponent={() => (
                  <View>
                    <Text>Produtos indisponíveis no momento :(</Text>
                  </View>
                )}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#1389DF", "#1389DF", "#1389DF"]} />
                }
              />
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

export default OrderData;
