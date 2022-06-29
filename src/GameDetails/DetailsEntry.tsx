import _ from "lodash";
import { View, Text } from "react-native";
import { styles as s } from "react-native-style-tachyons";

type Props = {
  width: number;
  label: string;
  value: string;
};

export default function DetailsEntry(props: Props) {
  const { width, label, value } = props;

  return (
    <View style={[{ width }, s.ph3, s.pt3]}>
      <Text style={[s.f5, s.textSecondary]}>{label}</Text>
      <Text style={[s.f5, s.textPrimary]}>{value}</Text>
    </View>
  );
}
