/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, type PropsWithChildren } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import InputComponent from "./src/components/InputComponent/InputComponent";
import axios, { AxiosError, AxiosResponse } from "axios";
import ListStargazers from "./src/components/ListStargazers/ListStargazers";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  // input fields to do the search
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  // search results
  const [stargazers, setStargazers] = useState([]);
  // status results
  const [loadingStargazers, setLoadingStargazers] = useState(false);

  // get Stargazers from github from owner and repo field
  const loadStargazers = async () => {
    setLoadingStargazers(true);

    axios
      .get(`https://api.github.com/repos/${owner}/${repo}/stargazers`)
      .then((res: AxiosResponse) => {
        setLoadingStargazers(false);
        if (res.data && res.status == 200) {
          console.log(res.data);
          setStargazers(res.data);
        }
      })
      .catch((error: AxiosError) => {
        setLoadingStargazers(false);
        if (error.response) {
          // Request made and server responded
          if (error.response.status == 404) {
            Alert.alert("Stargazers not found");
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  // I turn off the button when the two fields are empty or I am looking for
  const disabledButton = !(owner.length && repo.length) || loadingStargazers;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <View style={styles.spaceView} />
        <Text>Search Stargazers from GitHub</Text>

        <View style={styles.spaceView} />
        <InputComponent
          value={owner}
          onChangeText={setOwner}
          placeholder={"Write the owner"}
        />

        <View style={styles.spaceView} />
        <InputComponent
          value={repo}
          onChangeText={setRepo}
          placeholder={"Write the repo"}
        />

        <View style={styles.spaceView} />
        <Pressable
          disabled={disabledButton}
          style={[styles.searchButton, { opacity: disabledButton ? 0.5 : 1 }]}
          onPress={() => loadStargazers()}
        >
          {loadingStargazers ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.textSearch}>Search</Text>
          )}
        </Pressable>
        <View style={styles.spaceView} />
        <ListStargazers stargazers={stargazers} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  spaceView: {
    height: 20,
  },
  searchButton: {
    borderWidth: 1,
    borderColor: "#3d3d3d",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#003399",
    borderRadius: 15,
  },
  textSearch: {
    color: "white",
  },
});

export default App;
