import React from 'react-native';
import {StyleSheet} from 'react-native';
import{general, colors,fonts} from '../../../deafultstyles';


export default StyleSheet.create({
    ...general,
    containerInput: {
        marginTop: 80,
        alignItems: 'center',
      },
    input: {
        fontSize: fonts.input,
        lineHeight: 20,
        width: '85%',
        paddingHorizontal: 5,
        marginBottom: '5%',
        fontFamily: 'HindMadurai-Regular',
      },
    defaultButton: {
        backgroundColor: colors.primaryColor,
        paddingVertical: 10,
        width: '85%',
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
      },
      textDefaultButton: {
        fontFamily: 'HindMadurai-SemiBold',
        fontSize: fonts.title,
        color: colors.white,
      },


    titleWelcome : {
        marginTop: 20,
        right: 60,
        fontSize: fonts.atention,
        fontFamily: 'HindMadurai-SemiBold',
        color: colors.black,

    },
    textWelcome : {
        marginTop: 20,
        fontSize: fonts.title,
        fontFamily: 'HindMadurai-SemiBold',
        color: colors.secondaryBlack,
        width: '85%',

    },




})