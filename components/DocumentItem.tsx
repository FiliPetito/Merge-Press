/*
*   Questo componente viene utilizzato per creare l'elemento i-esimo della lista dei documenti
*/

import {Pressable, Text} from "react-native";
import React from "react";
import DocumentViewer from "@/components/DocumentViewer";

type DocumentItemType ={
    item: any;
    onDrag: any;
    onPress: any;
    isActive: boolean;
};

const DocumentItem = ({item, onDrag, onPress, isActive = true} : DocumentItemType) => {
    return(
        <Pressable
            key={item.id}
            style={{
                backgroundColor: isActive ? '#ccc' : '#f2f2f2',
                marginBottom: 8,
                flexDirection: 'row',
                alignItems: 'center'
            }}
            onLongPress={onDrag}
            onPress={onPress}
        >

            <Text style={{marginRight: 10, fontWeight: 'bold'}}>
                {parseInt(item.id) + 1}. {/* Aggiungiamo 1 solo per la visualizzazione */}
            </Text>

            <DocumentViewer mimeType={item.mimeType} uri={item.uri}/>

            <Text>{item.name}</Text>
        </Pressable>
    );
}
export default DocumentItem;