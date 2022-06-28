import { flatMap } from "lodash";
import moment from "moment";
import { useCallback, useMemo } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { styles as s } from "react-native-style-tachyons";
import useSWRInfinite from "swr/infinite";

import GameCard from "./GameCard";
import LoadingView from "./LoadingView";
import { Game } from "../types";
import { fetcher } from "../utilities";

const PAGE_SIZE = 20;
const END_DATE = moment().format("YYYY-MM-DD");
const START_DATE = moment().subtract(1, "year").format("YYYY-MM-DD");

// Move this to env variable
const RAWG_API_KEY = "61b1a8a3b8b14d89bc683cb1b7e0fdfb";

export default function GameList() {
  // Pagination with SWR is kind of comfy :)
  const { data, error, size, isValidating, setSize } = useSWRInfinite(
    (index, previousPageData) => {
      if (previousPageData && !previousPageData.next) return null;
      if (index > 0) return previousPageData.next;

      return [
        "https://api.rawg.io/api/games",
        "?page=1",
        `&page_size=${PAGE_SIZE}`,
        `&dates=${START_DATE},${END_DATE}`,
        `&key=${RAWG_API_KEY}`,
        // Sort by released descending
        "&platforms=187",
        // Playstation 5 platform
        "&ordering=-released",
      ].join("");
    },
    fetcher
  );

  const games = useMemo(() => (data ? flatMap(data, "results") : []), [data]);

  const renderItem = useCallback(({ item }: { item: Game }) => {
    return (
      <GameCard
        name={item.name}
        backgroundImage={item.background_image}
        metacritic={item.metacritic}
        released={item.released}
      />
    );
  }, []);

  return (
    <SafeAreaView style={[s.bg_background, s.flx_i]}>
      <FlatList
        keyExtractor={(item: Game) => item.name}
        data={games}
        renderItem={renderItem}
        onEndReached={() => setSize(size + 1)}
        ListFooterComponent={isValidating ? <LoadingView /> : null}
      />
    </SafeAreaView>
  );
}
