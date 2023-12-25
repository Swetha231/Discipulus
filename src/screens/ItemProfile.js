import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Button from '../components/Button'
import Header from '../components/Header'
import NameFont from '../components/NameFont'
import Background from '../components/Background'
import Logo from '../components/Logo'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'

export default function ItemProfile({ route, navigation }) {
  const [item, setItem] = useState({
    value: '',
    error: '',
  })
  const [price, setPrice] = useState({
    value: '',
    error: '',
  })
  const [status, setStatus] = useState({
    value: '',
    error: '',
  })
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const isUpdated = false

  function fetchData(selectedAlumniEmail) {
    const selectedAlumni = { item: '', price: '', status: '' }
    const db = firebase.firestore()
    const alumniRef = db
      .collection('MarketPlace')
      .where('EMAIL', '==', selectedAlumniEmail)
      .limit(1)
      .get()
      .then((doc) => {
        doc.forEach((itemDoc) => {
          setItem({ value: itemDoc.data().ITEM, error: '' })
          setPrice({ value: itemDoc.data().PRICE, error: '' })
          setStatus({ value: itemDoc.data().STATUS, error: '' })
        })
      })
  }

  useEffect(() => {
    fetchData(route.params.selectedAlumniEmail)
  }, [route.params.selectedAlumniEmail])

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Seller's Details</Header>
      <NameFont label="Contact Information" returnKeyType="next">
        Contact Information: {route.params.selectedAlumniEmail}
      </NameFont>
      <NameFont label="Item" returnKeyType="next">
        Item: {item.value}
      </NameFont>
      <NameFont label="Price" returnKeyType="next">
        Price: {price.value}
      </NameFont>
      <NameFont label="Status" returnKeyType="next">
        Status: {status.value}
      </NameFont>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 5,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
