import {React, useState, useEffect} from 'react'
import {marvelAPI } from './Api/MarvelAPI.js';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Characters from './components/Character';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeCanvas from './components/ThreeCanvas';

function App() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCanvas, setshowCanvas] = useState(false);
    const [welcomeText, setwelcometext] = useState("Welcome to M.A.R.V.E.L. Characters");

    useEffect(() => {
      const getData = async () =>{
        try{
          let data = await marvelAPI("characters",{
            limit: 100,
          });
          
         // console.log(data.results[0].thumbnail.path.includes("image_not_available"));
          data = data.results.filter((val,i)=>val.thumbnail.path.includes("image_not_available")===false);
          setCharacters(data);
         
        }
        catch(err){
          console.error('Failed to fetch characters:', err);
        }
    }
        getData();
       
    
    }, []);
    useEffect(()=>{
      if(characters.length>0){
         let i=0;
         
          if(welcomeText.length>"M.A.R.V.E.L. Characters".length){
            for(;i<5;i++){
              setTimeout(()=>setwelcometext(welcomeText.substring(1)),200);
            }
          }
          else{
            setLoading(false);
            setTimeout(()=>setshowCanvas(true),4000);
          }
      }
     
    },[welcomeText, characters]);



  return (
    <div className="App" id="canvas-container">

       <AnimatePresence>
                {loading && (
                  
                    <motion.h1 className='heading'
                        initial={{ opacity: 0, y: 450 }}
                        animate={{ opacity: 1, y: 350 }}
                        exit={{  opacity:0, y: 100 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                    >
                        {welcomeText}
                    </motion.h1>
               
                )}
            </AnimatePresence>
            {!loading && (
              <>
                <motion.h1 className='heading'
                    initial={{ opacity: 0, y:20}}
                    animate={{ opacity: 1, y:0}}
                    transition={{ duration: 1, delay: 1.3 }}
                >
                    {welcomeText}
                   
                </motion.h1>
                <motion.div className='cardView'
                initial={{ opacity: 0, scale:0 }}
                animate={{ opacity: 1, scale: 1}}
                transition={{ duration: 1, delay: 2 }} 
                >
                   <Characters character={characters}/>
                  </motion.div>
              </>
                
            )}
      {!loading && showCanvas && <ThreeCanvas />}
      {!loading && <motion.a className="copyright" href='https://github.com/DebaratiD' target='_blank'><p>&copy;</p>DebaratiDatta</motion.a>}
    </div>
  );
}

export default App;
