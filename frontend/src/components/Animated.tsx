import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0, rotateY: 180 },  // Start invisible and rotated 90 degrees away
  animate: { opacity: 1, rotateY: 0 },    // Flip to the front and become fully visible
  exit: { opacity: 0, rotateY: 0 },      // Flip to the back and fade out
};
// const animations = {
//     initial: { opacity: 0, rotateX: -90, rotateY: -90 },  // Start invisible and rotated diagonally
//     animate: { opacity: 1, rotateX: 0, rotateY: 0 },      // Rotate to normal orientation and become fully visible
//     exit: { opacity: 0, rotateX: 90, rotateY: 90 },       // Rotate diagonally out and fade out
//   };
//@ts-ignore
const Animated = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default Animated;
