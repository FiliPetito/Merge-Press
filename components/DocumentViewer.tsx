/*
*   Questo componente viene utilizzato per visualizzare l'anteprima del documento
*/

import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";

type DocumentViewerType = {
    uri: string;
    mimeType: string
}

const DocumentViewer = ({uri, mimeType} : DocumentViewerType) => {
    return (
        <View style={styles.container}>
            <Image
                source={uri}
                contentFit="cover"
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 8,
        padding: 10,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default DocumentViewer;