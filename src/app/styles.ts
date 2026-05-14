import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f2f2f2',
    backgroundColor: '#444',
    paddingHorizontal: 20
  },
  h1: {
    color: '#f2f2f2',
    fontSize: 48,
    backgroundColor: 'tomato',
    padding: 20,
    borderRadius: 20,
    width: '100%',
    textAlign: 'center'
  },
  col: {
    flexDirection: 'column',
    gap: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 20
  }
})

export default styles