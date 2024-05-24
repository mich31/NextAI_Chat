// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Markdown/CodeBlock.tsx

'use client'

import { FC, memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Props {
  language: string;
  value: string;
}

interface languageMap {
  [key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
  javascript: '.js',
  python: '.py',
  java: '.java',
  c: '.c',
  cpp: '.cpp',
  'c++': '.cpp',
  'c#': '.cs',
  ruby: '.rb',
  php: '.php',
  swift: '.swift',
  'objective-c': '.m',
  kotlin: '.kt',
  typescript: '.ts',
  go: '.go',
  perl: '.pl',
  rust: '.rs',
  scala: '.scala',
  haskell: '.hs',
  lua: '.lua',
  shell: '.sh',
  sql: '.sql',
  html: '.html',
  css: '.css'
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
}

const CodeBlock: FC<Props> = memo(({ language, value }) => {

  return (
    <div className='relative w-full font-sans codeblock bg-zinc-95'>
      <div className='flex items-center justify-between w-full px-6 py-2 pr-4 bg-zinc-800 text-zinc-100'>
        <span className='text-xs lowercase'>{language}</span>
      </div>
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        PreTag='div'
        showLineNumbers
        customStyle={{ margin: 0, width: '100%', padding: '1.5rem 1rem' }}
        lineNumberStyle={{ userSelect: 'none' }}
        codeTagProps={{ style: { fontSize: '0.9rem', fontFamily: 'var(--font-mono)'} }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
})
CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }
