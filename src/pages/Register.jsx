import RegisterForm from '../components/RegisterForm'

function Register() {
  const handleRegister = (formData) => {
    // Por ahora solo mostramos los datos en consola
    console.log('Register:', formData)
    // Aquí irá la lógica de registro más adelante
  }

  return <RegisterForm onSubmit={handleRegister} isLoading={false} />
}

export default Register
