import React from 'react-native';
import { StyleSheet } from 'react-native';
import { general, colors, fonts } from '../../../deafultstyles';


export default StyleSheet.create({
    ...general,
    // compImage: {
    //     marginTop: "25%",
    //     height: 200,
    //     alignItems : "center",
    //     justifyContent : "center",
    // },
    // image : {
    //     height: 98,
    //     width: 309,
    //     marginBottom: 15
    // },

    msgErroInvisible : {
        display: "none",
    },

    msgErrorLogin : {
        fontSize: 16,
        color: colors.primaryRed,
        fontWeight: "600",
        marginBottom: 5,
        alignSelf: 'center'
    },
    msgError : {
        color: colors.primaryRed,
        fontWeight: "500",
        fontSize: 14,
        alignSelf: 'flex-start',
        marginLeft: 40
    },

    forgotPassword : {
        fontFamily: 'HindMadurai-SemiBold',
        color: colors.primaryColor,
        fontSize: fonts.input,
        marginTop: 20,
    },
    containerRegister : {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: .3,
        borderTopColor: colors.secondaryColor,
        paddingTop: 10,
        marginTop: 10,
    },
    textRegister : {
        color: colors.secondaryBlack,
        fontSize: fonts.input,
        fontFamily: 'HindMadurai-Regular',
    },
    register : {
        color: colors.primaryColor,
        fontSize: fonts.input,
        fontFamily: 'HindMadurai-SemiBold',
    }


});