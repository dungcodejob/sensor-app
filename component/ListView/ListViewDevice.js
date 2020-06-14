
import BaseListViewComponent from './BaseListView'
import React from 'react';
import { View, Text, FlatList, StyleSheet } from "react-native";
import * as Animetable from "react-native-animatable";

export default class ListViewDevice extends BaseListViewComponent {

    constructor(props) {
        super(props);
        console.log(props.data);
        this.handleGetItemsDone(props.data);
    }

    // getListItems(offset) {
    //     let url = 'http://example.com/ex_api?limit=10&offset=' + offset
    //     fetch(url)
    //         .then((text) => text.json())
    //         .then((response) => {
    //             this.handleGetItemsDone(response.data);
    //         })
    //         .catch((error) => {
    //             this.handleGetItemsError(error);
    //         })
    //         .done();
    // }

    render() {console.log("list View devices");
        console.log(this.dataSource);
        var buttonAnimationDuration = 0;
        return (

            <FlatList

                data={this.dataSource}
                renderItem={({ item }) =>
            
                        <Animetable.View 
                    animation="fadeInLeft"
                     duration={buttonAnimationDuration += 1000} 
                     style={styles.card}>
                        <View>
                            <Text style={styles.card_title}>{item.title}</Text>
                        </View>
                        <View>
                            <Text style={[{ color: "#7d8a9a" }, { marginRight: 5 }, { marginBottom: 10 }, { textAlign: "right" }]}>Trạng thái</Text>
                            {
                                item.complete == true ? (
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
                    </Animetable.View>
                    
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