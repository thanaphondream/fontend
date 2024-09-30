import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";
import React from 'react';


function App() {
  const { loading } = useAuth()

  if(loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-5xl font-bold text-slate-950 mb-4">กรุณารอสักครู่...</p>
          <span className="loading loading-bars loading-lg text-slate-950"></span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <AppRouter/>
    </div>
  );
}

export default App;
