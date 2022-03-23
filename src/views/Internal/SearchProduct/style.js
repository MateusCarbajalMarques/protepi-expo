import React from 'react-native';
import { StyleSheet } from 'react-native';
import { general, colors, fonts } from '../../../deafultstyles';


export default StyleSheet.create({
    ...general,
    productList: {
        flex: 1,
        alignSelf: 'center',
        marginTop: "10%",
    },
    search: {
        borderRadius: 0,
        paddingVertical: '2%',
        elevation: 0,
    },
    searchInput: {
        color: colors.secondaryColor,
        fontFamily: "HindMadurai-Regular",
        borderBottomColor: "#899DAC",
        borderBottomWidth: 2,
        padding: 0,
        fontSize: 16,
    },
    details: {
        fontFamily: "HindMadurai-SemiBold",
        color: colors.secondaryColor,
        textDecorationLine : 'underline',
        fontSize: 16,
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        marginTop: "20%",
    },
});