import  { useState } from 'react';
import { DollarSign, Bot, Clock, Users, TrendingUp, Zap, CheckCircle, Play, ArrowRight } from 'lucide-react';
import { createAmbassador } from '../../api/authrization';
import { toast } from  'react-toastify'
function AmbassadorsPage() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
 const [formData, setFormData] = useState({
   name: "",
   email: "",
   mobileNumber: "",
   academicDetails: {
     institutionName: "",
     course: "",
     branch: "",
     year: "",
   },
   graduationYear: "",
   weeklyAvailabilityHours: "",
   motivation: "",
   socialMediaHandles: {
     linkedin: "",
     instagram: "",
     twitter: "",
   },
 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobileNumber ||
      !formData.academicDetails.institutionName
    ) {
      toast.info("Please fill in all required fields");
      return;
    }

    try {
      await createAmbassador(formData);
      toast.success("Application submitted successfully!");

      setShowApplicationForm(false);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Earn Competitive Commissions',
      description: 'Make $500-$2,000+ per month helping peers access essential services. Top ambassadors earn over $5,000/month.'
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'Your Personal AI Assistant',
      description: 'Get a custom AI that learns your voice, handles inquiries 24/7, and helps you close more deals.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Flexible Schedule',
      description: 'Work on your own time. The AI handles responses while you focus on building relationships.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Build Your Network',
      description: 'Connect with students, providers, and other ambassadors. Grow your professional skills.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Career Growth',
      description: 'Gain sales, marketing, and tech experience. Stand out on your resume with proven results.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Quick Onboarding',
      description: 'Get trained and launched in 1-2 weeks. Start earning immediately with full support.'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Apply & Interview',
      description: 'Submit your application and complete a 30-minute video interview with our team.'
    },
    {
      number: '2',
      title: 'Get Trained',
      description: 'Complete our 2-week training on services, sales techniques, and AI assistant usage.'
    },
    {
      number: '3',
      title: 'Launch Your AI',
      description: 'We configure your personalized AI assistant that speaks in your voice and understands your style.'
    },
    {
      number: '4',
      title: 'Start Earning',
      description: 'Begin referring students to services. Your AI handles inquiries while you build relationships.'
    }
  ];

  const requirements = [
    'Currently enrolled in or recently graduated from a partnered university',
    'Strong communication skills and passion for helping peers',
    'Minimum 3.0 GPA (exceptions for exceptional candidates)',
    '15-20 hours per week availability',
    'Basic understanding of financial services (training provided)',
    'Active on social media and campus networks'
  ];

  if (showApplicationForm) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Ambassador Application
          </h2>
          <button
            onClick={() => setShowApplicationForm(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input"
              placeholder="Aditya Rai"
            />
          </div>

          {/* Email + Phone */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>

          {/* Academic Details */}
          <h3 className="text-lg font-semibold pt-4 border-t">
            Academic Details
          </h3>

          <input
            type="text"
            name="academicDetails.institutionName"
            value={formData.academicDetails.institutionName}
            onChange={handleInputChange}
            placeholder="Institution Name"
            className="input"
          />

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              name="academicDetails.course"
              value={formData.academicDetails.course}
              onChange={handleInputChange}
              placeholder="Course"
              className="input"
            />

            <input
              type="text"
              name="academicDetails.branch"
              value={formData.academicDetails.branch}
              onChange={handleInputChange}
              placeholder="Branch"
              className="input"
            />

            <input
              type="text"
              name="academicDetails.year"
              value={formData.academicDetails.year}
              onChange={handleInputChange}
              placeholder="Year"
              className="input"
            />
          </div>

          {/* Graduation + Availability */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="number"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleInputChange}
              placeholder="Graduation Year"
              className="input"
            />

            <input
              type="number"
              name="weeklyAvailabilityHours"
              value={formData.weeklyAvailabilityHours}
              onChange={handleInputChange}
              placeholder="Weekly Hours"
              className="input"
            />
          </div>

          {/* Social Media */}
          <h3 className="text-lg font-semibold pt-4 border-t">
            Social Media
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              name="socialMediaHandles.linkedin"
              value={formData.socialMediaHandles.linkedin}
              onChange={handleInputChange}
              placeholder="LinkedIn"
              className="input"
            />

            <input
              type="text"
              name="socialMediaHandles.instagram"
              value={formData.socialMediaHandles.instagram}
              onChange={handleInputChange}
              placeholder="Instagram"
              className="input"
            />

            <input
              type="text"
              name="socialMediaHandles.twitter"
              value={formData.socialMediaHandles.twitter}
              onChange={handleInputChange}
              placeholder="Twitter"
              className="input"
            />
          </div>

          {/* Motivation */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Motivation *
            </label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              rows="4"
              className="input"
              placeholder="Why do you want to become campus ambassador..."
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:scale-105 transition"
          >
            Submit Application
          </button>
        </div>  
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full max-w-full text-gray-900">
  <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
    <div className="text-center break-words">
      <div className="inline-block mb-4 px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold">
        💼 Now Hiring Campus Ambassadors
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
        Earn While You
        <br />
        <span className="text-blue-600">
          Empower
        </span>
      </h1>

      <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto text-gray-600">
        Become a CampusConnect AI-powered ambassador. Help your peers access
        essential services while earning competitive commissions with
        cutting-edge AI technology.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={() => setShowApplicationForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 shadow-md flex items-center gap-2"
        >
          Apply Now <ArrowRight size={20} />
        </button>

              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
                onClick={() => {
                  toast.info("Demo coming soon! Stay tuned.");
                }}
              >
          <Play size={20} /> Watch Demo
        </button>
      </div>

      <div className="mt-6 text-gray-500 text-sm">
        <span className="font-semibold">
          100+ ambassadors already earning
        </span>{" "}
        • Average $1,200/month
      </div>
    </div>
  </div>
</div>


      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Become an Ambassador?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join a community of student leaders earning while making a real
            impact on campus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-blue-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Your journey from application to earning in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="text-blue-300" size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Requirements
          </h2>
          <p className="text-xl text-gray-600">
            What we're looking for in our ambassadors
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="text-green-500" size={24} />
                </div>
                <p className="text-gray-700 text-lg">{requirement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default AmbassadorsPage;