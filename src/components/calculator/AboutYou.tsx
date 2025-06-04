
import { motion } from "framer-motion";
import { CalculatorData } from "./types";

interface AboutYouProps {
  data: CalculatorData;
  updateData: (data: Partial<CalculatorData>) => void;
}

const provinces = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
  "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island",
  "Quebec", "Saskatchewan", "Yukon"
];

const maritalStatuses = [
  { value: "Single", icon: "👤", description: "Not married" },
  { value: "Married/Common-law", icon: "👥", description: "Living together" },
  { value: "Divorced", icon: "💔", description: "Previously married" },
  { value: "Widowed", icon: "🕊️", description: "Lost spouse" }
];

const AboutYou = ({ data, updateData }: AboutYouProps) => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl font-light text-gray-900 mb-2">About You</h2>
        <p className="text-gray-600 text-lg">Let's start with some basic information about yourself</p>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Age Controls - Medium Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 md:col-span-6 bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Age Journey</h3>
          
          {/* Current Age */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Current Age
            </label>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateData({ currentAge: Math.max(18, data.currentAge - 1) })}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                −
              </motion.button>
              
              <div className="flex-1 text-center">
                <input
                  type="number"
                  value={data.currentAge}
                  onChange={(e) => updateData({ currentAge: parseInt(e.target.value) || 18 })}
                  min="18"
                  max="80"
                  className="w-full text-center text-4xl font-bold p-4 bg-white/70 border border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all backdrop-blur-sm"
                />
                <div className="text-sm text-gray-500 mt-2">years old</div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateData({ currentAge: Math.min(80, data.currentAge + 1) })}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                +
              </motion.button>
            </div>
          </div>

          {/* Retirement Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Planned Retirement Age
            </label>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateData({ retirementAge: Math.max(data.currentAge + 1, data.retirementAge - 1) })}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                −
              </motion.button>
              
              <div className="flex-1 text-center">
                <input
                  type="number"
                  value={data.retirementAge}
                  onChange={(e) => updateData({ retirementAge: Math.max(data.currentAge + 1, parseInt(e.target.value) || 65) })}
                  min={data.currentAge + 1}
                  max="80"
                  className="w-full text-center text-4xl font-bold p-4 bg-white/70 border border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all backdrop-blur-sm"
                />
                <div className="text-sm text-gray-500 mt-2">retirement age</div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateData({ retirementAge: Math.min(80, data.retirementAge + 1) })}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                +
              </motion.button>
            </div>
            
            {/* Timeline Visualization */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Working Years</span>
                <span className="font-semibold">{data.retirementAge - data.currentAge} years</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${Math.min(100, ((data.retirementAge - data.currentAge) / 40) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Province Selection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 md:col-span-6 bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Location</h3>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Province/Territory
          </label>
          <select
            value={data.province}
            onChange={(e) => updateData({ province: e.target.value })}
            className="w-full p-6 text-lg bg-white/70 border border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all backdrop-blur-sm appearance-none cursor-pointer"
          >
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
          
          <div className="mt-4 p-4 bg-blue-50/50 rounded-xl">
            <p className="text-sm text-blue-800">
              🏛️ Your location affects government benefits like CPP/QPP and OAS calculations
            </p>
          </div>
        </motion.div>

        {/* Marital Status - Full Width Card with Visual Selection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-12 bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Marital Status</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {maritalStatuses.map((status) => (
              <motion.button
                key={status.value}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateData({ maritalStatus: status.value })}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
                  data.maritalStatus === status.value
                    ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20"
                    : "border-gray-200/50 bg-white/30 hover:border-gray-300/80 hover:bg-white/50"
                }`}
              >
                <div className="text-3xl mb-2">{status.icon}</div>
                <div className={`font-semibold ${
                  data.maritalStatus === status.value ? "text-blue-900" : "text-gray-700"
                }`}>
                  {status.value}
                </div>
                <div className={`text-sm mt-1 ${
                  data.maritalStatus === status.value ? "text-blue-600" : "text-gray-500"
                }`}>
                  {status.description}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Information Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 border border-blue-200/50 rounded-3xl p-8 backdrop-blur-sm"
      >
        <h3 className="font-semibold text-blue-900 mb-3 text-lg">💡 Why we need this information</h3>
        <p className="text-blue-800 leading-relaxed">
          Your age determines how long your money needs to grow and last. Your location affects government benefits like CPP/QPP and OAS. 
          Marital status can impact tax planning and household retirement needs. This information helps us create a personalized retirement strategy for you.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutYou;
