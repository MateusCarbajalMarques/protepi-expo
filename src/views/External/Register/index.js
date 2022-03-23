import React, {useState, createRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import axios from 'axios';
import {TextInput, Checkbox} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

//API
import {
  CHECK_EMAIL,
  REGISTER_USER,
  CREATE_CART,
  CHECK_CURRENT_PASSWORD,
  UPDATE_USER,
  LOGIN_ROUTE,
} from '../../../config/api';

//STYLE
import style from './style';

//ASSETS
import Logo from '../../../assets/images/splash.png';
import Back from '../../../assets/icons/back.png';
import masks from '../../../utils/masks';

function atualiza(usuario) {
  return {
    type: 'ATUALIZA_USUARIO',
    usuario,
  };
}

function addUsuario(usuario) {
  return {
    type: 'SET_USUARIO',
    usuario,
  };
}

const Register = ({usuario, dispatch}) => {
  const navigation = useNavigation();
  const [nome, setNome] = useState(Object.entries(usuario).length > 0 ? usuario.nome : "");
  const [email, setEmail] = useState(Object.entries(usuario).length > 0 ? usuario.email : "");
  const [cpf, setCpf] = useState(Object.entries(usuario).length > 0 ? usuario.cpf : "");
  const [telefone, setTelefone] = useState(Object.entries(usuario).length > 0 ? usuario.celular : "");
  const [senha, setSenha] = useState(Object.entries(usuario).length > 0 ? usuario.senha : "");
  const [confirmacao, setConfirmacao] = useState('');
  const [datanascimento, setDatanascimento] = useState('');
  const [checked, setChecked] = useState(false);

  const [senhaatual, setSenhaAtual] = useState('');
  const [senhaNova, setSenhaNova] = useState('');
  const [senhaNovaConfirmar, setSenhaNovaConfirmar] = useState('');

  const [checkedPassword, setCheckedPassword] = useState(false);
  const [termovisivel, setTermovisivel] = useState(false);

  const campoemail = createRef();
  const emailInput = createRef();
  const cpfInput = createRef();
  const telefoneInput = createRef();
  const senhaInput = createRef();
  const confirmeSenhaInput = createRef();
  const senhaAtualInput = createRef();
  const novaSenhaInput = createRef();
  const confirmanovaSenhaInput = createRef();

  // const [termo, setTermo] = useState(false);

  //para enviar os dados para API
  const [cadastrando, setCadastrando] = useState(false);

  async function loginAction() {
    console.log("Login")
    const resposta = await axios.post(LOGIN_ROUTE, {
      email,
      senha,
    });

    if (resposta.data.error === null) {
      const aux = resposta.data.usuario;
      dispatch(addUsuario(aux));

      console.log("foi");
      // Armazenando informações
      await AsyncStorage.setItem('@PROTepi:userEmail', email);
      await AsyncStorage.setItem('@PROTepi:userPassword', senha);
    }
  }

  // FUNCÕES DE VERIFICAÇÃO DE CPF - PULE SE NECESSÁRIO
  function verifierDigit(digits){
      const numbers = digits
          .split('')
          .map(number => parseInt(number, 10));
      const modulus = numbers.length + 1;
      const multiplied = numbers.map((number, index) => number * (modulus - index));
      const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
      return (mod < 2 ? 0 : 11 - mod);
  };

  function strip(number, strict){
      const STRICT_STRIP_REGEX = /[.-]/g;
      const LOOSE_STRIP_REGEX = /[^\d]/g;
      const regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
      return (number || '').replace(regex, '');
  };

  function isValid(number, strict){
      const BLACKLIST = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
      '12345678909'
      ];

      const stripped = strip(number, strict);
      if (!stripped)
          return false;
      if (stripped.length !== 11)
          return false;
      if (BLACKLIST.includes(stripped))
          return false;
      let numbers = stripped.substr(0, 9);
      numbers += verifierDigit(numbers);
      numbers += verifierDigit(numbers);
      return numbers.substr(-2) === stripped.substr(-2);
  };

  // AQUI TERMINA AS FUNCÇÕES DE VALIDAÇÃO DE CPF

  async function cadastrar() {

    console.log(isValid(cpf))
    if (senha.length > 0 && email.length > 0 && nome.length > 0 && cpf.length > 0 && telefone.length > 0 && confirmacao.length > 0) {
      if (senha.length < 4) {
        Alert.alert('Atenção', 'Senha pequena demais.');
        return;
      } else if (senha !== confirmacao) {
          Alert.alert('Atenção', 'A confirmação da senha está incorreta.');
          return;
      } else if(!isValid(cpf)) {
        Alert.alert('Atenção', 'CPF inválido');
        return;
      } else if (checked) {
          const emailCadastrado = await axios.post(CHECK_EMAIL, {
            email,
          });

          if (emailCadastrado.data.msg === 'disponivel') {
            setCadastrando(true);
            const resposta = await axios.post(REGISTER_USER, {
              nome,
              email,
              celular: telefone,
              cpf,
              data_nascimento: '',
              senha,
            });

            console.log('\n\n\n\n\n\n\n\n\n DADOS QUE FORAM CADASTRADOS');
            console.log(resposta.data);
            if (resposta.data.error == null) {
              let id_usuario = resposta.data.usuario.id;

              // Cria carrinho
              const carrinho = await axios.post(CREATE_CART, {
                id_usuario,
              });

              await loginAction(); // loga usuário

              navigation.navigate('Adress');
            } else {
              Alert.alert('Atenção', 'Falha ao cadastrar, tente novamente.');
            }
          } else {
            Alert.alert('Atenção', 'E-mail já cadastrado, tente outro.');
          }
        } else {
          Alert.alert('Atenção','Você precisa aceitar os termos de uso para continuar.');
        }
    } else {
      console.log(nome, email, senha);
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    setCadastrando(false);
  }

  async function atualizarUsuario() {
    console.log(isValid(cpf))
    if (checkedPassword) {
      if (email.length > 0 && nome.length > 0 && cpf.length > 0 && telefone.length > 0 && senhaatual.length > 0 && senhaNova.length > 0 && senhaNovaConfirmar.length > 0 ) {
        if (senhaNova.length < 4) {
          Alert.alert('Atenção', 'Senha pequena demais.');
          return;
        }

        if (senhaNova !== senhaNovaConfirmar) {
          Alert.alert('Atenção', 'A confirmação da senha está incorreta.');
          return;
        }

        if (!isValid(cpf)) {
          Alert.alert('Atenção', 'CPF inválido');
          return;
        } else {
          const respostaSenha = await axios.post(CHECK_CURRENT_PASSWORD, {
            id: usuario.id,
            senha: senhaatual,
          });

          if (respostaSenha.data.error !== null) {
            Alert.alert('Atenção', 'Digite corretamente a sua senha atual.');
            return;
          }
        }
      } else {
        Alert.alert('Atenção', 'Preencha todos os campos.');
      }
    } else {
      if (email.length == 0 || nome.length == 0 || cpf.length == 0 || telefone.length == 0) {
        Alert.alert('Atenção', 'Preencha todos os campos.');
        return;
      }
    }

    if (!isValid(cpf)) {
      Alert.alert('Atenção', 'CPF inválido');
      return;
    }

    const resposta = await axios.post(UPDATE_USER, {
      id: usuario.id,
      nome,
      email,
      celular: telefone,
      cpf,
      senha : checkedPassword ? senhaNova : '',
      data_nascimento : '',
    });

    if (resposta.data.error == null) {
      Alert.alert('Sucesso', 'Dados atualizados.');

      // Atualiza dados no AsyncStorage
      await AsyncStorage.removeItem('@PROTepi:userEmail');
      await AsyncStorage.setItem('@PROTepi:userEmail', email);
      if(senhaNova.length > 0) {
        await AsyncStorage.removeItem('@PROTepi:userPassword');
        await AsyncStorage.setItem('@PROTepi:userPassword', senhaNova);
      }

      dispatch(atualiza(resposta.data.usuario));
      console.log(resposta.data.usuario)

      navigation.navigate('Home');
    } else {
      Alert.alert('Atenção', 'Falha ao atualizar, tente novamente.');
    }

  }

  function TermsUse() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={termovisivel}
        onRequestClose={() => setTermovisivel(!termovisivel)}>
        <ScrollView>
          <View style={style.modal}>
            <Text style={style.modalTitle}>Termos de uso da aplicação</Text>
            <Text style={style.modalParagraph}>What is Lorem Ipsum?</Text>

            <Text style={style.modalParagraph}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, emaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>

            <Text style={style.modalParagraph}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, emaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
            <TouchableOpacity
              style={[
                style.defaultButton,
                {
                  marginBottom: 20,
                },
              ]}
              onPress={() => setTermovisivel(!termovisivel)}>
              <Text style={style.textDefaultButton}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    );
  }

  if (Object.entries(usuario).length > 0) {
    console.log('ATULIZAR DADOS EXISTENTES DO USUARIO');
    return (
      <SafeAreaView style={style.container}>
        <ScrollView>
          <View style={style.headerModel}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={style.iconModelTitle}
                source={Back}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <TermsUse />

          <View style={[style.compImage, { marginTop: "10%"}]}>
            <Image
              style={style.image}
              source={Logo}
              resizeMode="contain"
            />
          </View>

          <View style={style.containerInput}>
            <TextInput
              label="Nome completo"
              style={style.input}
              mode="flat"
              value={nome}
              theme={{
                colors: {
                  primary: '#899DAC',
                  background: 'transparent',
                },
              }}
              onChangeText={(text) => setNome(text)}
              returnKeyType="next"
              onSubmitEditing={() => emailInput.current.focus()}
              blurOnSubmit={false}
            />

            <TextInput
              label="E-mail"
              style={style.input}
              mode="flat"
              value={email}
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
              onChangeText={(text) => setEmail(text)}
              returnKeyType="next"
              onSubmitEditing={() => cpfInput.current.focus()}
              blurOnSubmit={false}
              ref={emailInput}
            />

            <TextInput
              label="CPF"
              style={style.input}
              mode="flat"
              keyboardType="number-pad"
              autoCompleteType="cc-number"
              value={cpf}
              theme={{
                colors: {
                  primary: '#899DAC',
                  background: 'transparent',
                },
              }}
              onChangeText={(text) => setCpf(masks.cpf(text))}
              returnKeyType="next"
              onSubmitEditing={() => telefoneInput.current.focus()}
              blurOnSubmit={false}
              ref={cpfInput}
            />

            <TextInput
              label="Telefone"
              style={style.input}
              mode="flat"
              keyboardType="number-pad"
              autoCompleteType="cc-number"
              value={telefone}
              theme={{
                colors: {
                  primary: '#899DAC',
                  background: 'transparent',
                },
              }}
              onChangeText={(text) => setTelefone(masks.phone(text))}
              ref={telefoneInput}
            />

            <View style={style.compPassword}>
              <Checkbox
                status={checkedPassword === true ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCheckedPassword(!checkedPassword);
                  senhaAtualInput.current.focus();
                }}
                color="#3AABFD"
              />
              <Text style={style.textCheck}>Alterar senha</Text>
            </View>

            <TextInput
              label="Senha atual"
              secureTextEntry={true}
              style={[style.input, !checkedPassword ? style.invisible : '']}
              mode="flat"
              theme={{
                colors: {
                  primary: '#899DAC',
                  background: 'transparent',
                },
              }}
              onChangeText={(text) => setSenhaAtual(text)}
              returnKeyType="next"
              onSubmitEditing={() => novaSenhaInput.current.focus()}
              blurOnSubmit={false}
              ref={senhaAtualInput}
            />

            <TextInput
              label="Nova senha"
              secureTextEntry={true}
              style={[style.input, !checkedPassword ? style.invisible : '']}
              mode="flat"
              theme={{
                colors: {
                  primary: '#899DAC',
                  background: 'transparent',
                },
              }}
              onChangeText={(text) => setSenhaNova(text)}
              returnKeyType="next"
              onSubmitEditing={() => confirmanovaSenhaInput.current.focus()}
              blurOnSubmit={false}
              ref={novaSenhaInput}
            />

            <TextInput
              label="Confirmar nova senha"
              secureTextEntry={true}
              style={[style.input, !checkedPassword ? style.invisible : '']}
              mode="flat"
              theme={{
                colors: {
                  primary: '#899DAC',
                  background: 'transparent',
                },
              }}
              onChangeText={(text) => setSenhaNovaConfirmar(text)}
              ref={confirmanovaSenhaInput}
            />

            {/* <AlterarSenha/> */}

            <TouchableOpacity
              style={[style.defaultButton,{marginBottom: 20,}]}
              onPress={() => atualizarUsuario()}>
              <Text style={style.textDefaultButton}>ATUALIZAR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    console.log('ADICIONAR NOVO REGISTRO');
    return (
      <SafeAreaView style={style.container}>
        <ScrollView>
          <TermsUse />
          <View style={style.compImage}>
            <Image
              style={style.image}
              source={Logo}
              resizeMode="contain"
            />
          </View>
          <View style={style.containerInput}>
            <TextInput
              label="Nome completo"
              style={style.input}
              mode="flat"
              value={nome}
              theme={{
                colors: {
                  primary: '#899DAC',
                  background: 'transparent',
                },
              }}
              onChangeText={(text) => setNome(text)}
              returnKeyType="next"
              onSubmitEditing={() => campoemail.current.focus()}
              blurOnSubmit={false}
            />

            <TextInput
              label="E-mail"
              style={style.input}
              mode="flat"
              value={email}
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
              onChangeText={(text) => setEmail(text)}
              returnKeyType="next"
              onSubmitEditing={() => cpfInput.current.focus()}
              blurOnSubmit={false}
              ref={campoemail}
            />

            <TextInput
              label="CPF"
              style={style.input}
              mode="flat"
              keyboardType="number-pad"
              autoCompleteType="cc-number"
              value={cpf}
              theme={{
                colors: {
                  primary: '#899DAC',
                  background: 'transparent',
                },
              }}
              onChangeText={(text) => setCpf(masks.cpf(text))}
              returnKeyType="next"
              onSubmitEditing={() => telefoneInput.current.focus()}
              blurOnSubmit={false}
              ref={cpfInput}
            />

            <TextInput
              label="Telefone"
              style={style.input}
              mode="flat"
              keyboardType="number-pad"
              autoCompleteType="cc-number"
              value={telefone}
              theme={{
                colors: {
                  primary: '#899DAC',
                  background: 'transparent',
                },
              }}
              onChangeText={(text) => setTelefone(masks.phone(text))}
              returnKeyType="next"
              onSubmitEditing={() => senhaInput.current.focus()}
              blurOnSubmit={false}
              ref={telefoneInput}
            />

            <TextInput
              label="Senha"
              secureTextEntry={true}
              style={style.input}
              mode="flat"
              theme={{
                colors: {
                  primary: '#899DAC',
                  background: 'transparent',
                },
              }}
              onChangeText={(text) => setSenha(text)}
              returnKeyType="next"
              onSubmitEditing={() => confirmeSenhaInput.current.focus()}
              blurOnSubmit={false}
              ref={senhaInput}
            />

            <TextInput
              label="Confirme sua senha"
              secureTextEntry={true}
              style={style.input}
              mode="flat"
              theme={{
                colors: {
                  primary: '#899DAC',
                  background: 'transparent',
                },
              }}
              onChangeText={(text) => setConfirmacao(text)}
              ref={confirmeSenhaInput}
            />

            <TouchableOpacity
              style={[
                style.defaultButton,
                {
                  marginBottom: 20,
                },
              ]}
              onPress={() => cadastrar()}>
              <Text style={style.textDefaultButton}>CRIAR CONTA</Text>
            </TouchableOpacity>

            <View style={style.compCheckbox}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
                color="#3AABFD"
              />
              <Text style={style.textCheck}>Li e aceito os </Text>
              <TouchableOpacity onPress={() => setTermovisivel(true)}>
                <Text style={style.textCheckBlue}>termos de uso.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default connect((state) => ({usuario: state.usuario}))(Register);
