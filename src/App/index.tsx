import EscapeButton from '@/Components/Buttons/EscapeButton';
import PointButton from '@/Components/Buttons/PointButton';
import ResetButton from '@/Components/Buttons/ResetButton';
import TrucoButton from '@/Components/Buttons/TrucoButton';
import Score from '@/Components/Score';
import ScrollContainer from '@/Components/ScrollContainer';
import Team from '@/Components/Team';
import { useAudioPlayer } from 'expo-audio';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import styles from './styles';

export default function App() {

  // hooks

  const [teamA, setTeamA] = useState('Time A'.toUpperCase())
  const [scoreA, setScoreA] = useState(0)
  const [victoriesA, setVictoriesA] = useState(0)

  const [teamB, setTeamB] = useState('Time B'.toUpperCase())
  const [scoreB, setScoreB] = useState(0)
  const [victoriesB, setVictoriesB] = useState(0)

  const [point, setPoint] = useState(1)

  // load sounds

  const sounds = {
    pointAdd: useAudioPlayer(require('@/assets/audio/pointAdd.wav')),
    pointRemove: useAudioPlayer(require('@/assets/audio/pointRemove.wav')),
    truco: useAudioPlayer(require('@/assets/audio/truco.wav')),
    victorie: useAudioPlayer(require('@/assets/audio/win.wav')),
    duck: useAudioPlayer(require('@/assets/audio/duck.mp3')),
  }

  // functions

  function playSound(soundName: keyof typeof sounds) {
    const player = sounds[soundName]
    player.seekTo(0) // reset audio
    player.play()
  }

  function pointAdd(team: string) {
    playSound('pointAdd')
    const total = team === 'a' ? point + scoreA : point + scoreB

    if (total >= 12) {

      Alert.alert(
        `${team === 'a' ? teamA : teamB} venceu a partida`,
        `Confirmar a vitória e iniciar outra partida?`,
        [
          // button cancel
          { text: "Cancelar", style: "cancel" },
          // button ok
          {
            text: "OK",
            onPress: () => {
              playSound('victorie')
              team === 'a' ? setVictoriesA(victoriesA + 1) : setVictoriesB(victoriesB + 1)
              setPoint(1)
              setScoreA(0)
              setScoreB(0)
            }
          }
        ]
      )

    } else {
      team === 'a' ? setScoreA(scoreA + point) : setScoreB(scoreB + point)
      setPoint(1)
    }
  }

  function pointRemove(team: string) {
    playSound('pointRemove')
    const total = team === 'a' ? scoreA - point : scoreB - point
    if (total <= 0) {
      team === 'a' ? setScoreA(0) : setScoreB(0)
    } else {
      team === 'a' ? setScoreA(total) : setScoreB(total)
    }
    setPoint(1)
  }

  function truco() {
    playSound('truco')
    if (point === 1) {
      setPoint(3)
    } else if (point < 12) {
      setPoint(point + 3)
    }
  }

  function escape() {
    playSound('duck')
    if (point > 3) {
      setPoint(point - 3)
    } else if (point === 3) {
      setPoint(1)
    }
  }

  function reset() {
    setPoint(1)
    setScoreA(0)
    setScoreB(0)
    setVictoriesA(0)
    setVictoriesB(0)
  }

  return (
    <ScrollContainer style={styles.container}>

      {/* logo */}
      <Text style={styles.h1}>♦️ TRUCO ♦️</Text>

      {/* team name and count victories */}
      <View style={styles.row}>
        <Team team={teamA} setTeam={setTeamA} victories={victoriesA} />
        <Team team={teamB} setTeam={setTeamB} victories={victoriesB} />
      </View>

      {/* points */}
      <View style={styles.row}>
        <Score score={scoreA} />
        <Score score={scoreB} />
      </View>

      {/* add point buttons */}
      <View style={styles.col}>
        <View style={styles.row}>
          <PointButton onPress={() => pointAdd('a')} tittle={`+ ${point}`} />
          <PointButton onPress={() => pointAdd('b')} tittle={`+ ${point}`} />
        </View>

        {/* remove point buttons */}
        <View style={styles.row}>
          <PointButton disabled={scoreA <= 0} onPress={() => pointRemove('a')} tittle={`- ${point}`} />
          <PointButton disabled={scoreB <= 0} onPress={() => pointRemove('b')} tittle={`- ${point}`} />
        </View>
      </View>

      {/* truco button */}
      <View style={styles.row}>
        <TrucoButton disabled={point >= 12} onPress={truco} point={point} />
      </View>

      {/* escape button */}
      <View style={styles.row}>
        <EscapeButton disabled={point <= 1} onPress={escape} point={point} />
      </View>

      {/* reset buttons */}
      <View style={styles.row}>
        <ResetButton onPress={reset} />
      </View>

    </ScrollContainer>
  )
}