import { shortInternationalTime } from '@sungryeol/lib';
import { useEffect, useState } from 'react';

interface IPrintDateProps {
  value: string;
  render: (stringDate: string) => JSX.Element;
}
const PrintDate: React.FC<IPrintDateProps> = ({ value, render }) => {
  const [date, setDate] = useState(value);
  useEffect(() => {
    setDate(shortInternationalTime(new Date(value)));
  }, [value]);
  return render(date);
};

export default PrintDate;
