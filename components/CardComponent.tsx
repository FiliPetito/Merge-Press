import {Pressable, Text, View} from "react-native";
import { Link } from "expo-router";
import {useEffect, useState} from "react";
import {useTranslation} from "@/hooks/useTranslation";
import {Image} from "expo-image";

type CardType ={
    cardType: 'merge' | string;
};

// Importa l'immagine correttamente
// @ts-ignore
import mergePdfIcon from '@/assets/images/mergePdf.png';


const CardComponent = ({cardType = 'merge'} : CardType ) => {

    const { t } = useTranslation();

    const [cardLabel, setCardLabel] = useState<string>('');
    const [cardIcon, setCardIcon] = useState<string>('');
    const [cardHref, setCardHref] = useState<any>('');

    useEffect(() => {
        switch (cardType.toString()) {
            case 'merge':
                setCardLabel(t('mergePdf'));
                setCardIcon(mergePdfIcon);
                setCardHref('/(tabs)/mergePdf');
                break;
            default:
                break;
        }
    },  []);

    return <Link href={cardHref as any} asChild>
        <Pressable>
            <View
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'red',
                    marginVertical: 10
                }}
            >
                <Image source={cardIcon}
                       style={{
                           width: 70,  // dimensione fissa in pixel
                           height: 70, // dimensione fissa in pixel
                       }}
                       contentFit="contain"

                ></Image>

                <Text>{cardLabel}</Text>

            </View>
        </Pressable>
    </Link>
};

export default CardComponent;