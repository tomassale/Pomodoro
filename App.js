import { 
  StyleSheet, 
  Platform, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity
} from 'react-native'
import { useEffect, useState } from 'react'
import Header from './src/components/Header'
import Timer from './src/components/Timer'
import { Audio } from 'expo-av'


export default function App() {
  const [isWorking, setIsWorking] = useState(false)
  const [time, setTime] = useState(25*60)
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK')
  const [active, setActive] = useState(false)

  const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2']

  //Timer funcionando
  useEffect(()=>{
    let interval = null
    if (active) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    //Reinicia el tiempo cuando termina
    if (time === 0){
      setActive(false)
      setIsWorking((prev) => !prev)
      setTime(isWorking ? 300 : 1500)
    }

    return() => {
      clearInterval(interval)
    }
  }, [active, time])

  function handleTimer(){
    sound()
    setActive(!active)
  }

  //Sonido al tocar boton
  async function sound(){
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/click.mp3')
    )
    await sound.pauseAsync()
  }

  //Vista de app
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <View 
        style={{ 
          flex: 1,
          paddingHorizontal: 15, 
          paddingTop: Platform.OS === 'android' && 30,
          borderWidth: 3,
        }}>
        <Text style={ styles.text }>Pomodoro</Text>
        <Header 
        currentTime={currentTime} 
        setCurrentTime= {setCurrentTime}
        setTime={setTime}/>
        <Timer time={time}/>
        <TouchableOpacity onPress={handleTimer} style={styles.button}>
          <Text style={{ color: 'white', fontWeight: 'bold'}}>
            {active ? 'STOP': 'START'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  }
})