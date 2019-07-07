/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Abaty} from './app/Root';
import {name as appName} from './app.json';
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => Abaty);
