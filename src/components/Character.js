import {React, useState} from 'react';
import { motion } from "motion/react";
import { AnimatePresence } from 'framer-motion';
import { heroStore } from '../constants';

function Characters({character}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration:3,
            staggerChildren: 1, // Delay between each child
        },
    },
};

const childVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
};
    
    const [index, setIndex] = useState(0);
    
  return (
      <motion.div className="full-screen"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      >
        <Character elem={character[index]} variants={childVariants}/>
        <div className="align-end">
          <motion.div className="nav-buttons"
            variants={childVariants}
          >
            <motion.button className='glass'
            whileHover={{
              background:(index===0)? "transparent":"rgba(255, 255, 255, 0.50)", 
              color:(index===0)?"white":"black"}}
            onClick={()=>setIndex(index-1)} disabled={index===0}>
            <i className="bi bi-arrow-left-circle"></i>
            </motion.button> 

            <motion.button className='glass'
            whileHover={{
              background:(character.length-1)===index? "transparent":"rgba(255, 255, 255, 0.50)", 
              color:(character.length-1)===index?"white":"black"}}
            onClick={()=>setIndex(index+1)} disabled={(character.length-1)===index}>
            <i className="bi bi-arrow-right-circle"></i>
          </motion.button>

          </motion.div>
        </div>
        
      
      </motion.div>
  )
}

function Character({elem}){
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration:3,
            staggerChildren: 1, // Delay between each child
        },
    },
};

const childVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
};

  const resLink = elem.urls.filter((val,i)=>val.type==="comiclink")[0]?.url;
  heroStore.heroImage = `${elem.thumbnail.path}.${elem.thumbnail.extension}`;
  return  (
    <AnimatePresence>
      <motion.div className="cardDiv"
     initial={{ opacity: 0, scale: 0 }}
     animate={{ opacity: 1, scale: 1 }}
     transition={{
         duration: 0.4,
         scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
     }}
     exit={{ opacity: 0, scale: 0 }}
    >
      <div className="cardInfo">
      <motion.div className="glass card">
        <h1>{elem.name}</h1>
        <p>{elem.description}</p>
        <p>Comics: {elem.comics.available}</p>
        <p>Stories: {elem.stories.available}</p>
      </motion.div>
      
      <motion.div className='card glass'>
        <h2>Comics Link</h2>
        <motion.a className="motion-link" href={resLink}  target="_blank">
          {resLink}
          </motion.a>
      </motion.div>
      <motion.div className="card glass" style={{overflowY:"hidden"}}>
        
        <h2>Comics</h2>
        <motion.div className='comicsDiv'
        variants={containerVariants} 
        initial="hidden"
        animate="show">
        {elem.comics.items.map((val,i)=><motion.p key={i} variants={childVariants}>{val.name}</motion.p>)}
        </motion.div>
        
      </motion.div>
      
      </div>
      
      </motion.div>
    </AnimatePresence>
    
    );
}


export default Characters