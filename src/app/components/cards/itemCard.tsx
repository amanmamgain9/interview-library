'use client';
import React from 'react';
import { PieChart } from 'lucide-react';

export interface ItemCardProps {
  name: string;
  description: string;
  variant?: 'bordered' | 'minimal';
  onClick?: () => void;
}

export const ItemCard = ({ 
  name, 
  description, 
  variant = 'bordered',
  onClick 
}: ItemCardProps) => (
  <div 
    className={`
      rounded-lg p-4 
      flex flex-col sm:flex-row items-center sm:items-start gap-4 
      cursor-pointer
      ${variant === 'bordered' ? 'bg-white border border-gray-100' : ''}
    `}
    onClick={onClick}
  >
    <div className={`
      w-20 h-20 sm:w-28 sm:h-28
      flex-shrink-0 p-2 rounded-lg
      flex items-center justify-center
      bg-gray-100
      ${variant === 'bordered' ? 'bg-gray-50' : ''}
    `}>
      <PieChart className="w-10 h-10 sm:w-14 sm:h-14 text-gray-400" />
    </div>
    <div className="flex-1 min-w-0 text-center sm:text-left">
      <h3 className="text-base font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-700 font-medium mt-1">{description}</p>
    </div>
  </div>
);

export default ItemCard;