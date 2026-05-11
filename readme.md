# React Native EXPO - Start

Olá mundo! Este é meu primeiro projeto de React Native, aqui farei anotações do passo a passo para baixar, configurar e executar um projeto no framework.

## Bainxando o React Native Expo

Tenha o NodeJS e NPM instalado:

- [Site oficial NodeJS](https://nodejs.org/pt-br)

Abra o terminal CMD na pasta que deseja criar o projeto:

 - `npx create-expo-app --template`
 - Selecione Blanck TypeScript:

    ![alt text](./docs/img/install-blank-ts.png)

 - Digite o nome do projeto e pronto!

Caso já esteja dentro da pasta do projeto use ponto `.` para informar ao sistema que não quer criar uma pasta com o nome do projeto:

 - `npx create-expo-app . --template`
 - `npm start`

 Caso esteja em uma rede que não permita rodar online use:

 - `npx expo start --offline`

 Corrigir versões de bibliotecas:

 - `npx expo install --check`

### Criando atalho para abrir somente o **emulador de Android**:

No bloco de notas crie o arquivo a seguir com a extensão **`.bat`** e salve em qualquer lugar:

```powershell
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c start "" /b %LOCALAPPDATA%\Android\Sdk\emulator\emulator.exe -avd nome_do_emulador -no-boot-anim -netdelay none", 0
Set WshShell = Nothing
```

*no lugar de `-avd nome_do_emulador` depois de `-avd` coloque o nome do emulador criado no Android Studio ex: `-avd Pixel_7` e lembre-se de substituir espaços por underline `Nome Emulador` por `Nome_Emulador`, agora faça um atalho e mude o icone nas propriedades do atalho.*

### Flags úteis:

| FLAG | O QUE FAZ |
| - | - |
| -avd nome_do_emulador | Coloque o nome do emulador criado no Android Studio |
| -no-boot-anim | Desativa a animação de boot (abre um pouquinho mais rápido). |
| -netdelay none | Remove qualquer atraso simulado de rede. |
| -netspeed full | Define a velocidade da internet no máximo. |
| -dns-server 8.8.8.8 | Força o emulador a usar o DNS do Google (resolve muitos problemas de conexão no Android). |


# Estrutura base

Para facilitar, aqui está a **"Escada de Ouro"** (a estrutura padrão profissional) que você deve usar como base para quase todas as suas telas.

### A Estrutura Completa

```javascript
import { 
  StyleSheet, 
  View, 
  Text, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    // 1. PROVIDER: Deve envolver o app inteiro (geralmente no App.js).
    // Ele calcula o tamanho do notch/barras de sistema para o resto do app.
    <SafeAreaProvider>
      
      {/* 2. SAFEAREAVIEW: Garante que o conteúdo não suba para a barra de status (iOS/Android) */}
      <SafeAreaView style={styles.safeArea}>
        
        {/* 3. STATUSBAR: Controla apenas a cor dos ícones (hora, bateria) */}
        <StatusBar style="light" backgroundColor="#FF5252" translucent={false} />

        {/* 4. KEYBOARDAVOIDINGVIEW: Faz o conteúdo "pular" para cima do teclado */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          
          {/* 5. SCROLLVIEW: Permite rolar a tela e evita o erro de layout interno */}
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >

            {/* 6. CONTAINER: Onde você realmente coloca seu código e estilos de alinhamento */}
            <View style={styles.container}>
               <Text style={styles.h1}>♦️ TRUCO ♦️</Text>
               {/* Resto dos seus componentes... */}
            </View>

          </ScrollView>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#333', // Mesma cor do seu Header para um visual infinito
  },
  scrollContent: {
    flexGrow: 1, // Crucial para o ScrollView ocupar a tela toda e permitir centralizar itens
  },
  container: {
    flex: 1,
    backgroundColor: '#333', // Cor de fundo do corpo do seu app
    alignItems: 'center',
    padding: 20,
  },
  h1: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#FF5252',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    borderRadius: 20, // Se quiser aquele efeito arredondado da imagem
  }
});

```

### Explicando a "Cebola" (de fora para dentro):

1. **`SafeAreaProvider`**: É o "cérebro". Ele mede o celular e diz: "Olha, esse iPhone tem um notch de 44 pixels". Você coloca ele uma vez só na raiz do projeto.
2. **`SafeAreaView`**: É o "escudo". Ele usa as medidas do Provider para aplicar um `padding` automático no topo. No Android (com `translucent: false`), ele não faz nada (porque não precisa), mas no iOS ele salva seu layout.
3. **`StatusBar`**: É puramente estética. Não ocupa espaço, só diz se os ícones lá no topo são brancos ou pretos.
4. **`KeyboardAvoidingView`**: É o "mola". Ele monitora o teclado. Se o teclado sobe, ele encolhe o tamanho da tela para que os itens lá de baixo subam.
5. **`ScrollView`**: É o "contentor". Ele permite que, se o seu app tiver muitos botões, o usuário consiga rolar. O segredo aqui é o `contentContainerStyle={{ flexGrow: 1 }}`, que evita aquele erro que você teve no começo.
6. **Sua `View` de conteúdo**: Aqui é onde você brilha! Coloca seus botões, placares e lógica.