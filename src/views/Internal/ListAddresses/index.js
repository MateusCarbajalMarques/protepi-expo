import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import {connect} from 'react-redux';
import axios from 'axios';

//API
import {DELETE_ADRESS} from '../../../config/api';

//STYLE
import style from './style';

//ASSETS
import Back from '../../../assets/icons/back.png';
//COMPONENTS
import Options from '../../../Components/ThreePoints';

function remove(id) {
  return {
    type: 'REMOVER_ENDERECO',
    id,
  };
}

function ListAddresses({usuario, dispatch}) {
  const navigation = useNavigation();
  const [endereco, setEndereco] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setEndereco(usuario.endereco);
    console.log(usuario.endereco);
    navigation.addListener('focus', () => setLoad(!load));
  }, [load, navigation]);

  async function removeEndereco(id) {
    const resporta = await axios.post(DELETE_ADRESS, {
      id,
      id_usuario: usuario.id,
    });

    if (resporta.data.error == null) {
      Alert.alert('Sucesso', 'Endereço removido!');
      dispatch(remove(id));
      setLoad(!load);
    } else {
      Alert.alert('Erro', 'Endereço não removido');
    }
  }

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
        <View style={style.actions}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RegisterAdress', {endereco: item})
            }>
            <Text style={[style.action, style.change]}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => removeEndereco(item.id)}>
            <Text style={[style.action, style.remove]}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <Provider>
        <View style={style.headerModel}>
          <TouchableOpacity
            onPress={() => navigation.goBack() }>
            <Image
              style={style.iconModelTitle}
              source={Back}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Options />
        </View>

        <View style={style.body}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={endereco}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderAdress}
            ListFooterComponent={() => (
              <View>
                <TouchableOpacity
                  style={style.button}
                  onPress={() => navigation.navigate('Adress', { origem : 'ListAddresses' })}>
                  <Text style={style.textDefaultButton}>CADASTRAR NOVO</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </Provider>
    </SafeAreaView>
  );
}

export default connect((state) => ({
  usuario: state.usuario,
}))(ListAddresses);
