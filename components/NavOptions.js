import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image:
      "data:image/png;base64,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",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image:
      "https://www.clipartmax.com/png/middle/90-909244_french-fries-free-icon-french-fries-logo-png.png",
    screen: "EatsScreen",
  },
];
const NavOptions = () => {
  const naviagtion = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          //   disabled={origin}
          onPress={() => naviagtion.navigate(item.screen)}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
        >
          <View
          //   style={tw` ${origin && "opacity-20"}`}
          >
            <Image
              source={{
                uri: item.image,
              }}
              style={{ width: 120, height: 120, resizeMode: "contain" }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>

            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              color="white"
              name="arrowright"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
