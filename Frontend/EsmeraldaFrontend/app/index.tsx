import { StyleSheet, View } from "react-native";
import ChatScreen from "./chatscreen";
export default function Index() {
  return (
      <View style={styles.container}>
           <ChatScreen></ChatScreen>
      </View>
      
     
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    display:'flex',
    backgroundColor:'white'
  },
  white: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
