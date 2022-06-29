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
import { HTML_STYLES } from "../constants";

type Props = {
  gameDetails: any;
};

export default function GameDetailsContent(props: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const detailsEntryWidth = windowWidth / 2.0;

  const { gameDetails } = props;

  if (!gameDetails) return null;

  return (
    <ScrollView contentContainerStyle={[s.pb5]}>
      <Image
        style={[s.h5]}
        source={{
          uri: gameDetails.background_image,
        }}
      />

      <Text style={[s.textPrimary, s.b, s.f4, s.mh3, s.mt3]}>
        {gameDetails.name}
      </Text>

      <View style={[s.mh3]}>
        <RenderHtml
          contentWidth={windowWidth}
          source={{ html: gameDetails.description }}
          tagsStyles={HTML_STYLES}
        />
      </View>

      <View style={[s.flx_row, s.flx_wrap]}>
        <DetailsEntry
          width={detailsEntryWidth}
          label={"Platform"}
          value={_.map(gameDetails.platforms, "platform.name").join(", ")}
        />

        <DetailsEntry
          width={detailsEntryWidth}
          label={"Genre"}
          value={_.map(gameDetails.genres, "name").join(", ")}
        />

        <DetailsEntry
          width={detailsEntryWidth}
          label={"Release Date"}
          value={moment(gameDetails.released).format("MMM DD, YYYY")}
        />

        <DetailsEntry
          width={detailsEntryWidth}
          label={"Developers"}
          value={_.map(gameDetails.developers, "name").join(", ")}
        />

        <DetailsEntry
          width={detailsEntryWidth}
          label={"Publishers"}
          value={_.map(gameDetails.publishers, "name").join(", ")}
        />
      </View>
    </ScrollView>
  );
}
