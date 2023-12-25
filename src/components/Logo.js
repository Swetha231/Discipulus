import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return (
    <Image
      source={require('../assets/discipulusLogo.png')}
      style={styles.image}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
    paddingLeft: 10,
    marginVertical: 10,
    paddingVertical: 2,
  },
})
