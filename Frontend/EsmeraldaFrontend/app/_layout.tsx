import { Stack } from "expo-router";

export default function RootLayout() {
  return (
     <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitle:"Esmeralda",
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}></Stack>
  )
}
