import { Image, Text, View } from "react-native";
import tw from 'twrnc';

export default function CategoryCardCircle({ item }) {
  return (
    <View style={tw`relative w-30 h-40 mr-3`}>
      <Image source={{ uri: item.imageUrl }} style={[tw`w-full h-30 rounded-full`, { position: 'absolute' }]} />
      <View style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center`}>
        <Text style={tw`text-white font-semibold text-center`}>Category</Text>
      </View>
    </View>
  );
}
