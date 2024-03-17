import { useState, useEffect } from "react";

import { DayPicker, DateFormatter } from "react-day-picker";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import { useFilterValues } from "../../contexts/FilterContext";

export interface FilterConfig {
  key: string;
  label: string;
  type: "text" | "dropdown" | "dateRange";
  options?: Array<string>; // Solo necesario para los desplegables
  users?: Array<string>;
}

interface FiltroProps {
  filtersConfig: FilterConfig[];
}

const FiltroFloat: React.FC<FiltroProps> = ({ filtersConfig }) => {
  const {
    filterValues,
    setFilterValues,
    searchTerm,
    setSearchTerm,
    selectedDays,
    setSelectedDays,
  } = useFilterValues();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();

  const toggleDatePicker = () => {
    setShowDatePicker((prevState) => !prevState);
  };

  const handleSearchChange = (key: string, value: string) => {
    if (key === "globalSearch") {
      setSearchTerm(value);
    } else {
      setFilterValues((prevValues: any) => {
        console.log("hi");
        if (value) {
          return {
            ...prevValues,
            [key]: value,
          };
        } else {
          const { [key]: _, ...rest } = prevValues;
          return rest;
        }
      });
    }
  };

  useEffect(() => {
    console.log("Filter values changed", filterValues);
  }, [filterValues]);

  useEffect(() => {
    // This function will be called when the component unmounts
    return () => {
      setFilterValues({});
    };
  }, []);

  const inputSelectStyle =
    "border border-gray-500 bg-gray-700 text-white rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500";
  const dropdownStyle = `${inputSelectStyle} w-40 h-10`; // Ancho fijo de 10rem (40 tailwind units)

  const defaultOptionTexts = {
    observacion: "Observación",
    movimiento: "Tipo movimiento",
    user: "Usuario",
    marca: "Marca",
    origen: "Origen",
    rubro: "Rubro",
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

  const renderFilter = (filter: FilterConfig) => {
    switch (filter.type) {
      case "text":
        return (
          <div
            key={filter.key}
            className="flex flex-row gap-3 items-center mb-4"
          >
            <input
              type="text"
              placeholder={filter.label}
              value={
                filter.key === "globalSearch"
                  ? searchTerm
                  : filterValues[filter.key] || ""
              }
              onChange={(e) => handleSearchChange(filter.key, e.target.value)}
              className={`${inputSelectStyle}`}
            />
          </div>
        );
      case "dropdown":
        const defaultOptionText =
          defaultOptionTexts[filter.key as keyof typeof defaultOptionTexts] ||
          "Todas";

        return (
          <div key={filter.key} className="flex flex-row gap-3">
            <select
              className={dropdownStyle}
              onChange={(e) => handleSearchChange(filter.key, e.target.value)}
              value={filterValues[filter.key] || ""}
            >
              <option value="">{defaultOptionText}</option>
              {filter.options?.map((option, index) => (
                <option key={`${filter.key}-option-${index}`} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      case "dateRange":
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
                  startDate && handleSearchChange("fechaInicio", startDate);
                  endDate && handleSearchChange("fechaFin", endDate);
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

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row flex-wrap gap-3 p-2 text-white">
      {filtersConfig.map(renderFilter)}
    </div>
  );
};
export default FiltroFloat;
