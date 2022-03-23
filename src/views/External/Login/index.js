import React, {useState, createRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import axios from 'axios';

//API
import {LOGIN_ROUTE, REGISTER_VERY_CART_ITEMS} from '../../../config/api';

//ASSETS
import Logo from '../../../assets/images/splash.png';

//ARMAZENAMENTO NO REDUX
function addUsuario(usuario) {
  return {
    type: 'SET_USUARIO',
    usuario,
  };
}

function limpaCarrinho() {
  return {
    type: 'LIMPA_CARRINHO',
  }
}

function Login({ usuario, carrinho , dispatch}){
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [logando, setLogando] = useState(false); //VERIFICAR FUNCIONALIDADE MAIS TARDE

  const [validaEmail, setValidaEmail] = useState(false);
  const [validaSenha, setValidaSenha] = useState(false);
  const [mensageLogin, setMensagemLogin] = useState(false);
  const senhaInput = createRef();

  async function cadastraItensCarrinho(id_carrinho) {
    const resposta = await axios.post(REGISTER_VERY_CART_ITEMS, {
      id_carrinho,
      itens : carrinho.produtos
    });

    if(resposta.data.error == null) {
      console.log("Produtos adicionados ou atualizados no carrinho do banco");
    } else {
      console.log("erro ao cadastrar item ao carrinho");
    }


  }

  async function loginAction() {
    setMensagemLogin(false);
    senha === '' ? setValidaSenha(true) : setValidaSenha(false);
    email === '' ? setValidaEmail(true) : setValidaEmail(false);

    if (email != '' && senha != '') {
      setLogando(true);
      const resposta = await axios.post(LOGIN_ROUTE, {
        email,
        senha,
      });

      if (resposta.data.error === null) {
        const aux = resposta.data.usuario;
        dispatch(addUsuario(aux));

        // Armazenando informações
        await AsyncStorage.setItem('@PROTepi:userEmail', email);
        await AsyncStorage.setItem('@PROTepi:userPassword', senha);


        // Verifica se o carrinho do redux não está vazio
        if(carrinho.total > 0 && carrinho.produtos.length > 0) {
          console.log("tem coisa no redux");
          cadastraItensCarrinho(resposta.data.usuario.carrinho.id);
          dispatch(limpaCarrinho());
          console.log(carrinho)
        }

        if (Object.entries(resposta.data.usuario.endereco).length > 0) {
          navigation.reset({
            routes: [{name: 'Home'}],
          });
        } else {
          navigation.reset({
            routes: [{name: 'Home'}], //AQUI IA PRA LISTA, MAS SAIU, OUTRA HORA EU ESTRUTURO MELHOR O CODIGO
          });
        }

      } else {
        setMensagemLogin(true);
      }

      setLogando(false);
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <View style={style.compImage}>
          <Image style={style.image} source={Logo} />
          <Text style={style.texTitle}>LOGIN</Text>
        </View>

        <Text
          style={
            mensageLogin
              ? [style.msgErrorLogin]
              : [style.msgErrorLogin, style.msgErroInvisible]
          }>
          Usuário ou senha inválidos.
        </Text>

        <View style={style.containerInput}>
          <TextInput
            style={style.input}
            label="E-mail"
            mode="flat"
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCompleteType="email"
            theme={{
              colors: {
                primary: '#899DAC',
                background: 'transparent',
              },
            }}
            onChangeText={(email) => setEmail(email)}
            returnKeyType="next"
            onSubmitEditing={() => senhaInput.current.focus()}
            blurOnSubmit={false}
          />

          <Text
            style={
              validaEmail
                ? [style.msgError]
                : [style.msgError, style.msgErroInvisible]
            }>
            Este campo não pode ficar vazio.
          </Text>

          <TextInput
            style={style.input}
            label="Senha"
            secureTextEntry={true}
            mode="flat"
            theme={{
              colors: {
                primary: '#899DAC',
                background: 'transparent',
              },
            }}
            onChangeText={(senha) => setSenha(senha)}
            ref={senhaInput}
          />

          <Text
            style={
              validaSenha
                ? [style.msgError]
                : [style.msgError, style.msgErroInvisible]
            }>
            Este campo não pode ficar vazio.
          </Text>

          <TouchableOpacity
            style={style.defaultButton}
            onPress={() => loginAction()}>
            <Text style={style.textDefaultButton}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.buttonBorder}
            onPress={() => navigation.reset({
              routes: [{name: 'Loja'}]
            })}>
            <Text style={style.textDefaultButtonBorder}>
              Continuar sem cadastro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Recover')}>
            <Text style={style.forgotPassword}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <View style={style.containerRegister}>
            <Text style={style.textRegister}>Ainda não tem conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={style.register}> Registre-se agora</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default connect(state => ({
  usuario: state.usuario,
  carrinho: state.carrinho,
}))(Login);