/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Table, Rows, Row, Col, Cell } from 'react-native-table-component'
import DataTable, { COL_TYPES } from 'react-native-datatable-component'
import firebase from 'firebase/app'
import 'firebase/firestore'
import RightAlign from '../components/RightAlign'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Header from '../components/Header'
import NameFont from '../components/NameFont'
import TextInput from '../components/TextInput'

export default function MarketPlaceList({ navigation }) {
  const [loading, setloading] = useState(false)
  // Store Firbase Data
  const [marketplace, setMarketPlace] = useState([])
  const rowHeader = ['Select', 'ITEM', 'PRICE', 'STATUS']
  const colSettings = [
    { name: 'Select', type: COL_TYPES.CHECK_BOX, width: '10%' },
    { name: 'ITEM', type: COL_TYPES.STRING, width: '30%' },
    { name: 'PRICE', type: COL_TYPES.STRING, width: '30%' },
    { name: 'STATUS', type: COL_TYPES.STRING, width: '30%' },
  ]

  const [search, setSearch] = useState({ value: '', error: '' })

  useEffect(() => {
    // synchronous call is when it goes in order and waits
    const fetchData = async () => {
      let docs
      const db = firebase.firestore()
      const collectionRef = db.collection('MarketPlace')
      const snapshot = await collectionRef.get()
      if (search.value.length === 0) {
        docs = snapshot.docs.map((doc) => doc.data())
      } else {
        docs = snapshot.docs.filter(
          (doc) =>
            doc
              .get('ITEM')
              .toLowerCase()
              .startsWith(search.value.toLowerCase()) === true ||
            doc
              .get('PRICE')
              .toLowerCase()
              .startsWith(search.value.toLowerCase()) === true ||
            doc
              .get('STATUS')
              .toLowerCase()
              .startsWith(search.value.toLowerCase()) === true
        )
        docs = docs.map((doc) => doc.data())
      }
      setMarketPlace(docs)
    }
    fetchData()
  }, [search.value])

  const onSelectItem = async (item) => {
    navigation.navigate('ItemProfile', {
      selectedAlumniEmail: item,
    })
  }

  return (
    <View>
      <View>
        <Header> </Header>
        <NameFont onPress={() => navigation.navigate('Dashboard')}>
          Dashboard
        </NameFont>
        <Header>Market Place</Header>
        <RightAlign onPress={() => navigation.navigate('AddItems')}>
          Add Item
        </RightAlign>
        <TextInput
          autoCapitalize="none"
          label="Search here"
          value={search.value}
          onChangeText={(text) => setSearch({ value: text, error: '' })}
        />

        <DataTable
          onRowSelect={(row) => onSelectItem(row.EMAIL)}
          data={marketplace}
          colNames={rowHeader}
          backgroundColor="#acaaab31"
          colSettings={colSettings}
          headerLabelStyle={{ color: 'purple', fontSize: 11 }}
          noOfPages={12}
        />
      </View>
    </View>
  )
}
