import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';
import {vibrate} from './utils'
import { Timer, FlipNumber } from 'react-native-flip-timer';

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      work:1500,
      break:300,
      iswork:true,
      isPause:true,
      default_work:25,
      default_break:5
    }
  }
  start(){
    this.setState(prevState =>(
      {
        isPause: false,
        }
    ))

  }
  pause(){
    this.setState(prevState=>({
      
      isPause: !prevState.isPause,
      
    }))
  }
  // shouldComponentUpdate(nextProps,nextState){
  //   if (nextState.work % 2===0){
  //     return true
  //   }else{
  //     return false
  //   }
  // }


  componentDidMount(){
    setInterval(()=>{
      if (this.state.isPause === false){
        if (this.state.iswork===true){
          if (this.state.work===0){
            this.setState(prevState=>({
              work:0,
              break:300,
              iswork: !prevState.iswork,
              isPause:!prevState.isPause,
              
            }))
            vibrate()
          }else{
            this.setState(prevState=>({
              work:prevState.work-1,
              
            }))
          }
          }else{
            if (this.state.break===0){
              this.setState(prevState=>({
                work:1500,
                break:0,
                iswork: !prevState.iswork,
                isPause:!prevState.isPause,
                
              }))
              vibrate()
            }else{
              this.setState(prevState=>({
                
                break:prevState.break-1,
                
              }))
            }
          }
      }
  },1000 )
  }
  reset(){
    this.setState({
      work:1500,
      break:300,
      iswork:true,
      isPause:true,
      default_work:25,
      default_break:5
    })
  }
  minuswork(){
    if (this.state.default_work>0){
      this.setState(prevState=>({
        
        default_work:prevState.default_work-1,
        
      }))
    }
    
  }

  pluswork(){
    this.setState(prevState=>({
      work:prevState.work,
      break:prevState.break,
      iswork:prevState.iswork,
      isPause:prevState.isPause,
      default_work:prevState.default_work+1,
      default_break:prevState.default_break
    }))
  }

  minusbreak(){
    if (this.state.default_break>0){
      this.setState(prevState=>({
        work:prevState.work,
        break:prevState.break,
        iswork:prevState.iswork,
        isPause:prevState.isPause,
        default_work:prevState.default_work,
        default_break:prevState.default_break-1
      }))
    }
    
  }

  plusbreak(){
    this.setState(prevState=>({
      
      default_break:prevState.default_break+1
    }))
  }
  apply(){
    this.setState(prevState=>({
      work:prevState.default_work*60,
      break:prevState.default_break*60,
      
      isPause:true,
      
    }))
  }


  render() { 
    let min_work=parseInt(this.state.work/60)
    min_work = ("0" + min_work.toString()).slice(-2);
    let sec_work= this.state.work % 60
    sec_work = ("0" + sec_work.toString()).slice(-2);
    let min_break=parseInt(this.state.break/60)
    min_break = ("0" + min_break.toString()).slice(-2);
    let sec_break=this.state.break % 60
    sec_break = ("0" + sec_break.toString()).slice(-2);
    return(
      <View style={styles.container}>
        <View style={styles.rowwise}>
        
        <View style={styles.rowwise}>
        <TouchableOpacity onPress={()=>this.minuswork()} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.text_adjust_feature}>{this.state.default_work}</Text>
          <TouchableOpacity onPress={()=>this.pluswork()} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowwise}>
        <TouchableOpacity onPress={()=>this.minusbreak()} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.text_adjust_feature}>{this.state.default_break}</Text>
          <TouchableOpacity onPress={()=>this.plusbreak()} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>+</Text>
          </TouchableOpacity>
        </View>
          
        </View>


        <View style={styles.rowwise}>
          <Text style={[styles.text,styles.work_timer]}>{min_work}.{sec_work}</Text>
          <Text>               </Text>
          <Text style={styles.text}>{min_break}.{sec_break}</Text>
        </View>

        <View style={styles.rowwise}>
          <TouchableOpacity onPress={()=>this.start()} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Start</Text>
          </TouchableOpacity>
          <Text>     </Text>
          <TouchableOpacity onPress={()=>this.pause()} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Pause</Text>
          </TouchableOpacity>
          <Text>     </Text>
          <TouchableOpacity onPress={()=>this.reset()} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Reset</Text>
          </TouchableOpacity>
          <Text>     </Text>
          <TouchableOpacity onPress={()=>this.apply()} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#008cf0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  work_timer:{
    position:'relative',

  },
  rowwise:{
    flexDirection:'row'
  },
  button: {
    height: 40,
    backgroundColor: '#333333',
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12

    
    
  },
  text_adjust_feature:{
    fontSize: 25,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000000',
    
  },
});









