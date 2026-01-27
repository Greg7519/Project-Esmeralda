import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, View } from 'react-native';

export default function Mic() {
  return (
    <View style={styles.container}>
     
          <Feather name="mic" size={18} color="white" />
    
         
      
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginRight: 2,
    alignItems: 'flex-end',
 
    marginVertical:'auto'
  },
});
