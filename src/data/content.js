export const BRAND = 'ASPHLT';
export const MARQUEE_TEXT = 'DA RUA PRA RUA';

export const NAV_LINKS = [
  { label: 'Coleção', href: '#colecao' },
  { label: 'Matéria', href: '#materia' },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Loja', href: '#loja' },
];

export const HERO = {
  lines: ['A', 'ARQUITETURA', 'DO ASFALTO'],
  background: '/images/muroGraffit.png',
  model: '/images/imagemHero.png',
  modelAlt: 'Modelo vestindo a coleção ASPHLT em frente a um muro de grafite',
};

export const PRODUCTS = [
  { id: 1, name: 'Jaqueta Shearling', tag: 'Best seller', price: 'R$ 300,00', image: '/images/modelo2.png' },
  { id: 2, name: 'Bomber Grafite', tag: 'Best seller', price: 'R$ 340,00', image: '/images/modelo1.png' },
  { id: 3, name: 'Cargo Concreto', tag: 'Novo', price: 'R$ 280,00', image: '/images/modelo3.png' },
  { id: 4, name: 'Moletom Viaduto', tag: 'Novo', price: 'R$ 260,00', image: '/images/modelo5.png' },
  { id: 5, name: 'Camisa Pichação', tag: 'Best seller', price: 'R$ 190,00', image: '/images/modelo7.png' },
];

export const PILLARS = [
  {
    art: 'Art. 01',
    material: 'Têxtil industrial',
    title: 'Rigor & Concreto',
    body:
      'Tecidos pesados de alta gramatura, sarja japonesa 14oz e costuras duplas reforçadas com linha de poliamida. Feito para aguentar o impacto diário do asfalto áspero sem deformar o caimento solto e estruturado da alfaiataria.',
    specs: [
      ['Gramatura', '480gsm'],
      ['Origem', 'Kurashiki / JP'],
    ],
  },
  {
    art: 'Art. 02',
    material: 'Maple canadense',
    title: 'Shapes Esculturais',
    quote: 'Não produzimos skates decorativos; criamos tábuas de maple com geometria precisa para as ruas de verdade.',
    body:
      'Concavidade média, nose levemente alongado para pop ágil e prensa fria com cola epóxi hidrofóbica de alta densidade.',
    specs: [
      ['Construção', '7 camadas'],
      ['Testado em', 'São Paulo'],
    ],
  },
  {
    art: 'Art. 03',
    material: 'Arquivo permanente',
    title: 'Tiragem Numerada',
    body:
      'Cada peça de vestuário e cada deck é limitado a 50 unidades rigorosamente numeradas a laser. Sem reposições, sem reprodução em massa. Uma vez esgotada, a matriz é arquivada no Museu Urbano do Béton.',
    specs: [
      ['Certificado', 'Chip NFC'],
      ['Série', 'Nº 01 a Nº 50'],
    ],
  },
];

export const LOOKBOOK = [
  {
    id: 'look-1',
    image: '/images/jacketWomen.png',
    alt: 'Modelo com jaqueta jeans e calça grande cinza',
    quote: 'O asfalto é o único crítico que não aceita fragilidade.',
    manifesto: 'Manifesto / 01',
    top: { name: 'Jacket jeans', price: 'R$ 300,00' },
    bottom: { name: 'Calça grande', price: 'R$ 300,00' },
  },
  {
    id: 'look-2',
    image: '/images/blusa8.png',
    alt: 'Modelo com moletom oversized e cargo largo',
    quote: 'Cada costura carrega o peso de quem caminhou antes.',
    manifesto: 'Manifesto / 02',
    top: { name: 'Moletom oversized', price: 'R$ 280,00' },
    bottom: { name: 'Cargo largo', price: 'R$ 320,00' },
  },
  {
    id: 'look-3',
    image: '/images/mocaAsiatiaca.png',
    alt: 'Modelo com bomber grafite e tênis de lona',
    quote: 'Não seguimos tendências. Pisamos nelas.',
    manifesto: 'Manifesto / 03',
    top: { name: 'Bomber grafite', price: 'R$ 350,00' },
    bottom: { name: 'Tênis de lona', price: 'R$ 260,00' },
  },
];

// ⚠ Ajuste o endereço real da loja (o da imagem de referência está ilegível).
export const STORE = {
  image: '/images/loja 1.png',
  imageAlt: 'Interior da loja ASPHLT: mesa central com camisetas dobradas e prateleiras de madeira',
  address: 'Av. Uruba, 1531 — Sapopemba, São Paulo, SP',
  hours: 'Terça a sábado, das 11h às 20h',
  copy: [
    'A loja é uma extensão da rua: madeira crua, ferro e luz baixa. Cada peça fica à mão para ser tocada, dobrada e vestida ali mesmo.',
    'Achados de brechó convivem com as tiragens numeradas da ASPHLT. Venha trocar uma ideia, garimpar e sair com algo que ninguém mais tem.',
  ],
};
