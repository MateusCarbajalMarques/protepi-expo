import React from 'react-native';
import {StyleSheet} from 'react-native';
import {general, colors, fonts} from '../../../deafultstyles';

export default StyleSheet.create({
  ...general,
  forgotPassword: {
    fontFamily: 'HindMadurai-SemiBold',
    color: colors.primaryColor,
    fontSize: fonts.title,
    marginTop: 20,
  },
  containerRegister: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.secondaryColor,
    paddingTop: 10,
    marginTop: 10,
  },
  textRegister: {
    color: colors.secondaryBlack,
    fontSize: fonts.title,
    fontFamily: 'HindMadurai-Regular',
  },
  register: {
    color: colors.primaryColor,
    fontSize: fonts.title,
    fontFamily: 'HindMadurai-SemiBold',
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

  image : {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  textViewAdress: {
    fontSize: 14,
    color: colors.secondaryBlack,
  },

  textNotAdrres : {
    fontSize: 14,
    color: colors.secondaryBlack,
    textAlign: 'center',
  },

  adress: {
    width: '85%',
    alignSelf: 'center',
  },

  textAdress: {
    color: colors.secondaryBlack,
    fontSize: 16,
    fontFamily: 'HindMadurai-Regular',
  },

  produt: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: "#899DAC",
      paddingBottom: "1%",
      marginBottom: '5%',
      width: "80%",
      alignSelf: 'center',
  },
  textWelcome : {
    marginTop: 20,
    fontSize: fonts.input,
    fontFamily: 'HindMadurai-Regular',
    color: '#899DAC',
    width: '80%',
    flex:1,
    flexDirection: 'row',
  },
});
