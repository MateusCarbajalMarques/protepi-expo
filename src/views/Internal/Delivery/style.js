import React from 'react-native';
import { StyleSheet } from 'react-native';
import { general, colors, fonts } from '../../../deafultstyles';


export default StyleSheet.create({
    ...general,
    identifyScreen : {
        flexDirection: 'row',
        alignItems: "center",
        marginRight: 10,
    },

    headerDelivery : {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: 'space-between',
        alignItems: "center",
    },

    body : {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 110,
    },
    textModality : {
        fontSize: fonts.title,
        fontFamily: 'HindMadurai-SemiBold',
        color: colors.secondaryColor,
        marginVertical: '3%'
    },
    contOption : {
        marginBottom: 10,
    },
    options : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    auxOptions : {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 2,
        // borderColor: 'green'
    },

    textRadio : {
        fontSize: 16,
        fontFamily: 'HindMadurai-SemiBold',
        color: colors.primaryColor,
    },
    topDefault : {
        marginVertical: '2%',
        paddingHorizontal: 5,
        paddingBottom: '1%',
        borderBottomWidth: .5,
        borderColor: colors.secondaryColor,
    },
    texConteudo : {
        fontSize: 16,
        fontFamily: 'HindMadurai-Regular',
        color: colors.secondaryBlack,
        flexShrink: 1,
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
  button : {
    backgroundColor: colors.primaryColor,
    paddingVertical: 10,
    width: '60%',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  }


});