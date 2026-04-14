import { useState, useMemo } from "react";
import { useHeroCarousel } from "@/hooks/useHeroCarousel";
import { MessageCircle, MapPin, ArrowRight, LayoutGrid, Ruler, CalendarClock, Mountain, Route, Droplets, CloudRain, Lightbulb, Wrench, Trees, Navigation, Car, CreditCard, Handshake, HardHat, Landmark, TrendingUp, Phone, Mail, Check } from "lucide-react";
import GoogleMap from "@/components/GoogleMap";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { maskPhone, maskName, submitToGoogleSheets } from "@/utils/formUtils";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import laluLogo from "@/assets/lalu-logo.png";

const heroImg = "https://kktsraavvytjwrtxcexc.supabase.co/storage/v1/object/public/property-images/projects/1773143327985-gpz8a.jpeg";
const galleryImg1 = "https://kktsraavvytjwrtxcexc.supabase.co/storage/v1/object/public/property-images/projects/1773146235478-3sim6.jpeg";
const galleryImg2 = "https://kktsraavvytjwrtxcexc.supabase.co/storage/v1/object/public/property-images/projects/1773146238826-4va5g.jpeg";
const galleryImg3 = "https://kktsraavvytjwrtxcexc.supabase.co/storage/v1/object/public/property-images/projects/1773146245902-vgr9l.jpeg";

const WHATSAPP_URL = "https://wa.me/5541984305403?text=Olá! Tenho interesse no Loteamento Pedras Brancas.";

const stats = [
  { value: "", label: "Lotes Disponíveis", icon: LayoutGrid },
  { value: "300m²", label: "A partir de", icon: Ruler },
  { value: "", label: "Infraestrutura Completa", icon: CalendarClock },
  { value: "", label: "Natureza Preservada", icon: Mountain },
];

const infra = [
  { icon: Route, label: "Ruas Asfaltadas" },
  { icon: Droplets, label: "Rede de Água" },
  { icon: CloudRain, label: "Galeria Pluvial" },
  { icon: Lightbulb, label: "Iluminação Pública" },
  { icon: Wrench, label: "Rede de Esgoto" },
  { icon: Trees, label: "Área Verde" },
  { icon: Navigation, label: "Excelente Localização" },
  { icon: Car, label: "Fácil Acesso" },
  { icon: CreditCard, label: "Condições Especiais" },
  { icon: Handshake, label: "Entrada Facilitada" },
];

const differentials = [
  { icon: HardHat, title: "Infraestrutura completa pronta", desc: "Toda a rede urbana instalada com padrões de alta qualidade técnica." },
  { icon: Landmark, title: "Financiamento facilitado", desc: "Condições de parcelamento direto com a loteadora sem burocracia bancária." },
  { icon: TrendingUp, title: "Região em valorização", desc: "Localização estratégica com alto potencial de crescimento e valorização." },
];

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function PedrasBrancas() {
  const heroImages = useMemo(() => [heroImg, galleryImg1, galleryImg2, galleryImg3], []);
  const pedrasCarousel = useHeroCarousel(heroImages, 30000);

  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await submitToGoogleSheets({ nome: form.nome, email: form.email, telefone: form.telefone, interesse: "Loteamento Pedras Brancas", mensagem: form.mensagem });
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

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky WhatsApp */}
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110" aria-label="WhatsApp">
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="absolute inset-0 bg-[#1B3A2D]/85" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <img src={laluLogo} alt="Lalu Incorporadora" className="h-16 mx-auto mb-8 brightness-0 invert opacity-80" />
          <h1 className="font-['Playfair_Display'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-[1.1] tracking-tight">
            Pedras
            <br />
            <span className="text-[#C8922A]">Brancas</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-white/70 mb-10 leading-relaxed font-['DM_Sans']">
            Seu lote em uma localização privilegiada,
            <br className="hidden sm:block" />
            com infraestrutura completa para o seu futuro.
          </p>
          <div className="flex items-center justify-center gap-2 text-[#C8922A] mb-12">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium tracking-widest uppercase font-['DM_Sans']">Barra Velha – SC</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-[#C8922A] hover:bg-[#b07e22] text-[#1B3A2D] text-base font-bold px-8 rounded-full font-['DM_Sans']">
              <a href="#contact">Quero Meu Lote <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="whatsapp" className="text-base font-bold px-8 rounded-full font-['DM_Sans']">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#1B3A2D] py-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <RevealSection key={i} delay={i * 100} className="flex flex-col items-center justify-center py-8 gap-1">
                  {stat.value ? (
                    <span className="font-bold text-[#C8922A] text-3xl md:text-4xl font-['Playfair_Display']">{stat.value}</span>
                  ) : (
                    <Icon className="h-8 w-8 text-[#C8922A]" />
                  )}
                  <span className="text-xs uppercase tracking-widest text-white/60 font-medium font-['DM_Sans']">{stat.label}</span>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <RevealSection>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">Empreendimento</span>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1B3A2D] mb-6 leading-tight">
                Sobre o<br />Pedras Brancas
              </h2>
              <p className="text-[#1B3A2D]/60 leading-relaxed mb-4 font-['DM_Sans']">
                O Loteamento Pedras Brancas é um empreendimento pensado para quem busca qualidade de vida aliada a um investimento sólido. Com lotes amplos e infraestrutura completa, é a escolha ideal para construir o seu futuro.
              </p>
              <p className="text-[#1B3A2D]/60 leading-relaxed mb-6 font-['DM_Sans']">
                Localizado em uma região em plena expansão, o loteamento oferece toda a infraestrutura necessária para você construir com tranquilidade e segurança.
              </p>
              <div className="flex items-center gap-3 rounded-xl border border-[#C8922A]/30 bg-[#C8922A]/5 px-5 py-3">
                <Check className="h-5 w-5 text-[#C8922A] flex-shrink-0" />
                <span className="text-sm font-semibold text-[#1B3A2D] font-['DM_Sans']">Garantia de Entrega LALU</span>
              </div>
            </RevealSection>
            <RevealSection delay={200}>
              <div className="relative">
                <img src={galleryImg2} alt="Vista do loteamento Pedras Brancas" className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/3]" />
                <div className="absolute bottom-4 left-4 rounded-xl bg-[#1B3A2D] px-5 py-3 shadow-lg flex items-center gap-2">
                  <Mountain className="h-5 w-5 text-[#C8922A]" />
                  <span className="text-xs text-white font-medium font-['DM_Sans']">Natureza e tranquilidade</span>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 md:py-32 bg-[#f8f7f4]">
        <div className="container mx-auto px-4">
          <RevealSection className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">Galeria</span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1B3A2D] mb-4">Conheça o Empreendimento</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: galleryImg1, alt: "Vista do loteamento Pedras Brancas" },
              { img: galleryImg2, alt: "Infraestrutura do loteamento Pedras Brancas" },
              { img: galleryImg3, alt: "Área verde do loteamento Pedras Brancas" },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 150}>
                <div className="group relative overflow-hidden rounded-2xl">
                  <img src={item.img} alt={item.alt} className="w-full object-cover aspect-[16/10] group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A2D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infra" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <RevealSection className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">Estrutura</span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1B3A2D] mb-4">Infraestrutura Completa</h2>
            <p className="text-[#1B3A2D]/60 max-w-xl mx-auto font-['DM_Sans']">Tudo o que você precisa para construir o seu sonho com segurança e conforto.</p>
          </RevealSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {infra.map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealSection key={i} delay={i * 80}>
                  <div className="group flex flex-col items-center justify-center py-6 px-3 text-center gap-3 rounded-2xl border border-[#1B3A2D]/10 hover:border-[#C8922A]/50 transition-all duration-300 hover:-translate-y-1 bg-white">
                    <Icon className="h-6 w-6 text-[#C8922A] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold text-[#1B3A2D] uppercase tracking-wide font-['DM_Sans']">{item.label}</span>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIFFERENTIALS */}
      <section className="py-24 md:py-32 bg-[#1B3A2D]">
        <div className="container mx-auto px-4">
          <RevealSection className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">Por que escolher</span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-4">Nossos Diferenciais</h2>
          </RevealSection>
          <div className="grid md:grid-cols-3 gap-6">
            {differentials.map((d, i) => {
              const Icon = d.icon;
              return (
                <RevealSection key={i} delay={i * 150}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8922A]/15 mb-5">
                      <Icon className="h-6 w-6 text-[#C8922A]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-['Playfair_Display']">{d.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed font-['DM_Sans']">{d.desc}</p>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[#1B3A2D] border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <RevealSection>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-white mb-6">
              Seu Futuro Começa <span className="text-[#C8922A]">Aqui</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-10 font-['DM_Sans']">
              Garanta seu lote em uma das regiões que mais cresce em Santa Catarina.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#b07e22] text-[#1B3A2D] font-bold px-10 py-4 rounded-full text-sm uppercase tracking-wider transition-colors font-['DM_Sans']">
              Solicitar Informações <ArrowRight className="h-4 w-4" />
            </a>
          </RevealSection>
        </div>
      </section>

      {/* BRAND */}
      <section className="py-24 md:py-32 bg-[#0f2219]">
        <div className="container mx-auto px-4 text-center">
          <RevealSection>
            <img src={laluLogo} alt="Lalu Incorporadora" className="h-20 md:h-28 mx-auto brightness-0 invert opacity-60 mb-6" />
            <p className="font-['Playfair_Display'] text-xl md:text-2xl text-[#C8922A]/80 italic">
              Construímos confiança e desenvolvimento
            </p>
          </RevealSection>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <RevealSection>
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#1B3A2D]/10">
                <GoogleMap address="Rodovia BR-101, Barra Velha, SC, Brazil" height="350px" />
              </div>
            </RevealSection>
            <RevealSection delay={200}>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">Localização</span>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1B3A2D] mb-6">Onde Estamos</h2>
              <p className="text-[#1B3A2D]/60 leading-relaxed mb-8 font-['DM_Sans']">
                Localizado na Rodovia BR-101 em Barra Velha – SC, com fácil acesso às principais cidades do litoral catarinense.
              </p>
              <div className="space-y-3 mb-8">
                {["Fácil acesso pela BR-101", "Próximo a centros comerciais", "Região em plena expansão", "Natureza preservada"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#C8922A]" />
                    <span className="text-sm text-[#1B3A2D]/70 font-['DM_Sans']">{item}</span>
                  </div>
                ))}
              </div>
              <a href="https://maps.google.com/?q=Rodovia+BR-101,+Barra+Velha,+SC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#b07e22] text-[#1B3A2D] font-bold px-6 py-3 rounded-full text-sm uppercase tracking-wider transition-colors font-['DM_Sans']">
                <MapPin className="h-4 w-4" /> Abrir no Maps
              </a>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-32 bg-[#f8f7f4]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start max-w-5xl mx-auto">
            <RevealSection>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">Contato</span>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1B3A2D] mb-4">Solicite Informações Agora</h2>
              <p className="text-[#1B3A2D]/60 mb-8 leading-relaxed font-['DM_Sans']">
                Preencha o formulário e um de nossos consultores especializados entrará em contato para apresentar as melhores opções de lotes.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C8922A]/10">
                    <Phone className="h-5 w-5 text-[#C8922A]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#1B3A2D]/40 font-['DM_Sans']">Telefone / WhatsApp</p>
                    <p className="font-semibold text-[#1B3A2D] font-['DM_Sans']">(41) 98430-5403</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C8922A]/10">
                    <MapPin className="h-5 w-5 text-[#C8922A]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#1B3A2D]/40 font-['DM_Sans']">Localização</p>
                    <p className="font-semibold text-[#1B3A2D] font-['DM_Sans']">Rodovia BR-101, Barra Velha – SC</p>
                  </div>
                </div>
              </div>
              <Button asChild className="bg-[#25D366] hover:bg-[#1fad54] text-white font-bold rounded-full px-8 font-['DM_Sans']">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> Abrir WhatsApp</a>
              </Button>
            </RevealSection>

            <RevealSection delay={200}>
              <div className="bg-white rounded-2xl shadow-2xl border border-[#1B3A2D]/10 p-6 sm:p-8">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C8922A]/10 mb-4">
                      <Check className="h-8 w-8 text-[#C8922A]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1B3A2D] mb-2 font-['Playfair_Display']">Mensagem Enviada!</h3>
                    <p className="text-[#1B3A2D]/60 font-['DM_Sans']">Nossa equipe entrará em contato em breve.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#1B3A2D]/40 mb-1.5 block font-['DM_Sans']">Nome Completo</label>
                      <Input required value={form.nome} onChange={(e) => setForm({ ...form, nome: maskName(e.target.value) })} placeholder="Como podemos te chamar?" className="rounded-xl" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#1B3A2D]/40 mb-1.5 block font-['DM_Sans']">Email</label>
                        <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="seu@email.com" className="rounded-xl" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#1B3A2D]/40 mb-1.5 block font-['DM_Sans']">Telefone</label>
                        <Input required value={form.telefone} onChange={(e) => setForm({ ...form, telefone: maskPhone(e.target.value) })} placeholder="(00) 00000-0000" className="rounded-xl" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#1B3A2D]/40 mb-1.5 block font-['DM_Sans']">Mensagem (opcional)</label>
                      <Textarea value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} placeholder="Em que podemos ajudar?" rows={3} className="rounded-xl" />
                    </div>
                    <Button type="submit" size="lg" className="w-full font-bold uppercase tracking-wider bg-[#C8922A] hover:bg-[#b07e22] text-[#1B3A2D] rounded-full font-['DM_Sans']" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                    </Button>
                    <p className="text-center text-[10px] uppercase tracking-wider text-[#1B3A2D]/30 font-['DM_Sans']">Seus dados estão protegidos pela LGPD</p>
                  </form>
                )}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f2219] border-t border-white/5">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <img src={laluLogo} alt="Lalu" className="h-10 brightness-0 invert opacity-70 mb-4" />
              <p className="text-white/40 text-sm font-['DM_Sans'] leading-relaxed">Construímos confiança e desenvolvimento por onde passamos.</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C8922A] font-semibold mb-4 font-['DM_Sans']">Navegação</h4>
              <ul className="space-y-2">
                {[{ label: "Sobre", href: "#about" }, { label: "Infraestrutura", href: "#infra" }, { label: "Localização", href: "#location" }, { label: "Contato", href: "#contact" }].map((link) => (
                  <li key={link.href}><a href={link.href} className="text-white/50 hover:text-[#C8922A] text-sm transition-colors font-['DM_Sans']">{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C8922A] font-semibold mb-4 font-['DM_Sans']">Contato</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/50 text-sm font-['DM_Sans']"><Phone className="h-4 w-4 text-[#C8922A]" />(41) 98430-5403</div>
                <div className="flex items-center gap-3 text-white/50 text-sm font-['DM_Sans']"><Mail className="h-4 w-4 text-[#C8922A]" />contato@laluadm.com</div>
                <div className="flex items-start gap-3 text-white/50 text-sm font-['DM_Sans']"><MapPin className="h-4 w-4 text-[#C8922A] mt-0.5 flex-shrink-0" />R. Padre Anchieta, 2050 - sala 705, Bigorrilho, Curitiba - PR</div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="container mx-auto px-4 py-5">
            <p className="text-center text-white/30 text-xs font-['DM_Sans']">© {new Date().getFullYear()} Lalu Incorporadora. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
