import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { priceFormatter } from "../../helper/amount-fomrmatter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuCheckboxItem } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "../loader";

const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig

  const data = [
    {
      name: 'Jan',
      inflow: 4000,
      outflow: 2400,
      amt: 2400,
    },
    {
      name: 'Feb',
      inflow: 3000,
      outflow: 1398,
      amt: 2210,
    },
    {
      name: 'Mar',
      inflow: 2000,
      outflow: 9800,
      amt: 2290,
    },
    {
      name: 'Apr',
      inflow: 2780,
      outflow: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      inflow: 1890,
      outflow: 4800,
      amt: 2181,
    },
    {
      name: 'Jun',
      inflow: 2390,
      outflow: 3800,
      amt: 2500,
    },
    {
      name: 'July',
      inflow: 3490,
      outflow: 4300,
      amt: 2100,
    },
    {
        name: 'Aug',
        inflow: 1490,
        outflow: 300,
        amt: 2100,
      },
      {
        name: 'Sept',
        inflow: 2090,
        outflow: 3000,
        amt: 2100,
      },
  ];


const DashboardLineChart = () => {
    const [selectedChartTime, setSelectedChartTime] = useState<"monthly" | "weekly">("monthly")
    const [isChartRendering, setIsChartRendering] = useState(false)

    const reRenderChart = () => {
        setIsChartRendering(true)
        setTimeout(() => {
            setIsChartRendering(false)
        }, 500)
    }

    const handleTimeChangeForChart = (value: "monthly" | "weekly") => {
        if (selectedChartTime === value){
            return
        }
        setSelectedChartTime(value)
        reRenderChart()
    }


    return (
        <>
            <div className="bg-white/70 rounded-2xl pt-16 px-3 md:p-10 relative">
                <div className="flex justify-between items-center pb-7 px-5">
                    <h4 className="text-[#040405] font-[18px leading-[21.6px] tracking-[0.072px]">Recent Recipients</h4>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="flex">
                            <Button variant="outline" className="py-5 font-normal md:flex items-center space-x-2">
                                <p className="capitalize">{selectedChartTime}</p>                                     
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuCheckboxItem
                                className="capitalize"
                                onCheckedChange={() => {
                                    handleTimeChangeForChart("monthly")
                                }}
                                checked={selectedChartTime === "monthly"}
                            >
                                Monthly
                            </DropdownMenuCheckboxItem>

                            <DropdownMenuCheckboxItem
                                className="capitalize"
                                onCheckedChange={() => {
                                    handleTimeChangeForChart("weekly")
                                  
                                }}
                                checked={selectedChartTime === "weekly"}
                            >
                                Weekly
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                
                { isChartRendering &&
                    <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-[30000] flex items-center justify-center">
                        <LoadingSpinner color="#1235A5" className={{scale : "70%"}} loading={true}/>
                    </div>
                }

                <ChartContainer config={chartConfig} className="min-h-[300px] w-full">                  
                    <LineChart 
                        width={500} height={300} data={data} className="p-0 relative"
                    >
                        <ChartTooltip content={<ChartTooltipContent className="bg-[#040405] p-3" hideLabel/>} />
                        <CartesianGrid className=""/>
                        <XAxis dataKey="name" className=""/>
                        <YAxis className="px-0 -pl-10" tickFormatter={(value) => priceFormatter(value, 2)}/>
                        <Legend 
                            align="left" 
                            content={<div className="flex items-center space-x-3 ml-5 py-9">
                                <div className="flex items-center space-x-2">
                                    <span className="h-4 w-4 bg-[#03DF19]"></span>
                                    <p className="">Inflow</p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="h-4 w-4 bg-[#1235A5]"></span>
                                    <p className="">Outflow</p>
                                </div>
                            </div>}
                        />
                        <Line type="monotone" dataKey="inflow" stroke="#03DF19" strokeWidth={"2px"} dot={false}/>
                        <Line type="monotone" dataKey="outflow" stroke="#1235A5" strokeWidth={"2px"} dot={false}/>

                        
                    </LineChart>
                </ChartContainer>
            </div>
        </>
    )
}

export default DashboardLineChart