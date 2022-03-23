import React from 'react-native';
import { StyleSheet } from 'react-native';
import { general, colors, fonts } from '../../../deafultstyles';


export default StyleSheet.create({
    ...general,
    compSearch: {
        width : '90%',
        alignSelf: 'center',
        marginBottom: "5%"
    },
    carrosel:{
        marginLeft: 20,
        marginBottom :"3%",
        // borderColor: 'red',
        // borderWidth: 2,
        
    },
    categorias : {
        paddingHorizontal: 15,
        // width: '30%'
        // borderColor: 'blue',
        // borderWidth: 2,
        paddingVertical: 5,
        fontSize : fonts.title,
        marginRight: 15,
        borderRadius: 15,
        borderColor: colors.primaryColor,
        borderWidth: 2,
        color: colors.secondaryColor,

    },  
    categoriaSelected: {
        color: colors.white,
        backgroundColor: colors.primaryColor,
    },
    inputSearch: {
        borderBottomColor: colors.borderColor,
        borderBottomWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
    },
    textInputSearch: {
        fontFamily: "HindMadurai-Regular",
        fontSize : fonts.input,
        color: colors.secondaryColor,
    },
    announcement: {
        // alignSelf: 'center',
        width: "100%",
        height: 200,
        alignItems: 'center',
        // justifyContent : 'center',
        // borderWidth: 1,
        // borderColor: 'red'
    },
    imageAnnouncement: {
        maxHeight: 200,
        width: "98%",
        alignSelf: "center"
    },
    productList: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    produtHome: {
        flexDirection: 'column',
        marginBottom: '5%',
        width: '45%',
        marginHorizontal: "2%",
    },
    productImageHome: {
        width: 173,
        height: 173,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.25)',
        borderRadius: 10,
        alignSelf: 'center',
    },
    productInfoHome: {
        marginLeft: '5%',
        marginTop: '5%',
        flex: 1,
        justifyContent: 'space-between'
    },
});