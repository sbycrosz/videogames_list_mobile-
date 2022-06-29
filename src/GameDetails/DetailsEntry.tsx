import _ from "lodash";
import { View, Text, useWindowDimensions } from "react-native";
import { styles as s } from "react-native-style-tachyons";

type Props = {
  label: string;
  value: string;
};

export default function DetailsEntry(props: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const { label, value } = props;

  return (
    <View style={[{ width: windowWidth / 2.0 }, s.ph3, s.pt3]}>
      <Text style={[s.f5, s.textSecondary]}>{label}</Text>
      <Text style={[s.f5, s.textPrimary]}>{value}</Text>
    </View>
  );
}
