import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import firebase, { firestore } from 'firebase/app'
import { PieChart } from 'react-native-chart-kit'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import NameFont from '../components/NameFont'

const cohortCount = new Map()

export default function AlumniStats({ route, navigation }) {
  cohortCount.clear()

  const sliceColor = ['pink', 'white', 'green', 'red', 'yellow']
  const [json, setJson] = useState([])

  function fetchData(selectedAlumniStats) {
    const strStats = JSON.stringify(selectedAlumniStats)
    const strArray = strStats.split(',')
    let jsonStr = '['

    for (let i = 0; i < strArray.length; i++) {
      const splitStr = strArray[i].split(':')
      jsonStr += '{"name": ' + splitStr[0].replace('{', '') + ','
      jsonStr += '"statistic": "' + splitStr[1].replace('}', '') + '",'
      jsonStr += '"color":"' + sliceColor[i % 5] + '"'
      if (i !== strArray.length - 1) jsonStr += '},'
      else jsonStr += '}'
    }
    jsonStr += ']'
    const parsedArray = JSON.parse(jsonStr)

    const formattedData = parsedArray.map((item) => ({
      name: item.name,
      statistic: parseInt(item.statistic, 10),
      color: item.color,
      legendFontColor: 'white',
      // Add other properties if needed
    }))
    setJson(formattedData)
  }

  useEffect(() => {
    fetchData(route.params.selectedAlumniStats)
  }, [])

  return (
    <View>
      <Header> </Header>
      <Header onPress={() => navigation.navigate('Dashboard')}>
        Dashboard
      </Header>
      <Paragraph> Users' Cohort Statistics</Paragraph>
      <PieChart
        data={json}
        width={350}
        height={175}
        chartConfig={{
          backgroundColor: 'white',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 0,
          },
        }}
        style={{
          marginVertical: 100,
          borderRadius: 0,
          paddingVertical: 50,
          paddingRight: 1000,
          paddingLeft: 35,
        }}
        accessor="statistic"
      />
    </View>
  )
}
