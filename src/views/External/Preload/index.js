import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator, Alert } from 'react-native';
import Logo from '../../../assets/images/splash.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import axios from 'axios';

import {LOGIN_ROUTE} from '../../../config/api';

import style from './style';

//ARMAZENAMENTO NO REDUX
function addUsuario(usuario) {
  return {
    type: 'SET_USUARIO',
    usuario,
  };
}

function Preload({ dispatch }) {

  const navigation = useNavigation();

    async function verificaLogado() {
        const storageEmail = await AsyncStorage.getItem('@PROTepi:userEmail');
        const storagePassword = await AsyncStorage.getItem('@PROTepi:userPassword');

        console.log("storageEmail: ", storageEmail);
        console.log("storagePassword: ", storagePassword);

        // Verifica se essas varáveis existem
        if(storageEmail && storagePassword) {
            const resposta = await axios.post(LOGIN_ROUTE, {
                email: storageEmail,
                senha: storagePassword,
            });

            if (resposta.data.error === null) {
                const aux = resposta.data.usuario;
                dispatch(addUsuario(aux));
                navigation.reset({
                    routes: [{name: 'Home'}],
                });
            } else {
                navigation.reset({
                    routes: [{name: 'Login'}],
                });
            }
        } else {
            navigation.reset({
                routes: [{name: 'Login'}],
            });
        }
    }

    useEffect(() => {
        verificaLogado();
    }, []);

    return (
        <View style={style.container}>
            <Image style={style.imagem}
                source={Logo}
            />
            <ActivityIndicator size="large" color="#62aae1" style={{marginTop:45}} />
        </View>
    )
}
export default connect(state => ({}))(Preload);