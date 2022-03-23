import React, { useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput, ActivityIndicator } from 'react-native-paper';
import style from './style';
import Axios from 'axios';


//API
import { NEW_PASSWORD } from '../../../config/api';

import Logo from '../../../assets/images/splash.png';

export default function PasswordReset() {

    const route = useRoute();
    const navigation = useNavigation();
    const [codigo, setCodigo] = useState('');
    const [senha, setSenha] = useState("");
    const [confirmacao, setConfirmacao] = useState("");
    const [email, setEmail] = useState(route.params.usuario_email);

    async function mudarSenha() {

        console.log("E-mail: " + email, " Senha: " + senha);

        if (senha === confirmacao && senha.length >= 4) {
            const resposta = await Axios.post(NEW_PASSWORD, {
                email,
                senha
            });

            if (resposta.data.error == null) {
                Alert.alert("Sucesso", "Senha redefinida com sucesso!");
                navigation.reset({
                    routes: [{ name: 'Login' }]
                });
            } else {
                Alert.alert("Erro", "Erro ao redefinir senha");
            }

        }
    }

    return(
        <SafeAreaView style={style.container}>
            <ScrollView>
                <View style={style.compImage}>
                    <Image style={style.image} source={Logo}  />
                    <Text style={style.texTitle}>REDEFINA SUA SENHA</Text>
                    <Text style={style.textWelcome}>
                        Digite uma nova senha para sua conta.
                    </Text>
                </View>

                <View style={style.containerInput}>
                    <TextInput
                        label='Senha'
                        secureTextEntry={true}
                        style={style.input}
                        mode='flat'
                        theme={{
                            colors: {
                                primary: '#899DAC',
                                background: "transparent",
                            },
                        }}
                        onChangeText={text => setSenha(text)}
                        returnKeyType="next"
                        onSubmitEditing={() => confirmeSenhaInput.focus()}
                        blurOnSubmit={false}
                    />

                    <TextInput
                        label='Confirme sua senha'
                        secureTextEntry={true}
                        style={style.input}
                        mode='flat'
                        theme={{
                            colors: {
                                primary: '#899DAC',
                                background: "transparent",
                            },
                        }}
                        onChangeText={text => setConfirmacao(text)}
                        ref={(input) => (confirmeSenhaInput = input)}
                    />

                    <TouchableOpacity
                        style={style.defaultButton}
                        onPress={mudarSenha}
                    >
                        <Text style={style.textDefaultButton}>CONFIRMAR</Text>
                    </TouchableOpacity>


                </View>



            </ScrollView>
        </SafeAreaView>
    )
}