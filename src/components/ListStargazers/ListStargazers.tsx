/**
 * FlatList with the list of stargazers
 *
 * @format
 */

import React, { type PropsWithChildren } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

// a Stargazer
interface Stargazer {
    avatar_url: string;
    login: string;
    id: string;
}

const SingleElementStargazer: React.FC<
    PropsWithChildren<{
        item: Stargazer;
    }>
> = ({ item }) => {
    return (
        <View
            style={styles.viewStargazer}
        >
            <Image
                source={{ uri: item.avatar_url }}
                style={styles.imageStargazer}
            />
            <Text>{item.login}</Text>
        </View>
    );
};

const NoData: React.FC<PropsWithChildren<{}>> = () => {
    return (
        <View
            style={styles.styleNoData}
        >
            <Text>Here you will display the Stargazers found</Text>
        </View>
    );
};

const ListStargazers: React.FC<
    PropsWithChildren<{
        stargazers: Stargazer[];
    }>
> = ({ stargazers = [] }) => {
    return (
        <FlatList
            style={styles.styleList}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NoData />}
            data={stargazers}
            keyExtractor={(elem: Stargazer) => elem.id}
            initialNumToRender={7}
            renderItem={({ item, index }) => {
                return <SingleElementStargazer item={item} />;
            }}
        />
    );
};

const styles = StyleSheet.create({
    styleList: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    },
    styleNoData: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        height: 200,
        alignContent: "center",
        justifyContent: "center",
    },
    imageStargazer: {
        margin: 10,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    viewStargazer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    }
});

export default ListStargazers;
