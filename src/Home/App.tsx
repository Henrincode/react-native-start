import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles';
import ButtonCalc from '@/Components/Buttons/CalcButton';
import Input from '@/Components/Inputs';
import { useState } from 'react';

export default function App() {

  const [teamA, setTeamA] = useState('TEAM A')
  const [teamB, setTeamB] = useState('TEAM B')
  
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>♦️ TRUCO ♦️</Text>

      <View style={styles.row}>
          <Input onChangeText={(text) => setTeamA(text)} value={teamA} maxLength={6} />
          <Input onChangeText={(text) => setTeamB(text)} value={teamB} maxLength={6} />
        </View>

      {/* buttons container */}
      <View style={styles.buttonsContainer}>
        {/* buttons list */}
        <View style={styles.row}>
          <ButtonCalc tittle='+1' />
          <ButtonCalc tittle='+1' />
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
      <View style={styles.row}>
        <ButtonCalc tittle='Pedir truco' />
      </View>
    </View>
  );
}
