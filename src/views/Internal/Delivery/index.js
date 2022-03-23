import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {RadioButton, Provider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

//STYLE
import style from './style';

//ASSETS
import Back from '../../../assets/icons/back.png';

//COMPONENTS
import Options from '../../../Components/ThreePoints';

const Delivery = ({usuario, dispatch}) => {
  const navigation = useNavigation();
  const [modalidade, setModalidade] = useState('');
  const [enderecoSelecionado, setEnderecoSelecionado] = useState([]);
  let enderecos = usuario.endereco;
  const [load, setLoad] = useState(true);

  useEffect(() => {
    navigation.addListener('focus', () => setLoad(!load));
  }, [navigation, load]);

  const moneyFormat = (value) =>
    parseFloat(value)
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  const modalidadeNormal = ['Normal', 20.5];
  const modalidadeUrgente = ['Urgente', 70.6];

  const Verifica = () => {
    if (modalidade === '') {
      Alert.alert('Modalide de entrega.', 'Você precisa selecionar uma.');
    } else {
      console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n');
      const tipoModalide =
        modalidade === '0' ? modalidadeNormal[0] : modalidadeUrgente[0];
      const precoModalide =
        modalidade === '0' ? modalidadeNormal[1] : modalidadeUrgente[1];
      console.log(
        '-------------------------------NOME DA SUA MODALIDADE DE ENTREGA: ',
        tipoModalide,
      );
      console.log(
        '-------------------------------PRECO DA SUA MODALIDADE DE ENTREGA: ',
        precoModalide,
      );
      if (Object.entries(enderecoSelecionado).length > 0) {
        console.log(
          '\n\n\n\n\n\n\n\n\n\n\n\n\n-------------------------------ENDERECO SELECIONADO',
        );
        console.log(enderecoSelecionado);
        navigation.navigate('ResumeBuy', {
          enderecoSelecionado: enderecoSelecionado,
          modalidade: {tipoModalide, precoModalide},
        });
      } else {
        Alert.alert('Endereço de entrega.', 'Você precisa selecionar um.');
      }
    }
  };

  const renderAdress = ({item}) => {
    return (
      <View style={style.topDefault}>
        <View style={style.auxOptions}>
          <Text style={style.texConteudo}>
            <Text style={style.texTitle}>Cidade: </Text>
            {item.cidade}
          </Text>
        </View>
        <View style={style.auxOptions}>
          <Text style={style.texConteudo}>
            <Text style={style.texTitle}>Rua: </Text>
            {item.rua}
          </Text>
        </View>
        <View style={style.auxOptions}>
          <Text style={style.texConteudo}>
            <Text style={style.texTitle}>Bairro: </Text>
            {item.bairro}
          </Text>
        </View>
        <View style={style.auxOptions}>
          <Text style={style.texConteudo}>
            <Text style={style.texTitle}>Número: </Text>
            {item.numero}
          </Text>
        </View>
        {item.complemento !== '' ? (
          <View style={style.auxOptions}>
            <Text style={style.texConteudo}>
              <Text style={style.texTitle}>Complemento: </Text>
              {item.complemento}
            </Text>
          </View>
        ) : (
          <></>
        )}
        <View style={style.auxOptions}>
          <RadioButton value={item} color="#3AABFD" uncheckedColor="#3AABFD" />
          <Text style={style.textRadio}>Entregar neste endereço</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
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
            {/* <Text style={style.texTitle}>Modo de entrega</Text> */}
          </View>
          <Options />
        </View>

        <View style={style.body}>
          <RadioButton.Group
            onValueChange={(Selecionaendereco) =>
              setEnderecoSelecionado(Selecionaendereco)
            }
            value={enderecoSelecionado}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={enderecos}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderAdress}
              ListHeaderComponent={() => (
                <View>
                  <Text style={style.textModality}>Modalidade de entrega</Text>
                  <View style={style.contOption}>
                    <RadioButton.Group
                      onValueChange={(atualizaModalide) =>
                        setModalidade(atualizaModalide)
                      }
                      value={modalidade}>
                      <View style={style.options}>
                        <View style={style.auxOptions}>
                          <RadioButton
                            value="0"
                            color="#3AABFD"
                            uncheckedColor="#3AABFD"
                          />
                          <Text style={style.textRadio}>
                            {modalidadeNormal[0]}
                          </Text>
                        </View>
                        <Text style={style.textRadio}>
                          R$ {moneyFormat(modalidadeNormal[1])}
                        </Text>
                      </View>
                      <View style={style.options}>
                        <View style={style.auxOptions}>
                          <RadioButton
                            value="1"
                            color="#3AABFD"
                            uncheckedColor="#3AABFD"
                          />
                          <Text style={style.textRadio}>
                            {modalidadeUrgente[0]}
                          </Text>
                        </View>
                        <Text style={style.textRadio}>
                          R$ {moneyFormat(modalidadeUrgente[1])}
                        </Text>
                      </View>
                    </RadioButton.Group>
                  </View>
                  <Text style={style.textModality}>Endereços cadastrados</Text>
                </View>
              )}
              ListFooterComponent={() => (
                <View>
                  <TouchableOpacity
                    style={style.button}
                    onPress={() => navigation.navigate('Adress', { origem : 'Delivery' })}>
                    <Text style={style.textDefaultButton}>CADASTRAR NOVO</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListEmptyComponent={() => (
                <View>
                  <Text>Nenhum endereço registrado</Text>
                </View>
              )}
            />
          </RadioButton.Group>
        </View>

        <TouchableOpacity
          style={style.defaultButtonFixedEnd}
          activeOpacity={0.5}
          onPress={Verifica}>
          <Text style={style.textDefaultButton}>
            AVANÇAR PARA FINALIZAR COMPRA
          </Text>
          {/* <Icon name="arrow-forward" size={20} color="#fff" /> */}
        </TouchableOpacity>
      </Provider>
    </SafeAreaView>
  );
};
export default connect((state) => ({usuario: state.usuario}))(Delivery);
