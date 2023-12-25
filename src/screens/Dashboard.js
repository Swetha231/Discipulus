import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import { logoutUser } from '../api/auth-api'
import AlumniList from './AlumniList'
import AlumniDetails from './AlumniDetails'
import MarketPlaceList from './MarketPlaceList'
import AlumniStats from './AlumniStats'
import CurrentProfile from './CurrentProfile'

const cohortCount = new Map()
const count = {}

const getFromDB = async () => {
  const db = firebase.firestore()
  await db
    .collection('AlumniList')
    .orderBy('COHORT', 'asc')
    .onSnapshot((snapShot) => {
      snapShot.forEach((doc) => {
        if (count[doc.data().COHORT] === undefined) {
          count[doc.data().COHORT] = 0
        }
        count[doc.data().COHORT]++
      })
    })
}

export default function Dashboard({ navigation }) {
  // at the time of loading the dashbaord itself the alumni statistics data is loaded
  useEffect(() => {
    getFromDB()
  })
  const onSelectAlumniStats = async () => {
    navigation.navigate('AlumniStats', {
      selectedAlumniStats: count,
    })
  }

  return (
    <Background>
      <Logo />
      <Header>Hello {firebase.auth().currentUser.displayName}</Header>
      <Button mode="outlined" onPress={() => navigation.navigate(AlumniList)}>
        List of alumni
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate(AlumniDetails)}
      >
        Edit Details
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate(MarketPlaceList)}
      >
        MarketPlace
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate(CurrentProfile)}
      >
        Login Details
      </Button>
      <Button mode="outlined" onPress={onSelectAlumniStats}>
        Alumni Statistics
      </Button>
      <Button mode="outlined" onPress={logoutUser}>
        Logout
      </Button>
    </Background>
  )
}
