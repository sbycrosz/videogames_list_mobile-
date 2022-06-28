import { FlatList, SafeAreaView } from "react-native";
import { styles as s } from "react-native-style-tachyons";

import games from "./games.json";
import GameCard from "./GameCard";
import { Game } from "./types";

export default function GameList() {
  return (
    <SafeAreaView style={[s.bg_background, s.flx_i]}>
      <FlatList
        keyExtractor={(item: Game) => item.name}
        data={games.results}
        renderItem={({ item }: { item: Game }) => {
          return (
            <GameCard
              name={item.name}
              backgroundImage={item.background_image}
              metacritic={item.metacritic}
              released={item.released}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}
