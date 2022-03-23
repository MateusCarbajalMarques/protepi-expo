import React from 'react-native';
import {StyleSheet} from 'react-native';
import {general, colors, fonts} from '../../../deafultstyles';

export default StyleSheet.create({
  ...general,
  identifyScreen: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },

  headerDelivery: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  topDefault: {
    marginTop: 10,
    paddingHorizontal: 5,
    paddingBottom: 5,
  },

  body: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 160,
    // borderWidth: 2,
    // borderColor: 'red'
  },
  iconcart : {
    width: 40,
    marginTop: -7,
  },
  ViewComplet: {
    marginTop: -10,
    borderWidth: 1,
    borderColor: colors.desabled,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textModality: {
    fontSize: fonts.title,
    fontFamily: 'HindMadurai-SemiBold',
    color: colors.secondaryColor,
    marginVertical: 10,
  },

  textValor : {
    marginTop: 20,
    marginBottom: -10,
  },

  inputValor: {
    fontSize: fonts.input,
    lineHeight: 20,
    width: '85%',
    // paddingHorizontal: 5,
    marginBottom: '2%',
    // fontFamily: 'HindMadurai-Regular',
    width: "30%",
    color: 'red'
  },

  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  oneLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRadio: {
    fontSize: 16,
    fontFamily: 'HindMadurai-SemiBold',
    color: colors.primaryColor,
  },

  texConteudo: {
    fontSize: 16,
    fontFamily: 'HindMadurai-Regular',
    color: colors.secondaryBlack,
    flexShrink: 1,
  },

  textNote:{
    marginTop: 5,
    fontSize: fonts.input,
    fontFamily: 'HindMadurai-Regular',
    color: colors.secondaryBlack,
    flexShrink: 1,
  },

  viewTitlePagamento : {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  lineBlue : {
    width: '35%',
    borderBottomWidth: 3,
    borderColor: colors.primaryColor,
    marginHorizontal: 5
  },

  button: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  backModalPicture: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.25)',
    position: 'absolute',
    top: 0,
    right:0,
    left:0,
    bottom:0,
    zIndex:1,
},

modalPicture : {
    backgroundColor: '#fff',
    width:'75%',
    padding: '5%',
},
titleModalPicture : {
    fontFamily : "Roboto-Medium",
    fontSize: 18,
    marginBottom: 20
},
textModalPicture: {
    fontSize: 16
}
});
