import { Alert, Text, View } from 'react-native';
import styles from './styles';
import ButtonCalc from '@/Components/Buttons/CalcButton';
import { useState } from 'react'; // Removido useEffect
import Placar from '@/Components/placar';
import Team from '@/Components/Team';
import TextoButton from '@/Components/Buttons/TextoButton';
import ZerarButton from '@/Components/Buttons/ZerarButton';
import CorrerBtn from '@/Components/Buttons/CorrerBtn';
import { useAudioPlayer } from 'expo-audio'; // Importação correta

const BTN_CORRER: Record<number, string> = {
  1: '♣️ Pedir truco ♣️',
  3: '♣️ Pedir 6 ♣️',
  6: '♣️ Pedir 9 ♣️',
  9: '♣️ Pedir 12 ♣️',
  12: '♣️ Pedir 12 ♣️',
};

export default function App() {
  const [teamA, setTeamA] = useState('Time A'.toUpperCase());
  const [placarA, setPlacarA] = useState(0);
  const [vitoriasA, setVitoriasA] = useState(0);

  const [teamB, setTeamB] = useState('Time B'.toUpperCase());
  const [placarB, setPlacarB] = useState(0);
  const [vitoriasB, setVitoriasB] = useState(0);

  const [point, setPoint] = useState(1);

  // --- carregar áudios ---
  const sounds = {
    pontoAdd: useAudioPlayer(require('@/assets/audio/pointAdd.wav')),
    pontoRemover: useAudioPlayer(require('@/assets/audio/pointRemove.wav')),
    truco: useAudioPlayer(require('@/assets/audio/truco.wav')),
    vitoria: useAudioPlayer(require('@/assets/audio/win.wav')),
    pato: useAudioPlayer(require('@/assets/audio/duck.mp3')),
  };

  // tocar áudios
  const playSound = (soundName: keyof typeof sounds) => {
    const player = sounds[soundName];
    player.seekTo(0); // Reinicia o som se já estiver tocando (evita delay)
    player.play();
  };

  function addPonto(team: string) {
    playSound('pontoAdd');
    const total = team === 'a' ? point + placarA : point + placarB;

    if (total >= 12) {
      Alert.alert(
        `${team === 'a' ? teamA : teamB} venceu a partida`,
        `Confirmar a vitória e iniciar outra partida?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "OK",
            onPress: () => {
              playSound('vitoria');
              team === 'a' ? setVitoriasA(vitoriasA + 1) : setVitoriasB(vitoriasB + 1);
              setPoint(1);
              setPlacarA(0);
              setPlacarB(0);
            }
          }
        ]
      );
    } else {
      team === 'a' ? setPlacarA(placarA + point) : setPlacarB(placarB + point);
      setPoint(1);
    }
  }

  function removePonto(team: string) {
    playSound('pontoRemover');
    const total = team === 'a' ? placarA - point : placarB - point;
    if (total <= 0) {
      team === 'a' ? setPlacarA(0) : setPlacarB(0);
    } else {
      team === 'a' ? setPlacarA(total) : setPlacarB(total);
    }
    setPoint(1);
  }

  function truco() {
    playSound('truco');
    if (point === 1) {
      setPoint(3);
    } else if (point < 12) {
      setPoint(point + 3);
    }
  }

  function correu() {
    playSound('pato');
    if (point > 3) {
      setPoint(point - 3);
    } else if (point === 3) {
      setPoint(1);
    }
  }

  function zerar() {
    setPoint(1);
    setPlacarA(0);
    setPlacarB(0);
    setVitoriasA(0);
    setVitoriasB(0);
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

      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <ButtonCalc onPress={() => addPonto('a')} tittle={`+ ${point}`} />
          <ButtonCalc onPress={() => addPonto('b')} tittle={`+ ${point}`} />
        </View>

        <View style={styles.row}>
          <ButtonCalc disabled={placarA <= 0} onPress={() => removePonto('a')} tittle={`- ${point}`} />
          <ButtonCalc disabled={placarB <= 0} onPress={() => removePonto('b')} tittle={`- ${point}`} />
        </View>
      </View>

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