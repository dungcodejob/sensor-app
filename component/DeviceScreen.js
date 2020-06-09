
import React from 'react';
import { View, Text, FlatList, StyleSheet} from "react-native";

import ListViewDevice from "./ListView/ListViewDevice";



function DeviceScreen({ navigation }) {


    // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // const [dataSource, setDataSource] = useState(ds.cloneWithRows(['row 1', 'row 2']));
    const data = [
        {
            Title: "senseo 1",
            Status: 1,
        },
        {
            Title: "senseo 6",
            Status: 1,
        },
        {
            Title: "senseo 3",
            Status: 2,
        },
        {
            Title: "senseo 2",
            Status: 1,
        },
        {
            Title: "senseo 1",
            Status: 2,
        },
    ];
    return (
        <View  style={styles.container}>
            {/* <Feather
                onPress={() => { navigation.goBack(null) }}
                name="arrow-left" size={20} /> */}
            <ListViewDevice data={data} />
        </View>
    );
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#EDF0F8"
    },





});

export default DeviceScreen


