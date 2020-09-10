import React,{Component} from 'react';
import{View,Text,ScrollView,Image,TouchableOpacity} from 'react-native';
import {AsyncStorage} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import Results from'./components/results';
import Card from './components/cards';
import AddResult from './components/addReults';
import { picList } from './components/champions';
import { itemList } from './components/items';
import styled from 'styled-components';


 global.champ1 = ''
 global.champ2 = ''
 global.lockedInOne = false
 global.lockedInTwo = false
 global.newData = []
 global.rankDate = []
const obj = [
  {
    iD: 45,
    playerChampID: picList[1].key,
    laneOppID: picList[2].key,
    item: itemList[2].title,
    itempic: itemList[2].file,
    tip: 'bad match up ',
    ranking: 6 ,
    voted: false,
  },
  {
    iD:456,
    playerChampID: picList[1].key,
    laneOppID: picList[2].key,
    item: itemList[4].title,
    itempic: itemList[4].file,
    tip: 'maybe ',
    ranking: 5 ,
    voted:false,
  },
  {
    iD: 532,
    playerChampID: picList[1].key,
    laneOppID: picList[0].key,
    item: itemList[2].title,
    itempic: itemList[2].file,
    tip: 'some what good  ',
    ranking: 5 ,
    voted:false,
  },
]


export default class FlexDirectionBasics extends Component {
  constructor(props){
    super(props)
  this.state = {
  on: true,
  search: true,
  image: require('./assets/question-mark.jpg'),
  image2: require('./assets/question-mark.jpg'),
  user: '',
  newText : '',
  currentstate: [],
  newerData:[],
  vote: false,
}
}


voted = () =>{
  this.setState({
    vote: false,
    number : 1
  })
  console.log('voted')

}

textedit = (text) =>{
  this.setState({
    newText: text
  })
  console.log(this.state.newText)
}

toggle = async() =>{
  const value = await AsyncStorage.getItem('key');
  const data = (JSON.parse(value));

   newData = data.filter(d => (d.playerChampID == champ1 && d.laneOppID == champ2))
   newData.sort(function(a,b){return parseInt(b.ranking) - parseInt(a.ranking)})

   for (let i = 0; i < newData.length; i++){
     newData[i].voted = false
   }
   console.log(newData)
   console.log('new date ')

  console.log(data)
   this.setState({
      on: !this.state.on,
      newerData: newData,
      search:false,
      vote:true
    })

 }

 updateImage = (pic,key) =>{
   if (lockedInOne == false){
     console.log(pic + ' locked in 1 pic')
     champ1 = key
     lockedInOne = true
     this.setState({
       image: pic,
     })
   }
   else if (lockedInTwo == false) {
     console.log(pic + ' locked in 2 pic ')
     champ2 = key
     lockedInTwo = true
     this.setState({
       image2: pic,
     })
   }
 }

 reSet = () => {
   champ1 = '',
   champ2 = '',
   lockedInOne = false,
   lockedInTwo = false,
   console.log("lockedInOne " + "lockedInTwo " + ' reset')

   this.setState({
     image: require('./assets/question-mark.jpg'),
     image2: require('./assets/question-mark.jpg'),
     on: !this.state.on,
     search:true,
     //off: !this.state.false,
   })
 }

 updateUser = (user) =>{
   this.setState({user:user})
   console.log(user)
 }

 addingData = async () => {
   console.log('adding data ')
  try{
    const value = await AsyncStorage.getItem('key');
    const data = (JSON.parse(value));
    const min = 1;
    const max = 10000;
    const rand = min + Math.random() * (max - min);
    const newEntry =
     {
       iD: rand,
       playerChampID: global.champ1,
       laneOppID: global.champ2,
       item: itemList[(this.state.user-1)].title,
       itempic: itemList[(this.state.user-1)].file,
       tip: this.state.newText,
       ranking: 0,
       voted: false,
     }

   console.log(newEntry)
   data.push(newEntry)

    await AsyncStorage.setItem('key', JSON.stringify(data));
    console.log('added')
  }

  catch(error)
  {
    console.log('error3')
  }

}

retrieveData = async () => {
  console.log('get all data')
try {
  const value = await AsyncStorage.getItem('key');
  const data = (JSON.parse(value));
  console.log(data)
  if (data !== null) {
    // We have data!!
    console.log(data);
  }
} catch (error) {
  console.log('error')
  // Error retrieving data
}
};

storeData = async () => {
  console.log('new data stored')
  try {
    await AsyncStorage.setItem('key', JSON.stringify(obj));
  }
  catch (error) {
    console.log('error1')
  }
}

clearAsyncStorage = async() => {
    console.log('reset, all data removed')
    AsyncStorage.clear();
}

rankingChange = async(iD,change) => {
  console.log('ranking Change')
  this.setState({
    vote: true,
  })
  try{
    const value = await AsyncStorage.getItem('key');
    const data = (JSON.parse(value));
    rankDate = data.filter(d => (d.iD == iD))
    rankDate[0].ranking = rankDate[0].ranking + change
    rankDate[0].voted = true
    console.log('vote changed')
    console.log(rankDate[0].voted)
    var res = data.map(obj => rankDate.find(o => o.iD === obj.iD) || obj);
    console.log(res)
    console.log('data being added to storage ')
    this.newData = res
    await AsyncStorage.setItem('key', JSON.stringify(res));
}

    catch(error)
    {
      console.log('error4')
    }

}

  render() {
    return (
      //sad.
      <View style={styles.container}>
        <View style={{flex: .03,backgroundColor : '#2f386e' }}/>

        <View style={[{flex: 1}, styles.elementsContainer]}>


          <View style={{flex: 0.5,backgroundColor : '#2f386e',alignItems: 'center'}}>
            <Text style = {styles.headerStyle}> League helper </Text>
          </View>

          <View style={{flex: 1, flexDirection: 'row', style: styles.secondrow,backgroundColor: '#2f386e'}}>
              <View style={{flex:2}}>
                    <Image
                      style = {styles.selectedImage}
                      source= {this.state.image}
                    />
              </View>

              <View style={{flex:2,}}>
                  <Image
                    style = {styles.selectedImage}
                    source= {this.state.image2}
                    />
              </View>

              <View style={{flex:1.3, }} >

                    {this.state.search &&(
                <View style = {{flex:1, backgroundColor : '#2f386e',alignItems:'flex-end'}}>
                  <TouchableOpacity onPress = {this.toggle}>
                    <Icon
                      name="ios-arrow-dropright-circle"
                      color="#ccc"
                      size={100}

                    />
                  </TouchableOpacity>
                </View>
              )}

      {!this.state.search &&(
                <View style = {{flex : 1,  style: styles.selectedImage,alignItems:'flex-end'}}>
                  <TouchableOpacity onPress = {this.reSet}>
                  <Icon
                    name="ios-close"
                    color="#ccc"
                    size={100}
                  />
                    </TouchableOpacity>
                </View>
              )}

              </View>

          </View>

          <View style={{flex: 5, backgroundColor: '#2f386e',}}>
          <ScrollView>

            {this.state.on &&(
            <ItemsLayout>
              {picList.map((pic, index) => (
                <Card
                key = {this.index}
                cardkey={pic.key}
                cardtitle={pic.name}
                cardsrc={pic.file}
                updateImage = {this.updateImage}

                />
                //<Card card= {pic} selectChamp = {selectChamp} />
              ))}
              </ItemsLayout>
            )}

            {!this.state.on &&(
              <ScrollView>
              <View style = {{flex: 4}}>
              {this.newerData = newData.map((pic,index) => (
                <Results

                key = {this.index}
                iD = {pic.iD}
                itemName ={pic.item}
                itemPic= {pic.itempic}
                comment = {pic.tip}
                ranking = {this.rankingChange}
                index = {index}
                voteFun = {this.rankingChange}
                voted = {this.state.vote}
                image = {this.image2}

                />
              ))}
              <AddResult
              updateUser = {this.updateUser}
              user = {this.state.user}
              text = {this.textedit}
              newEntry={this.addingData}

              />
              </View>
              </ScrollView>
            )}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const ItemsLayout = styled.View`
 flex-direction: row;
 flex: 1;
 flex-wrap: wrap;
 align-items:center;
 justify-content:space-evenly;
 width:100%;
 margin:0;
`;



const styles = {
  container: {
    flex: 1,

  },
  headerStyle: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 24,
    color: '#FFFF00'
  },
  secondrow:{
    height:100,
    backgroundColor: '#7f03fc'
  },
  elementsContainer: {
    backgroundColor: '#ecf5fd',
  },
   selectedImage: {
     width: 100,
     height:100,
   borderWidth: 5,
   borderColor: '#818fbd',
   alignItems:'center',
   justifyContent: 'center',
 },

 addReults:{
   justifyContent:'bottom',
 }


}
