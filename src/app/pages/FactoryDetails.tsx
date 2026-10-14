import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Plus, Search, Phone, Mail, MapPin, FileText, Edit, Trash2, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { companies, factories } from "../data/mockData";

interface FactoryDetailsProps {
  factoryId: string;
  onBack: () => void;
  onNavigateToOrders: (companyId: string) => void;
}

export function FactoryDetails({ factoryId, onBack, onNavigateToOrders }: FactoryDetailsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const factory = factories.find(f => f.id === factoryId);
  const factoryCompanies = companies.filter(c => c.factoryId === factoryId);

  const filteredCompanies = factoryCompanies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.responsiblePerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!factory) {
    return <div>المصنع غير موجود</div>;
  }

  const getContractStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'expired': return 'destructive';
      default: return 'outline';
    }
  };

  const getContractStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'pending': return 'قيد المراجعة';
      case 'expired': return 'منتهي';
      default: return status;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{factory.icon}</div>
              <div>
                <h1 className="text-3xl font-bold">{factory.name}</h1>
                <p className="text-muted-foreground mt-1">{factoryCompanies.length} شركة مرتبطة</p>
              </div>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة شركة جديدة
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'عدد الشركات', value: factoryCompanies.length, icon: Building2 },
            { label: 'العقود النشطة', value: factoryCompanies.filter(c => c.contractStatus === 'active').length, icon: FileText },
            { label: 'قيد المراجعة', value: factoryCompanies.filter(c => c.contractStatus === 'pending').length, icon: FileText },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">الشركات المرتبطة</h2>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="بحث في الشركات..."
                className="pr-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredCompanies.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground">لم يتم العثور على شركات تطابق البحث.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                {company.name}
                              </h3>
                              <Badge variant={getContractStatusVariant(company.contractStatus)}>
                                {getContractStatusLabel(company.contractStatus)}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button size="icon" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">رقم الهاتف</p>
                                <p className="text-sm font-medium">{company.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">البريد الإلكتروني</p>
                                <p className="text-sm font-medium">{company.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">العنوان</p>
                                <p className="text-sm font-medium">{company.address}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">السجل التجاري</p>
                                <p className="text-sm font-medium">{company.commercialRecord}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">الرقم الضريبي</p>
                                <p className="text-sm font-medium">{company.taxNumber}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">الشخص المسؤول</p>
                                <p className="text-sm font-medium">{company.responsiblePerson}</p>
                              </div>
                            </div>
                          </div>

                          {company.notes && (
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm text-muted-foreground">ملاحظات:</p>
                              <p className="text-sm mt-1">{company.notes}</p>
                            </div>
                          )}

                          <div className="flex gap-3 pt-2">
                            <Button onClick={() => onNavigateToOrders(company.id)} className="gap-2">
                              <FileText className="w-4 h-4" />
                              عرض الطلبات
                            </Button>
                            <Button variant="outline" className="gap-2">
                              <FileText className="w-4 h-4" />
                              المرفقات
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
