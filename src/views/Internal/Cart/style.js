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

    headerCart : {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: 'space-between',
        alignItems: "center",
    },
    subHeaderCart: {
        width: '43%',
    },
    productList: {
        marginVertical : "5%",
        flex: 1
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.25)",
        borderRadius: 5,
    },
    emptyCart : {
        flex : 1,
        alignItems: 'center',
        marginTop: "20%",
    },
    emptyCartText : {
        textAlign: 'center',
    },
    modalBackground: {
        flex : 1,
        backgroundColor: "rgba(0,0,0,.25)",
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: '#fff',
        width: "80%",
        height: 200,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButton: {
        backgroundColor: "#3AABFD",
        paddingVertical: 15,
        width: "90%",
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '5%',
    },
    modalButtonText : {
        fontFamily: 'HindMadurai-Regular',
        color: '#fff',
    },
    subProductInfoP: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: "1%"
    },
    datesBuyMod : {
        bottom: 45,
    },

    continuarComprando : {
        backgroundColor: colors.primaryColorDark,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },

    infoPreco: {
        // borderColor: 'red', borderWidth: 2,
        bottom: 45,      
        paddingTop: 5,  
        paddingBottom: 5,
        width: "90%",
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
    },
    textInfoTitle: {
        fontFamily: 'HindMadurai-SemiBold',
        fontSize: fonts.input,
        color: colors.borderColor,
    },

    textInfoBoby: {
        fontFamily: 'HindMadurai-SemiBold',
        fontSize: fonts.title,
        color: colors.secondaryBlack,
    }

});