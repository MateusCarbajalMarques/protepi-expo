import React, {useState, createRef} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import style from './style';
import axios from "axios";
import { connect } from 'react-redux';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';

//API
import { REGISTER_ADRESS, UPDATE_ADRESS } from '../../../config/api';

//ASSETS
import AdressIcon from '../../../assets/icons/adress.png';

function cadastra(endereco) {
  return {
    type: 'CADASTRO_ENDERECO',
    endereco,
  }
}

function atualiza(endereco) {
  return {
    type: 'ATUALIZAR_ENDERECO',
    endereco,
  }
}

function RegisterAdress({ usuario, dispatch }) {
  console.log('\n\n\n\n\n\n\n\n',usuario.id,'\n\n\n\n\\n\n\n\n');
  const route = useRoute();
  const origem = route.params.origem;
  const complementoInput = createRef();
  const cidadeInput = createRef();
  const bairroInput = createRef();
  const ruaInput = createRef();
  const numeroInput = createRef();
  const navigation = useNavigation();
  const [cep, setCEP] = useState(route.params.endereco.cep? route.params.endereco.cep.replace(/[^0-9]/g, '') : '');
  const [estado, setEstado] = useState(route.params.endereco.uf ? route.params.endereco.uf : route.params.endereco.estado);
  const [cidade, setCidade] = useState(route.params.endereco.localidade ? route.params.endereco.localidade : route.params.endereco.cidade);
  const [bairro, setBairro] = useState(route.params.endereco.bairro);
  const [rua, setRua] = useState(route.params.endereco.logradouro ? route.params.endereco.logradouro : route.params.endereco.rua );
  const [numero, setNumero] = useState(route.params.endereco.numero ? route.params.endereco.numero : '');
  const [complemento, setComplemento] = useState(route.params.endereco.complemento ? route.params.endereco.complemento : '');

  async function cadastraEndereco() {
    if(cidade.length > 0  && bairro.length > 0  && rua.length > 0  && numero.length > 0 ){
      const resporta = await axios.post(REGISTER_ADRESS, {
        id_usuario : usuario.id,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        complemento
      });

      if (resporta.data.error == null) {
        dispatch(cadastra(resporta.data.endereco));

        // Preciso saber para qual tela voltar
        if (origem !== 'Home') {
          Alert.alert("Sucesso", "Endereço cadastrado!");
          navigation.navigate(origem);
        } else {
          Alert.alert('Sucesso', 'Seja bem-vindo ao app.');
          navigation.reset({
            routes: [{ name: origem }],
          });
        }
      } else{
        Alert.alert("Erro", "Endereço não cadastrado");
      }
    } else {
      Alert.alert("Atenção", "Campos em branco.");
    }
  }

  async function atualizaEndereco() {
    if (cidade.length > 0 && bairro.length > 0 && rua.length > 0 && numero.length > 0) {
      const resporta = await axios.post(UPDATE_ADRESS, {

        id: route.params.endereco.id,
        id_usuario: usuario.id,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        complemento
      });

      if (resporta.data.error == null) {
        Alert.alert("Sucesso", "Endereço atualizado!");
        dispatch(atualiza(resporta.data.endereco));
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Endereço não atulizado");
      }
    } else {
      Alert.alert("Atenção", "Campos em branco.");
    }
  }

  function verificaCadastro() {
    if (route.params.endereco.cep) {
      cadastraEndereco();
    } else {
      atualizaEndereco();
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <View style={style.modelTitle}>
          <Image
            style={style.iconModelTitle}
            source={AdressIcon}
            resizeMode="contain"
          />
          <Text style={style.texTitle}>
            {
              route.params.endereco.cep ?
                "Registrar novo endereço"
              :
                "Atualizar endereço"
            }
          </Text>
        </View>

        <View style={style.containerInput}>
          <TextInput
            style={style.input}
            label="CEP"
            mode="flat"
            theme={{
              colors: {
                primary: '#899DAC',
                background: 'transparent',
              },
            }}
            maxLength={8}
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            onChangeText={(cep) => setCEP(cep.replace(/[^0-9]/g, ''))}
            returnKeyType="next"
            onSubmitEditing={() => cidadeInput.current.focus()}
            blurOnSubmit={false}
            value={cep}
          />

          <TextInput
            style={style.input}
            label="Cidade"
            mode="flat"
            theme={{
              colors: {
                primary: '#899DAC',
                background: 'transparent',
              },
            }}
            onChangeText={(cidade) => setCidade(cidade)}
            value={cidade}
            ref={cidadeInput}
            returnKeyType="next"
            onSubmitEditing={() => bairroInput.current.focus()}
            blurOnSubmit={false}
          />

          <TextInput
            style={style.input}
            label="Bairro"
            mode="flat"
            theme={{
              colors: {
                primary: '#899DAC',
                background: 'transparent',
              },
            }}
            onChangeText={(bairro) => setBairro(bairro)}
            value={bairro}
            ref={bairroInput}
            returnKeyType="next"
            onSubmitEditing={() => ruaInput.current.focus()}
            blurOnSubmit={false}
          />

          <TextInput
            style={style.input}
            label="Rua"
            mode="flat"
            theme={{
              colors: {
                primary: '#899DAC',
                background: 'transparent',
              },
            }}
            onChangeText={(rua) => setRua(rua)}
            value={rua}
            ref={ruaInput}
            returnKeyType="next"
            onSubmitEditing={() => numeroInput.current.focus()}
            blurOnSubmit={false}
          />

          <TextInput
            style={style.input}
            label="Número"
            mode="flat"
            theme={{
              colors: {
                primary: '#899DAC',
                background: 'transparent',
              },
            }}
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            onChangeText={(numero) => setNumero(numero.replace(/[^0-9]/g, ''))}
            value={numero}
            ref={numeroInput}
            returnKeyType="next"
            onSubmitEditing={() => complementoInput.current.focus()}
            blurOnSubmit={false}
          />

          <TextInput
            style={style.input}
            label="Complemento"
            mode="flat"
            theme={{
              colors: {
                primary: '#899DAC',
                background: 'transparent',
              },
            }}
            onChangeText={(complemento) => setComplemento(complemento)}
            value={complemento}
            ref={complementoInput}
          />

          <TouchableOpacity
            style={style.defaultButton}
            onPress={verificaCadastro}
          >
              <Text style={style.textDefaultButton}>
                {
                  route.params.endereco.cep ?
                      "CADASTRAR"
                    :
                      "ATUALIZAR"
                }
              </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default connect(state => ({
  usuario: state.usuario,
}))(RegisterAdress);
