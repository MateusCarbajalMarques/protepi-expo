import { StyleSheet } from 'react-native';
//import { color } from 'react-native-reanimated';
import { general, colors, fonts } from '../../../deafultstyles';

export default StyleSheet.create({
    ...general,
    identifyScreen: {
      flexDirection: 'row',
      alignItems: "center",
      marginRight: 10,
    },
  
    headerDelivery: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 10,
      justifyContent: 'space-between',
      alignItems: "center",
    },
  
    body: {
      width: '100%',
      paddingHorizontal: 20,
      flex: 1,      
    },
    produt: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#899DAC',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 25,
        width: '90%',
        alignSelf: 'center',
    },
    productImage: {
        alignSelf:'center',
    },
    
    productName: {
      // marginTop: -2,
      fontSize: 15,
      color: colors.secondaryColor,
    },  
    
    productPrice: {
      color: colors.secondaryColor,
      fontSize: 14,
      fontFamily: 'HindMadurai-Regular', 
      width: '100%',
      flexShrink: 1,
    }, 

    productInfo: {
      marginLeft: 13,
      flexShrink: 1,
      // borderWidth: 1,
      // borderColor: 'green'
    },

    productName2: {
       marginTop: -1,
      fontSize: 22,
      color: colors.secondaryBlack,
      fontFamily: 'HindMadurai-SemiBold',
      
    },
    noDates : {
      fontSize: 18,
      width: "70%",
      textAlign: 'center',
      // fontFamily: 'HindMadurai-SemiBold',
      // color: colors.secondaryBlack,
      marginTop: 200,
      alignSelf: 'center'
    },
});   