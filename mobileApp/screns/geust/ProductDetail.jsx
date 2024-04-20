import {  Image,  View, Text, TouchableOpacity, Dimensions, Share  } from 'react-native'
import React, { useEffect,useState } from 'react'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useShopingCart } from '../../context/ShopingCartContext';
import { useFavoriteContext } from '../../context/FavoriteContext';
const screenHeight = Dimensions.get('window').height;

export default function ProductDetail({route}) {
    const id = route.params.id
    const {products,getItemQty,increaseCartQty,decreaseCartQty,removeItemFromCart,getTotalPrice,cartItems} = useShopingCart()
    const {toogleFavorite,isFavorit} = useFavoriteContext()
    const [product, setProduct] = useState({})
    useEffect(() => {
        const filteredProduct = products.find((pd) => pd.id === parseInt(id));
        if (filteredProduct) {
            setProduct(filteredProduct);
        }
    }, [id, products]);
    const ShareProduct = async () => {
        try {
            const appLink = 'https://github.com/react-native-share/react-native-share'
            const message = `Check out this product: ${product.name} - ${product.description}. Install our app to view more details: ${appLink}`;        
            const result = await Share.share({
              message: message,
              url: appLink, 
              title: 'Product details',
            });

          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
              console.log("shared with activity type of result.activityType")
            } else {
              // shared
              console.log("shared")
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
            console.log("dismissed")
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      };
    return (
        <View style={tw`bg-white h-full`}>
            <View style={tw`overflow-hidden `}>
                <Image source={{ uri: product.image }} style={{ height: screenHeight / 2.5, width: '100%' }} resizeMode="cover" />
            </View>
            <View style={tw`p-5`}>
                <View style={tw`flex-row justify-between`}>
                    <View>
                        <Text style={tw`font-semibold text-lg capitalize opacity-80`}>{product.name}</Text>
                        <Text style={tw`font-semibold pt-1 text-gray-900 opacity-80`}>{product.prix_finale} DH</Text>
                    </View>
                    <View>
                    <View style={tw`flex-row justify-end pb-1 `}>
                        <TouchableOpacity onPress={() => toogleFavorite(product)}>
                            <MaterialIcons name={isFavorit(product.id) ? "favorite" : "favorite-border"} size={28} color="red" style={tw`pr-2`} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ShareProduct}>
                            <Ionicons name="share-outline" size={28} color="green" />
                        </TouchableOpacity>
                    </View>
                        <View>
                            <Rating imageSize={22}/>
                        </View>
                    </View>
                </View>
                <View style={tw`pt-3`}>
                    <Text>
                        {product.description}
                    </Text>
                </View>
                <View style={tw`pt-3 flex-row justify-between`}>
                    <View>
                        <Text style={tw`font-bold opacity-80`}>
                            Date de fabrication
                        </Text>
                        <Text style={tw`pt-1 font-bold opacity-80`}>
                            Date de expiration
                        </Text>
                    </View>
                    <View>
                        <Text style={tw`font-semibold opacity-70`}>
                            {product.date_fab}
                        </Text>
                        <Text style={tw`pt-1 font-semibold opacity-70`}>
                            {product.date_exp}
                        </Text>
                    </View>
                </View>
                
            </View>
            <View style={tw`bg-gray-200 h-full rounded-t-3xl `}>
                {cartItems.some((p) => p.id === product.id) ? (
                    <View>
                        <View style={tw`flex-row justify-center mt-7 `}>
                            <TouchableOpacity style={tw`bg-green-400 p-3`} onPress={() => increaseCartQty(product.id)}>
                                <FontAwesome6 name="add" size={24} color="white" />
                            </TouchableOpacity>
                            <Text  style={tw`bg-white p-3 text-xl`}>
                                {getItemQty(product.id)}
                            </Text>
                            <TouchableOpacity style={tw`bg-green-400 p-3`} onPress={() => decreaseCartQty(product.id)}>
                                <FontAwesome6 name="minus" size={24} color="white" />                     
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`bg-red-400 p-3 ml-3`} onPress={() => removeItemFromCart(product.id)}>
                                <AntDesign name="closecircleo" size={27} color="white" />                  
                            </TouchableOpacity>
                        </View>
                        <View style={tw`p-3 flex-row justify-around`}>
                            <Text style={tw`text-xl font-semibold`}>Total: </Text>
                            <Text style={tw`text-xl font-semibold`}>{getTotalPrice()} DH </Text>
                        </View>
                        <View style={tw`px-5`}>
                            <TouchableOpacity style={tw`bg-green-400 p-3 rounded-lg`}>
                                <Text style={tw`text-center text-xl text-white`}>Go to Shopping cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ): (
                    <View style={tw`flex justify-center items-center p-4 mt-15`}> 
                        <TouchableOpacity style={tw`bg-green-400 p-5 w-full rounded-2xl `} onPress={() => increaseCartQty(product.id)}>
                            <Text style={tw`text-lg font-semibold text-white text-center `}>Add To Cart</Text>
                        </TouchableOpacity>
                    </View> 
                )}
            </View>
        </View>
      );
}

