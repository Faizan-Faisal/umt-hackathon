import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const floatingVariants = {
  float: {
    y: [0, -20, 0],
    transition: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
  },
};

const Landing = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-gray-50">
      {/* Animated Background Shapes */}
      <motion.div
        className="absolute top-10 left-1/4 w-72 h-72 bg-indigo-400/30 rounded-full filter blur-3xl"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-96 h-96 bg-purple-400/20 rounded-full filter blur-3xl"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div
        className="absolute bottom-10 left-1/3 w-80 h-80 bg-pink-400/20 rounded-full filter blur-3xl"
        variants={floatingVariants}
        animate="float"
      />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center flex-grow px-6 sm:px-10 lg:px-24 xl:px-32">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
        >
          Connect Talent with{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Opportunity
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          CampusConnect bridges the gap between students and employers — discover jobs, post
          opportunities, and build your future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          {/* Gradient Glow Button */}
          <Link
            to="/register"
            className="px-10 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>

          {/* Glass Effect Button */}
          <Link
            to="/jobs"
            className="px-10 py-4 rounded-xl font-semibold text-lg bg-white/30 backdrop-blur-md text-gray-900 border border-white/40 hover:border-indigo-400/50 hover:bg-white/50 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Find Jobs
          </Link>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-24 xl:px-32 py-20 md:py-28 mb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: "🎓",
              title: "For Seekers",
              desc: "Browse opportunities, apply effortlessly, and track your career growth.",
              gradient: "from-indigo-500/20 to-purple-500/20",
            },
            {
              icon: "💼",
              title: "For Finders",
              desc: "Post roles, connect with talent, and manage applicants with ease.",
              gradient: "from-purple-500/20 to-pink-500/20",
            },
            {
              icon: "🤖",
              title: "Smart Matching",
              desc: "AI-powered recommendations connect the right candidates to the right roles.",
              gradient: "from-blue-500/20 to-indigo-500/20",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{
                scale: 1.06,
                rotate: 1.5,
                transition: { duration: 0.4 },
              }}
              transition={{ delay: 0.15 * (idx + 1) }}
              className={`
                relative overflow-hidden p-10 rounded-3xl
                border border-white/20 shadow-xl backdrop-blur-xl bg-white/30
              `}
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-40 group-hover:opacity-70 transition-all duration-500 rounded-3xl`}
              ></div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">{item.desc}</p>
              </div>

              {/* Animated Glow Border */}
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-indigo-400/40 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Spacer before footer */}
      <div className="h-16 md:h-24"></div>
    </div>
  );
};

export default Landing;
