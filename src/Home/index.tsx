import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import styles from './styles';
import ButtonCalc from '@/Components/Buttons/CalcButton';
import Input from '@/Components/Inputs';
import { useEffect, useState } from 'react';
import Placar from '@/Components/placar';
import Team from '@/Components/Team';
import TextoButton from '@/Components/Buttons/TextoButton';
import ZerarButton from '@/Components/Buttons/ZerarButton';
import CorrerBtn from '@/Components/Buttons/CorrerBtn';
import { Audio } from 'expo-av'

type SoundMap = {
  [key: string]: Audio.Sound
};

const BTN_CORRER: Record<number, string> = {
  1: '♣️ Pedir truco ♣️',
  3: '♣️ Pedir 6 ♣️',
  6: '♣️ Pedir 9 ♣️',
  9: '♣️ Pedir 12 ♣️',
  12: '♣️ Pedir 12 ♣️',
}

export default function App() {

  const [teamA, setTeamA] = useState('Time A'.toUpperCase())
  const [placarA, setPlacarA] = useState(0)
  const [vitoriasA, setVitoriasA] = useState(0)

  const [teamB, setTeamB] = useState('Time B'.toUpperCase())
  const [placarB, setPlacarB] = useState(0)
  const [vitoriasB, setVitoriasB] = useState(0)

  const [point, setPoint] = useState(1)


  // Estado inicializado como um objeto vazio
  const [sounds, setSounds] = useState<SoundMap>({});

  useEffect(() => {
    async function loadAllSounds() {
      // Definição dos áudios que você quer carregar
      const audioFiles = {
        pontoAdd: require('@/assets/audio/pointAdd.wav'),
        pontoRemover: require('@/assets/audio/pointRemove.wav'),
        truco: require('@/assets/audio/truco.wav'),
        vitoria: require('@/assets/audio/win.wav'),
        pato: require('@/assets/audio/duck.mp3'),
      };

      const loadedSounds: SoundMap = {};

      // Carrega cada som e armazena no objeto
      for (const [key, source] of Object.entries(audioFiles)) {
        const { sound } = await Audio.Sound.createAsync(source);
        loadedSounds[key] = sound;
      }

      setSounds(loadedSounds);
    }

    loadAllSounds();

    // Cleanup: Descarrega todos os sons ao desmontar o componente
    return () => {
      Object.values(sounds).forEach(s => s.unloadAsync());
    };
  }, []);

  // Função genérica para tocar qualquer som pelo nome
  async function playSound(soundName: "pontoAdd" | "pontoRemover" | 'vitoria' | 'truco' | "pato") {
    const soundToPlay = sounds[soundName];

    if (soundToPlay) {
      await soundToPlay.setPositionAsync(0);
      await soundToPlay.playAsync();
    }
  }

  function addPonto(team: string) {
    playSound('pontoAdd')
    // sounds.pontoAdd.playAsync()
    const total = team === 'a' ? point + placarA : point + placarB

    if (total >= 12) {
      Alert.alert(
        `${team === 'a' ? teamA : teamB} venceu a partida`,
        `Confirmar a vitória e iniciar outra partida?`,
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              playSound('vitoria')
              // 2. A lógica de resetar SÓ roda se clicar em OK
              team === 'a' ? setVitoriasA(vitoriasA + 1) : setVitoriasB(vitoriasB + 1)
              setPoint(1)
              setPlacarA(0)
              setPlacarB(0)
            }
          }
        ]
      )
    } else {
      team === 'a' ? setPlacarA(placarA + point) : setPlacarB(placarB + point)
      setPoint(1)
    }
  }

  function removePonto(team: string) {
    playSound('pontoRemover')
    const total = team === 'a' ? placarA - point : placarB - point
    if (total <= 0) {
      team === 'a' ? setPlacarA(0) : setPlacarB(0)
    } else {
      team === 'a' ? setPlacarA(total) : setPlacarB(total)
    }
    setPoint(1)
  }

  function truco() {
    playSound('truco')
    if (point === 1) {
      setPoint(point + 2)
    } else if (point < 12) {
      setPoint(point + 3)
    }
  }

  function correu() {
    playSound('pato')
    if (point > 3) {
      setPoint(point - 3)
    } else if (point === 3) {
      setPoint(point - 2)
    }
  }

  function zerar() {
    setPoint(1)
    setPlacarA(0)
    setPlacarB(0)
    setVitoriasA(0)
    setVitoriasB(0)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>♦️ TRUCO ♦️</Text>

      <View style={styles.row}>
        <Team nome={teamA} setNome={setTeamA} vitorias={vitoriasA} />
        <Team nome={teamB} setNome={setTeamB} vitorias={vitoriasB} />
      </View>
      <View style={styles.row}>
        <Placar tittle={placarA} />
        <Placar tittle={placarB} />
      </View>

      {/* buttons container */}
      <View style={styles.buttonsContainer}>
        {/* buttons list */}
        <View style={styles.row}>
          <ButtonCalc onPress={() => addPonto('a')} tittle={`+ ${point}`} />
          <ButtonCalc onPress={() => addPonto('b')} tittle={`+ ${point}`} />
        </View>
        {/* buttons list */}
        <View style={styles.row}>
          <ButtonCalc disabled={(point <= 1)} onPress={() => removePonto('a')} tittle={`- ${point}`} />
          <ButtonCalc disabled={point <= 1} onPress={() => removePonto('b')} tittle={`- ${point}`} />
        </View>
      </View>

      {/* button pedir truco! */}

      <View style={styles.row}>
        <TextoButton disabled={point >= 12} onPress={truco} texto={BTN_CORRER[point] || ''} />
      </View>
      <View style={styles.row}>
        <CorrerBtn disabled={point <= 1} onPress={correu} texto={`🦆 Correu 🦆`} />
      </View>
      <View style={styles.row}>
        <ZerarButton onPress={zerar} texto='Zerar tudo' />
      </View>
    </View>
  );
}
