import React from 'react'
import firebase from 'firebase/app'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen({ navigation }) {
  const dummyUserLogin = () => {
    try {
      // eslint-disable-next-line no-undef
      user = firebase
        .auth()
        .signInWithEmailAndPassword('dummy@gmail.com', 'dummy123')
      firebase.auth().currentUser.updateProfile({
        displayName: 'dummy',
      })
      // firebase.auth().updateCurrentUser(user)
    } catch (error) {
      return {
        error: error.message,
      }
    }
    navigation.navigate('Dashboard')
    return {}
  }
  return (
    <Background>
      <Logo />
      <Header>discipulus</Header>
      <Paragraph>Connecting with Alumni </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button mode="contained" onPress={dummyUserLogin}>
        Dashboard
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
