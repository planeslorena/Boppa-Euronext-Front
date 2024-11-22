import Chart from "react-google-charts";
import "./lineChart.css";


export const LineChart = (props: any) => {
    const { datos }: { datos: any} = props;

    const options = {
        backgroundColor: 'transparent',
        width: 950,
        height: 500,
        curveType: "function",
        lineWidth: 4,
        pointSize: 7,
        legend: { position: "bottom" },
    };
    return (
        <div className="div-linechart rounded">
            <Chart
                chartType="LineChart"
                data={datos}
                options={options}
            />
        </div>
    )
}