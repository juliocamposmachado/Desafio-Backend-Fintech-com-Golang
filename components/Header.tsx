
import React from 'react';
import { SECTIONS, SectionKey } from '../constants/challengeContent';

interface HeaderProps {
  activeSection: SectionKey;
  setActiveSection: (section: SectionKey) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const navItems: { key: SectionKey; label: string }[] = [
    { key: 'tester', label: 'API Tester' },
    ...Object.entries(SECTIONS).map(([key, value]) => ({ key: key as SectionKey, label: value.title }))
  ];
  
  return (
    <header className="bg-secondary sticky top-0 z-10 border-b border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-accent">Desafio Backend Fintech</h1>
            <p className="text-text-secondary">Teste de Habilidades em Golang</p>
          </div>
          <nav className="w-full md:w-auto overflow-x-auto">
            <ul className="flex space-x-4">
              {navItems.map(item => (
                <li key={item.key}>
                  <button
                    onClick={() => setActiveSection(item.key)}
                    className={`whitespace-nowrap pb-2 px-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                      activeSection === item.key
                        ? 'border-accent text-accent'
                        : 'border-transparent text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
   