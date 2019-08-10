import React, { Component } from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckList from './components/DeckList'
import { loadInitialDecks } from './utils/api'
import middleware from './middleware'
import { createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { white, purple } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import DeckView from './components/DeckView'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'
import ScoreCard from './components/ScoreCard'
import { setLocalNotification } from './utils/notifications'


const Tabs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}

const navigationOptions = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const TabNav = createAppContainer(
  Platform.OS === 'ios'
    ? createBottomTabNavigator(Tabs, navigationOptions)
    : createMaterialTopTabNavigator(Tabs, navigationOptions)
)

const navOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: purple,
  },
}

const MainNavigator = createAppContainer(createStackNavigator({
  home: {
    screen: TabNav,
    navigationOptions: {
      header: null,
    },
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({ navigation }) => (navOptions),
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({ navigation }) => ({ ...navOptions, title: 'Add Card' }),
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: ({ navigation }) => ({ ...navOptions, title: 'Quiz' }),
  },
  ScoreCard: {
    screen: ScoreCard,
    navigationOptions: ({ navigation }) => ({ ...navOptions, title: 'Quiz Complete!' }),
  },
}));

export default class App extends Component {
  componentDidMount() {
    loadInitialDecks()
      .then(setLocalNotification)
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{flex: 1}}>
          <View style={{ backgroundColor: purple, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={purple} barStyle="light-content" />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    )
  }

}
