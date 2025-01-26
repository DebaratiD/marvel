import {React, useState} from 'react';
import { motion } from "motion/react";
import { AnimatePresence } from 'framer-motion';

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
            <motion.button className='card'
            whileHover={{
              background:(index===0)? "transparent":"rgba(255, 255, 255, 0.50)", 
              color:(index===0)?"white":"black"}}
            onClick={()=>setIndex(index-1)} disabled={index===0}>
            <i className="bi bi-arrow-left-circle"></i>
            </motion.button> 

            <motion.button className='card'
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
  const resLink = elem.urls.filter((val)=>val.type==="comiclink")?.url;
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
      <motion.div className="cardInfo card">
        <h2>{elem.name}</h2>
        <p>{elem.description}</p>
        <p>Comics: {elem.comics.available}</p>
        <p>Stories: {elem.stories.available}</p>
      {resLink && <p>Comics Link: {resLink}</p>}
      </motion.div>
      <motion.div className="align-center">
        <img
            src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
            alt={elem.name}
            style={{ width: '250px', height: '250px' }}
        />
      </motion.div>
        
      </motion.div>
    </AnimatePresence>
    
    );
}


export default Characters