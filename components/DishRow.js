import { View, Text, TouchableOpacity, Image } from 'react-native'
import { urlFor } from '../sanity'
import React, { useState } from 'react'
import Currency from 'react-currency-formatter';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {

    const [isPressed, setIsPressed] = useState(false)
    const items = useSelector((state) => selectBasketItemsWithId(state, id))
    const dispatch = useDispatch();
    const addItemToBasket = () => {
        dispatch(addToBasket({ id: id, name: name, description: description, price: price, image: image }))
    }

    const removeItemFromBasket = () => {
        if (!items.length > 0) return;
        dispatch(removeFromBasket({ id: id }))
    };


    console.log(items)
    return (
        <>
            <TouchableOpacity
                onPress={() => setIsPressed(!isPressed)}
                className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}
            >
                <View className="flex-row">
                    <View className="flex-1 pr-2">
                        <Text>{name}</Text>
                        <Text>{description}</Text>
                        <Text>
                            <Currency quantity={price} currency='PHP' />
                        </Text>

                    </View>
                    <View>
                        <Image
                            style={{
                                borderWidth: 1,
                                borderColor: "#F3F3F4"
                            }}
                            source={{ uri: urlFor(image).url() }}
                            className="h-20 w-20 bg-300 p-4"
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {isPressed && (
                <View className="bg-white px-4">
                    <View className="flex-row items-center space-x-2 pb-3 ">
                        <TouchableOpacity onPress={removeItemFromBasket} >
                            <MinusCircleIcon size={40} color={items.length > 0 ? "#00CCBB" : "gray"} />
                        </TouchableOpacity>

                        <Text>{items.length}</Text>
                        <TouchableOpacity onPress={addItemToBasket}>
                            <PlusCircleIcon size={40} color="#00CCBB" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
}

export default DishRow 