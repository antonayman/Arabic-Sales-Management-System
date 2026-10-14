import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Plus, Search, Calendar, Package, DollarSign, TrendingUp, Clock, CheckCircle2, XCircle, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { orders, companies } from "../data/mockData";
import * as Progress from "@radix-ui/react-progress";

interface OrderManagementProps {
  companyId: string;
  onBack: () => void;
}

export function OrderManagement({ companyId, onBack }: OrderManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const company = companies.find(c => c.id === companyId);
  const companyOrders = orders.filter(o => o.companyId === companyId);

  const filteredOrders = companyOrders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.cartonType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!company) {
    return <div>الشركة غير موجودة</div>;
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'new': return 'secondary';
      case 'in_progress': return 'default';
      case 'shipped': return 'default';
      case 'completed': return 'default';
      case 'delayed': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'جديد';
      case 'in_progress': return 'جاري التنفيذ';
      case 'shipped': return 'تم الشحن';
      case 'completed': return 'مكتمل';
      case 'delayed': return 'متأخر';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return Clock;
      case 'in_progress': return TrendingUp;
      case 'shipped': return Truck;
      case 'completed': return CheckCircle2;
      case 'delayed': return XCircle;
      default: return Clock;
    }
  };

  const totalRevenue = companyOrders.reduce((sum, order) => sum + order.price, 0);

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
            <ArrowRight className="w-4 h-4" />
            العودة للمصنع
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <p className="text-muted-foreground mt-1">إدارة الطلبات والفواتير</p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              طلب جديد
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'إجمالي الطلبات', value: companyOrders.length, icon: Package, color: 'text-primary' },
            { label: 'جاري التنفيذ', value: companyOrders.filter(o => o.status === 'in_progress').length, icon: Clock, color: 'text-warning' },
            { label: 'مكتملة', value: companyOrders.filter(o => o.status === 'completed').length, icon: CheckCircle2, color: 'text-success' },
            { label: 'الإيرادات', value: `${totalRevenue.toLocaleString()} ر.س`, icon: DollarSign, color: 'text-chart-1' },
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
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                        <Icon className="w-5 h-5" />
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
            <h2 className="text-2xl font-bold">الطلبات</h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="بحث في الطلبات..."
                  className="pr-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground">لم يتم العثور على طلبات تطابق البحث.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <motion.div
                    key={order.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-primary/10">
                                <StatusIcon className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-xl font-bold">{order.orderNumber}</h3>
                                  <Badge variant={getStatusVariant(order.status)}>
                                    {getStatusLabel(order.status)}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{order.cartonType}</p>
                              </div>
                            </div>
                            <div className="text-left">
                              <p className="text-2xl font-bold">{order.price.toLocaleString()} ر.س</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3">
                              <Package className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">المقاسات</p>
                                <p className="text-sm font-medium">{order.dimensions}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <TrendingUp className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">الكمية</p>
                                <p className="text-sm font-medium">{order.quantity.toLocaleString()} وحدة</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">تاريخ التسليم</p>
                                <p className="text-sm font-medium">{order.deliveryDate}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">مراحل التنفيذ</span>
                              <span className="font-medium">{order.progress}%</span>
                            </div>
                            <Progress.Root
                              className="relative h-2 w-full overflow-hidden rounded-full bg-secondary"
                              value={order.progress}
                            >
                              <Progress.Indicator
                                className="h-full bg-gradient-to-l from-primary to-primary/80 transition-all duration-500 ease-out"
                                style={{ width: `${order.progress}%` }}
                              />
                            </Progress.Root>
                          </div>

                          {order.notes && (
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm text-muted-foreground">ملاحظات:</p>
                              <p className="text-sm mt-1">{order.notes}</p>
                            </div>
                          )}

                          <div className="flex gap-3 pt-2 border-t border-border">
                            <Button variant="outline" size="sm">
                              عرض التفاصيل
                            </Button>
                            <Button variant="outline" size="sm">
                              طباعة الفاتورة
                            </Button>
                            <Button variant="outline" size="sm">
                              تحديث الحالة
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>الجدول الزمني للطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-border"></div>
                <div className="space-y-6">
                  {companyOrders.slice(0, 3).map((order, index) => (
                    <div key={order.id} className="relative flex gap-6">
                      <div className="absolute right-[1.1rem] w-4 h-4 rounded-full bg-primary border-4 border-background z-10"></div>
                      <div className="mr-12 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{order.orderNumber}</p>
                          <Badge variant={getStatusVariant(order.status)} className="text-xs">
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{order.cartonType}</p>
                        <p className="text-xs text-muted-foreground">التسليم: {order.deliveryDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
