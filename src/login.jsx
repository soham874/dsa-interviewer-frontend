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
        Your AI Interviewer That Actually <span className="text-purple-400 font-semibold">Remembers</span>
      </p>

      <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
        Stop getting rejected by FAANG. Train with an AI that's tougher than your actual interviewer
        and tracks every mistake you make. No cap. 🔥
      </p>

      <button
        onClick={onLogin}
        className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
      >
        <span>Start Getting Roasted</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-violet-400 opacity-0 group-hover:opacity-20 transition-opacity blur"></div>
      </button>

      <p className="text-sm text-gray-500 mt-4">
        Sign in with Google to save your L's and W's
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
      description: "Strict, professional vibes. Just like the real deal where one wrong move = instant rejection."
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "All the Hard Stuff",
      description: "Arrays, trees, graphs, DP, backtracking. We cover everything that makes you cry at 3 AM."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI with Receipts",
      description: "Remembers every time you fumbled. Adapts to expose your weak spots until you fix them."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Actual Progress Tracking",
      description: "Detailed scoring on understanding, approach, implementation, and optimization. No participation trophies."
    }
  ];

  return (
    <section className="py-20 bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Why Sarthi Hits <span className="text-purple-400">Different</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Most practice tools are soft. Sarthi trains you for the real pressure where every second counts.
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
    { step: "01", title: "Get a Problem", description: "Sarthi serves you a LeetCode-style question that'll test your limits" },
    { step: "02", title: "Explain Your Approach", description: "Talk through your solution. Sarthi will challenge every assumption" },
    { step: "03", title: "Code in Java", description: "Write actual code. No pseudocode allowed. Sarthi runs tests in real-time" },
    { step: "04", title: "Get Scored", description: "Receive brutal honest feedback on 4 dimensions. Know exactly where you stand" },
    { step: "05", title: "Level Up", description: "Sarthi remembers everything and creates your personalized improvement plan" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            How to Get <span className="text-violet-400">Humbled</span>
          </h2>
          <p className="text-xl text-gray-400">5 steps to go from zero to FAANG-ready (or realize you need more practice)</p>
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
    { number: "15+", label: "DSA Topics Covered", description: "Everything that matters" },
    { number: "4", label: "Scoring Dimensions", description: "Comprehensive feedback" },
    { number: "∞", label: "Problems Available", description: "Never run out of practice" },
    { number: "100%", label: "Honest Feedback", description: "No sugar-coating allowed" }
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
    "Built for mid-level backend engineers",
    "Zero handholding policy",
    "Tracks progress like your manager tracks deadlines"
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
          <p className="text-2xl text-white font-semibold mb-2">Ready to Level Up?</p>
          <p className="text-gray-400">
            Stop practicing on easy mode. Time to see if you've actually got what it takes.
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
        Your FAANG Journey <span className="text-purple-400">Starts Here</span>
      </h2>

      <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
        Join the ranks of engineers who stopped making excuses and started making progress.
        Your future self will thank you (or blame you for waiting).
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={onLogin}
          className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
        >
          <Zap className="w-6 h-6" />
          <span>Sign In with Google & Start Grinding</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        Free to start • No credit card required • Your progress is saved forever
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
          <p className="text-gray-500">
            Built for engineers who are serious about their craft. No shortcuts, just results.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SarthiLanding;
