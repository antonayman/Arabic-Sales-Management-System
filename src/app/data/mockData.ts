export interface Factory {
  id: string;
  name: string;
  icon: string;
  companiesCount: number;
  status: 'active' | 'inactive';
  lastUpdate: string;
}

export interface Company {
  id: string;
  factoryId: string;
  name: string;
  phone: string;
  address: string;
  commercialRecord: string;
  taxNumber: string;
  email: string;
  responsiblePerson: string;
  contractStatus: 'active' | 'pending' | 'expired';
  notes: string;
}

export interface Order {
  id: string;
  companyId: string;
  orderNumber: string;
  cartonType: string;
  dimensions: string;
  quantity: number;
  price: number;
  deliveryDate: string;
  status: 'new' | 'in_progress' | 'shipped' | 'completed' | 'delayed';
  notes: string;
  progress: number;
}

export const factories: Factory[] = [
  {
    id: '1',
    name: 'مصنع النخبة للكرتون',
    icon: '🏭',
    companiesCount: 12,
    status: 'active',
    lastUpdate: '2026-05-23'
  },
  {
    id: '2',
    name: 'مصنع الرواد للتعبئة',
    icon: '📦',
    companiesCount: 8,
    status: 'active',
    lastUpdate: '2026-05-22'
  },
  {
    id: '3',
    name: 'مصنع الجودة للكرتون',
    icon: '🏢',
    companiesCount: 15,
    status: 'active',
    lastUpdate: '2026-05-21'
  },
  {
    id: '4',
    name: 'مصنع الابتكار',
    icon: '⚡',
    companiesCount: 6,
    status: 'inactive',
    lastUpdate: '2026-05-15'
  }
];

export const companies: Company[] = [
  {
    id: '1',
    factoryId: '1',
    name: 'شركة التميز التجارية',
    phone: '+966501234567',
    address: 'الرياض، حي الملك فهد، شارع العليا',
    commercialRecord: '1010123456',
    taxNumber: '310123456700003',
    email: 'info@altameez.sa',
    responsiblePerson: 'أحمد محمد العلي',
    contractStatus: 'active',
    notes: 'عميل ممتاز، دفع منتظم'
  },
  {
    id: '2',
    factoryId: '1',
    name: 'مؤسسة الأمانة للتجارة',
    phone: '+966502345678',
    address: 'جدة، حي الروضة، شارع الأمير سلطان',
    commercialRecord: '4030234567',
    taxNumber: '300234567800003',
    email: 'contact@alamana.sa',
    responsiblePerson: 'خالد سعد الحربي',
    contractStatus: 'active',
    notes: 'طلبات كبيرة شهرياً'
  },
  {
    id: '3',
    factoryId: '1',
    name: 'شركة النجاح للمواد الغذائية',
    phone: '+966503456789',
    address: 'الدمام، حي الفيصلية، طريق الملك فهد',
    commercialRecord: '2020345678',
    taxNumber: '302345678900003',
    email: 'sales@alnajah.sa',
    responsiblePerson: 'محمد عبدالله القحطاني',
    contractStatus: 'pending',
    notes: 'عقد جديد قيد المراجعة'
  }
];

export const orders: Order[] = [
  {
    id: '1',
    companyId: '1',
    orderNumber: 'ORD-2026-001',
    cartonType: 'كرتون مموج - طبقة واحدة',
    dimensions: '40×30×25 سم',
    quantity: 5000,
    price: 12500,
    deliveryDate: '2026-06-01',
    status: 'in_progress',
    notes: 'طباعة شعار الشركة باللون الأزرق',
    progress: 65
  },
  {
    id: '2',
    companyId: '1',
    orderNumber: 'ORD-2026-002',
    cartonType: 'كرتون مموج - طبقتين',
    dimensions: '50×40×30 سم',
    quantity: 3000,
    price: 15000,
    deliveryDate: '2026-06-10',
    status: 'new',
    notes: 'استخدام كرتون عالي الجودة',
    progress: 10
  },
  {
    id: '3',
    companyId: '2',
    orderNumber: 'ORD-2026-003',
    cartonType: 'كرتون مموج - طبقة واحدة',
    dimensions: '35×25×20 سم',
    quantity: 10000,
    price: 22000,
    deliveryDate: '2026-05-28',
    status: 'shipped',
    notes: 'شحن على دفعتين',
    progress: 90
  },
  {
    id: '4',
    companyId: '2',
    orderNumber: 'ORD-2026-004',
    cartonType: 'كرتون مموج - ثلاث طبقات',
    dimensions: '60×50×40 سم',
    quantity: 2000,
    price: 18000,
    deliveryDate: '2026-05-25',
    status: 'delayed',
    notes: 'تأخر بسبب نقص المواد الخام',
    progress: 45
  },
  {
    id: '5',
    companyId: '3',
    orderNumber: 'ORD-2026-005',
    cartonType: 'كرتون مموج - طبقة واحدة',
    dimensions: '30×20×15 سم',
    quantity: 8000,
    price: 16000,
    deliveryDate: '2026-05-20',
    status: 'completed',
    notes: 'تم التسليم بنجاح',
    progress: 100
  }
];
