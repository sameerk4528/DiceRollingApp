import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View,Animated,Easing } from 'react-native'
import type { JSX, PropsWithChildren } from 'react'
import React, { useRef, useState } from 'react'


import DiceOne from '../assets/One.png'
import DiceTwo from '../assets/Two.png'
import DiceThree from '../assets/Three.png'
import DiceFour from '../assets/Four.png'
import DiceFive from '../assets/Five.png'
import DiceSix from '../assets/Six.png'

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType
  animatedStyle: any
}>

const Dice = ({imageUrl, animatedStyle}:DiceProps):JSX.Element=>{  
  return(
    <Animated.View style={[styles.diceContainer, animatedStyle]}>
      <Image style={styles.diceImage} source={imageUrl}/>
    </Animated.View>
  )
}



export default function App():JSX.Element {
    const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne)

    const rollAnim = useRef(new Animated.Value(0)).current

   

const rotateX = rollAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '720deg'] 
});

const rotateY = rollAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '2160deg'] 
});

const rotateZ = rollAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'] 
});


const translateY = rollAnim.interpolate({
  inputRange: [0, 0.5, 1],
  outputRange: [0, -150, 0] 
});
const rollDiceOnPress = () => {
  
  rollAnim.setValue(0);
  Animated.timing(rollAnim, {
    toValue: 1,
    duration: 1000, 
    useNativeDriver: true,
  }).start();

  setTimeout(() => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    const images = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix];
    setDiceImage(images[randomNumber - 1]);
  }, 300); 
};


  return (
    <View style={styles.container}>
        
        <Animated.View 
      style={[
        styles.shadow, 
        {
          transform: [{ scale: rollAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.4, 1] 
          }) }],
          opacity: rollAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.2, 0.05, 0.2] 
          })
        }
      ]} 
    />

        <Dice 
      imageUrl={diceImage} 
      animatedStyle={{ 
        transform: [
          { perspective: 1000 },
          { translateY }, 
          { rotateX }, 
          { rotateY }, 
          { rotateZ },
          { scale: rollAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 1.3, 1] 
            }) 
          }
        ] 
      }} 
    />
        <Pressable onPress={rollDiceOnPress} >
          
          <Text style={styles.rollDiceBtnText}>Roll the dice</Text
        
        ></Pressable>
          </View>
  )
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF2F2',
  },
  diceContainer: {
    margin: 12,
  },
  diceImage: {
    width: 200,
    height: 200,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E5E0FF',
    fontSize: 16,
    color: '#8EA7E9',
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  shadow: {
  position: 'absolute',
  top: '55%', 
  width: 100,
  height: 20,
  backgroundColor: '#000',
  borderRadius: 50,
  alignSelf: 'center',
},

})