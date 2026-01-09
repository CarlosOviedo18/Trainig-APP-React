import LoginForm from "../components/LoginForm"

function Login() {
  const handleLogin = (credentials) => {
  
    
    console.log('Login:', credentials)
    // Aquí irá la lógica de login más adelante
  }

  return (
    <LoginForm onSubmit={handleLogin} isLoading={false} />
  )
}

export default Login
