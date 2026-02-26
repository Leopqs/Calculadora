import { StyleSheet, Text, TextInput, View } from "react-native";

export default function RootLayout() {

  return (
    <View style={styles.calculadora}>
      <TextInput style={styles.visor}></TextInput>
    
      <Text style={styles.fileira1}> 1 </Text>
      <Text style={styles.fileira1}> 2 </Text>
      <Text style={styles.fileira1}> 3 </Text>
      <Text style={styles.fileira1}> / </Text>

      <Text style={styles.fileira2}> 4 </Text>
      <Text style={styles.fileira2}> 5 </Text>
      <Text style={styles.fileira2}> 6 </Text>
      <Text style={styles.fileira2}> x </Text>
      
      <Text style={styles.fileira3}> 7 </Text>
      <Text style={styles.fileira3}> 8 </Text>
      <Text style={styles.fileira3}> 9 </Text>
      <Text style={styles.fileira3}> - </Text>

      <Text style={styles.fileira4}> 0 </Text>
      <Text style={styles.fileira4}> , </Text>
      <Text style={styles.fileira4}> + </Text>
      <Text style={styles.fileira4}> = </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    calculadora:{
      backgroundColor: '#FE3867',
      height: 600,
      width: 400,
      margin: 80,
      borderRadius: 30
    },

    visor:{
      backgroundColor:'gray',
      margin: 50,
      borderRadius: 30
    },

    fileira1:{
      backgroundColor: 'black',
      color: 'white',
      borderRadius: 1000,
      margin: 10,
      width: 17,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    fileira2:{
      backgroundColor: 'black',
      color: 'white',
      borderRadius: 1000,
      margin: 10,
      width: 17,
      marginLeft: 60
    },

    fileira3:{
      backgroundColor: 'black',
      color: 'white',
      borderRadius: 1000,
      display: 'flex',
      margin: 10,
      width: 17
    },

    fileira4:{
      backgroundColor: 'black',
      color: 'white',
      borderRadius: 1000,
      margin: 10,
      width: 17
    },
  })