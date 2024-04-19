import { View, ScrollView, TextInput, Text, TouchableOpacity, FlatList, Image } from "react-native";
import tw from "twrnc"
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
export default function StoreScren(){
    const fakeData = [
        { id: '1', title: 'Product 1', price: '$10', imageUrl: 'https://via.placeholder.com/150' },
        { id: '2', title: 'Product 2', price: '$20', imageUrl: 'https://via.placeholder.com/150' },
        { id: '3', title: 'Product 3', price: '$30', imageUrl: 'https://via.placeholder.com/150' },
        { id: '4', title: 'Product 3', price: '$30', imageUrl: 'https://via.placeholder.com/150' },
        { id: '5', title: 'Product 3', price: '$30', imageUrl: 'https://via.placeholder.com/150' },
        { id: '6', title: 'Product 3', price: '$30', imageUrl: 'https://via.placeholder.com/150' },
    ];   
    return (
        <ScrollView  style={tw`bg-white `}> 
            <TextInput placeholder="Search" style={tw`mx-15 bg-gray-300 my-4 rounded-full h-9 px-4 text-black`}
            placeholderTextColor={'black'}/>
            <View style={tw`mx-5`}>
                <View style={tw`flex-row justify-between`}>
                    <Text style={tw`font-semibold text-xl`}>
                        Discover products
                    </Text>
                    <TouchableOpacity>
                        <Feather name="filter" size={27} color="black" />
                    </TouchableOpacity>
                </View>
                <FlatList data={fakeData} keyExtractor={item => item.id} horizontal
                renderItem={() => (
                    <TouchableOpacity style={tw`bg-gray-400 rounded-full m-2`}>
                        <Text style={tw`text-white font-bold p-4`}>Filter</Text>
                    </TouchableOpacity>
                )}/>
                <View style={{ flexDirection: 'row',flexWrap: 'wrap'}}>
                    {fakeData.map((item,key) => (
                        <View key={key} style={tw`relative w-41 h-40 m-5 mx-2`}>
                            <Image source={{ uri: item.imageUrl }} style={tw`w-full h-full rounded-2xl`} />
                            <View style={tw`absolute bottom-0 left-0 right-0 p-2`}>
                                <Text style={tw`text-white font-semibold`}>{item.title}</Text>
                                <Text style={tw`text-white`}>{item.price}</Text>
                            </View>
                            <View style={tw`absolute top-2 right-2`}>
                                <View style={tw`flex-row`}>
                                    <TouchableOpacity onPress={() => console.log('Icon pressed')}>
                                    <Ionicons name="cart" size={24} color="green" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => console.log('Icon pressed')}>
                                    <Ionicons name="heart" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                      </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}