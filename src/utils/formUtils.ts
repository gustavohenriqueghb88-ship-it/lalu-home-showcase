// URL do Google Apps Script
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

// Máscara para telefone: (XX) XXXXX-XXXX
export const maskPhone = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) {
    return numbers ? `(${numbers}` : '';
  } else if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

// Máscara para nome: apenas letras e espaços
export const maskName = (value: string) => {
  return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
};

// Função para enviar dados para Google Sheets
export const submitToGoogleSheets = async (data: {
  nome: string;
  email: string;
  telefone: string;
  interesse: string;
  mensagem: string;
}): Promise<boolean> => {
  if (!GOOGLE_SCRIPT_URL) {
    console.error('Google Script URL não configurada');
    return false;
  }

  const payload = {
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    interesse: data.interesse,
    mensagem: data.mensagem,
    data: new Date().toLocaleString('pt-BR'),
  };

  try {
    // Método 1: Tentar com fetch normal primeiro (para verificar resposta)
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        const result = await response.json();
        return result.success !== false;
      }
    } catch (fetchError) {
      // Se falhar por CORS, usar método alternativo com formulário
      console.log('Tentando método alternativo devido a CORS...');
      
      // Método 2: Usar formulário HTML oculto (funciona melhor com Google Apps Script)
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_SCRIPT_URL;
      form.target = 'hidden_iframe';
      form.style.display = 'none';
      
      // Criar iframe oculto
      let iframe = document.getElementById('hidden_iframe') as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden_iframe';
        iframe.name = 'hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }
      
      // Adicionar campos ao formulário
      Object.entries(payload).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });
      
      document.body.appendChild(form);
      form.submit();
      
      // Remover formulário após envio
      setTimeout(() => {
        if (document.body.contains(form)) {
          document.body.removeChild(form);
        }
      }, 1000);
      
      // Assumir sucesso para método alternativo
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erro ao enviar para Google Sheets:', error);
    return false;
  }
};
