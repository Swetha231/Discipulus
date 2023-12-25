import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import firebase, { firestore } from 'firebase/app'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { occupationValidator } from '../helpers/occupationValidator'
import { cohortValidator } from '../helpers/cohortValidator'

export default function AlumniDetails({ navigation }) {
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

  function addOrUpdateAlumni(cohortValue, occupationValue, univValue) {
    const db = firebase.firestore()
    const alumniId = ''
    const alumniRef = db
      .collection('AlumniList')
      .where('EMAIL', '==', firebase.auth().currentUser.email)
      .limit(1)
      .get()
      .then((doc) => {
        if (doc.empty) {
          /**  if the alumni details have never been entered before, then update alumni created */
          alert('Alumni created')
          db.collection('AlumniList').add({
            COHORT: cohortValue,
            JOB: occupationValue,
            UNIVERSITY: univValue,
            NAME: firebase.auth().currentUser.displayName,
            EMAIL: firebase.auth().currentUser.email,
          })
        } else {
          /**  if alumni details have already been entered before, update the ulmni details  */
          alert('Alumni Updated')
          db.collection('AlumniList').doc(doc.docs[0].id).update({
            COHORT: cohortValue,
            JOB: occupationValue,
            UNIVERSITY: univValue,
            EMAIL: firebase.auth().currentUser.email,
          })
        }
      })
  }

  const handleSubmit = () => {
    const cohortError = cohortValidator(cohort.value)
    const occupationError = occupationValidator(occupation.value)
    if (cohortError || occupationError) {
      setCohort({ ...cohort, error: cohortError })
      setOccupation({ ...occupation, error: occupationError })
      return
    }
    addOrUpdateAlumni(cohort.value, occupation.value, university.value)
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Enter Details {firebase.auth().currentUser.displayName}</Header>
      <TextInput
        label="Cohort/Graduating Year"
        returnKeyType="next"
        value={cohort.value}
        onChangeText={(text) => setCohort({ value: text, error: '' })}
        error={!!cohort.error}
        errorText={cohort.error}
      />
      <TextInput
        label="Occupation"
        returnKeyType="done"
        value={occupation.value}
        onChangeText={(text) => setOccupation({ value: text, error: '' })}
        error={!!occupation.error}
        errorText={occupation.error}
      />
      <TextInput
        label="Univeristy"
        returnKeyType="done"
        value={university.value}
        onChangeText={(text) => setUniversity({ value: text, error: '' })}
      />
      <Button
        loading={loading}
        mode="outlined"
        onPress={handleSubmit}
        style={{ marginTop: 24 }}
      >
        Save
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
