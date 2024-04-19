import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

export default function ProductCard({ item }) {
  return (
    <View style={tw`relative w-30 h-40 mr-3`}>
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
  );
}
