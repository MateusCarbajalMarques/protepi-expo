import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

//STYLE
import style from './style';
//ASSETS
import LogoWhite from '../../../assets/images/logobackWhite.png';

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <View style={style.compImage}>
          <Image style={style.image} source={LogoWhite} resizeMode="contain" />
          <Text style={style.titleWelcome}>Bem vindo, Rosivan Cardoso</Text>
          <Text style={style.textWelcome}>
            Para liberar seu acesso a aplicação confirme no seu e-mail
          </Text>
        </View>

        <View style={style.contButton}>
          <TouchableOpacity
            style={style.defaultButton}
            onPress={() => navigation.navigate('RegisterAdress')}>
            <Text style={style.textDefaultButton}>IR PARA LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
