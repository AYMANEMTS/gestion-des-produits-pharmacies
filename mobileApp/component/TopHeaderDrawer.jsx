import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';

import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
export default function TopHeaderDrawer() {
    const navigation = useNavigation()
  return (
    <View style={tw`flex-row justify-between items-center bg-white px-4 pt-13 pb-3`}>
      {/* Left icon */}
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons name='menu' size={30}/>
      </TouchableOpacity>

      {/* Center logo */}
      <Text>Logo</Text>

      {/* Right icons */}
      <View style={tw`flex-row`}>
          <TouchableOpacity style={tw`pr-1`}>
              <Feather name='cart' size={25} color={"green"}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('First right icon pressed')} style={tw`mr-2`}>
            <MaterialIcons name="favorite" size={25} color={"red"}/>
          </TouchableOpacity>
      </View>
    </View>
  );
}
