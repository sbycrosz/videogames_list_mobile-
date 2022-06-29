import { Text, View } from "react-native";
import { styles as s } from "react-native-style-tachyons";

export default function GenericLoadMore() {
  return (
    <View style={[s.jcc, s.aic, s.pa4]}>
      <Text style={[s.textSecondary, s.f5]}>{"Loading ..."}</Text>
    </View>
  );
}
