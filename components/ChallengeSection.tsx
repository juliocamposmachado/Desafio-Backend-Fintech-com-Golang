
import React from 'react';
import CodeBlock from './CodeBlock';

interface ChallengeSectionProps {
  title: string;
  content: { type: string; text?: string; items?: string[]; language?: string }[];
}

const ChallengeSection: React.FC<ChallengeSectionProps> = ({ title, content }) => {
  return (
    <div className="bg-secondary border border-border-color rounded-lg p-6 md:p-8">
      <h2 className="text-3xl font-bold text-accent border-b border-border-color pb-4 mb-6">{title}</h2>
      <div className="prose prose-invert max-w-none text-text-primary prose-headings:text-accent prose-strong:text-text-primary prose-a:text-accent prose-code:text-accent prose-li:marker:text-accent">
        {content.map((item, index) => {
          switch (item.type) {
            case 'paragraph':
              return <p key={index} dangerouslySetInnerHTML={{ __html: item.text || '' }} />;
            case 'heading':
              return <h3 key={index} className="text-2xl font-semibold mt-6 mb-3 text-accent">{item.text}</h3>;
            case 'subheading':
               return <h4 key={index} className="text-xl font-semibold mt-4 mb-2">{item.text}</h4>;
            case 'list':
              return (
                <ul key={index} className="list-disc pl-6 space-y-2">
                  {item.items?.map((li, i) => <li key={i} dangerouslySetInnerHTML={{ __html: li }} />)}
                </ul>
              );
            case 'code':
              return <CodeBlock key={index} language={item.language || 'bash'} code={item.text || ''} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default ChallengeSection;
   