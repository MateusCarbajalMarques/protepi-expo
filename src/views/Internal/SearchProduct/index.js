import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import _, { size } from 'lodash';

//API
import { PRODUCTS_ALL } from '../../../config/api';

export default function SearchProduct() {
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState('');

	const [produtos, setProdutos] = useState([]);
	const [lista, setLista] = useState([]);

	useEffect(() => {
		listaProdutos();
	}, []);

	const contains = (produto, query) => {
		if (produto.nome.includes(query.charAt(0).toUpperCase() + query.slice(1))) {
			return true;
		}
		return false;
	};

	const handleSearch = (text) => {
		const formatQuery = text.toLowerCase();
		if(text !== "") {
			const data = _.filter(produtos, produto => {
				return contains(produto, formatQuery);
			});
			setLista(data);
		} else {
			setLista([]);
		}
		setSearchQuery(text);
	}

	const listaProdutos = async () => {
		const resposta = await axios.get(PRODUCTS_ALL);
		if (resposta.data.error == null) {
			const { produtos } = resposta.data;
			setProdutos(produtos);
		} else {
			Alert.alert('Erro', 'Algo deu errado ao buscar produtos.');
		}
	};

	const moneyFormat = (value) => (
		(parseFloat(value).toFixed(2))
			.replace('.', ',')
			.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
	);

	const renderProducts = ({ item }) => {
		return (
			<View style={style.produt}>
				<Image
					style={style.productImage}
					// source={require("../../../assets/images/photo.png")}
					source={{ uri: item.foto }}
				/>
				<View style={style.productInfo}>
					<Text style={style.productName}>
						{String(item.nome)}
					</Text>
					<View style={style.subProductInfo}>
						<Text style={style.productPrice}>
							R$ {moneyFormat(item.valor)}
						</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('Product', { item })}
						>
							<Text style={style.details}>
								Mais Detalhes
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}

	return (
		<SafeAreaView style={style.container}>

			<Searchbar
				placeholder="Pesquisar"
				value={searchQuery}
				style={style.search}
				inputStyle={style.searchInput}
				iconColor="#1389DF"
				theme={{
					colors:{
						primary: "#000"
					}
				}}
				autoFocus={true}
				onChangeText={(value) => handleSearch(value)}
			/>

			<View style={style.productList}>
				<FlatList
					data={lista}
					keyExtractor={item => String(item.id)}
					renderItem={renderProducts}
					ListEmptyComponent={() =>
						<View style={style.empty}>
							<Text style={style.productName}>
								{
									searchQuery?
										"Nenhum produto encontrado"
									:
										"Pesquise por qualquer produto"
								}
							</Text>
						</View>
					}
				/>
			</View>
		</SafeAreaView>
	);
}
