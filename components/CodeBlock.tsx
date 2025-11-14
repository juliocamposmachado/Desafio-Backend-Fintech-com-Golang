
import React from 'react';

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  return (
    <div className="bg-primary rounded-md my-4 relative">
        <div className="text-xs text-text-secondary absolute top-2 right-3 uppercase">{language}</div>
        <pre className="p-4 overflow-x-auto text-sm">
            <code>
                {code}
            </code>
        </pre>
    </div>
  );
};

export default CodeBlock;
   