import { useState } from "react";
import { motion } from "motion/react";
import { Factory, Building2, ShoppingCart, Clock, CheckCircle, DollarSign, Plus, Search, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { factories } from "../data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface DashboardProps {
  onNavigateToFactory: (factoryId: string) => void;
}

const stats = [
  { label: 'عدد المصانع', value: '4', icon: Factory, color: 'text-chart-1' },
  { label: 'عدد الشركات', value: '35', icon: Building2, color: 'text-chart-2' },
  { label: 'عدد الطلبات', value: '127', icon: ShoppingCart, color: 'text-chart-3' },
  { label: 'الطلبات الجاري تنفيذها', value: '23', icon: Clock, color: 'text-warning' },
  { label: 'الطلبات المكتملة', value: '89', icon: CheckCircle, color: 'text-success' },
  { label: 'إجمالي المبيعات', value: '1.2M ر.س', icon: DollarSign, color: 'text-primary' },
];

const chartData = [
  { month: 'يناير', value: 45000 },
  { month: 'فبراير', value: 52000 },
  { month: 'مارس', value: 48000 },
  { month: 'أبريل', value: 61000 },
  { month: 'مايو', value: 73000 },
];

const pieData = [
  { name: 'مكتمل', value: 89, color: '#5a9e6f' },
  { name: 'جاري التنفيذ', value: 23, color: '#d4a855' },
  { name: 'جديد', value: 15, color: '#6b8cae' },
];

export function Dashboard({ onNavigateToFactory }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFactories = factories.filter(factory =>
    factory.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold">لوحة التحكم</h1>
            <p className="text-muted-foreground mt-1">نظرة عامة على نشاط المبيعات</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            إضافة مصنع جديد
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className={cn("p-3 rounded-lg bg-muted", stat.color)}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>المبيعات الشهرية</CardTitle>
                <CardDescription>آخر 5 أشهر</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="value" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>توزيع الطلبات</CardTitle>
                <CardDescription>حسب الحالة</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">المصانع</h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن مصنع..."
                  className="pr-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {filteredFactories.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground">لم يتم العثور على مصانع تطابق البحث.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFactories.map((factory, index) => (
                <motion.div
                  key={factory.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{factory.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                            {factory.name}
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{factory.companiesCount} شركة</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={factory.status === 'active' ? 'default' : 'secondary'}>
                                {factory.status === 'active' ? 'نشط' : 'غير نشط'}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{factory.lastUpdate}</span>
                            </div>
                          </div>
                          <Button
                            onClick={() => onNavigateToFactory(factory.id)}
                            className="w-full mt-4"
                            variant="outline"
                          >
                            عرض التفاصيل
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>النشاط الأخير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'طلب جديد من شركة التميز التجارية', time: 'منذ 5 دقائق', icon: ShoppingCart },
                  { action: 'تم إكمال طلب رقم ORD-2026-005', time: 'منذ ساعة', icon: CheckCircle },
                  { action: 'تم إضافة شركة جديدة', time: 'منذ 3 ساعات', icon: Building2 },
                  { action: 'تحديث بيانات مصنع النخبة', time: 'منذ يوم', icon: Factory },
                ].map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
