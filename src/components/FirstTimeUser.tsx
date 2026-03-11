import { useState } from "react";

export default function FirstTimeUser({onNameSubmit}: {onNameSubmit: (name: string) => void}) {
    const [userName, setUserName] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg p-8 max-w-md mx-4 text-center transform scale-100`}>
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Welcome to the SQL Puzzle game!
        </h2>
        <h4 className="text-xl font-bold text-green-600 mb-4">
          This is your first time playing. Please enter your name to get started!
        </h4>
        <form action={(formData) => onNameSubmit(userName as string)} className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Enter your name" value={userName} onChange={onChange} className="border border-gray-300 rounded-lg px-4 py-2"/>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">Start</button>
        </form>
        
      </div>
    </div>
    );
}