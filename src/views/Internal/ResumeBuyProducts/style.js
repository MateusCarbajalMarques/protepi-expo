import React from 'react-native';
import { StyleSheet } from 'react-native';
import { general, colors, fonts } from '../../../deafultstyles';


export default StyleSheet.create({
    ...general,
    header : {
        backgroundColor: colors.primaryColor,
        paddingTop: '10%',
        paddingBottom: '5%',

        justifyContent: 'center',
        alignItems: 'center',
    },
    name : {
        color: colors.white,
        fontSize: 15,

    },
    total : {
        color: colors.white,
        fontSize: 15,

    },
    text : {
        color: colors.white,
        fontSize: 15,

    },


    body: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 160,
        // borderWidth: 2,
        // borderColor: 'red'
      },

      textModality: {
        fontSize: fonts.title,
        fontFamily: 'HindMadurai-SemiBold',
        color: colors.secondaryColor,
        marginVertical: 10,
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


});