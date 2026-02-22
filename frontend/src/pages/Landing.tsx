import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />

      <div className="pt-40 px-6 max-w-6xl mx-auto">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
            Report Safely. <br />
            Be Heard. <br />
            <span className="text-[#0F766E]">Stay Protected.</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
            A secure digital reporting platform designed to reduce fear,
            remove stigma, and simplify access to law enforcement services.
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-10 flex justify-center gap-6">
            <Link
              to="/report"
              className="px-8 py-3 bg-[#0F766E] text-white rounded-md hover:bg-[#0D5E58]"
            >
              Start Secure Report
            </Link>

            <Link
              to="/dashboard"
              className="px-8 py-3 border border-gray-300 rounded-md hover:border-[#0F766E]"
            >
              Access Dashboard
            </Link>
          </div>

          <div className="mt-10 flex justify-center gap-10 text-sm text-gray-500">
            <div>Confidential</div>
            <div>Non-Judgmental</div>
            <div>Secure Infrastructure</div>
          </div>
        </motion.div>

        {/* QUICK ACCESS CARDS */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">

          <ActionCard
            title="File New Report"
            description="Use AI-guided conversation to securely report incidents."
            link="/report"
          />

          <ActionCard
            title="Track Complaint"
            description="Monitor progress and status of submitted reports."
            link="/dashboard"
          />

          <ActionCard
            title="Officer Login"
            description="Access operational dashboard for case management."
            link="/login"
          />

        </div>

        {/* WHY SECTION */}
        <div className="mt-32">
          <h2 className="text-3xl font-semibold text-center">
            Why Many Incidents Go Unreported
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Card
              title="Fear of Physical Visits"
              description="Traditional reporting methods may feel intimidating or unsafe for vulnerable individuals."
            />
            <Card
              title="Social Stigma"
              description="Victims often hesitate due to fear of judgment or social consequences."
            />
            <Card
              title="Complex Processes"
              description="Manual paperwork and procedural delays discourage timely reporting."
            />
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-32">
          <h2 className="text-3xl font-semibold text-center">
            Simple, Guided Process
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Step
              step="01"
              title="Describe the Incident"
              description="Share details in your own words."
            />

            <Step
              step="02"
              title="AI Structures Your Report"
              description="The system organizes your complaint clearly."
            />

            <Step
              step="03"
              title="Secure Submission"
              description="Your report is forwarded safely to the relevant authority."
            />
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-32 border-t border-gray-200 py-10 text-center text-sm text-gray-500">
          <p className="font-medium text-[#0F172A] mb-2">
            AI Secure Reporting Platform
          </p>
          <p>
            Strengthening public access to law enforcement through
            secure and inclusive digital infrastructure.
          </p>
          <p className="mt-6 text-xs text-gray-400">
            © {new Date().getFullYear()} AI Secure Reporting.
          </p>
        </footer>

      </div>
    </div>
  );
}

function ActionCard({ title, description, link }: any) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-6 bg-white border border-gray-200 rounded-md shadow-sm"
    >
      <h3 className="font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 text-sm mb-6">
        {description}
      </p>
      <Link
        to={link}
        className="inline-block px-5 py-2 bg-[#0F766E] text-white rounded-md hover:bg-[#0D5E58]"
      >
        Continue
      </Link>
    </motion.div>
  );
}

function Card({ title, description }: any) {
  return (
    <div className="p-8 bg-white border border-gray-200 rounded-md">
      <h3 className="font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function Step({ step, title, description }: any) {
  return (
    <div className="p-8 bg-white border border-gray-200 rounded-md">
      <div className="text-[#0F766E] font-semibold mb-2">{step}</div>
      <h3 className="font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}