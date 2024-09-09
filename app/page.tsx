import Link from 'next/link';
import { Upload, CheckCircle, Star } from 'lucide-react';
import { BackgroundIcons } from '@/components/background-icons';

const steps = [
  {
    icon: <Upload className="h-8 w-8" />,
    title: 'Upload Resume',
    description: 'Import your LinkedIn resume in PDF format.',
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: 'Choose Template',
    description: 'Select from our professionally designed templates.',
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: 'Get Your New Resume',
    description: 'Download your beautifully redesigned resume.',
  },
];

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Software Engineer',
    quote:
      'This app helped me land my dream job! The redesigned resume really stood out.',
  },
  {
    name: 'Sarah Lee',
    role: 'Marketing Specialist',
    quote:
      'I was amazed at how quick and easy it was to transform my resume. Highly recommended!',
  },
  {
    name: 'Michael Brown',
    role: 'Project Manager',
    quote:
      'The templates are sleek and professional. My application success rate has significantly improved.',
  },
];

export default function Page() {
  return (
    <>
      <style>{`
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(0, 10px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section with Background Image and Animated SVG Icons */}
      <section className="relative bg-indigo-700 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/api/placeholder/1920/1080')",
            opacity: 0.2,
          }}
        ></div>
        <BackgroundIcons />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Transform Your Resume in Minutes
          </h1>
          <p className="text-xl mb-8">
            Upload your LinkedIn resume, choose a template, and get a
            professionally designed CV instantly.
          </p>
          <Link
            href="/builder"
            className="bg-white text-indigo-700 font-bold py-2 px-6 rounded-full hover:bg-indigo-100 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* App Explanation */}
      <section className="py-16 relative overflow-hidden">
        <BackgroundIcons />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-indigo-600 mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-700 font-bold text-xl">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 relative overflow-hidden">
        <BackgroundIcons />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Upgrade Your Resume?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who have boosted their career with
            our app.
          </p>
          <button className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition duration-300">
            Start Redesigning Now
          </button>
        </div>
      </section>
    </>
  );
}
