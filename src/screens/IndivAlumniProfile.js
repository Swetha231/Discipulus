import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Header from '../components/Header'
import NameFont from '../components/NameFont'
import Background from '../components/Background'
import Logo from '../components/Logo'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'

export default function IndivAlumniProfile({ route, navigation }) {
  const [occupation, setOccupation] = useState({
    value: '',
    error: '',
  })
  const [name, setName] = useState({
    value: '',
    error: '',
  })
  const [cohort, setCohort] = useState({
    value: '',
    error: '',
  })
  const [university, setUniversity] = useState({
    value: '',
    error: '',
  })
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const isUpdated = false

  function fetchData(selectedAlumniEmail) {
    const selectedAlumni = { job: '', cohort: '', name: '' }
    const db = firebase.firestore()
    const alumniRef = db
      .collection('AlumniList')
      .where('EMAIL', '==', selectedAlumniEmail)
      .limit(1)
      .get()
      .then((doc) => {
        doc.forEach((alumniDoc) => {
          setOccupation({ value: alumniDoc.data().JOB, error: '' })
          setCohort({ value: alumniDoc.data().COHORT, error: '' })
          setName({ value: alumniDoc.data().NAME, error: '' })
          setUniversity({ value: alumniDoc.data().UNIVERSITY, error: '' })
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
      <Header>{name.value}'s Details</Header>
      <NameFont label="Email" returnKeyType="next">
        Email: {route.params.selectedAlumniEmail}
      </NameFont>
      <NameFont label="Cohort" returnKeyType="next">
        Cohort: {cohort.value}
      </NameFont>
      <NameFont label="Name" returnKeyType="next">
        Name: {name.value}
      </NameFont>
      <NameFont label="Occupation" returnKeyType="next">
        Occupation: {occupation.value}
      </NameFont>
      <NameFont label="Univeristy" returnKeyType="next">
        University: {university.value}
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
