
import React, { useState } from 'react';
import Header from './components/Header';
import ApiTester from './components/ApiTester';
import ChallengeSection from './components/ChallengeSection';
import { SECTIONS, SectionKey } from './constants/challengeContent';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('tester');

  const renderContent = () => {
    if (activeSection === 'tester') {
      return <ApiTester />;
    }
    const section = SECTIONS[activeSection];
    return <ChallengeSection title={section.title} content={section.content} />;
  };

  return (
    <div className="min-h-screen bg-primary font-sans">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-text-secondary text-sm border-t border-border-color">
        Desafio gerado por um assistente de IA especialista em Engenharia de Software.
      </footer>
    </div>
  );
};

export default App;
   