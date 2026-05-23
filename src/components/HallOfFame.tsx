import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { HallOfFameMember } from '../types';

interface HallOfFameProps {
  members: HallOfFameMember[];
}

export default function HallOfFame({ members }: HallOfFameProps) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
        <Star className="text-[#FBBC05]" /> Hall of Fame
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              {member.photoUrl ? (
                <img src={member.photoUrl} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-gray-400">
                  {member.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-xs text-gray-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full inline-block">{member.year}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">{member.achievement}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
