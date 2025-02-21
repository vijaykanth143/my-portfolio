import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export const ProjectCard = ({
  title,
  description,
  tech,
}: {
  title: string;
  description: string;
  tech: string[];
}) => {
  return (
    <motion.div whileHover={{ y: -5 }} className='relative group'>
      <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000'></div>
      <div className='relative bg-zinc-900 border border-zinc-800 px-8 py-10 rounded-xl h-full transform transition duration-300 group-hover:border-zinc-600'>
        <h3 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4'>
          {title}
        </h3>
        <p className='text-zinc-300 mb-8 line-clamp-3'>{description}</p>
        <div className='flex flex-wrap gap-2 mt-auto'>
          {tech.map((item) => (
            <Badge
              key={item}
              className='bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20'
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// components/ui/skill-card.tsx
export const SkillCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <motion.div whileHover={{ y: -5 }} className='relative group h-[150px]'>
      <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000'></div>
      <div className='relative bg-zinc-900 border border-zinc-800 p-6 rounded-xl h-full transform transition duration-300 group-hover:border-zinc-600'>
        <h3 className='text-xl font-bold text-white mb-2'>{title}</h3>
        <p className='text-zinc-300'>{description}</p>
      </div>
    </motion.div>
  );
};
