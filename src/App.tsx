import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
function Placeholder({title}:{title:string}){return <main className="mx-auto min-h-[60vh] max-w-5xl px-4 py-16"><h1 className="text-4xl font-black text-[#2E7D32]">{title}</h1><p className="mt-4 text-zinc-600">This module is ready for backend integration, crop datasets, dashboards, and help content.</p></main>}
export default function App(){return <><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="*" element={<Placeholder title="Project Bhumi Module"/>}/></Routes><Footer/></>}
