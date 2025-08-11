"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SparklesCore,
  StunningButton,
  TextGenerateEffect,
} from "@/components/ui/animated-cards";
import { ProjectCard, SkillCard } from "@/components/ui/project-cards";
import profilePic from "@/app/assets/vijaykanth.jpg";
import Image from "next/image";

interface HeaderProps {
  activeSection: string;
  setActiveStatus: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveStatus }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let timeoutId: NodeJS.Timeout;

      const handleSectionVisibility = () => {
        const sections = ["home", "skills", "projects", "contact"];
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        let newActiveSection = activeSection;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { top, bottom } = element.getBoundingClientRect();
            const elementTop = top + window.scrollY;
            const elementBottom = bottom + window.scrollY;

            if (
              scrollPosition >= elementTop &&
              scrollPosition < elementBottom
            ) {
              newActiveSection = section;
              break;
            }
          }
        }

        if (newActiveSection !== activeSection) {
          setActiveStatus(newActiveSection);
        }
      };

      const debouncedScrollHandler = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleSectionVisibility, 50);
      };

      window.addEventListener("scroll", debouncedScrollHandler);
      return () => {
        window.removeEventListener("scroll", debouncedScrollHandler);
        clearTimeout(timeoutId);
      };
    }
  }, [activeSection, setActiveStatus]);

  const scrollToSection = ({ sectionId }: { sectionId: string }) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        setActiveStatus(sectionId);
        setIsMobileMenuOpen(false);
      }
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <nav className='flex justify-between items-center'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection({ sectionId: "home" })}
            className='text-xl cursor-pointer font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text'
          >
            VG
          </motion.div>

          <div className='flex items-center'>
            <ul className='hidden sm:flex items-center space-x-2 md:space-x-4'>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection({ sectionId: item.id })}
                    className='relative px-3 py-2 group'
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId='activeSection'
                        className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-all duration-300 text-sm md:text-base ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text font-medium"
                          : "text-zinc-400 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 transform origin-left scale-x-0 transition-transform duration-300 ${
                        activeSection === item.id
                          ? "opacity-100 scale-x-100"
                          : "group-hover:opacity-100 group-hover:scale-x-100"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <button
              className='sm:hidden p-2'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className='w-6 h-6 text-zinc-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='sm:hidden mt-4 bg-black/80 backdrop-blur-md rounded-lg p-4'
          >
            <ul className='flex flex-col space-y-2'>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection({ sectionId: item.id })}
                    className={`w-full text-left px-4 py-2 transition-colors ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text font-medium"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

const Home = () => {
  const [activeSection, setActiveSection] = useState("home");

  // const projects = [
  //   {
  //     title: "Shaker Group Maintenance",
  //     description:
  //       "Mobile app for Shaker Group technicians to track job orders and statuses. Improved UI/UX for better usability and efficiency in job tracking. Integrated REST API calls for seamless order tracking and consumer activation.",
  //     tech: ["React Native", "REST API", "RTK Query", "Jest"],
  //   },
  //   {
  //     title: "MIVIS Assistance",
  //     description:
  //       "Built web and mobile applications for an international insurance and reinsurance platform. Designed an intuitive and interactive user interface for seamless client interactions. Implemented API integrations to streamline insurance and claim processes.",
  //     tech: ["React Native", "React.js", "Material UI", "REST API"],
  //   },
  //   {
  //     title: "BeRightHere",
  //     description:
  //       "Developed a digital platform for workspace and meeting space booking. Designed and implemented a responsive and engaging UI. Integrated APIs to enhance search, booking, and user management functionalities.",
  //     tech: ["React Native", "React.js", "Tailwind CSS", "Material UI"],
  //   },
  //   {
  //     title: "Nimble Connect",
  //     description:
  //       "Created a donor engagement platform with a user-friendly interface. Integrated calling features using Amazon Connect Streams for secure communication. Implemented responsive design to ensure seamless cross-device compatibility.",
  //     tech: ["React.js", "Tailwind CSS", "Amazon Connect", "Jest"],
  //   },
  // ];
  const projects = [
    {
      title: "Interval 360 – AI-Powered 360° Feedback Platform",
      description:
        "Developed a responsive HR feedback application with React.js, TypeScript, and Tailwind CSS for 360-degree surveys and evaluations. Implemented role-based portals (Super Admin, HR Admin, Employees) with automated workflows for feedback collection and reporting. Integrated AI features using Groq LLaMA 70B for real-time conversational feedback and analytics.",
      tech: [
        "React.js",
        "TypeScript",
        "Tailwind CSS",
        "Redux Toolkit",
        "RTK Query",
        "RESTful APIs",
        "Git",
      ],
    },
    {
      title: "Nimble Connect – Donor Engagement Platform",
      description:
        "Built responsive donor management interfaces and campaign dashboards using React.js, TypeScript, and Tailwind CSS. Implemented real-time campaign management UIs with automated outreach workflows. Integrated AWS Connect for secure communications and used RTK Query for efficient API data handling.",
      tech: [
        "React.js",
        "TypeScript",
        "Tailwind CSS",
        "AWS Connect",
        "RTK Query",
        "RESTful APIs",
        "Git",
      ],
    },
    {
      title: "BeRightHere.com – Workspace & Meeting Room Booking",
      description:
        "Developed and maintained a responsive booking platform optimized for professionals, startups, and enterprises. Designed intuitive UIs and integrated RESTful APIs to display real-time availability and manage secure bookings.",
      tech: ["React.js", "JavaScript (ES6+)", "CSS", "RESTful APIs", "Git"],
    },
  ];

  const skills = [
    {
      title: "Frontend Development",
      description:
        "Multiplatform Front End Development with React.js, JavaScript (ES6+), TypeScript, Responsive Design, Cross-Platform UI Development",
    },
    {
      title: "State Management",
      description: "Redux, Redux Toolkit",
    },
    {
      title: "API Integration",
      description:
        "RESTful APIs, Third-Party API Integration (OpenAI APIs, Amazon Streams), RTK Query, Axios",
    },
    {
      title: "UI Frameworks & Tools",
      description:
        "Tailwind CSS, Material UI, Git, Agile/Scrum Methodologies, Unit Testing (Vitest)",
    },
  ];

  const handleDownloadResume = () => {
    // Replace with your resume download link
    alert("Downloading Resume...");
    // using Java Script method to get PDF file
    fetch("/vijaykanth.G.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);

        // Setting various property values
        const alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "Vijayakanth-Resume.pdf";
        alink.click();
      });
    });
  };
  return (
    <div className='min-h-screen bg-black text-white overflow-x-hidden'>
      <Header
        activeSection={activeSection}
        setActiveStatus={setActiveSection}
      />

      {/* Hero Section */}
      <section
        id='home'
        className='min-h-screen relative flex flex-col justify-center items-center px-4 md:px-6'
      >
        <div className='absolute inset-0'>
          <SparklesCore />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8'
        >
          <div className='flex-1 text-center md:text-left'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ lineHeight: "100px" }}
              className='text-5xl  md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6'
            >
              Vijayakanth G
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='text-2xl md:text-3xl text-zinc-400 mt-4 ml-2'
            >
              <TextGenerateEffect words='Software Engineer' />
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className='mt-8 flex gap-4 justify-center md:justify-start'
            >
              <button
                onClick={() => {
                  if (typeof document !== "undefined") {
                    const projectsSection = document.getElementById("projects");
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
                className='px-6 py-3 text-lg font-medium text-zinc-300 hover:text-blue-400 transition-colors rounded-lg border border-zinc-700 hover:border-blue-400'
              >
                View My Work
              </button>
              {/* Download Resume Button with Moving Border */}

              <StunningButton onClick={handleDownloadResume}>
                Download Resume
              </StunningButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='flex-1 flex justify-center md:justify-end'
          >
            <div className='relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-400/20 shadow-lg'>
              <Image
                src={profilePic}
                alt='Vijayakanth G'
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full'></div>
            </div>
          </motion.div>
        </motion.div>
      </section>
      {/* Skills Section */}
      <section
        id='skills'
        className='min-h-[80vh] flex items-center py-20 px-4 md:px-6'
      >
        <div className='max-w-7xl mx-auto w-full'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4'>
              Technical Skills
            </h2>
            <p className='text-zinc-400 text-lg max-w-2xl mx-auto'>
              Specialized in modern web technologies and mobile development
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SkillCard
                  title={skill.title}
                  description={skill.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id='projects'
        className='min-h-screen flex items-center py-20 px-4 md:px-6'
      >
        <div className='max-w-7xl mx-auto w-full'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4'>
              Featured Projects
            </h2>
            <p className='text-zinc-400 text-lg max-w-2xl mx-auto'>
              A selection of my recent work and contributions
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tech={project.tech}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id='contact'
        className='min-h-screen flex items-center py-20 px-4 md:px-6'
      >
        <div className='max-w-7xl mx-auto w-full'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4'>
              Get in Touch
            </h2>
          </motion.div>

          <div className='max-w-2xl mx-auto space-y-6'>
            {[
              {
                icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                text: "vijayakanth.tech@gmail.com",
                href: "mailto:vijayakanth.tech@gmail.com",
              },
              {
                icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                text: "+91-8978374829",
                href: "tel:+1234567890",
              },
              {
                icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                text: "LinkedIn Profile",
                href: "https://linkedin.com/in/vijayakanth-grandhi",
              },
            ].map((contact, index) => (
              <motion.div
                key={contact.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <a
                  href={contact.href}
                  target={
                    contact.href.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    contact.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className='group bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 flex items-center space-x-4 hover:bg-zinc-800/50 transition-all duration-300'
                >
                  <svg
                    className='w-6 h-6 text-blue-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d={contact.icon}
                    />
                  </svg>
                  <span className='text-zinc-300 group-hover:text-blue-400 transition-colors'>
                    {contact.text}
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
