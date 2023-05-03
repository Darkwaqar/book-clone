import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import BookItem from "../components/BookItem";
import { parseBook } from "../services/bookService";
import { BookProvider } from "../types/book";

const searchQuery = gql`
  query SearchBooks($q: String) {
    googleBooksSearch(q: $q, country: "US") {
      items {
        id
        volumeInfo {
          authors
          averageRating
          description
          imageLinks {
            thumbnail
          }
          title
          subtitle
          industryIdentifiers {
            identifier
            type
          }
        }
      }
    }
    openLibrarySearch(q: $q) {
      docs {
        author_name
        title
        cover_edition_key
        isbn
      }
    }
  }
`;

const SearchScreen = () => {
  const [runQuery, { data, loading, error }] = useLazyQuery(searchQuery);
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState<BookProvider>("googleBooksSearch");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search..."
          style={styles.input}
        />
        <Button
          title="Search"
          onPress={() => runQuery({ variables: { q: search } })}
        />
      </View>
      <View style={styles.tabs}>
        <Text
          style={
            provider === "googleBooksSearch"
              ? { fontWeight: "bold", color: "royalblue" }
              : {}
          }
          onPress={() => setProvider("googleBooksSearch")}
        >
          Google Books
        </Text>
        <Text
          style={
            provider === "openLibrarySearch"
              ? { fontWeight: "bold", color: "royalblue" }
              : {}
          }
          onPress={() => setProvider("openLibrarySearch")}
        >
          Open Library
        </Text>
      </View>
      {loading && <ActivityIndicator />}
      {error && (
        <>
          <Text>Error fetching books</Text>
          <Text>{error.message}</Text>
        </>
      )}
      <FlatList
        data={
          (provider === "googleBooksSearch"
            ? data?.googleBooksSearch?.items
            : data?.openLibrarySearch?.docs) || []
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <BookItem book={parseBook(item, provider)} />}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
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
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    alignItems: "center",
  },
});
