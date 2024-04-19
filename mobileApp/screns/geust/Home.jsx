import { FlatList, Image, Text, TextInput, TouchableOpacity, View , ScrollView } from "react-native";
import tw from 'twrnc'
import hero from '../../assets/hero.jpg'
import ProductCard from "../../component/ProductCard";
import CategoryCardCircle from "../../component/CategoryCardCircle";

export default function Home(){
    const fakeData = [
        { id: '1', title: 'Product 1', price: '$10', imageUrl: 'https://via.placeholder.com/150' },
        { id: '2', title: 'Product 2', price: '$20', imageUrl: 'https://via.placeholder.com/150' },
        { id: '3', title: 'Product 3', price: '$30', imageUrl: 'https://via.placeholder.com/150' },
      ];   

      return (
        <ScrollView  style={tw`bg-white `}> 
            <TextInput placeholder="Search" style={tw`mx-15 bg-gray-300 my-4 rounded-full h-9 px-4 text-black`}
            placeholderTextColor={'black'}/>
            <View style={tw`mx-5`}>
                <Image source={hero} style={tw`w-full h-50 rounded-3xl`}/>
                <Text style={tw`font-semibold mx-4 mt-1`}>Lorem ipsum est, en imprimerie, une suite bien</Text>
                <View style={tw`my-5 flex-row justify-between`}>
                    <View>
                        <Text style={tw`font-bold`}>Poulair Product 🔥</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={tw`text-blue-500 font-semibold`}>View All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList data={fakeData} renderItem={ProductCard} horizontal keyExtractor={item => item.id} />
                <View style={tw`mt-5`}>
                    <Text style={tw`font-bold pb-5 text-center`}>Poulair Categories</Text>
                    <FlatList data={fakeData} renderItem={CategoryCardCircle} horizontal keyExtractor={item => item.id} />
                </View>

                <View style={tw`flex-row justify-between mb-5`}>
                    <View>
                        <Text style={tw`font-bold`}>New Arrivals </Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={tw`text-blue-500 font-semibold`}>View All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList data={fakeData} renderItem={ProductCard} horizontal keyExtractor={item => item.id} />
                <View style={tw`mt-5`}>
                    <Text style={tw`font-bold pb-5 text-center`}>Our brands</Text>
                    <FlatList data={fakeData} renderItem={CategoryCardCircle} horizontal keyExtractor={item => item.id} />
                </View>
            </View>
        </ScrollView >
    )
}