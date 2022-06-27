import { Text, View } from "react-native";
import { styles as s } from "react-native-style-tachyons";


export default function App() {
  return (
    <View style={[s.jcc, s.aic, s.flx_i]}>
      <Text style={[s.tc, s.f5, s.textPrimary, s.b]}>{"Hello!!"}</Text>
    </View>
  );
}
