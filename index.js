import "react-native-gesture-handler";
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {Abaty} from './app/Root';
import {name as appName} from './app.json';
import * as Sentry from '@sentry/react-native';
import {isLocal} from "./app/env";
console.disableYellowBox = true;

if(!isLocal && !__DEV__) {
    console.log('from inside Sentary');
    Sentry.init({
        dsn: 'https://0a8ea15434774637bcde5997faa353ea@sentry.io/1793310',
    });
    // Sentry.setTag("myTag", "tag-value");
    // Sentry.setExtra("myExtra", "extra-value");
    // Sentry.addBreadcrumb({ message: "test" });
    // Sentry.captureMessage("Hello Sentry!");
}
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(Abaty));


