import { useWindowDimensions } from 'react-native';


/**
 * It takes in input 3 styles small, medium and large
 * and returns the corresponding for the displayed screen,
 * trying to be responsive, according to the device used.
 *
 * @param styleSmall
 * @param styleMedium
 * @param styleLarge
 * @returns
 */

export const getResponsiveContainerStyle = (styleSmall: object, styleMedium: object, styleLarge: object) => {
    const { width } = useWindowDimensions();

    if (width < 800) return styleSmall;
    if (width < 1600) return styleMedium;
    return styleLarge;
};
