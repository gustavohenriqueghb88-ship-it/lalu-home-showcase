# Configuração do Google Sheets para Formulário de Contato

Este guia explica como configurar o Google Apps Script para receber os dados do formulário de contato e salvá-los automaticamente na planilha do Google Sheets.

## Passo 1: Preparar a Planilha

1. Abra sua planilha: https://docs.google.com/spreadsheets/d/1Jq7nHW5S27_C7VnM316OY_NzJ7_4hjBWP_olAFWnJJI/edit
2. Na primeira linha (cabeçalho), adicione as seguintes colunas:
   - **A1**: Data/Hora
   - **B1**: Nome Completo
   - **C1**: E-mail
   - **D1**: Telefone
   - **E1**: Interesse
   - **F1**: Mensagem

## Passo 2: Criar o Google Apps Script

1. Na planilha, vá em **Extensões** → **Apps Script**
2. Apague qualquer código existente e cole o seguinte código:

function doPost(e) {
  try {
    // Obter a planilha ativa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dos dados recebidos (pode vir como JSON ou form-data)
    let data;
    
    // Verificar se os dados vieram como JSON
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        // Se não conseguir fazer parse do JSON, tentar como form-data
        data = {
          nome: e.parameter.nome || '',
          email: e.parameter.email || '',
          telefone: e.parameter.telefone || '',
          interesse: e.parameter.interesse || '',
          mensagem: e.parameter.mensagem || '',
          data: e.parameter.data || new Date().toLocaleString('pt-BR')
        };
      }
    } else {
      // Se vier como form-data (formulário HTML)
      data = {
        nome: e.parameter.nome || '',
        email: e.parameter.email || '',
        telefone: e.parameter.telefone || '',
        interesse: e.parameter.interesse || '',
        mensagem: e.parameter.mensagem || '',
        data: e.parameter.data || new Date().toLocaleString('pt-BR')
      };
    }
    
    // Preparar os dados para inserção
    const row = [
      data.data || new Date().toLocaleString('pt-BR'), // Data/Hora
      data.nome || '',                                  // Nome Completo
      data.email || '',                                 // E-mail
      data.telefone || '',                              // Telefone
      data.interesse || '',                             // Interesse
      data.mensagem || ''                               // Mensagem
    ];
    
    // Adicionar a nova linha na planilha
    sheet.appendRow(row);
    
    // Retornar resposta de sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Dados salvos com sucesso!' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log do erro para debug (aparece no Log de Execução do Apps Script)
    console.error('Erro ao processar dados:', error);
    
    // Retornar resposta de erro
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função para testar (opcional)
function doGet(e) {
  return ContentService
    .createTextOutput('Google Apps Script está funcionando!')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

## Passo 3: Salvar e Implantar o Script

1. Clique em **Salvar** (ícone de disquete) ou pressione `Ctrl+S`
2. Dê um nome ao projeto (ex: "Formulário de Contato LALU")
3. Clique em **Implantar** → **Nova implantação**
4. Clique no ícone de engrenagem ⚙️ ao lado de "Tipo" e selecione **Aplicativo da Web**
5. Configure:
   - **Descrição**: "Formulário de Contato v1"
   - **Executar como**: "Eu"
   - **Quem tem acesso**: "Qualquer pessoa"
6. Clique em **Implantar**
7. **Copie a URL da Web App** que será exibida (algo como: `https://script.google.com/macros/s/...`)

## Passo 4: Configurar no Projeto

### Opção 1: Usando Variável de Ambiente (Recomendado)

1. Crie um arquivo `.env` na raiz do projeto:
```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbznG4IunNWCQAHCzwPzJQC9-zhyO37h_ndlzE8OC9Nirys5pU8ahEqUzIMRLfwAOMVn/exec
```

2. Reinicie o servidor de desenvolvimento (`npm run dev`)

### Opção 2: Editar Diretamente no Código

1. Abra o arquivo `src/components/Contact.tsx`
2. Encontre a linha:
```typescript
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';
```
3. Substitua por:
```typescript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/SUA_URL_AQUI/exec';
```

## Passo 5: Testar

1. Acesse a página de contato no site
2. Preencha o formulário
3. Clique em "Enviar Mensagem"
4. Verifique se os dados aparecem na planilha

## Solução de Problemas

### Erro: "Script não autorizado"
- Vá em **Extensões** → **Apps Script**
- Clique em **Executar** → **doGet** (ou qualquer função)
- Autorize o acesso quando solicitado
- **IMPORTANTE**: Você precisa autorizar o script na primeira vez que executar

### Dados não aparecem na planilha

1. **Verificar se o script está autorizado:**
   - Vá em **Extensões** → **Apps Script**
   - Clique em **Executar** → **doGet**
   - Se pedir autorização, autorize

2. **Verificar os logs de execução:**
   - Vá em **Extensões** → **Apps Script**
   - Clique em **Execuções** (ícone de relógio no menu lateral)
   - Veja se há erros nas execuções recentes

3. **Verificar a URL:**
   - Certifique-se de que a URL no `.env` está correta
   - A URL deve terminar com `/exec` (não `/dev`)
   - Não deve ter duplicação da URL base

4. **Testar o script diretamente:**
   - Abra a URL do script no navegador (deve mostrar "Google Apps Script está funcionando!")
   - Se não funcionar, o script não está implantado corretamente

5. **Verificar se a planilha tem cabeçalhos:**
   - Certifique-se de que a primeira linha tem os cabeçalhos:
     - Data/Hora | Nome Completo | E-mail | Telefone | Interesse | Mensagem

6. **Verificar permissões da planilha:**
   - A planilha deve estar acessível (pelo menos para você)
   - O script precisa ter permissão para editar a planilha

### Erro CORS
- O código tenta primeiro com fetch normal
- Se falhar por CORS, usa automaticamente um formulário HTML oculto
- O Google Apps Script aceita requisições de qualquer origem quando configurado como "Qualquer pessoa"

### Debug Avançado

Para ver o que está sendo recebido pelo script:

1. Adicione este código temporário no início da função `doPost`:
```javascript
// Log para debug (remover depois)
console.log('Dados recebidos:', JSON.stringify(e));
```

2. Vá em **Extensões** → **Apps Script** → **Execuções**
3. Veja os logs após enviar o formulário

## Notas Importantes

- A URL do script é pública, mas apenas pessoas com acesso à planilha podem ver os dados
- Para maior segurança, considere adicionar validação no script
- O script pode processar até 6 requisições por segundo (limite do Google)
- Para produção, considere usar um backend próprio ou serviços como Zapier/Make
