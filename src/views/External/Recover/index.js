import React, {useState} from 'react';
import{
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    Modal
} from 'react-native';
import {TextInput, ActivityIndicator} from 'react-native-paper';
import style from './style';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/native';

//API
import { CHECK_EMAIL, REGISTER_CODE_RECOVER_PASSWORD} from '../../../config/api';

//image
import Logo from '../../../assets/images/splash.png';

export default function Recover() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [load, setLoad] = useState(false);

    async function enviarEmail(id, email) {
        setLoad(true);
        // envia id do usuario e o e-mail
        const resposta = await Axios.post(REGISTER_CODE_RECOVER_PASSWORD, {
            usuario_id: id,
            usuario_email: email
        });

        if (resposta.data.error == null) {

            Alert.alert("Sucesso", "Código enviado para o e-mail!");

            navigation.navigate('CodeConfirmation', {
                'usuario_id': id,
                'usuario_email': email
            });

        } else {

            Alert.alert("Antenção", "Houve um problema ao enviar o e-mail, tente novamente");

        }

        setLoad(false);
    }

    async function verificaEmail() {

        if (email !== "") {
            const resposta = await Axios.post(CHECK_EMAIL, {
                email
            });

            if (resposta.data.error == null) {

                const { id, email } = resposta.data.usuario;

                enviarEmail(id, email);

            } else {
                Alert.alert("Erro", "E-mail não encontrado");
            }
        }
        // navigation.navigate('CodeConfirmation');
    }


    const Load = () => {
        return(
            <Modal animationType="fade" transparent={true} visible={load}>
                <View style={style.modalLoad}>
                    <ActivityIndicator animating={load} color="#1389DF" size="large" />
                    <Text style={style.textModalLoad}>
                        Enviando e-mail
                    </Text>
                </View>
            </Modal>
        )
    }

    return(
        <SafeAreaView style={[style.container]}>
            <Load />
            <ScrollView>
                <View style={style.compImage}>
                    <Image style={style.image} source={Logo} />
                    <Text style={style.texTitle}>ESQUECEU SUA SENHA?</Text>
                    <Text style={style.textWelcome}>
                        Não há, problemas. Informe-nos seu e-mail de registro
                        que enviaremos informações de como redefinir uma nova.
                    </Text>
                </View>

                <View style={style.containerInput}>
                    <TextInput
                        style={style.input}
                        label="E-mail"
                        mode="flat"
                        autoCapitalize='none'
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        autoCompleteType='email'
                        theme={{
                            colors: {
                                primary: '#899DAC',
                                background: 'transparent',
                            },
                        }}
                        onChangeText={(email) => setEmail(email)}
                    />

                    <TouchableOpacity
                        style={style.defaultButton}
                        onPress={verificaEmail}
                    >
                        <Text style={style.textDefaultButton}>CONFIRMAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>

    );



}