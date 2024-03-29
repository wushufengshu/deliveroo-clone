import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity';
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, StarIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/solid';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
const RestaurantScreen = () => {

    const navigation = useNavigation();

    const { params: { id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat } } = useRoute()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <>
            <BasketIcon />
            <ScrollView>
                <View className="relative">
                    <Image
                        source={{
                            uri: urlFor(imgUrl).url()
                        }}
                        className="w-full h-56 bg-gray-300 p-4"
                    />
                    <TouchableOpacity className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full" onPress={navigation.goBack}>
                        <ArrowLeftIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <View className="bg-white">
                    <View className="px-4 pt-4">
                        <Text className="text-3xl font-bold">{title}</Text>
                        <View className="flex-row space-x-2 my-1">
                            <View className="flex-row items-center space-x-1">
                                <StarIcon size={20} color="green" opacity={.5} />
                                <Text className="text-xs text-gray-500">
                                    <Text className="text-green-500 ">{rating} </Text> {genre}
                                </Text>
                            </View>
                            <View className="flex-row items-center space-x-1">
                                <MapPinIcon size={20} color="gray" opacity={.5} />
                                <Text className="text-xs text-gray-500"> Nearby {address} </Text>
                            </View>
                            <Text className="text-gray-500 mt-2 pb-4 ">{short_description}</Text>
                        </View>
                    </View>

                    <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-200">
                        <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
                        <Text className="text-md pl-2 flex-1 font-bold">
                            Have a food allergy?
                        </Text>
                        <ChevronRightIcon color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <View className="pb-36">
                    <Text className="px-4 pt-6 font-bold text-xl">Menu</Text>
                    {dishes.map(dish => (
                        <DishRow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}

export default RestaurantScreen