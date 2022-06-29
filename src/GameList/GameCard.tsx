import moment from "moment";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles as s } from "react-native-style-tachyons";

type Props = {
  name: string;
  released: string;
  backgroundImage: string;
  metacritic: number | null;
  onPress: () => void;
};

export default function GameCard(props: Props) {
  const { name, released, backgroundImage, metacritic, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          { overflow: "hidden" },
          s.mh3,
          s.mt3,
          s.br3,
          s.bg_backgroundCard,
        ]}
      >
        <Image
          style={{ height: 180 }}
          source={{
            uri: backgroundImage,
          }}
        />

        <View style={[s.pa3]}>
          <View style={[s.flx_row, s.aic, s.jcsb]}>
            <Text style={[s.textPrimary, s.b, s.f4, s.flx_i]}>{name}</Text>

            {!!metacritic && (
              <View style={[s.ba, s.b__accent, s.br3, s.ph2, s.pv1]}>
                <Text style={[s.accent, s.f5]}>{metacritic}</Text>
              </View>
            )}
          </View>

          <Text style={[s.textSecondary, s.f5, s.mt1]}>
            {moment(released).format("MMM DD, YYYY")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
