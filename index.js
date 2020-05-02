import "react-native-gesture-handler";
import {AppRegistry} from 'react-native';
import {Root} from './app/Root';
import {name as appName} from './app.json';
import * as Sentry from '@sentry/react-native';
import {isLocal} from "./app/env";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
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
AppRegistry.registerComponent(appName, () => Root);

// react-native-action-button react-native-app-intro-slider react-native-async-storage react-native-calendario react-native-circular-progress react-native-code-push react-native-collapsible react-native-deck-swiper react-native-device-info react-native-elements react-native-fast-image react-native-fbsdk react-native-gesture-handler react-native-gifted-chat react-native-google-places-autocomplete react-native-google-signin react-native-i18n react-native-image-crop-picker react-native-image-header-scroll-view react-native-image-pan-zoom react-native-image-progress react-native-keyboard-aware-scroll-view react-native-maps react-native-maps-directions react-native-modal react-native-offline react-native-onesignal react-native-parallax-view react-native-pdf react-native-popup-menu react-native-progress-steps react-native-radial-gradient react-native-ratings react-native-reanimated react-native-restart react-native-share react-native-snackbar react-native-snap-carousel react-native-spinkit react-native-star-rating react-native-step-indicator react-native-svg react-native-svg-animated-linear-gradient react-native-swiper react-native-tab-view react-native-toaster react-native-vector-icons react-native-vertical-tab-view react-native-video react-native-webview react-native-youtube react-navigation react-navigation-animated-switch react-navigation-drawer react-navigation-hooks react-navigation-redux-helpers react-navigation-stack react-navigation-tabs redux redux-devtools-extension redux-logger redux-observable redux-persist redux-saga redux-thunk reselect rn-fetch-blob tslib validate.js babel-plugin-transform-remove-console npx @ptomasroos/react-native-multi-slider @react-native-community/async-storage @react-native-community/geolocation @react-native-community/netinfo accordion-collapse-react-native axios babel-plugin-transform-remove-console geolib hermesvm jetifier lottie-ios lottie-react-native moment prettier prop-types pusher-js
// @react-native-community/viewpager react-native-google-places @sentry/react-native react-native-keyboard-spacer react-native-mixpanel react-native-picker-select




