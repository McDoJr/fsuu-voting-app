import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
<>
    <GoogleOAuthProvider clientId='850454711932-8fbst19rkhptskqb2oibsqto64iomv4b.apps.googleusercontent.com'>
        <App />
    </GoogleOAuthProvider>
</>
)
