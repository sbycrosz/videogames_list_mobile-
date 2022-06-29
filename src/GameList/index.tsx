import { flatMap } from "lodash";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import { FlatList, SafeAreaView, Modal } from "react-native";
import { styles as s } from "react-native-style-tachyons";
import useSWRInfinite from "swr/infinite";

import GameCard from "./GameCard";
import LoadingView from "./LoadingView";
import { Game } from "../types";
import { fetcher, makeQueryString } from "../utilities";
import GameDetails from "../GameDetails";
import { RAWG_API_KEY } from "../config";

export default function GameList() {
  const PAGE_SIZE = 20;
  const END_DATE = moment().format("YYYY-MM-DD");
  const START_DATE = moment().subtract(1, "year").format("YYYY-MM-DD");

  // Pagination with SWR is super comfy :)
  const { data, error, size, isValidating, setSize } = useSWRInfinite(
    (index, previousPageData) => {
      // No next page, because we are at the last page!
      if (previousPageData && !previousPageData.next) return null;

      // Initial page
      if (index === 0) {
        return `https://api.rawg.io/api/games?${makeQueryString({
          page: 1,
          pageSize: PAGE_SIZE,
          dates: `${START_DATE},${END_DATE}`,
          key: RAWG_API_KEY,
          platforms: 187,
          ordering: "-released",
        })}`;
      }

      // Else load the next page
      return previousPageData.next;
    },
    fetcher
  );
  const games = useMemo(() => (data ? flatMap(data, "results") : []), [data]);

  const [modalVisible, setModalVisible] = useState(false);
  const [displayedGameId, setDisplayedGameId] = useState<number | undefined>();

  const renderItem = useCallback(
    ({ item }: { item: Game }) => {
      return (
        <GameCard
          name={item.name}
          backgroundImage={item.background_image}
          metacritic={item.metacritic}
          released={item.released}
          onPress={() => {
            setDisplayedGameId(item.id);
            setModalVisible(true);
          }}
        />
      );
    },
    [setDisplayedGameId, setModalVisible]
  );

  return (
    <SafeAreaView style={[s.bg_background, s.flx_i]}>
      <FlatList
        keyExtractor={(item: Game) => item.name}
        data={games}
        renderItem={renderItem}
        onEndReached={() => setSize(size + 1)}
        ListFooterComponent={isValidating ? <LoadingView /> : null}
      />

      {/* Adding navigation library takes time so here it is */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {!!displayedGameId && (
          <GameDetails
            gameId={displayedGameId}
            onDismiss={() => setModalVisible(false)}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
}
