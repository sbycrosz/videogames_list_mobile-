import Ionicons from "@expo/vector-icons/Ionicons";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { styles as s } from "react-native-style-tachyons";
import useSWR from "swr";

import GenericError from "../../commons/GenericError";
import GenericLoader from "../../commons/GenericLoader";
import { GameInformation } from "../../types";
import { fetcher } from "../../utilities";
import { RAWG_API_BASE_URL, RAWG_API_KEY } from "../../constants";
import GameDetailsContent from "./GameDetailsContent";

type Props = {
  gameId: number;
  onDismiss: () => void;
};

export default function GameDetails(props: Props) {
  const { gameId, onDismiss } = props;

  const { data, error } = useSWR<GameInformation>(
    `${RAWG_API_BASE_URL}/api/games/${gameId}?key=${RAWG_API_KEY}`,
    fetcher
  );

  return (
    <View
      testID="GAME_DETAILS"
      style={[s.flx_i, s.bg_backgroundCard, { overflow: "hidden" }]}
    >
      {error && <GenericError errorMessage={error.message} />}

      {!error && !data && <GenericLoader />}

      {!error && data && (
        <ScrollView>
          <GameDetailsContent data={data} />
        </ScrollView>
      )}

      <TouchableOpacity
        style={[s.absolute, s.top_2, s.left_1]}
        onPress={onDismiss}
      >
        {/* Some issue with Expo icon typing */}
        {/* @ts-ignore */}
        <Ionicons name="ios-close-sharp" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
