import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./Join/Join";
import Register from "./Register/Register";
import Chat from "./Chat/Chat";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./Auth/Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/" component={Join} />
        <Route path="/register" component={Register} />
        <ProtectedRoute exact path="/chat" component={Chat} />
      </Router>
    </AuthProvider>
  );
}

export default App;
