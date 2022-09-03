import {Trace} from "../../Types/Trace";
import {Place} from "../../Types/Place";
import {DataTable} from 'react-native-paper'
import {mapRiskToCharacter} from "../../Types/PlaceMeta/PlaceRiskLevel";

interface PTTuple { trace:Trace,place:Place }
export function TraceTable(props:{traceList:Array<PTTuple>}){

    const data=props.traceList.map((data:PTTuple)=>{
        return <DataTable.Row>
            <DataTable.Cell>{mapRiskToCharacter(data.place.riskLevel)}</DataTable.Cell>
            <DataTable.Cell numeric>{data.place.province.name}</DataTable.Cell>
            <DataTable.Cell numeric>{data.place.city.name}</DataTable.Cell>
            <DataTable.Cell numeric>{data.place.district.name}</DataTable.Cell>
            <DataTable.Cell numeric>{data.place.subDistrict.name}</DataTable.Cell>
            <DataTable.Cell numeric>{new Date(data.trace.time.millis).toLocaleDateString()}</DataTable.Cell>
        </DataTable.Row>
    })
    return <DataTable>
        <DataTable.Header>
            <DataTable.Title sortDirection='descending'>
                风险
            </DataTable.Title>
            <DataTable.Title numeric>省</DataTable.Title>
            <DataTable.Title numeric>市</DataTable.Title>
            <DataTable.Title numeric>区</DataTable.Title>
            <DataTable.Title numeric>街道</DataTable.Title>
            <DataTable.Title numeric>时间</DataTable.Title>
        </DataTable.Header>
        {data}
    </DataTable>

}