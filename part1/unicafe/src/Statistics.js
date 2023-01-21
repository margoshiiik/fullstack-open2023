import { StatisticLine } from "./StatisticLine"

export const Statistics = ({good, neutral, bad}) =>{
    const all = good + neutral + bad
    const average = (good*1 + neutral*0 + bad*(-1))/(all)
    const positive = good*100/(all)

    if(all===0) {
        return (
            <h2>Feedback not given</h2>
        )
    }else{
        return (
        <div>
             <table>
                <tbody>
                <tr><StatisticLine text="good" value={good} /></tr>
                <tr><StatisticLine text="neutral" value={neutral} /></tr>
                <tr><StatisticLine text="bad" value={bad} /></tr>
                <tr><StatisticLine text="all" value={all} /></tr>
                <tr><StatisticLine text="average" value={average} /></tr>
                <tr><StatisticLine text="positive" value={positive+" %"} /></tr>
                </tbody>
                </table>
        </div>
        )
    }
}
export default Statistics;