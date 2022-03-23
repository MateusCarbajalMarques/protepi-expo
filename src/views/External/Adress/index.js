import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import style from './style';
import {useNavigation, useRoute} from '@react-navigation/native';

//ASSETS
import AdressIcon from '../../../assets/icons/adress.png';
import Map from '../../../assets/images/map.png';

export default function Adress() {
  const navigation = useNavigation();
  const route = useRoute();
  const [cep, setCEP] = useState('');
  const [dadosEndereco, setDadosEndereco] = useState([]);
  const [controleCep, setConstroleCep] = useState('vazio');
  const origem = route.params? route.params.origem : 'Home';

  const buscarCEP = (text) => {
    text = text.replace(/[^0-9]/g, '');
    setCEP(text);
    if (text.length > 7) {
      fetch(`https://viacep.com.br/ws/${text}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (
            (data.bairro === 'Barra da Tijuca' && data.uf === 'RJ') ||
            (data.bairro === 'São Conrado' && data.uf === 'RJ') ||
            (data.bairro === 'Recreio dos Bandeirantes' && data.uf === 'RJ')
          ) {
            console.log('\n\n\nbairro disponivel');
            setConstroleCep('existe');
            setDadosEndereco(data);
          } else {
            setConstroleCep('indisponivel');
          }
        });
    } else {
      if (controleCep !== 'vazio') {
        setConstroleCep('vazio');
      }
    }
  };

  function rota() {
    console.log(dadosEndereco);
    navigation.navigate('RegisterAdress', { endereco: dadosEndereco, origem });
  }

  const Data = () => {
    switch (controleCep) {
      case 'existe':
        return (
          <View style={style.adress}>
            <TouchableOpacity onPress={() => rota()}>
              <Text style={style.textAdress}>
                UF: {dadosEndereco.uf}, Rua: {dadosEndereco.logradouro}, Cidade: {dadosEndereco.localidade},
                Bairro: {dadosEndereco.bairro}
              </Text>
            </TouchableOpacity>
          </View>
        );

      case 'indisponivel':
        return (
          <View>
            <Image style={style.image} source={Map} resizeMode="contain" />

            <Text style={style.textNotAdrres}>Parece que você está longe.</Text>
            <Text style={style.textNotAdrres}>
              Tente digitar um CEP válido para continuar
            </Text>
          </View>
        );

      case 'vazio':
        return (
          <View>
            <Text style={style.textAdress}>Digite o seu CEP</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.modelTitle}>
        <Image
          style={style.iconModelTitle}
          source={AdressIcon}
          resizeMode="contain"
        />
        <Text style={style.texTitle}>Buscar por endereço</Text>
      </View>

      <View style={style.containerInput}>
        <TextInput
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          style={style.input}
          label="CEP"s
          mode="flat"
          theme={{
            colors: {
              primary: '#899DAC',
              background: 'transparent',
            },
          }}
          value={cep}
          onChangeText={(cep) => buscarCEP(cep)}
          maxLength={8}
        />

        <Data />

      </View>
    </SafeAreaView>
  );
}

// barra da tijuca, sao conrado, recreio dos bandeirantes