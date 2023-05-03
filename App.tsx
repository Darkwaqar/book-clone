import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { API_URL, API_KEY } from "@env";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import MyBooksProvider from "./context/MyBooksProvider";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: API_URL,
  headers: {
    Authorization: `apikey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <MyBooksProvider>
            <Navigation colorScheme={colorScheme} />
          </MyBooksProvider>
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
