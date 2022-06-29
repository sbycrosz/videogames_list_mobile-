import _ from "lodash";
import moment from "moment";
import {
  View,
  Image,
  ScrollView,
  Text,
  useWindowDimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { styles as s } from "react-native-style-tachyons";

import DetailsEntry from "./DetailsEntry";
import { GameInformation } from "../../types";
import { HTML_STYLES } from "../../constants";

type Props = {
  data: GameInformation;
};

export default function GameDetailsContent(props: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const detailsEntryWidth = windowWidth / 2.0;

  const { data } = props;

  if (!data) return null;

  return (
    <ScrollView testID="GAME_DETAILS_CONTENT" contentContainerStyle={[s.pb5]}>
      <Image
        style={[s.h5]}
        source={{
          uri: data.backgroundImage,
        }}
      />

      <Text style={[s.textPrimary, s.b, s.f4, s.mh3, s.mt3]}>{data.name}</Text>

      <View style={[s.mh3]}>
        <RenderHtml
          contentWidth={windowWidth}
          source={{ html: data.description }}
          tagsStyles={HTML_STYLES}
        />
      </View>

      <View style={[s.flx_row, s.flx_wrap]}>
        <DetailsEntry
          width={detailsEntryWidth}
          label={"Platform"}
          value={_.map(data.platforms, "platform.name").join(", ")}
        />

        <DetailsEntry
          width={detailsEntryWidth}
          label={"Genre"}
          value={_.map(data.genres, "name").join(", ")}
        />

        <DetailsEntry
          width={detailsEntryWidth}
          label={"Release Date"}
          value={moment(data.released).format("MMM DD, YYYY")}
        />

        <DetailsEntry
          width={detailsEntryWidth}
          label={"Developers"}
          value={_.map(data.developers, "name").join(", ")}
        />

        <DetailsEntry
          width={detailsEntryWidth}
          label={"Publishers"}
          value={_.map(data.publishers, "name").join(", ")}
        />
      </View>
    </ScrollView>
  );
}
