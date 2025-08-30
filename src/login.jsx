import { API_BASE_URL } from './config';

import React from 'react';
import { Code2, Brain, Target, TrendingUp, Zap, Trophy, ArrowRight, CheckCircle } from 'lucide-react';

// Hero Component
const Hero = ({ onLogin }) => (
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
    {/* Animated background elements */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
    </div>

    <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
      <div className="flex items-center justify-center mb-8">
        <Brain className="w-16 h-16 text-purple-400 mr-4" />
        <h1 className="text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
          Sarthi
        </h1>
      </div>

      <p className="text-2xl text-gray-300 mb-4 font-light">
        Your AI Interviewer That Actually <span className="text-purple-400 font-semibold">Remembers</span> Your L's
      </p>

      <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
        Built on LeetCode. Train with an AI that's more savage than your actual interviewer
        while building your LC profile. For beginners to mid-level devs who want that FAANG bag 💰
      </p>

      <button
        onClick={onLogin}
        className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
      >
        <span>Start Your Villain Arc</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-violet-400 opacity-0 group-hover:opacity-20 transition-opacity blur"></div>
      </button>

      <p className="text-sm text-gray-500 mt-4">
        Sign in with Google to track your glow-up journey ✨
      </p>
    </div>
  </section>
);

// Features Component
const Features = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "No Fake Nice Energy",
      description: "Strict, professional vibes. Just like the real deal where one wrong answer = immediate rejection. We keep it 💯"
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "LeetCode Integration",
      description: "Built on LeetCode problems. Practice here = building your LC profile. Two birds, one stone fr fr 🎯"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI with Receipts",
      description: "Remembers every time you fumbled. Adapts to expose your weak spots until you actually improve. No fake progress."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Actual Progress Tracking",
      description: "Detailed scoring on understanding, approach, implementation, and optimization. From beginner to mid-level beast mode."
    }
  ];

  return (
    <section className="py-20 bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Why Sarthi is the Main Character
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Most practice tools are giving participation trophy energy. Sarthi said "nah, we're built different" 😤
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Component
const HowItWorks = () => {
  const steps = [
    { step: "01", title: "Get Served a Problem", description: "Sarthi pulls a LeetCode question that'll humble you real quick. No tutorial island vibes here 💀" },
    { step: "02", title: "Explain Your Big Brain Move", description: "Walk through your solution. Sarthi will fact-check your logic like it's personal" },
    { step: "03", title: "Code or Get Coded", description: "Write actual Java. No pseudocode, no shortcuts. Sarthi runs tests and judges your entire existence" },
    { step: "04", title: "Receive Your Report Card", description: "Get scored on 4 dimensions. Sometimes the truth hurts, but that's how we grow bestie 📈" },
    { step: "05", title: "Unlock Your Next Level", description: "Sarthi remembers your weak spots and creates your personalized redemption arc plan" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            How to Transform into Your <span className="text-violet-400">Final Form</span>
          </h2>
          <p className="text-xl text-gray-400">5 steps to go from noob to FAANG-ready (or discover you need to touch grass and study more)</p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-8 group">
              <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-lg">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block w-px h-16 bg-gradient-to-b from-purple-500 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Component
const Stats = () => {
  const stats = [
    { number: "15+", label: "DSA Topics Covered", description: "All the algorithms that matter" },
    { number: "4", label: "Scoring Dimensions", description: "360° feedback, no blind spots" },
    { number: "LC", label: "Profile Integration", description: "Built on LeetCode problems" },
    { number: "24/7", label: "Available to Humble You", description: "AI never sleeps, neither should your grind" }
  ];

  return (
    <section className="py-20 bg-gray-800 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-5xl font-black text-transparent bg-gradient-to-b from-purple-400 to-violet-600 bg-clip-text mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
              <p className="text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Component
const WhyChoose = () => {
  const reasons = [
    "Real pressure, real consequences",
    "Remembers your fails and fixes them",
    "Session summaries after each session",
    "Zero handholding policy",
    "Tracks progress like your manager tracks deadlines",
    "Bro COOKS 💀"
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-purple-900/20 to-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold text-white mb-12">
          Why Sarthi > Everything Else
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <span className="text-white font-medium">{reason}</span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-800/30 to-violet-800/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <p className="text-2xl text-white font-semibold mb-2">Ready to Touch Grass... After You Code?</p>
          <p className="text-gray-400">
            Stop doom-scrolling and start algorithm-scrolling. Your LinkedIn needs this energy 🚀
          </p>
        </div>
      </div>
    </section>
  );
};

// CTA Component
const CallToAction = ({ onLogin }) => (
  <section className="py-20 bg-gray-900 relative">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-5xl font-bold text-white mb-8">
        Your FAANG Arc <span className="text-purple-400">Starts Now</span>
      </h2>

      <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
        Join the devs who stopped making excuses and started making bank.
        Your future self is either gonna thank you or question your entire existence 🤡
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={onLogin}
          className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
        >
          <Zap className="w-6 h-6" />
          <span>Sign In with Google & Lock In 🔒</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        Free to start • No credit card flexing required • Your progress gets saved to the cloud ☁️
      </p>
    </div>
  </section>
);

// Main Landing Page Component
const SarthiLanding = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/login/google`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold">Sarthi</span>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-xl font-medium transition-colors duration-200"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero onLogin={handleGoogleLogin} />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Stats Section */}
      <Stats />

      {/* Why Choose Section */}
      <WhyChoose />

      {/* Final CTA */}
      <CallToAction onLogin={handleGoogleLogin} />

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold">Sarthi</span>
          </div>
          <p className="text-gray-500 mb-3">
            Built for engineers who are serious about securing the bag. No shortcuts, just results.
          </p>
          <p className="text-xs text-gray-600">
            Made by Soham with Claude, Gemini & ChatGPT • Powered by caffeine and existential dread ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SarthiLanding;
