
import {Pressable, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import ExpoDocumentPicker from "expo-document-picker/src/ExpoDocumentPicker";
import {PickedDocument} from "@/types/modal";

type VisibleType = {
    isOpen: boolean;
    selectedFiles: PickedDocument[];
    duplicatedFiles: PickedDocument[];
    setIsOpen: (isOpen: boolean) => void;
    setSelectedFiles: (selectedFiles: (prevFiles: PickedDocument[]) => (PickedDocument)[]) => void;
    setDuplicatedFiles: (duplicatedFiles: (prevFiles: PickedDocument[]) => (PickedDocument)[]) => void;
}

type MenuItemType = {
    title: string;
    icon: string;
    onPress: any;
}

const MenuItem = ({isOpen, duplicatedFiles, setDuplicatedFiles, setSelectedFiles, selectedFiles, setIsOpen} : VisibleType) => {

    //TODO : 1 finalizzare la questione aggiunta e rimozione duplicati pert la scelta dei file
    //TODO : 2 Creare logica per inserire immagini scattate al momento con ritagli e preview ed aggiunta alla lista
    //TODO : 3 Creare logica per un editor di testo (se possibile anche complesso) per poi inserirlo nella lista


    const scanDocuments = () => {console.error('Non implementato')}
    const writeText = () => {console.error('Non implementato')}

    const pickDocument = async () => {
        try {
            // Resetto la lista dei file duplicati
            setDuplicatedFiles((prevFiles: PickedDocument[]) => [])


            // TODO: Controllare se il dispositivo ha concesso i permessi di lettura e scrittura (Modificabile nella sezione di impostazioni del dispositivo e nel Settings)

            // Ottengo i file dalla memoria interna del dispositivo

            const result = await ExpoDocumentPicker.getDocumentAsync({
                type: [
                    'application/pdf',
                    'image/*',
                    'text/plain',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                ],
                multiple: true,
                copyToCacheDirectory: true
            });

            if (result.assets) {
                // Mi prendo la lunghezza della lista per ottenere l'indice del file (se l'array non è vuoto)
                var index = '0';

                if(selectedFiles.length != 0){
                    index = (selectedFiles.length).toString();
                }

                const newFiles: PickedDocument[] = [];

                result.assets.forEach((asset: { size: number; type: string; name: string; uri: string; }) => {


                    // Controllo presenza duplicati
                    const duplicateFile = selectedFiles.find(file => file.uri === asset.uri);
                    if (duplicateFile) {
                        setDuplicatedFiles((prevFiles: PickedDocument[]) => [...prevFiles, duplicateFile]);
                        return;
                    }

                    var newFile: PickedDocument = {
                        id: index,
                        mimeType: asset.type,
                        name: asset.name,
                        size: asset.size,
                        uri: asset.uri,
                    }

                    newFiles.push(newFile);

                    index = (parseInt(index) + 1).toString();
                })


                setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
            }
        } catch (err) {
            console.error('Errore nella selezione del file:', err);
        }
    };


    /**
     * An array of menu item objects, each representing a selectable action in a menu.
     * Each menu item includes a title, icon, and a corresponding function to execute upon selection.
     *
     * Properties:
     * - title: A string representing the display name of the menu item.
     * - icon: A string representing the icon associated with the menu item.
     * - onPress: A function to be triggered when the menu item is selected.
     */
    const menuItems = [
        {
            title: 'File dal dispositivo',
            icon: 'folder-outline',
            onPress: pickDocument
        },
        {
            title: 'Scannerizza documenti',
            icon: 'scan-outline',
            onPress: scanDocuments
        },
        {
            title: 'Testo to PDF',
            icon: 'document-text-outline',
            onPress: writeText
        },
    ];


    return(
        <>{isOpen && (
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <Pressable
                        key={index}
                        style={styles.menuItem}
                        onPress={() => {
                            // Gestire l'azione qui
                            setIsOpen(false);
                            item.onPress();
                        }}
                    >
                        <View style={styles.menuItemContent}>
                            <View style={styles.iconContainer}>
                                <Ionicons name={item.icon as any} size={24} color="white" />
                            </View>
                            <Text style={styles.menuText}>{item.title}</Text>
                        </View>
                    </Pressable>
                ))}
            </View>
        )}</>
    );
}

const styles = StyleSheet.create({
    mainButton: {
        backgroundColor: 'red',
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        zIndex: 1,
    },
    mergeButton: {
        backgroundColor: 'violet',
        width: 300,
        height: 50,
        borderRadius: 10,
        position: 'absolute',
        bottom: 20,
        left: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        zIndex: 1,
    },
    menuContainer: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        zIndex: 0,
    },
    menuItem: {
        marginBottom: 10,
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25,
        elevation: 3,
    },
    iconContainer: {
        backgroundColor: 'red',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    menuText: {
        fontSize: 16,
        color: '#333',
    },
});

export default MenuItem