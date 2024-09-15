import { Text, View, ScrollView } from "react-native";import Constants from 'expo-constants'
import { Login } from "../components/login";


const statusBarHeight = Constants.statusBarHeight

export default function Index() {
  return (
    <View style={{flex: 1}} className="justify-center items-center">
      <Login />
    </View>
  );
}
