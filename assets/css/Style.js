import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  header:{
    paddingTop:10,
    paddingBottom:30,
    alignItems:'center',
  },
  header_span:{
    fontWeight:'100',
    fontSize:20,
  },
  header_title:{
    fontWeight:'400',
    fontSize:30,
  },
  body_title:{
    fontWeight:'bold',
    fontSize:20,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    flex: 1,
    paddingTop: '8%',
  },
  nav: {   
    flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor: '#231F20',
  },
  nav_logo:{ 
    // flex:1, 
    paddingLeft:20
  },
  body: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyParent: {
    flex: 1,
    flexDirection: 'row',
  },

  golasContainer: {
    color: '#50c878',
    flex: 5
  },

  img: {
    width: 30,
    height: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  icon: {
    backgroundColor: '#FBAF19',
    padding:10,
    margin:10,
    width: '80%',  
    height:150, 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  scroll_home:{
    height:2000,
  }
});

// export default styles