import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TermsOfUseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsOfUseModal = ({ open, onOpenChange }: TermsOfUseModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl flex flex-col p-0" style={{ maxHeight: '90vh' }}>
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b">
          <DialogTitle className="text-2xl font-bold text-primary">
            Termos de Uso
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
                1. Aceitação dos Termos
              </h3>
              <p className="leading-relaxed">
                Ao acessar e utilizar o site da Lalu Adm, incorporadora e administradora de imóveis, 
                você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concorda 
                com qualquer parte destes termos, não deve utilizar nosso site ou serviços.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                2. Sobre a Lalu Adm
              </h3>
              <p className="leading-relaxed mb-3">
                A Lalu Adm é uma incorporadora com quase 20 anos de experiência no mercado imobiliário 
                do Paraná e Santa Catarina. Especializada em incorporação, gestão, venda e locação de 
                imóveis próprios, oferecendo soluções completas que unem inovação, segurança e 
                valorização patrimonial.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-semibold text-primary mb-2">Dados da Empresa:</p>
                <p>Lalu Adm</p>
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

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                3. Uso do Site
              </h3>
              <p className="leading-relaxed mb-3">
                O site da Lalu Adm destina-se exclusivamente para fins informativos e comerciais relacionados 
                aos nossos empreendimentos e serviços. Você concorda em utilizar o site apenas para fins 
                legais e de forma que não viole qualquer lei ou regulamento aplicável.
              </p>
              <p className="leading-relaxed">
                É expressamente proibido:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Utilizar o site para qualquer finalidade ilegal ou não autorizada</li>
                <li>Copiar, reproduzir ou distribuir conteúdo sem autorização prévia</li>
                <li>Interferir ou interromper o funcionamento do site</li>
                <li>Tentar obter acesso não autorizado a qualquer parte do site</li>
                <li>Enviar vírus, malware ou qualquer código malicioso</li>
                <li>Utilizar robôs, scripts automatizados ou métodos similares para acessar o site</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                4. Propriedade Intelectual
              </h3>
              <p className="leading-relaxed">
                Todo o conteúdo do site, incluindo textos, imagens, logotipos, gráficos, ícones, fotografias 
                e software, é propriedade da Lalu Adm ou de seus licenciadores e está protegido por leis de 
                direitos autorais e propriedade intelectual. Qualquer reprodução, distribuição ou uso não 
                autorizado deste conteúdo é expressamente proibido.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                5. Informações sobre Empreendimentos
              </h3>
              <p className="leading-relaxed mb-3">
                As informações sobre empreendimentos, projetos, preços, condições comerciais e disponibilidade 
                apresentadas no site são meramente informativas e podem ser alteradas a qualquer momento sem 
                aviso prévio. As informações finais serão sempre confirmadas em contrato formal.
              </p>
              <p className="leading-relaxed">
                Recomendamos que você entre em contato conosco para obter informações atualizadas e precisas 
                sobre nossos empreendimentos antes de tomar qualquer decisão de compra ou locação.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                6. Formulários de Contato
              </h3>
              <p className="leading-relaxed">
                Ao preencher formulários de contato em nosso site, você autoriza a Lalu Adm a utilizar suas 
                informações para responder suas solicitações e enviar comunicações sobre nossos produtos e 
                serviços. Seus dados serão tratados de acordo com nossa Política de Privacidade.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                7. Limitação de Responsabilidade
              </h3>
              <p className="leading-relaxed mb-3">
                A Lalu Adm não se responsabiliza por:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Interrupções, erros ou falhas técnicas no funcionamento do site</li>
                <li>Danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso do site</li>
                <li>Perda de dados ou informações resultante do uso do site</li>
                <li>Decisões tomadas com base em informações do site sem consulta formal</li>
                <li>Conteúdo de sites de terceiros vinculados ao nosso site</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                8. Links para Sites de Terceiros
              </h3>
              <p className="leading-relaxed">
                Nosso site pode conter links para sites de terceiros. A Lalu Adm não tem controle sobre 
                o conteúdo ou práticas desses sites e não se responsabiliza por eles. Recomendamos que 
                você leia os termos de uso e políticas de privacidade de qualquer site de terceiros que 
                você acessar.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                9. Modificações dos Termos
              </h3>
              <p className="leading-relaxed">
                A Lalu Adm reserva-se o direito de modificar estes Termos de Uso a qualquer momento. 
                Alterações significativas serão comunicadas através do site. O uso continuado do site 
                após tais modificações constitui sua aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                10. Lei Aplicável e Foro
              </h3>
              <p className="leading-relaxed">
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer 
                disputa decorrente destes termos será resolvida no foro da comarca de Curitiba - PR, 
                renunciando as partes a qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                11. Disposições Gerais
              </h3>
              <p className="leading-relaxed mb-3">
                Se qualquer disposição destes Termos de Uso for considerada inválida ou inexequível, 
                as demais disposições permanecerão em pleno vigor e efeito.
              </p>
              <p className="leading-relaxed">
                Estes termos constituem o acordo completo entre você e a Lalu Adm em relação ao uso 
                do site, substituindo todos os acordos anteriores relacionados ao mesmo assunto.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">
                12. Contato
              </h3>
              <p className="leading-relaxed mb-3">
                Para questões sobre estes Termos de Uso, entre em contato conosco:
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
                <p className="mt-2 text-sm">
                  <strong>Horário de atendimento:</strong> Segunda a Sexta, das 8h às 18h
                </p>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfUseModal;
