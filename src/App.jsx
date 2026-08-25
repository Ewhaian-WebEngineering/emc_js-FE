import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/core/query/queryClient';
import { TestAccountSwitcher } from './components/dev/TestAccountSwitcher';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && <TestAccountSwitcher />}
    </QueryClientProvider>
  );
}

export default App;
