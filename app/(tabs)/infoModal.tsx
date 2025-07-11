import Animated, {FadeIn} from "react-native-reanimated";
import {Pressable, Text} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {usePdfModal} from "@/contexts/PdfModalContext";

export default function InfoModal(){
    const { deleteCallback } = usePdfModal();
    const { filesName, modalType } = useLocalSearchParams();
    const [names, setNames] = useState<string[]>([]);

    useEffect(() => {
        if(filesName) {
            setNames(filesName.toString().split('|'));
        }

        console.log('Files name:', filesName);
    }, [filesName]);

    const handleConfirm = (id: string | string[]) => {
        if (deleteCallback) {
            deleteCallback(); // esegui l'eliminazione
        }
        router.back(); // chiudi la modale
    };

    return (
        <Animated.View entering={FadeIn} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: 'red'}}>{modalType}</Text>
            {names.map((name: string, index) => (
                <Text id={String(index)}>{name}</Text>
                ))
            }
            <Text>{filesName}</Text>
            <Pressable onPress={() =>{handleConfirm(filesName)}} style={{backgroundColor : 'green'}}><Text>OOOOOOOOOOk</Text></Pressable>
        </Animated.View>
    );
}