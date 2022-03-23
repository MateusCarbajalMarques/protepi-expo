import React from 'react-native';
import {StyleSheet} from 'react-native';
import {general, colors, fonts} from '../../../deafultstyles';

export default StyleSheet.create({
  ...general,
  compCheckbox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    flexDirection: 'row',
    marginBottom: '10%'
  },
  compPassword : {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '2%',
    marginBottom: -5,
    width: "89%",

  },
  textCheck: {
    fontSize: fonts.input,
    fontFamily: 'HindMadurai-Regular',
  },
  textCheckBlue: {
    fontSize: fonts.input,
    color: colors.primaryColor,
    fontFamily: 'HindMadurai-SemiBold',
  },
  modal: {
    paddingHorizontal: '5%',
    paddingVertical: '8%',
  },
  modalTitle: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: 'HindMadurai-SemiBold',
  },
  modalParagraph: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'HindMadurai-Regular',
    marginBottom: '5%',
  },
});
