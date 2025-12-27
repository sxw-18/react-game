import Link from 'next/link';
import { categories } from '@/data/categories';
import { Gamepad2 } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-sm rounded-lg p-4 hidden lg:block h-fit sticky top-24">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <h2 className="font-bold text-gray-800">复古游戏模拟器</h2>
        <span className="text-xs text-gray-400 cursor-pointer hover:text-orange-500">查看所有</span>
      </div>
      <ul className="space-y-1">
        {categories.map((category) => (
          <li key={category.id}>
            <Link 
              href={`#`} 
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md group-hover:bg-white group-hover:shadow-sm text-gray-500 group-hover:text-orange-500 transition-all">
                    <Gamepad2 size={18} />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-500">{category.name}</span>
              </div>
              <span className="bg-gray-100 text-gray-400 text-xs px-2 py-0.5 rounded-full group-hover:bg-orange-50 group-hover:text-orange-600">
                {category.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
