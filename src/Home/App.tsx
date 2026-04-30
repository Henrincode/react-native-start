import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles';
import ButtonCalc from '@/Components/Buttons/CalcButton';
import Input from '@/Components/Inputs';
import { useState } from 'react';
import Placar from '@/Components/placar';

export default function App() {

  const [teamA, setTeamA] = useState('TEAM A')
  const [teamB, setTeamB] = useState('TEAM B')

  const [placarA, setPlacarA] = useState(0)
  const [placarB, setPlacarB] = useState(0)

  const [point, setPoint] = useState(1)

  function truco() {
    if (point === 1) {
      setPoint(point + 2)
    } else if (point < 12) {
      setPoint(point + 3)
    }
  }

  function correu() {
    if (point > 3) {
      setPoint(point - 3)
    } else if (point === 3) {
      setPoint(point - 2)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>♦️ TRUCO ♦️</Text>

      <View style={styles.row}>
        <Input onChangeText={(text) => setTeamA(text)} value={teamA} maxLength={6} />
        <Input onChangeText={(text) => setTeamB(text)} value={teamB} maxLength={6} />
      </View>
      <View style={styles.row}>
        <Placar tittle={placarA} />
        <Placar tittle={placarB} />
      </View>

      {/* buttons container */}
      <View style={styles.buttonsContainer}>
        {/* buttons list */}
        <View style={styles.row}>
          <ButtonCalc onPress={() => setPlacarA(placarA + point)} tittle={`+ ${point}`} />
          <ButtonCalc onPress={() => setPlacarB(placarB + point)} tittle={`+ ${point}`} />
        </View>
        {/* <View style={styles.row}>
          <ButtonCalc tittle='+3' />
          <ButtonCalc tittle='+3' />
        </View>
        <View style={styles.row}>
          <ButtonCalc tittle='-1' />
          <ButtonCalc tittle='-1' />
        </View> */}
      </View>

      {/* button pedir truco! */}
      {point > 1 && (
        <View style={styles.row}>
          <ButtonCalc onPress={correu} tittle='Correu' />
        </View>
      )}
      <View style={styles.row}>
        <ButtonCalc onPress={truco} tittle='Pedir truco' />
      </View>
    </View>
  );
}
