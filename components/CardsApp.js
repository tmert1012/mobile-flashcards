import React, { Component } from 'react'
import { View, Platform, StatusBar } from 'react-native'
import DeckList from './DeckList'
import { createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { white, purple } from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import DeckView from './DeckView'
import AddDeck from './AddDeck'
import AddCard from './AddCard'
import QuizView from './QuizView'
import ScoreCard from './ScoreCard'
import { setLocalNotification } from '../utils/notifications'
import { handleReceiveDecks } from '../actions'
import { connect } from 'react-redux'

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

class CardsApp extends Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveDecks())
      .then(setLocalNotification)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{ backgroundColor: purple, height: Constants.statusBarHeight }}>
          <StatusBar translucent backgroundColor={purple} barStyle="light-content" />
        </View>
        <MainNavigator />
      </View>
    )
  }

}

export default connect()(CardsApp)
