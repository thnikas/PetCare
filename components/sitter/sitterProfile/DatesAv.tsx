import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps,pickersDayClasses } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { TextField } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { DayCalendar } from '@mui/x-date-pickers/internals';
import { ServiceDays } from '@/common.types';

type Props={
  daysA: number[]
}

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}


function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = dayjs();

function ServerDay(props: PickersDayProps<Dayjs> & { highlighteddays?: number[] }) {
  const { highlighteddays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected =
    !props.outsideCurrentMonth && highlighteddays.indexOf(props.day.date()) >= 0;
  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🦴' : undefined}
      
    >
      
      <PickersDay  
      className={isSelected?'bone':'bonedis'}
      style={isSelected?{backgroundColor:"#6171A3",borderRadius:'10%'}:{}}
      sx={{
      color:isSelected?'white':'black',
      
        [`&&.${pickersDayClasses.selected}`]: {
          backgroundColor: "#6171A3",

        }
      }} {...props} {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

 const DatesAv = ({daysA}:Props) =>{

  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlighteddays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();

    const year = date.year();
    const month = date.month() + 1; // Months are zero-indexed in JavaScript (0 - January, 1 - February, etc.)

    // Calculate the dates of all Mondays in the current month
    const daysInMonth = date.daysInMonth();
    const daysToHighlight = [] as number[];
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = dayjs(`${year}-${month}-${day}`).day();
      daysA.map((dayA,index)=>{
        if (dayOfWeek === dayA) {
          daysToHighlight.push(day);
        }
      })
      
    }

    setHighlightedDays(daysToHighlight);
    setIsLoading(false);

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}  >
      <h1 className='userH1 text-3xl text-center pt-4'>Availability</h1>
      <DateCalendar className=' w-[17.7rem]'
      readOnly={true}
      views={['day']}       
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton className=' w-[17.7rem]'/>}
        slots={{
          day: ServerDay,
        }}
        
        slotProps={{
          day: {
            highlighteddays,
          } as any,
        }}
      />
    </LocalizationProvider>
  );
}
export default DatesAv