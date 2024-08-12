import { motion } from 'framer-motion';

const flipAnimation = {
  initial: { rotateY: 0 },   // Start with no rotation
  animate: { rotateY: 180 }, // Rotate halfway (a 180-degree flip)
  exit: { rotateY: 360 },    // Complete the full rotation (another 180 degrees)
};

// @ts-ignore
const CoinFlip = ({ children }) => {
  return (
    <motion.div
    //   style={{
    //     borderRadius: '50%', // Make the div a circle
    //     width: '100px',
    //     height: '100px',
    //     backgroundColor: '#f0f0f0', // Light grey color, customize as needed
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}
      variants={flipAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

export default CoinFlip;
