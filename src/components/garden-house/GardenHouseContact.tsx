import { useState } from "react";
import { Phone, MapPin, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { maskPhone, maskName, submitToGoogleSheets } from "@/utils/formUtils";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WHATSAPP_URL = "https://wa.me/5541984305403?text=Olá! Tenho interesse no Condomínio Garden House Residence.";

export default function GardenHouseContact() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await submitToGoogleSheets({
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        interesse: "Condomínio Garden House Residence",
        mensagem: form.mensagem,
      });
      if (success) {
        setSent(true);
        toast({ title: "Mensagem enviada!", description: "Nossa equipe entrará em contato em breve." });
      } else {
        toast({ title: "Erro ao enviar", description: "Tente novamente ou entre em contato pelo WhatsApp.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erro ao enviar", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const [refLeft, leftVisible] = useScrollReveal<HTMLDivElement>();
  const [refRight, rightVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#1B3A2D]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start max-w-5xl mx-auto">
          {/* Left column */}
          <div ref={refLeft} className={`transition-all duration-700 ease-out ${leftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">
              Contato
            </span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-4">
              Solicite Informações
              <br />
              <span className="text-[#C8922A]">Agora</span>
            </h2>
            <p className="text-white/60 mb-10 leading-relaxed font-['DM_Sans']">
              Preencha o formulário e um de nossos consultores especializados entrará em contato para apresentar as melhores opções de lotes.
            </p>

            <div className="space-y-5 mb-10">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8922A]/15 text-[#C8922A]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 font-['DM_Sans']">
                    Telefone / WhatsApp
                  </p>
                  <p className="font-semibold text-white font-['DM_Sans']">(41) 98430-5403</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8922A]/15 text-[#C8922A]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 font-['DM_Sans']">
                    Localização
                  </p>
                  <p className="font-semibold text-white font-['DM_Sans']">Barra Velha – SC</p>
                </div>
              </div>
            </div>

            <Button asChild size="lg" variant="whatsapp" className="rounded-full font-['DM_Sans']">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Abrir WhatsApp
              </a>
            </Button>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-7 sm:p-9">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C8922A]/10 text-[#C8922A] mb-5">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1B3A2D] mb-2">
                  Mensagem Enviada!
                </h3>
                <p className="text-[#1B3A2D]/60 font-['DM_Sans']">
                  Nossa equipe entrará em contato em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1B3A2D]/50 mb-2 block font-['DM_Sans']">
                    Nome Completo
                  </label>
                  <Input
                    required
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: maskName(e.target.value) })}
                    placeholder="Como podemos te chamar?"
                    className="rounded-xl border-[#1B3A2D]/15 focus:border-[#C8922A] font-['DM_Sans']"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1B3A2D]/50 mb-2 block font-['DM_Sans']">
                      Email
                    </label>
                    <Input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="seu@email.com"
                      className="rounded-xl border-[#1B3A2D]/15 focus:border-[#C8922A] font-['DM_Sans']"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1B3A2D]/50 mb-2 block font-['DM_Sans']">
                      Telefone
                    </label>
                    <Input
                      required
                      value={form.telefone}
                      onChange={(e) => setForm({ ...form, telefone: maskPhone(e.target.value) })}
                      placeholder="(00) 00000-0000"
                      className="rounded-xl border-[#1B3A2D]/15 focus:border-[#C8922A] font-['DM_Sans']"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1B3A2D]/50 mb-2 block font-['DM_Sans']">
                    Mensagem (opcional)
                  </label>
                  <Textarea
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    placeholder="Em que podemos ajudar?"
                    rows={3}
                    className="rounded-xl border-[#1B3A2D]/15 focus:border-[#C8922A] font-['DM_Sans']"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#C8922A] hover:bg-[#b07e22] text-[#1B3A2D] font-bold uppercase tracking-wider rounded-full font-['DM_Sans']"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                </Button>

                <p className="text-center text-[10px] uppercase tracking-widest text-[#1B3A2D]/30 font-['DM_Sans']">
                  Seus dados estão protegidos pela LGPD
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
