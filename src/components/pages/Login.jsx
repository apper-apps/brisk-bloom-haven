import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/App';

function Login() {
  const { isInitialized } = useContext(AuthContext);
  
useEffect(() => {
    if (isInitialized) {
      // Ensure the target element exists before showing login UI
      const targetElement = document.getElementById('authentication');
      if (targetElement) {
        try {
          const { ApperUI } = window.ApperSDK;
          ApperUI.showLogin("#authentication");
        } catch (error) {
          console.error("Failed to initialize login UI:", error);
        }
      } else {
        // Retry after a short delay if element not found
        setTimeout(() => {
          const retryElement = document.getElementById('authentication');
          if (retryElement) {
            try {
              const { ApperUI } = window.ApperSDK;
              ApperUI.showLogin("#authentication");
            } catch (error) {
              console.error("Failed to initialize login UI on retry:", error);
            }
          }
        }, 100);
      }
    }
  }, [isInitialized]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-900">
      <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-surface-800 rounded-lg shadow-md">
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark text-white text-2xl 2xl:text-3xl font-bold">
            B
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="text-center text-lg xl:text-xl font-bold">
              Sign in to Bloom Haven
            </div>
            <div className="text-center text-sm text-gray-500">
              Welcome back, please sign in to continue
            </div>
          </div>
        </div>
        <div id="authentication" />
        <div className="text-center mt-4">
          <p className="text-sm text-surface-600 dark:text-surface-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-primary-dark">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;