import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { theme } from '../core/theme'
import Header from '../components/Header'
import NameFont from '../components/NameFont'

export default function CurrentProfile({ navigation }) {
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header> </Header>
      <Logo />
      <Button>Login Details</Button>
      <NameFont>Username: {firebase.auth().currentUser.displayName}</NameFont>
      <NameFont> Email: {firebase.auth().currentUser.email}</NameFont>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingLeft: 35,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
