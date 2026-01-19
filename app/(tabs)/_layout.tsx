import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";


const TabIcon = ({ focused, icon, title }: { focused: boolean, icon: any, title: string }) => {
    if(focused) {
    return (
        <ImageBackground className="flex flex-row w-full gap-1 flex-1 min-w-[110px] min-h-[54.5px] mt-4 justify-center items-center rounded-full overflow-hidden" source={images.highlight}>
            <Image source={icon} className="size-5" tintColor="#151312" />
            <Text className="text-secondary text-base font-medium ml-1">{title}</Text>
        </ImageBackground>
    )
} else {
    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} className="size-6" tintColor="#A8B5DB" />
        </View>
    )
}
}

export default function TabsLayout() {
    return (
        <Tabs 
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            },
            tabBarStyle: {
                backgroundColor: '#0f0D23',
                borderRadius:40,
                marginHorizontal: 20,
                marginBottom: 20,
                height: 54
            }
            
            }}>
            <Tabs.Screen name="index" options={{
                title: "Home", headerShown: false,
                tabBarIcon: ({ focused }) => (<TabIcon focused={focused} icon={icons.home} title="Home" />)
            }} />
            <Tabs.Screen name="search" options={{ title: "Search", headerShown: false,
                tabBarIcon: ({ focused }) => (<TabIcon focused={focused} icon={icons.search} title="Search" />)}} />
            <Tabs.Screen name="saved" options={{ title: "Saved", headerShown: false,
                tabBarIcon: ({ focused }) => (<TabIcon focused={focused} icon={icons.save} title="Saved" />) }} />
            <Tabs.Screen name="profile" options={{ title: "Profile", headerShown: false,
                tabBarIcon: ({ focused }) => (<TabIcon focused={focused} icon={icons.person} title="Profile" />) }} />
        </Tabs>
    )
}