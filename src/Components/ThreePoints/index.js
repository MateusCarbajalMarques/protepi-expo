import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import {Menu, Provider} from 'react-native-paper';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

//STYLE
import style from './style';

//ASSETS
import Options from './../../assets/icons/threePoints.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

function removerUsuario() {
  return {
    type: 'SAIR_CONTA',
  };
}

const ThreePoints = ({usuario, dispatch}) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const Verificalogin = () => {
    if (usuario.nome !== undefined) {
      return (
        <View>
          <Menu.Item
            onPress={() => {navigation.navigate('Register'), setVisible(false)}}
            icon="account-circle"
            title="Perfil"
          />
          <Menu.Item
            onPress={() => {navigation.navigate('ListAddresses'), setVisible(false)}}
            icon="home-city-outline"
            title="Meus Endereços"
          />
          <Menu.Item
            onPress={() => {navigation.navigate('HistoricoPedidos', {vindo: 'qualquer'}), setVisible(false)}}
            icon="moped"
            title="Meus pedidos"
            />
          <Menu.Item
            onPress={() => {
              // apaga as variáveis do AsyncStorage
              AsyncStorage.clear().then(() => {
                dispatch(removerUsuario());
                navigation.reset({
                  routes: [{name: 'Home'}],
                });
              })
            }}
            icon="location-exit"
            title="Sair"
          />
        </View>
      );
    } else {
      return (
        <View>
          <Menu.Item
            onPress={() => navigation.navigate('Login')}
            icon="account-key-outline"
            title="Login"
          />
        </View>
      );
    }
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={{x: Dimensions.get('window').width, y: 10}}>
        <Verificalogin />
      </Menu>
      <TouchableOpacity style={style.threePoints} onPress={openMenu}>
        <Image
          style={[style.imageModelTitle, {
            alignSelf:  'flex-end',
          }]}
          source={Options}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default connect((state) => ({usuario: state.usuario}))(ThreePoints);
