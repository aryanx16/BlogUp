import { motion } from 'framer-motion';

const animations = {
  initial: { x: '-10vw' },  // Start off the screen to the left
  animate: { x: 0 },         // Move to the final position
  exit: { x: '10vw' },      // Exit off the screen to the right
};
//@ts-ignore
const AnimatedRight = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="entry"
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedRight;
