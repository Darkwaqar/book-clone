import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext } from "react";
import { useQuery, GraphQLRequest } from "@apollo/client";
import { gql } from "@apollo/client";
import BookItem from "../components/BookItem";
import { useMyBooks } from "../context/MyBooksProvider";

const MyBooksScreen = () => {
  const { savedBooks } = useMyBooks();
  return (
    <View style={styles.container}>
      <FlatList
        data={savedBooks}
        renderItem={({ item }) => <BookItem book={item} />}
      />
    </View>
  );
};

export default MyBooksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
