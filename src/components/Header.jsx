import { View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

//Opciones de timers
export default function Header({currentTime, setCurrentTime, setTime}) {
  
  const options = ['Pomodoro', 'Short Break', 'Long Break']
  function handlePress(index){
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15
    setCurrentTime(index)
    setTime(newTime * 60)
  }

  //Vista de opciones
  return(
    <View style={{flexDirection: 'row'}}>
      {options.map((obj, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => handlePress(index)} 
          style={[styles.itemStyle, currentTime !== index && { borderColor: 'transparent'},
        ]}
        >
          <Text style={{fontWeight: 'bold'}}>{obj}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

//Estilos
const styles = StyleSheet.create({
  itemStyle: {
    width: '33%',
    alignItems: 'center',
    borderWidth: 3,
    padding: 5,
    borderRadius: 10,
    borderColor: 'white',
    marginVertical: 20,
  }
})