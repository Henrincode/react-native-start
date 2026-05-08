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