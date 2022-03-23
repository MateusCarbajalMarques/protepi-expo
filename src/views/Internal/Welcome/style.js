import React from 'react-native';
import { StyleSheet } from 'react-native';
import { general, colors, fonts } from '../../../deafultstyles';


export default StyleSheet.create({
    ...general,
    compImage: {
        marginTop: 50,
        height: 'auto',
        alignItems : 'center',
        justifyContent : 'center',
    },
    image : {
        width: 150,
        height: 150,
        marginBottom: 15
    },

    titleWelcome : {
        marginTop: 30,
        fontSize: fonts.atention,
        fontFamily: 'HindMadurai-SemiBold',
        color: colors.black,

    },

    textWelcome : {
        marginTop: 25,
        fontSize: fonts.title,
        fontFamily: 'HindMadurai-SemiBold',
        color: colors.secondaryBlack,
        width: '80%',
        textAlign: 'center',

    },

    contButton : {
        marginTop: 40,
        alignItems: 'center',
    },

    forgotPassword : {
        fontFamily: 'HindMadurai-SemiBold',
        color: colors.primaryColor,
        fontSize: fonts.title,
        marginTop: 20,
    },
    containerRegister : {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.secondaryColor,
        paddingTop: 10,
        marginTop: 10,
    },
    textRegister : {
        color: colors.secondaryBlack,
        fontSize: fonts.title,
        fontFamily: 'HindMadurai-Regular',
    },
    register : {
        color: colors.primaryColor,
        fontSize: fonts.title,
        fontFamily: 'HindMadurai-SemiBold',
    }


});