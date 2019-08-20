package com.abaty;

import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.List;

//import com.airbnb.android.react.lottie.LottiePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.horcrux.svg.SvgPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import org.wonday.pdf.RCTPdfView;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.airbnb.android.react.maps.MapsPackage;

public class MainApplication extends Application implements ReactApplication {

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
        //packages.add(new MyReactNativePackage());
        //packages.add(new ReanimatedPackage();
        //new PickerPackage(),
        packages.add(new MapsPackage());
        //new LottiePackage(),
        //packages.add(new RNFetchBlobPackage());
        packages.add(new RNGestureHandlerPackage());
        packages.add(new SvgPackage());
        packages.add(new NetInfoPackage());
        packages.add(new RNCWebViewPackage());
        packages.add(new AsyncStoragePackage());
        packages.add(new ReactNativeOneSignalPackage());
        packages.add(new VectorIconsPackage());
        packages.add(new ReactNativeRestartPackage());
        packages.add(new RCTPdfView());
        packages.add(new RNI18nPackage());
        packages.add(new FastImageViewPackage());
        packages.add(new RNDeviceInfo());
        packages.add(new RNSharePackage());
        packages.add(new ReactVideoPackage());
        packages.add(new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG));
      return packages;
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
