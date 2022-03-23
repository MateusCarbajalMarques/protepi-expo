import React from 'react-native';
import { StyleSheet } from 'react-native';
import { general, colors, fonts } from '../../../deafultstyles';


export default StyleSheet.create({
    ...general,
    subContainer: {
        justifyContent: 'center',
        paddingHorizontal: "5%",
        paddingBottom: 15,
    },
    productImage: {
        minWidth: 300,
        maxWidth: 350,
        minHeight: 300,
        maxHeight: 300,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.25)",
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: "5%",
    },
    sectionTitle: {
        fontSize: fonts.input,
        fontFamily: "HindMadurai-SemiBold",
        marginTop: '5%',
        marginBottom: '1%',
    },
    sectionText: {
        color: colors.secondaryColor,
        fontSize: fonts.input,
        fontFamily: "HindMadurai-Regular",
        marginVertical: "1%",
        textAlign: 'justify',
    },
    productQuantity: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.25)",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: '5%',
        alignSelf: 'center',
        width: '90%',
        marginTop: '5%',
        marginBottom: 40,

    },
    productQuantityButton: {
        flexShrink: 1,
        paddingHorizontal: '10%',
        // borderWidth: 1
    },
    productQuantitySignals: {
        color: colors.primaryColor,
        fontFamily: "HindMadurai-SemiBold",
        fontSize: 40,
    },
    productQuantityText: {
        fontFamily: "HindMadurai-Regular",
        fontSize: 25
    }

});