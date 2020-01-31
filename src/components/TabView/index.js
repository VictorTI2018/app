import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Contatos from '../../views/Contatos'
import Conversas from '../../views/Conversas'


const initialLayout = { width: Dimensions.get('window').width };

export function Tab(props) {
    const FirstRoute = () => (
        <View style={styles.scene}>
            <Contatos {...props} />
        </View>
    );

    const SecondRoute = () => (
        <View style={styles.scene}>
            <Conversas {...props} />
        </View>
    );
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Contatos' },
        { key: 'second', title: 'Conversas' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
        />
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});