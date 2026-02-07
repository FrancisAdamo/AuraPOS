import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulación de login - en producción esto iría a una API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock users
      const mockUsers = [
        { email: 'owner@aurapos.com', password: 'demo123', role: 'owner' },
        { email: 'vendor@aurapos.com', password: 'demo123', role: 'vendor' }
      ];

      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem('aurapos_user', JSON.stringify({
          id: user.role === 'owner' ? '1' : '2',
          name: user.role === 'owner' ? 'Admin Dueño' : 'Usuario Vendedor',
          email: user.email,
          role: user.role,
        }));
        navigate('/pos');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-notion-background flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg border border-notion-border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-notion-primary mb-2">
              Aura<span className="text-purple-500">POS</span>
            </h1>
            <p className="text-notion-secondary">
              Inicia sesión para continuar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-notion-primary mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-3 text-notion-secondary" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-notion-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-notion-primary mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-notion-secondary" size={20} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-notion-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="•••••••••"
                  required
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-notion-hover rounded-md">
            <p className="text-sm text-notion-secondary mb-2">
              <strong>Credenciales de Demo:</strong>
            </p>
            <div className="space-y-1 text-xs">
              <p><strong>Dueño:</strong> owner@aurapos.com / demo123</p>
              <p><strong>Vendedor:</strong> vendor@aurapos.com / demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
