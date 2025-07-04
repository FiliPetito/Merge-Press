
import {Pressable, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import ExpoDocumentPicker from "expo-document-picker/src/ExpoDocumentPicker";
import {PickedDocument} from "@/types/modal";

type VisibleType = {
    isOpen: boolean;
    selectedFiles: PickedDocument[];
    setDuplicatedFiles: PickedDocument[];
}

type MenuItemType = {
    title: string;
    icon: string;
    onPress: any;
}

const MenuItem = ({isOpen, setDuplicatedFiles, selectedFiles} : VisibleType) => {

    const scanDocuments = () => {}
    const writeText = () => {}

    const pickDocument = async () => {
        try {
            // Resetto la lista dei file duplicati
            setDuplicatedFiles([])


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
                        setDuplicatedFiles(prevFiles => [...prevFiles, duplicateFile]);
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
                            setIsMenuOpen(false);
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
export default MenuItem