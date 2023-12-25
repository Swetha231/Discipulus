import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import firebase, { firestore } from 'firebase/app'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import NameFont from '../components/NameFont'
import { theme } from '../core/theme'

/** set the variables to use for item price, item name, taken/availble status */
export default function AddItems({ navigation }) {
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

  function addOrUpdateItem(itemValue, priceValue, statusValue) {
    const db = firebase.firestore()
    const alumniId = ''
    const alumniRef = db
      .collection('MarketPlace')
      .where('EMAIL', '==', firebase.auth().currentUser.email)
      .limit(1)
      .get()
      .then((doc) => {
        if (doc.empty) {
          alert('Item created')
          /** add in the newly created item into the marketplace list */
          db.collection('MarketPlace').add({
            ITEM: itemValue,
            PRICE: priceValue,
            STATUS: statusValue,
            NAME: firebase.auth().currentUser.displayName,
            EMAIL: firebase.auth().currentUser.email,
          })
        } else {
          alert('Item Updated')
          db.collection('MarketPlace')
            .doc(doc.docs[0].id)
            .update({
              ITEM: itemValue,
              PRICE: priceValue,
              STATUS: statusValue,
              EMAIL: firebase.auth().currentUser.email,
            })
            .then((d) => {})
            .catch((e) => {})
        }
      })
  }

  const handleSubmit = () => {
    addOrUpdateItem(item.value, price.value, status.value)
  }

  return (
    <Background>
      <NameFont onPress={() => navigation.navigate('Dashboard')}>
        Dashboard
      </NameFont>
      <Logo />
      <Header>Add Item {firebase.auth().currentUser.displayName}</Header>
      <TextInput
        label="Item"
        returnKeyType="next"
        value={item.value}
        onChangeText={(text) => setItem({ value: text, error: '' })}
      />
      <TextInput
        label="Price"
        returnKeyType="done"
        value={price.value}
        onChangeText={(text) => setPrice({ value: text, error: '' })}
      />
      <TextInput
        label="Status (Available/Taken)"
        returnKeyType="done"
        value={status.value}
        onChangeText={(text) => setStatus({ value: text, error: '' })}
      />
      <Button
        loading={loading}
        mode="contained"
        onPress={handleSubmit}
        style={{ marginTop: 24 }}
      >
        Add Item
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
  },
})
