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
import { TextInput } from 'react-native-paper';
import Axios from 'axios';
import style from './style';
import Logo from '../../../assets/images/splash.png';
import { CHECK_CODE_CONFIRMATION } from '../../../config/api';

export default function CodeConfirmation() {
    const route = useRoute();
    const [codigo, setCodigo] = useState('');
    const [id, setId] = useState(route.params.usuario_id);
    const [email, setEmail] = useState(route.params.usuario_email);
    const navigation = useNavigation();

    console.log('ID: ' + id, ' E-mail: ' + email);

    async function verificaCodigo() {
        if (codigo !== '') {
            const resposta = await Axios.post(CHECK_CODE_CONFIRMATION, {
                codigo: codigo,
                usuario_id: id,
                usuario_email: email,
            });

            if (resposta.data.error == null) {
                Alert.alert('Sucesso', 'Código válido!');

                navigation.navigate('PasswordReset', {
                    usuario_email: email,
                });
            } else {
                Alert.alert('Erro', 'Código Inválido');
            }
        }
    }

    return(
        <SafeAreaView style={style.container}>
            <ScrollView>
                <View style={style.compImage}>
                    <Image style={style.image} source={Logo} />
                    <Text style={style.texTitle}>CONFIRMAÇÃO DE CÓDIGO</Text>
                    <Text style={style.textWelcome}>
                        Informe o código que foi enviado para o e-mail {String(email)}
                    </Text>
                </View>

                <View style={style.containerInput}>
                    <TextInput
                        label="Código"
                        style={style.input}
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        autoCompleteType="cc-number"
                        mode="flat"
                        theme={{
                            colors: {
                                primary: '#899DAC',
                                background: 'transparent',
                            },
                        }}
                        onChangeText={(text) => setCodigo(text)}
                        maxLength={6}
                    />

                    <TouchableOpacity
                        style={style.defaultButton}
                        onPress={verificaCodigo}
                    >
                        <Text style={style.textDefaultButton}>CONFIRMAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}