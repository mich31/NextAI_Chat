'use client';

import { useCompletion } from 'ai/react';

export default function Page() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: '/api/completion',
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        <form onSubmit={handleSubmit}>
            <input
                name="prompt"
                className="fixed bottom-0 w-full max-w-md p-2 mb-64 border border-gray-300 rounded shadow-xl"
                value={input}
                onChange={handleInputChange}
                id="input"
            />
            <button className="fixed bottom-0 mb-64 ml-96 border rounded bg-slate-500" type="submit">Submit</button>
            <div>{completion}</div>
        </form>
    </div>
  );
}
