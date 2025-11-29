const React = require('react');
const {View} = require('react-native');

const MockView = ({children, ...props}) => React.createElement(View, props, children);

module.exports = {
  Swipeable: MockView,
  DrawerLayout: MockView,
  State: {},
  ScrollView: MockView,
  Slider: MockView,
  Switch: MockView,
  TextInput: MockView,
  ToolbarAndroid: MockView,
  ViewPagerAndroid: MockView,
  DrawerLayoutAndroid: MockView,
  WebView: MockView,
  NativeViewGestureHandler: MockView,
  TapGestureHandler: MockView,
  FlingGestureHandler: MockView,
  ForceTouchGestureHandler: MockView,
  LongPressGestureHandler: MockView,
  PanGestureHandler: MockView,
  PinchGestureHandler: MockView,
  RotationGestureHandler: MockView,
  RawButton: MockView,
  BaseButton: MockView,
  RectButton: MockView,
  BorderlessButton: MockView,
  FlatList: MockView,
  gestureHandlerRootHOC: (component) => component,
  Directions: {},
  GestureHandlerRootView: MockView,
};
