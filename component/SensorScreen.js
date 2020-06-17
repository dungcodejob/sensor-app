
import React from 'react';
import { View } from "react-native";

import Feather from "react-native-vector-icons/Feather";
import ListViewSensor from './ListView/ListViewSensor';



function SensorScreen({ navigation }) {


    // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // const [dataSource, setDataSource] = useState(ds.cloneWithRows(['row 1', 'row 2']));
    const data = [
        {
            Title: "senseo 1",
            Status: 1,
            Value:5,
        },
        {
            Title: "senseo 6",
            Status: 1,
            Value:5,
        },
        {
            Title: "senseo 3",
            Status: 2,
            Value:5,
        },
        {
            Title: "senseo 2",
            Status: 1,
            Value:5,
        },
        {
            Title: "senseo 1",
            Status: 2,
            Value:5,
        },
    ];
    const refSensor = firestore().collection('Consult_Humid_from_Sensor');


    useEffect(() => {

        refSensor.onSnapshot((querySnapshot) => {
          var list = [];
          querySnapshot.forEach(doc => {
            const { AID, type, status } = doc.data();
            // console.log(doc)
            list.push({
              id: doc.id,
              type,
              status,
            });
          });
          setDeviceList(list);
    
          if (loading) {
            setLoading(false);
          }
        });
    
    
      }, []);
    
    
      if (loading) {
        return null;
      }

    
    return (
        
        <View>
            
            <ListViewSensor data={data}/>
        </View>
    );
}





export default SensorScreen


