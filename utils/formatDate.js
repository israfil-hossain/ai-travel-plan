import { format, parse } from 'date-fns';

export function formatDate(inputDate) {
    if(!inputDate) return; 
    // Parse the input date in the format yy-MM-dd
    const parsedDate = parse(inputDate, 'yy-MM-dd', new Date());
  
    // Format the parsed date to yy-MMM-dd
    return format(parsedDate, 'yy-MMM-dd');
  }