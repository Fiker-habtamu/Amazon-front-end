import { useContext, useEffect } from 'react';
import './App.css'
import Landing from './components/pages/Landing/Landing';
import Routing from './components/Router';
import { DataContext } from './components/DataProvider/DataProvider';
import { Type } from './components/Utility/action.type'; 
import {auth} from './components/Utility/firebase'
function App() {
  const [{user},dispatch] = useContext(DataContext);
  useEffect(()=>{
    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        console.log(authUser);
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
            dispatch({
              type: Type.SET_USER,
              user: null ,
            });
      }
    });
  },[]);

  return (
    <>
    <Routing/>
    </>
  );
}

export default App
