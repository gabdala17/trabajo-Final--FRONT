import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { filterByAdmin, clearTodo} from '../../Redux-actions';
import { useSelector, useDispatch } from 'react-redux';

// Generate Sales Data


export default function Chart() {

  const dispatch = useDispatch();
  const dataGraffic= useSelector(state=> state.users)
 console.log(dataGraffic, "soy data graffic");


useEffect(() => {
  
dispatch(filterByAdmin({grafic:"allAppoinments"}))
return () => {
  dispatch(clearTodo())
}
 
}, [dispatch])

  function createData(time, amount) {
    return { time, amount };
  }
  
  const data = dataGraffic?.map(el=> createData(el.mes, el.totalPrice))
  const theme = useTheme();
  console.log(data)

  return (
    <React.Fragment>
      
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}