import { X, Zap, Send } from 'lucide-react';
import { useState } from 'react';

interface AuraBrainProps {
  onClose: () => void;
}

export default function AuraBrain({ onClose }: AuraBrainProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'Hola! Soy Aura Brain, tu asistente inteligente. ¿Cómo puedo ayudarte hoy? Puedo analizar tendencias de ventas, sugerir optimizaciones de inventario, y mucho más.',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');

    // Simular respuesta de IA
    setTimeout(() => {
      let assistantResponse = '';
      
      if (userMessage.toLowerCase().includes('ventas')) {
        assistantResponse = 'Basándome en los datos de hoy, tus ventas están un 15% por encima del promedio. Los iPhone 15 Pro lideran las ventas con 156 unidades. Te recomiendo aumentar stock de estos productos.';
      } else if (userMessage.toLowerCase().includes('inventario')) {
        assistantResponse = 'Detecté que el inventario de "iPhone Case" está crítico (2 unidades). También recomiendo reordenar USB-C cables (stock bajo). La proyección de demanda sugiere que necesitarás 25% más de stock la próxima semana.';
      } else if (userMessage.toLowerCase().includes('caja')) {
        assistantResponse = 'El total de caja de hoy es de $36,450. El 51.5% proviene de tarjeta de crédito, 34.3% de efectivo y 14.2% de transferencias. Esto indica un aumento en pagos digitales. Recomiendo optimizar tu procesamiento de tarjetas.';
      } else if (userMessage.toLowerCase().includes('mejora') || userMessage.toLowerCase().includes('optimizar')) {
        assistantResponse = 'Aquí están mis recomendaciones principales:\n\n1. **Aumentar stock** de bestsellers (iPhone 15 Pro, MacBook Pro)\n2. **Reordenar** productos críticos urgentemente\n3. **Promocionar** categorías con baja rotación\n4. **Optimizar** métodos de pago más eficientes\n\n¿Deseas profundizar en alguna área?';
      } else {
        assistantResponse = 'Entendido. Basándome en tus datos de ERP, puedo ofrecerte análisis detallados de: tendencias de ventas, pronósticos de demanda, optimización de inventario, análisis de rentabilidad por producto y predicciones de flujo de caja. ¿Qué aspecto te gustaría explorar?';
      }

      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl max-h-[80vh] bg-white rounded-lg shadow-2xl border border-notion-border flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-notion-border flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Aura Brain</h2>
              <p className="text-xs text-notion-secondary">Asistente IA inteligente</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-notion-text border border-notion-border'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-notion-border bg-gray-50">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Pregunta a Aura Brain sobre tus datos..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-2 border border-notion-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-xs text-notion-secondary mt-2">
            💡 Tip: Pregunta sobre ventas, inventario, análisis de caja, o recomendaciones de mejora
          </p>
        </div>
      </div>
    </div>
  );
}
