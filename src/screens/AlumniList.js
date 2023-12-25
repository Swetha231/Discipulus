/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Table, Rows, Row, Col, Cell } from 'react-native-table-component'
import DataTable, { COL_TYPES } from 'react-native-datatable-component'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Button from '../components/Button'
import Header from '../components/Header'
import NameFont from '../components/NameFont'
import TextInput from '../components/TextInput'

export default function AlumniList({ navigation }) {
  const [loading, setloading] = useState(false)
  // Store Firebase Data
  const [alumni, setAlumni] = useState([])
  const rowHeader = ['Select', 'NAME', 'COHORT', 'JOB', 'UNIVERSITY']
  const colSettings = [
    { name: 'Select', type: COL_TYPES.CHECK_BOX, width: '10%' },
    { name: 'COHORT', type: COL_TYPES.STRING, width: '22%' },
    { name: 'JOB', type: COL_TYPES.STRING, width: '20%' },
    { name: 'NAME', type: COL_TYPES.STRING, width: '19%' },
    { name: 'UNIVERSITY', type: COL_TYPES.STRING, width: '29%' },
  ]
  const [search, setSearch] = useState({ value: '', error: '' })

  useEffect(() => {
    const fetchData = async () => {
      let docs
      const db = firebase.firestore()
      const collectionRef = db.collection('AlumniList')
      const snapshot = await collectionRef.get()
      if (search.value.length === 0) {
        docs = snapshot.docs.map((doc) => doc.data())
      } else {
        docs = snapshot.docs.filter(
          (doc) =>
            doc
              .get('NAME')
              .toLowerCase()
              .startsWith(search.value.toLowerCase()) === true ||
            doc
              .get('COHORT')
              .toLowerCase()
              .startsWith(search.value.toLowerCase()) === true ||
            doc
              .get('JOB')
              .toLowerCase()
              .startsWith(search.value.toLowerCase()) === true ||
            doc
              .get('UNIVERSITY')
              .toLowerCase()
              .startsWith(search.value.toLowerCase()) === true
        )
        docs = docs.map((doc) => doc.data())
      }
      setAlumni(docs)
    }
    fetchData()
  }, [search.value])

  const onSelectAlumni = async (item) => {
    navigation.navigate('IndivAlumniProfile', {
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
        <Header>Alumni List</Header>
        <TextInput
          autoCapitalize="none"
          label="Search here"
          value={search.value}
          onChangeText={(text) => setSearch({ value: text, error: '' })}
        />

        <DataTable
          onRowSelect={(row) => onSelectAlumni(row.EMAIL)}
          data={alumni}
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
