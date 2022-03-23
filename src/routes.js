import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces do projeto

// EXTERNAL
import Preload from './views/External/Preload';
import Login from './views/External/Login';
import Register from './views/External/Register';
import Adress from './views/External/Adress';
import Recover from './views/External/Recover';
import CodeConfirmation from './views/External/CodeConfirmation';
import PasswordReset from './views/External/PasswordReset';

// INTERNAL
import Welcome from './views/Internal/Welcome';
import RegisterAdress from './views/Internal/RegisterAdress';
import Delivery from './views/Internal/Delivery';
import Loja from './views/Internal/Loja';
import Home from './views/Internal/Home';
import Product from './views/Internal/Product';
import ResumeBuy from './views/Internal/ResumeBuy';
import Cart from './views/Internal/Cart';
import SearchProduct from './views/Internal/SearchProduct';
import ListAddresses from './views/Internal/ListAddresses';

import HistoricoPedidos from './views/Internal/HistoricoPedidos';
import OrderData from './views/Internal/OrderData';
import ResumeBuyProducts from './views/Internal/ResumeBuyProducts';




// EXEMPLE CAROUSEL
import CarouselCards from './Components/ExempleCarousel/Carroca';


// Criacao da pilha de navegação
const AppStack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="Preload"
        screenOptions={{headerShown: false}}>

        <AppStack.Screen name="Preload" component={Preload} />

        <AppStack.Screen name="Login" component={Login} />

        <AppStack.Screen name="Register" component={Register} />

        <AppStack.Screen name="CodeConfirmation" component={CodeConfirmation} />

        <AppStack.Screen name="PasswordReset" component={PasswordReset} />

        <AppStack.Screen name="Adress" component={Adress} />

        <AppStack.Screen name="Welcome" component={Welcome} />

        <AppStack.Screen name="RegisterAdress" component={RegisterAdress} />

        <AppStack.Screen name="Delivery" component={Delivery} />

        <AppStack.Screen name="Loja" component={Loja} />
        <AppStack.Screen name="Home" component={Home} />

        <AppStack.Screen name="Recover" component={Recover} />

        <AppStack.Screen name="Product" component={Product} />

        <AppStack.Screen name="ResumeBuy" component={ResumeBuy} />

        <AppStack.Screen name="Cart" component={Cart} />

        <AppStack.Screen name="SearchProduct" component={SearchProduct} />

        <AppStack.Screen name="ListAddresses" component={ListAddresses} />

        <AppStack.Screen name="HistoricoPedidos" component={HistoricoPedidos} />

        <AppStack.Screen name="OrderData" component={OrderData} />

        <AppStack.Screen name="CarouselCards" component={CarouselCards} />

        <AppStack.Screen name="ResumeBuyProducts" component={ResumeBuyProducts} />



      </AppStack.Navigator>
    </NavigationContainer>
  );
}
