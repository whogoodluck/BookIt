import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'sonner'
import App from './App.tsx'
import { ExperienceProvider } from './contexts/experience-context.tsx'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <ExperienceProvider>
          <App />
        </ExperienceProvider>
        <Toaster richColors position='top-right' />
      </QueryClientProvider>
    </Router>
  </StrictMode>
)
