import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface ConversionEvent {
  type: string;
  timestamp: number;
  details?: string;
}

export default function Index() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [conversions, setConversions] = useState<ConversionEvent[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('conversions');
    if (saved) {
      setConversions(JSON.parse(saved));
    }
  }, []);

  const trackConversion = (type: string, details?: string) => {
    const event: ConversionEvent = {
      type,
      timestamp: Date.now(),
      details,
    };
    const updated = [...conversions, event];
    setConversions(updated);
    localStorage.setItem('conversions', JSON.stringify(updated));
    console.log('Конверсия зафиксирована:', event);
  };

  const handleCTAClick = (type: string) => {
    trackConversion('CTA_CLICK', type);
    toast({
      title: `${type} форма`,
      description: 'Мы свяжемся с вами в ближайшее время!',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackConversion('FORM_SUBMIT', 'Контактная форма');
    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в течение 24 часов.',
    });
    setEmail('');
  };

  const handleProductClick = (product: string, price: string) => {
    trackConversion('PRODUCT_CLICK', `${product} - ${price}`);
    toast({
      title: 'Добавлено в корзину',
      description: `${product} (${price})`,
    });
  };

  const testimonials = [
    {
      name: 'Анна Петрова',
      avatar: '👩',
      role: 'Владелица квартиры',
      text: 'Благодаря курсу сэкономила 250 тыс. рублей на ремонте трёхкомнатной квартиры! Все инструменты понятные и рабочие.',
      savings: '250 000 ₽',
    },
    {
      name: 'Дмитрий Соколов',
      avatar: '👨',
      role: 'Инвестор в недвижимость',
      text: 'Использую шаблоны для всех своих объектов. График Ганта помог избежать срыва сроков на двух проектах одновременно.',
      savings: '180 000 ₽',
    },
    {
      name: 'Елена Краснова',
      avatar: '👩‍💼',
      role: 'Дизайнер интерьеров',
      text: 'Консультация по бюджетированию изменила мой подход к работе с клиентами. Теперь проекты завершаются точно в срок.',
      savings: '320 000 ₽',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Home" size={24} className="text-accent" />
            <span className="font-heading text-xl font-bold">РемонтБюджет</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium hover:text-accent transition-colors">Услуги</a>
            <a href="#products" className="text-sm font-medium hover:text-accent transition-colors">Продукты</a>
            <a href="#subscription" className="text-sm font-medium hover:text-accent transition-colors">Подписка</a>
            <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">О нас</a>
            <a href="#contact" className="text-sm font-medium hover:text-accent transition-colors">Контакты</a>
          </nav>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Icon name="Menu" size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="font-heading">Меню</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <a 
                  href="#services" 
                  className="flex items-center gap-3 text-lg font-medium hover:text-accent transition-colors p-3 hover:bg-secondary rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon name="BookOpen" size={20} />
                  Услуги
                </a>
                <a 
                  href="#products" 
                  className="flex items-center gap-3 text-lg font-medium hover:text-accent transition-colors p-3 hover:bg-secondary rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon name="Package" size={20} />
                  Продукты
                </a>
                <a 
                  href="#subscription" 
                  className="flex items-center gap-3 text-lg font-medium hover:text-accent transition-colors p-3 hover:bg-secondary rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon name="Star" size={20} />
                  Подписка
                </a>
                <a 
                  href="#about" 
                  className="flex items-center gap-3 text-lg font-medium hover:text-accent transition-colors p-3 hover:bg-secondary rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon name="Info" size={20} />
                  О нас
                </a>
                <a 
                  href="#contact" 
                  className="flex items-center gap-3 text-lg font-medium hover:text-accent transition-colors p-3 hover:bg-secondary rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon name="Mail" size={20} />
                  Контакты
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-secondary via-background to-secondary">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-accent text-accent-foreground mb-2">💡 Новый подход к планированию</Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
                Эффективное бюджетное планирование ремонта
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Готовые шаблоны, графики работ и профессиональные консультации для вашего успешного ремонта
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={() => handleCTAClick('Покупка курса')}>
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Купить курс
                </Button>
                <Button size="lg" variant="outline" onClick={() => handleCTAClick('Консультация')}>
                  <Icon name="Calendar" size={20} className="mr-2" />
                  Заказать консультацию
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-3xl"></div>
              <img
                src="https://cdn.poehali.dev/projects/9f491c51-e84e-4061-9481-6bc4cd786895/files/b907be11-f1d1-49e0-a00c-50e4b3f521ff.jpg"
                alt="Планирование ремонта"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 clip-triangle"></div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Calculator', title: 'Прозрачные расчёты', desc: 'Понятные формулы и шаблоны смет для точного планирования бюджета' },
              { icon: 'Wrench', title: 'Готовые инструменты', desc: 'Калькуляторы, графики Ганта и чек-листы по всем этапам работ' },
              { icon: 'Globe', title: 'Онлайн-обслуживание', desc: 'Консультации и обучение в удобном формате из любой точки мира' },
            ].map((item, idx) => (
              <Card key={idx} className="border-2 hover:border-accent transition-all hover:shadow-lg animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={item.icon as any} size={24} className="text-accent" />
                  </div>
                  <CardTitle className="font-heading">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Услуги</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Комплексное обучение и консультации для эффективного управления проектами ремонта
            </p>
          </div>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="courses">Курсы</TabsTrigger>
              <TabsTrigger value="consulting">Консультации</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Icon name="Palette" size={32} className="text-accent" />
                      <Badge variant="secondary">4–6 модулей</Badge>
                    </div>
                    <CardTitle className="font-heading mt-4">Базовые принципы дизайна интерьеров</CardTitle>
                    <CardDescription>Ремонт под бюджет: от идеи до реализации</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span>По 5–10 минут каждый модуль</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="CheckCircle" size={16} className="text-accent" />
                      <span>Включает шаблоны и калькуляторы</span>
                    </div>
                    <Button className="w-full mt-4 bg-accent hover:bg-accent/90">
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Icon name="GanttChart" size={32} className="text-accent" />
                      <Badge variant="secondary">Профи уровень</Badge>
                    </div>
                    <CardTitle className="font-heading mt-4">Графики работ и управление проектом</CardTitle>
                    <CardDescription>Диаграммы Ганта, управление сроками и рисками</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="LineChart" size={16} className="text-muted-foreground" />
                      <span>Практические инструменты</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="CheckCircle" size={16} className="text-accent" />
                      <span>Реальные кейсы и примеры</span>
                    </div>
                    <Button className="w-full mt-4 bg-accent hover:bg-accent/90">
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="consulting" className="space-y-6">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">Консультации по проектам</CardTitle>
                  <CardDescription>Индивидуальная помощь на всех этапах ремонта</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {[
                      'Составление и оптимизация бюджета',
                      'Разработка расписания работ',
                      'Управление рисками и непредвиденными ситуациями',
                      'Коммуникация с подрядчиками и поставщиками',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                        <Icon name="CheckCircle" size={20} className="text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-accent hover:bg-accent/90" size="lg">
                    Записаться на консультацию
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="products" className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Цифровые продукты</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Профессиональные инструменты для самостоятельного планирования и контроля ремонта
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'FileSpreadsheet', title: 'Шаблоны смет', desc: 'Готовые структуры с формулами расчёта', price: '990 ₽' },
              { icon: 'Calendar', title: 'Графики работ', desc: 'Диаграммы Ганта с планированием материалов', price: '1 490 ₽' },
              { icon: 'ListChecks', title: 'Чек-листы', desc: '5–7 пунктов проверки на каждый этап', price: '690 ₽' },
              { icon: 'Calculator', title: 'Калькуляторы', desc: 'Расчёты материалов по площади и объёму', price: '890 ₽' },
            ].map((product, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={product.icon as any} size={32} className="text-accent" />
                  </div>
                  <CardTitle className="font-heading text-xl">{product.title}</CardTitle>
                  <CardDescription>{product.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-accent">{product.price}</span>
                  </div>
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90"
                    onClick={() => handleProductClick(product.title, product.price)}
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Купить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="subscription" className="py-20 bg-gradient-to-br from-accent/10 via-transparent to-accent/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-accent shadow-2xl">
              <CardHeader className="text-center pb-8">
                <Badge className="w-fit mx-auto bg-accent text-accent-foreground mb-4">⭐ Лучшее предложение</Badge>
                <CardTitle className="font-heading text-3xl md:text-4xl">Подписка Premium</CardTitle>
                <CardDescription className="text-lg mt-4">
                  Полный доступ ко всем материалам и регулярным обновлениям
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-heading font-semibold">Что включено:</h4>
                    {[
                      'Все курсы и цифровые продукты',
                      'Ежемесячные обновления материалов',
                      'Доступ к новым модулям',
                      'Приоритетная поддержка',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Icon name="CheckCircle" size={18} className="text-accent" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-heading font-semibold">Привилегии подписчиков:</h4>
                    {[
                      'Скидки на консультации 30%',
                      'Закрытое комьюнити',
                      'Эксклюзивные вебинары',
                      'Ранний доступ к новинкам',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Icon name="Star" size={18} className="text-accent" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-6 text-center">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-5xl font-bold text-accent">2 990 ₽</span>
                    <span className="text-muted-foreground">/месяц</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Отменить можно в любой момент</p>
                  <Button size="lg" className="w-full bg-accent hover:bg-accent/90">
                    Оформить подписку
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Реальные результаты людей, которые использовали наши инструменты
            </p>
          </div>

          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="text-2xl bg-accent/10">{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base font-heading">{testimonial.name}</CardTitle>
                          <CardDescription className="text-xs">{testimonial.role}</CardDescription>
                        </div>
                      </div>
                      <Badge className="w-fit bg-accent/10 text-accent border-accent">
                        <Icon name="TrendingDown" size={14} className="mr-1" />
                        Экономия: {testimonial.savings}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.text}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      <section id="about" className="py-20 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">О нас</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Мы — команда профессионалов с 10-летним опытом в бюджетировании и управлении строительными проектами. 
              Наша миссия — сделать ремонт понятным, предсказуемым и экономичным для каждого.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              За годы работы мы разработали уникальную методологию планирования, которая помогла сотням клиентов 
              сэкономить до 30% бюджета и избежать типичных ошибок при ремонте.
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Завершённых проектов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">10 лет</div>
                <div className="text-sm text-muted-foreground">Опыта в индустрии</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">30%</div>
                <div className="text-sm text-muted-foreground">Экономия бюджета</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-muted-foreground text-lg">
                Оставьте заявку, и мы свяжемся с вами в течение 24 часов
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input id="name" placeholder="Иван Иванов" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="ivan@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Расскажите о вашем проекте..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon name="User" size={20} className="text-accent" />
                    <span className="font-medium">Чернов Виталий Александрович</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={20} className="text-accent" />
                    <a href="tel:+79294390444" className="hover:text-accent transition-colors">
                      +7 (929) 439-04-44
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-heading text-2xl font-bold mb-6 text-center">Часто задаваемые вопросы</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">Как получить доступ к материалам после покупки?</AccordionTrigger>
                <AccordionContent>
                  После оплаты вы получите письмо с доступом к личному кабинету, где будут все купленные материалы и инструкции.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Можно ли получить возврат средств?</AccordionTrigger>
                <AccordionContent>
                  Да, мы предоставляем 14-дневную гарантию возврата денег, если материалы вам не подошли.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">Нужны ли специальные знания для работы с шаблонами?</AccordionTrigger>
                <AccordionContent>
                  Нет, все шаблоны разработаны для обычных людей без специального образования. Каждый документ содержит подробные инструкции.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">Как проходят консультации?</AccordionTrigger>
                <AccordionContent>
                  Консультации проводятся онлайн через Zoom или Google Meet. Продолжительность — от 1 до 2 часов в зависимости от пакета.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Home" size={24} />
                <span className="font-heading text-lg font-bold">РемонтБюджет</span>
              </div>
              <p className="text-sm opacity-80 mb-4">
                Эффективное планирование ремонта для каждого
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 opacity-80">
                  <Icon name="User" size={16} />
                  <span>Чернов Виталий Александрович</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <a href="tel:+79294390444" className="hover:opacity-100 opacity-80 transition-opacity">
                    +7 (929) 439-04-44
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#services" className="hover:opacity-100">Курсы</a></li>
                <li><a href="#services" className="hover:opacity-100">Консультации</a></li>
                <li><a href="#products" className="hover:opacity-100">Цифровые продукты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#about" className="hover:opacity-100">О нас</a></li>
                <li><a href="#contact" className="hover:opacity-100">Контакты</a></li>
                <li><a href="#" className="hover:opacity-100">Блог</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Соцсети</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/10">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/10">
                  <Icon name="Send" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/10">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm opacity-60">
            © 2024 РемонтБюджет. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}