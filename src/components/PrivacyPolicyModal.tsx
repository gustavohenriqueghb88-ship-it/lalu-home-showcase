import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyPolicyModal = ({ open, onOpenChange }: PrivacyPolicyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl flex flex-col p-0" style={{ maxHeight: '90vh' }}>
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b">
          <DialogTitle className="text-2xl font-bold text-primary">
            Política de Privacidade
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="px-6 py-4" style={{ height: 'calc(90vh - 120px)', maxHeight: 'calc(90vh - 120px)' }}>
          <div className="space-y-6 text-muted-foreground pr-4">
            <div>
              <p className="text-sm text-muted-foreground/70 mb-4">
                <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                1. Introdução
              </h3>
              <p className="leading-relaxed">
                A Lalu Adm, incorporadora e administradora de imóveis com sede em Curitiba - PR, 
                respeita sua privacidade e está comprometida em proteger seus dados pessoais. 
                Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos 
                suas informações quando você utiliza nosso site e serviços.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                2. Informações que Coletamos
              </h3>
              <p className="leading-relaxed mb-3">
                Podemos coletar as seguintes informações pessoais:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Dados de identificação:</strong> nome completo, CPF, RG, data de nascimento</li>
                <li><strong>Dados de contato:</strong> e-mail, telefone, endereço residencial</li>
                <li><strong>Dados financeiros:</strong> informações bancárias para análise de crédito e transações</li>
                <li><strong>Dados de navegação:</strong> endereço IP, cookies, páginas visitadas</li>
                <li><strong>Dados de interação:</strong> histórico de comunicações e preferências de atendimento</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                3. Como Utilizamos suas Informações
              </h3>
              <p className="leading-relaxed mb-3">
                Utilizamos suas informações pessoais para as seguintes finalidades:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Processar e gerenciar solicitações de informações sobre nossos empreendimentos</li>
                <li>Realizar análise de crédito e viabilidade para compra ou locação de imóveis</li>
                <li>Enviar comunicações sobre produtos, serviços e oportunidades de investimento</li>
                <li>Melhorar nossos serviços e experiência do usuário</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Garantir a segurança e prevenir fraudes</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                4. Compartilhamento de Dados
              </h3>
              <p className="leading-relaxed mb-3">
                Podemos compartilhar suas informações com:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Parceiros comerciais e fornecedores de serviços necessários à execução de nossos serviços</li>
                <li>Instituições financeiras para análise de crédito e financiamento</li>
                <li>Autoridades competentes quando exigido por lei ou ordem judicial</li>
                <li>Escritórios de advocacia e contabilidade para suporte legal e contábil</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Não vendemos suas informações pessoais a terceiros para fins comerciais.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                5. Segurança dos Dados
              </h3>
              <p className="leading-relaxed">
                Implementamos medidas técnicas e organizacionais adequadas para proteger suas informações 
                pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Nossos sistemas 
                utilizam criptografia e outros métodos de segurança para garantir a proteção dos dados.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                6. Seus Direitos
              </h3>
              <p className="leading-relaxed mb-3">
                Conforme a Lei Geral de Proteção de Dados (LGPD), você possui os seguintes direitos:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Confirmar a existência de tratamento de dados pessoais</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários</li>
                <li>Solicitar portabilidade dos dados</li>
                <li>Revogar consentimento, quando aplicável</li>
                <li>Ser informado sobre compartilhamento de dados com terceiros</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                7. Retenção de Dados
              </h3>
              <p className="leading-relaxed">
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades 
                descritas nesta política, salvo quando a retenção for exigida ou permitida por lei. 
                Após o término do período de retenção, os dados serão excluídos ou anonimizados.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                8. Cookies
              </h3>
              <p className="leading-relaxed">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência de navegação, 
                analisar o uso do site e personalizar conteúdo. Você pode gerenciar suas preferências 
                de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                9. Alterações nesta Política
              </h3>
              <p className="leading-relaxed">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
                alterações significativas através do nosso site ou por e-mail. A data da última 
                atualização será sempre indicada no início desta política.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                10. Contato
              </h3>
              <p className="leading-relaxed mb-3">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, 
                entre em contato conosco:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-semibold text-primary mb-2">Lalu Adm</p>
                <p>R. Padre Anchieta, 2050 - sala 705</p>
                <p>Bigorrilho, Curitiba - PR, CEP 80730-001</p>
                <p className="mt-2">
                  <strong>E-mail:</strong> contato@laluadm.com
                </p>
                <p>
                  <strong>Telefone:</strong> (41) 98430-5403
                </p>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyModal;
