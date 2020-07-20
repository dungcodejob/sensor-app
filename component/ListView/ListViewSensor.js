
import BaseListViewComponent from './BaseListView'
import React from 'react';
import { View, Text, FlatList, StyleSheet } from "react-native";

export default class ListViewSensor extends BaseListViewComponent {

    constructor(props) {
        super(props);
        this.handleGetItemsDone(props.data);
    }

    getListItems(offset) {
        let url = 'http://example.com/ex_api?limit=10&offset=' + offset
        fetch(url)
            .then((text) => text.json())
            .then((response) => {
                this.handleGetItemsDone(response.data);
            })
            .catch((error) => {
                this.handleGetItemsError(error);
            })
            .done();
    }

    render() {
        console.log(this.dataSource);
        return (

            <FlatList

                data={this.dataSource}
                renderItem={({ item }) =>
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.card_title}>{item.Title}</Text>
                            <Text style={styles.card_info}>Nhiệt Độ: {item.Value}</Text>
                        </View>
                        <View>
                            <Text style={[{ color: "#7d8a9a" }, { marginRight: 5 }, { marginBottom: 10 }, { textAlign: "right" }]}>Trạng thái</Text>
                            {
                                item.Status == 1 ? (
                                    <View style={[{backgroundColor: "#67b373"},styles.status_card]}>
                                <Text style={styles.status_cardText}>HOẠT ĐỘNG</Text>
                                    </View>
                                ) : (
                                    <View style={[{backgroundColor: "#f79229"},styles.status_card]}>
                                <Text style={styles.status_cardText}>KHÔNG HOẠT ĐỘNG</Text>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                }
                onScroll={this.onScroll}
            />

        );
    }
}



var styles = StyleSheet.create({

    card: {
        display: "flex",
        backgroundColor:"#fff",
        borderRadius:4,
        borderWidth:2,
        borderColor:"rgba(0,0,0,.32)",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        height: "auto",
        margin:16,
    },

    card_title: {
        fontSize: 18,
    },

    card_info:{

    },

    status_card: {
        borderRadius: 30,
    },

    status_cardText: {
        color: "#fff",
        fontWeight: "700",
        paddingHorizontal: 8,
        paddingVertical: 2,

    }




});