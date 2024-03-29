import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import {StyleSheet, RefreshControl, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import {text, width} from '../../constants/sizes';
import validate from 'validate.js';
import {View} from 'react-native-animatable';
import UserImageProfile from '../../components/widgets/user/UserImageProfile';
import MainSliderWidget from '../../components/widgets/slider/MainSliderWidget';
import {enableWarningMessage} from '../../redux/actions';
import {getDesigner} from '../../redux/actions/user';
import CommentScreenModal from './../CommentScreenModal';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import UserInfoWidget from '../../components/widgets/user/UserInfoWidget';
import I18n from '../../I18n';
import VideosVerticalWidget from '../../components/widgets/video/VideosVerticalWidget';
import ProductCategoryVerticalWidget from '../../components/widgets/category/ProductCategoryVerticalWidget';
import {ABATI, MALLR, HOMEKEY, ESCRAP} from './../../../app';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import BgContainer from '../../components/containers/BgContainer';
import {useNavigation} from '@react-navigation/native';
import ImageLoaderContainer from '../../components/widgets/ImageLoaderContainer';
import DesingeratBtn from '../../components/widgets/Button/DesigneratBtn';
import widgetStyles from '../../components/widgets/widgetStyles';
import UserImageProfileRounded from '../../components/widgets/user/UserImageProfileRounded';

const DesigneratCompanyShowScreen = ({route}) => {
  const {company, comments, commentModal, searchParams} = useSelector(
    state => state,
  );
  const dispatch = useDispatch();
  const {name, id, model, type} = route.params;
  const navigation = useNavigation();
  const {colors, logo, guest} = useContext(GlobalValuesContext);
  const [refresh, setRefresh] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'products', title: I18n.t('products')},
    {key: 'info', title: I18n.t('information').substring(0, 10)},
    {key: 'videos', title: I18n.t('videos')},
  ]);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');
  const [collectedCategories, setCollectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentSearchParams, setCurrentSearchParams] = useState({});

  useEffect(() => {
    setCurrentSearchParams(searchParams);
  }, []);

  useMemo(() => {
    if (company) {
      if (!validate.isEmpty(company.products)) {
        setCollectedCategories(
          collectedCategories.concat(company.productCategories),
        );
        setProducts(products.concat(company.products));
      }
      if (!validate.isEmpty(company.productGroup)) {
        setCollectedCategories(
          collectedCategories.concat(company.productGroupCategories),
        );
        setProducts(products.concat(company.productGroup));
      }
    } else {
      dispatch(enableWarningMessage(I18n.t('element_does_not_exist')));
      return dispatch(navigation.goBack());
    }
  }, [company]);

  useMemo(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg, headerBgColor]);

  const handleRefresh = useCallback(() => {
    return dispatch(
      getDesigner({
        id: company.id,
        searchParams: {user_id: company.id},
      }),
    );
  }, [refresh]);

  return (
    <BgContainer showImage={false}>
      <ScrollView
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        overlayColor="white"
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        }>
        {!validate.isEmpty(company.slides) ? (
          <View style={{width: width}}>
            <MainSliderWidget elements={company.slides} />
          </View>
        ) : (
          <>
            {company.banner && !validate.isEmpty(company.banner) ? (
              <ImageLoaderContainer
                img={company.banner}
                style={{width: '100%', height: 200}}
                resizeMode={'cover'}
              />
            ) : (
              <ImageLoaderContainer
                img={logo}
                style={{width: '100%', height: 200}}
                resizeMode={'cover'}
              />
            )}
          </>
        )}
        <View style={[styles.wrapper, {marginTop: '5%'}]}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ImageLoaderContainer img={company.thumb} style={styles.image} />
            <Text
              style={[
                widgetStyles.headerTow,
                {marginTop: 10, marginBottom: 20, alignSelf: 'center'},
              ]}>
              {I18n.t('my_designs')}
            </Text>
          </View>
          <ElementsHorizontalList
            elements={products}
            searchParams={currentSearchParams}
            type="product"
            columns={2}
            showSearch={false}
            showTitle={false}
            showSortSearch={true}
            showProductsFilter={true}
            showTitleIcons={true}
            showFooter={false}
            showMore={false}
          />
        </View>
      </ScrollView>
    </BgContainer>
  );
};

DesigneratCompanyShowScreen.navigationOptions = ({navigation}) => ({
  // headerTransparent: navigation.state.params.headerBg,
  // headerStyle: {
  //   backgroundColor: navigation.state.params.headerBgColor
  // }
});

export default DesigneratCompanyShowScreen;

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
  },
  subTitle: {
    fontFamily: text.font,
    fontSize: text.medium,
  },
  description: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
  },
  wrapper: {
    flex: 1,
    borderColor: 'lightgrey',
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5,
  },
  itemRow: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scene: {
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
});
