package com.abaty;

import android.app.Application;
import android.util.Log;
import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;
import androidx.multidex.MultiDexApplication;
import com.microsoft.codepush.react.CodePush;
import cl.json.ShareApplication;

public class MainApplication extends MultiDexApplication implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }


        @Override
        protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // Packages that cannot be autolinked yet can be added manually here, for example:
            // packages.add(new MyReactNativePackage());
            return packages;
            // Packages that cannot be autolinked yet can be added manually here, for example:
            //packages.add(new MyReactNativePackage());
            //packages.add(new ReanimatedPackage());
            //packages.add(new PickerPackage());
            //packages.add(new MapsPackage());
            //packages.add(new LottiePackage());
            //packages.add(new RNFetchBlobPackage());
            //packages.add(new RNGestureHandlerPackage());
            //packages.add(new SvgPackage());
            //packages.add(new NetInfoPackage());
            //packages.add(new RNCWebViewPackage());
            //packages.add(new AsyncStoragePackage());
            //packages.add(new ReactNativeOneSignalPackage());
            //packages.add(new VectorIconsPackage());
            //packages.add(new ReactNativeRestartPackage());
            //packages.add(new RCTPdfView());
            //packages.add(new RNI18nPackage());
            //packages.add(new FastImageViewPackage());
            //packages.add(new RNDeviceInfo());
            //packages.add(new RNSharePackage());
            //packages.add(new ReactVideoPackage());
            //packages.add(new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG));
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }

}
