import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";
import React from 'react';


function App() {
  const { loading } = useAuth()

  if(loading) {
    return (
      <p className="text-4xl text-primary"><span className="loading loading-bars loading-lg"></span></p>
    )
  }

  return (
    <div className="min-h-screen">
      <AppRouter/>
    </div>
  );
}

export default App;
