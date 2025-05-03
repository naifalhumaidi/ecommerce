import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"
import { formatCurrency, formatNumber } from "@/lib/formatter";
import db from "@/lib/prisma";


export default async function Dashboard() {
  // const {amount, NumberOfSales} = await getOrdersData();
  const {amount,NumberOfSales} = await getOrdersData();
  return (
    <>
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <DashboardCard title={"Sales"} subtitle={formatNumber(NumberOfSales)} content={formatCurrency(amount)}/>
      <DashboardCard title={"title"} subtitle={"sub"} content={"content"}/>
      <DashboardCard title={"title"} subtitle={"sub"} content={"content"}/>
    </div>
    </>
  );
}

const getOrdersData = async () => {
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
