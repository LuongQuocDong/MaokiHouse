import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-spinner-overlay"
    >
      <motion.div
        className="loading-spinner"
        animate={{
          rotate: 360,
          transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50">
          <motion.circle
            cx="25"
            cy="25"
            r="20"
            stroke="#824a39"
            strokeWidth="4"
            fill="none"
            animate={{
              strokeDasharray: ["1, 150", "90, 150", "90, 150"],
              strokeDashoffset: [0, -35, -124],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner; 