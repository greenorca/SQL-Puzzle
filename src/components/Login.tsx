import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

// TypeScript interfaces
interface LoginFormData {
  username: string;
  password: string;
  email: string;
}

const Login: React.FC = () => {
  const [data, setData] = useState<LoginFormData>({ username: '', password: '', email: '' });
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const store = (event: ChangeEvent<HTMLInputElement>) => {
    setData({ 
      ...data,    // existierende Daten
      [event.target.id]: event.target.value 
    });
  };
    
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(data.username, data.password);
      navigate("/", { replace: true });
    } catch (error: any) {
      alert(error.message);      
    }
  };

  const handleRegister = async () => {
    if (data.email === "") {
      document.getElementById("email-container")?.classList.remove("hidden");
      document.getElementById("register-button")?.classList.remove("bg-gray-500");
      document.getElementById("register-button")?.classList.add("bg-green-500");
      const titleElement:  HTMLElement = document.getElementById("login-title") as HTMLElement;
      if (titleElement) {
        titleElement.textContent = "Neuer Benutzer";
      }
      return;
    }
    try {
      const response = await register(data.username, data.email, data.password);
      alert("Registration erfolgreich, bitte einloggen");
      navigate("/", { replace: true });
    } catch (error: any) {
      alert(error.message);      
    }
  };

  return (
    <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-md px-8 py-6 space-y-5 drop-shadow-lg bg-white rounded-lg shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center" id="login-title">Login</h2>
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username:
          </label>
          <input 
            type="text" 
            id="username"
            name="username" 
            value={data.username}
            onChange={store} 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="hidden space-y-2" id="email-container">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input 
            type="email" 
            id="email"
            name="email" 
            value={data.email}
            onChange={store} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input 
            type="password" 
            id="password"
            name="password" 
            value={data.password}
            onChange={store} 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex justify-end">
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
        >
          Login
        </button>
        <button 
          type="button" 
          id="register-button"
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
          onClick={() => handleRegister()}
        >
          Register
        </button>
        </div>
      </form>
    </div>
  );
};

export default Login;