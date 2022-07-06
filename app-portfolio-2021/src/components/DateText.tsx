import { shortInternationalTime } from '@sungryeol/lib';
import { useEffect, useState } from 'react';

interface IDateTextProps {
  value: string;
  render: (stringDate: string) => JSX.Element;
}
const DateText: React.FC<IDateTextProps> = ({ value, render }) => {
  const [date, setDate] = useState(value);
  useEffect(() => {
    setDate(shortInternationalTime(new Date(value)));
  }, [value]);
  return render(date);
};

export default DateText;
