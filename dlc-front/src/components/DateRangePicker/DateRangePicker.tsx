import { DayPicker, DateFormatter, DateRange } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

interface DateRangePickerProps {
  handleDateChange: (startDate: string | undefined, endDate: string | undefined) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ handleDateChange }) => {
  const [selectedDays, setSelectedDays] = useState<DateRange | undefined>();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();

  const inputSelectStyle =
    "border border-gray-500 bg-gray-700 text-white rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500";
  const dropdownStyle = `${inputSelectStyle} w-40 h-10`;

  const toggleDatePicker = () => {
    setShowDatePicker((prevState) => !prevState);
  };

  let footer = <p>Elegí el primer día.</p>;
  if (selectedDays?.from) {
    if (!selectedDays.to) {
      footer = <p>{format(selectedDays.from, "PPP", { locale: es })}</p>;
    } else if (selectedDays.to) {
      footer = (
        <p>
          {format(selectedDays.from, "PPP", { locale: es })} a
          <br />
          {format(selectedDays.to, "PPP", { locale: es })}
        </p>
      );
    }
  }

  const formatDay: DateFormatter = (day) => format(day, "d", { locale: es });

  const formatCaption: DateFormatter = (date, options) => {
    const y = date.getFullYear();
    const m = format(date, "LLLL", { locale: options?.locale });
    return `${m} ${y}`.toUpperCase();
  };

  const formatWeekdayName: (day: Date, options?: { locale?: any }) => string = (
    day,
    options
  ) => {
    return format(day, "EEEEE", { locale: options?.locale }).toUpperCase();
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return undefined;
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    console.log(day);
    return `${parseInt(day) + 1}-${month}-${year}`;
  };

  return (
    <div className="relative">
    <button className={dropdownStyle} onClick={toggleDatePicker}>
      {startDate && endDate
        ? `${startDate} a ${endDate}`
        : "Rango de fechas"}
    </button>
    {showDatePicker && (
      <DayPicker
        selected={selectedDays}
        onSelect={(selectedDays) => {
          setSelectedDays(selectedDays);
          const startDate = selectedDays?.from
            ?.toISOString()
            .slice(0, 10);
          const endDate = selectedDays?.to?.toISOString().slice(0, 10);
          setStartDate(formatDate(startDate));
          setEndDate(formatDate(endDate));
          // startDate && handleSearchChange("fechaInicio", startDate);
          // endDate && handleSearchChange("fechaFin", endDate);
        }}
        mode="range"
        locale={es}
        formatters={{ formatDay, formatCaption, formatWeekdayName }}
        footer={footer}
        className="absolute z-10 bg-gray-700 p-2 rounded-md shadow-lg mt-2"
        classNames={{
          caption:
            "font-gotham flex justify-center relative items-center py-1",
          caption_label: "text-base font-bold text-gray-100",
          nav: "flex items-center",
          nav_button:
            "h-6 w-6 bg-transparent hover:bg-blue-50 p-1 rounded-full transition-colors duration-300",
          nav_button_previous: "text-white absolute left-2",
          nav_button_next: "text-white absolute right-2",
          table: "w-full border-collapse",
          head_row: "flex font-gotham text-blue-500",
          head_cell: "mx-0.5 w-7 font-gotham text-sm",
          row: "flex w-full",
          cell: "text-gray-600 rounded-full h-7 w-7 text-center text-sm p-0 mx-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-full [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-blue-700/50 first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full focus-within:relative focus-within:z-20",
          day: "h-7 w-7 p-0 font-gotham font-bold text-white hover:text-blue-300",
          day_range_end: "day-range-end",
          day_today: "rounded-full bg-blue-800 text-gray-900",
          day_outside:
            "day-outside text-gray-500 opacity-50 aria-selected:bg-zona-light-purple/50 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
          day_disabled: "text-gray-500 opacity-50",
          day_hidden: "invisible",
        }}
      />
    )}
  </div>
  );
};

export default DateRangePicker;