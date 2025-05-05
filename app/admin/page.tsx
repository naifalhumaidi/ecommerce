import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"
import { formatCurrency, formatNumber } from "@/lib/formatter";
import db from "@/lib/prisma";


export default async function Dashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(), getUserData(), getProductData()
  ])
  
  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <DashboardCard title={"Sales"} subtitle={formatNumber(salesData.NumberOfSales)} content={formatCurrency(salesData.amount)}/>
      <DashboardCard title={"Customers"} subtitle={formatNumber(userData.userCount)} content={formatCurrency(userData.averageValuePerUser)}/>
      <DashboardCard title={"Product"} subtitle={formatNumber(productData.inactiveUsers)} content={formatNumber(productData.activeUsers)}/>
    </div>
  );
}
const getSalesData = async () => {
  const data = await db.order.aggregate(
    {
      _sum: { pricePaidInCents:true },
      _count:true
    }
  )
   return {
     amount:(data._sum.pricePaidInCents || 0) / 100,
     NumberOfSales:data._count
   }
}

const getUserData = async () => {
  const [userCount,orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate(
      {_sum:{pricePaidInCents:true}}
    ) 
  ])
  return {
    userCount,
    averageValuePerUser: userCount === 0 ? 0: 
    (orderData._sum.pricePaidInCents || 0) / userCount / 100
  }
}

const getProductData = async () => {
  const [activeUsers, inactiveUsers] = await Promise.all([
    db.product.count({where:{isAvailable:true}}), 
    db.product.count({where:{isAvailable:false}}), 
  ])
  return {
    activeUsers,
    inactiveUsers
  };
}

type DashboardCardProps = {title:string, subtitle:string, content:string}
const DashboardCard = ({title, subtitle, content}:DashboardCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle>
        {title}
      </CardTitle>
      <CardDescription>
        {subtitle}
      </CardDescription>
    </CardHeader>        
    <CardContent>
      {content}
    </CardContent>
  </Card>
)