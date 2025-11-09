import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import GameEntry from "./pages/GameEntry";
import GameScreen from "./pages/GameScreen";
import CompletionScreen from "./pages/CompletionScreen";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDetails from "./pages/StudentDetails";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import StudentDashboard from "./pages/StudentDashboard";
import { GameProvider } from "./contexts/GameContext";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/student-login"} component={StudentLogin} />
      <Route path={"/teacher-login"} component={TeacherLogin} />
      <Route path={"/student-dashboard"} component={StudentDashboard} />
      <Route path={"/game"} component={GameEntry} />
      <Route path={"/play"} component={GameScreen} />
      <Route path={"/complete"} component={CompletionScreen} />
      <Route path={"/teacher-dashboard"} component={TeacherDashboard} />
      <Route path={"/student-details/:sessionId"} component={StudentDetails} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <GameProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </GameProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
