import { Leaf, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = ['Home', 'About', 'Crop Database', 'Dashboard', 'Help'];
export function Navbar() {
  return <header className="sticky top-0 z-40 border-b border-green-100 bg-white/90 backdrop-blur"><nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3" aria-label="Primary navigation"><div className="flex items-center gap-2 font-bold text-[#2E7D32]"><Leaf aria-hidden /><span>Project Bhumi</span></div><div className="hidden gap-6 md:flex">{links.map((link)=><NavLink key={link} to={link==='Home'?'/':'#'} className="text-sm font-medium text-zinc-700 hover:text-[#2E7D32]">{link}</NavLink>)}</div><button className="rounded-lg p-2 md:hidden" aria-label="Open navigation menu"><Menu /></button></nav></header>;
}
