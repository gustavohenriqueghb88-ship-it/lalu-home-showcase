import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone, MapPin, MessageCircle, Check, ArrowRight,
  Route, Droplets, CloudRain, Lightbulb, Wrench, Trees,
  Navigation, Car, CreditCard, Handshake,
  HardHat, Landmark, TrendingUp, LayoutGrid, Ruler, CalendarClock, Milestone
} from "lucide-react";
import { maskPhone, maskName, submitToGoogleSheets } from "@/utils/formUtils";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import rotasHero from "@/assets/rotas-do-sol-hero.jpg";
import rotas1 from "@/assets/rotas-do-sol-1.jpg";
import rotas2 from "@/assets/rotas-do-sol-2.jpg";
import rotasNew from "@/assets/rotas-do-sol-new.jpg";

const infra = [
  { icon: Route, label: "Ruas Asfaltadas" },
  { icon: Droplets, label: "Rede de Água" },
  { icon: CloudRain, label: "Galeria Pluvial" },
  { icon: Lightbulb, label: "Iluminação Pública" },
  { icon: Wrench, label: "Rede de Esgoto" },
  { icon: Trees, label: "Paisagens Naturais" },
  { icon: Navigation, label: "Excelente Localização" },
  { icon: Car, label: "Próximo à BR-101" },
  { icon: CreditCard, label: "Financiamento 180x" },
  { icon: Handshake, label: "Entrada Facilitada" },
];

const differentials = [
  {
    icon: HardHat,
    title: "Infraestrutura completa pronta",
    desc: "Toda a rede urbana instalada com padrões de alta qualidade técnica.",
  },
  {
    icon: Landmark,
    title: "Financiamento próprio facilitado",
    desc: "Condições de parcelamento direto com a loteadora sem burocracia bancária.",
  },
  {
    icon: TrendingUp,
    title: "Região em desenvolvimento",
    desc: "Localização estratégica com alto índice de valorização anual.",
  },
];

const stats = [
  { value: "71", label: "Lotes Disponíveis", icon: LayoutGrid },
  { value: "276m²", label: "A partir de", icon: Ruler },
  { value: "180x", label: "Meses para Pagar", icon: CalendarClock },
  { value: "", label: "Ruas Asfaltadas", icon: Milestone },
];

const WHATSAPP_URL = "https://wa.me/5541984305403?text=Olá! Tenho interesse no Loteamento Rotas do Sol.";

export default function RotasDoSol() {
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
        interesse: "Loteamento Rotas do Sol",
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Sticky WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${rotasHero})` }}
        />
        <div className="absolute inset-0 bg-primary/80" />

        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground animate-fade-in">
          <span className="inline-block rounded-full border border-secondary/40 bg-secondary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary mb-6">
            Loteamento Disponível
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Rotas do Sol
          </h1>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
            Seu lote na natureza, com infraestrutura completa
            <br className="hidden sm:block" />
            para viver o melhor da vida.
          </p>

          <div className="flex items-center justify-center gap-2 text-secondary mb-10">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wide">Barra do Itapocu, Araquari – SC</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="text-base font-bold px-8">
              <a href="#contact">
                Quero Meu Lote <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="whatsapp" className="text-base font-bold px-8">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/10">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col items-center justify-center py-8 gap-1">
                  {stat.value ? (
                    <span className="font-bold text-secondary text-3xl md:text-4xl">{stat.value}</span>
                  ) : (
                    <Icon className="h-8 w-8 text-secondary" />
                  )}
                  <span className="text-xs uppercase tracking-widest text-primary-foreground/60 font-medium">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="animate-fade-in">
              <span className="text-xs uppercase tracking-widest text-secondary font-semibold mb-3 block">
                Empreendimento
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                Sobre o<br />Rotas do Sol
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Localizado na encantadora Barra do Itapocú, o Rotas do Sol oferece a harmonia perfeita entre a natureza preservada e o conforto da infraestrutura moderna.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Um investimento seguro em uma das regiões que mais cresce em Santa Catarina, ideal para quem busca qualidade de vida ou uma excelente oportunidade de valorização imobiliária.
              </p>
              <div className="flex items-center gap-3 rounded-lg border border-secondary/30 bg-secondary/5 px-5 py-3">
                <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                <span className="text-sm font-semibold text-foreground">Garantia de Entrega LALU</span>
              </div>
            </div>

            <div className="relative">
              <img
                src={rotas1}
                alt="Vista do loteamento Rotas do Sol"
                className="w-full rounded-xl shadow-elegant object-cover aspect-[4/3]"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-primary px-5 py-3 shadow-lg flex items-center gap-2">
                <Trees className="h-5 w-5 text-secondary" />
                <span className="text-xs text-primary-foreground font-medium">Paisagens naturais preservadas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { img: rotas2, alt: "Vista aérea do loteamento Rotas do Sol" },
              { img: rotasNew, alt: "Infraestrutura do loteamento Rotas do Sol" },
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full object-cover aspect-[16/10] group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section id="infra" className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Infraestrutura Completa
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tudo o que você precisa para construir o seu sonho com segurança e conforto.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {infra.map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i} className="group border border-border hover:border-secondary transition-all duration-200 hover:-translate-y-0.5">
                  <CardContent className="flex flex-col items-center justify-center py-6 px-3 text-center gap-3">
                    <Icon className="h-6 w-6 text-secondary group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wide">{item.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-14">
            Nossos Diferenciais
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {differentials.map((d, i) => {
              const Icon = d.icon;
              return (
                <Card key={i} className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground">
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/15 mb-5">
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{d.title}</h3>
                    <p className="text-sm text-primary-foreground/70 leading-relaxed">{d.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start max-w-5xl mx-auto">
            {/* Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Solicite Informações Agora
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Preencha o formulário e um de nossos consultores especializados entrará em contato para apresentar as melhores opções de lotes.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Telefone / WhatsApp</p>
                    <p className="font-semibold text-foreground">(41) 98430-5403</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Localização</p>
                    <p className="font-semibold text-foreground">Barra do Itapocu, Araquari – SC</p>
                  </div>
                </div>
              </div>

              <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Abrir WhatsApp
                </a>
              </Button>
            </div>

            {/* Form */}
            <Card className="shadow-elegant">
              <CardContent className="p-6 sm:p-8">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                      <Check className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Mensagem Enviada!</h3>
                    <p className="text-muted-foreground">Nossa equipe entrará em contato em breve.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                        Nome Completo
                      </label>
                      <Input
                        required
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: maskName(e.target.value) })}
                        placeholder="Como podemos te chamar?"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          Email
                        </label>
                        <Input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          Telefone
                        </label>
                        <Input
                          required
                          value={form.telefone}
                          onChange={(e) => setForm({ ...form, telefone: maskPhone(e.target.value) })}
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                        Mensagem (opcional)
                      </label>
                      <Textarea
                        value={form.mensagem}
                        onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                        placeholder="Em que podemos ajudar?"
                        rows={3}
                      />
                    </div>

                    <Button type="submit" variant="secondary" size="lg" className="w-full font-bold uppercase tracking-wider" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                    </Button>

                    <p className="text-center text-[10px] uppercase tracking-wider text-muted-foreground/60">
                      Seus dados estão protegidos pela LGPD
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
