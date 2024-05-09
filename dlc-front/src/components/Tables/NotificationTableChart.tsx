import * as React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { useCustom } from "@table-library/react-table-library/table";
import { useRowSelect } from "@table-library/react-table-library/select";
import {
  useTree,
  TreeExpandClickTypes,
} from "@table-library/react-table-library/tree";
import { useSort } from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";
import {
  fromTreeToList,
  findNodeById,
  insertNode,
} from "@table-library/react-table-library/common";
import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/mantine";
import {
  Group,
  TextInput,
  Select,
  Pagination,
} from "@mantine/core";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useSearchContext } from "../../contexts/SearchContext";
import { useBrandsObservations } from "../../contexts/BrandsObservationsContext";
import { ProductOrigins } from "../../routes/routes";
import SortIcon from "../icon/SortIcon/SortIcon";
import { useUser } from "../../contexts/UserContext.tsx";
import ReloadTable from "../Reload/Reload.tsx";
import { paths } from "../../routes/paths.ts";
import { DayPicker, DateFormatter, DateRange } from "react-day-picker";
import { useAuth } from "../../contexts/AuthContext";
import useRoleCheck from "../../hooks/useRoleCheck";
import { useState } from "react";





const NotificationTableChart = ({ columns, data, category }: any) => {
  const { categories } = useSearchContext();
  const { users } = useUser();
  const userNames = users?.map((user) => user.name);

  const { user } = useAuth();
  const isFactoryOperator = useRoleCheck(user?.role, ["Operador de fábrica"]);

  // Filter data based on user role and node.origen
  const filteredData = React.useMemo(() => {
    if (isFactoryOperator) {
      return data.filter((node: any) => node.origen !== "Importado");
    }
    return data;
  }, [data, isFactoryOperator]);

  const [errorData, setErrorData] = React.useState({ nodes: filteredData });

  // const [errorData, setErrorData] = React.useState({ nodes: data });
  const {
    brands,
    handleDeleteModal,
    modalOpened,
    setModalOpened,
    selectedCodigoInt,
  } = useBrandsObservations();

  const mantineTheme = getTheme({
    ...DEFAULT_OPTIONS,
    striped: true,
    highlightOnHover: true,
  });

  const customTheme = {
    Table: `
                --data-table-library_grid-template-columns:  120px repeat(9, minmax(0, 1fr));
          
                margin: 16px 0px;
                .animate {
                  grid-column: 1 / -1;
                  display: flex;
                }
            
                .animate > div {
                  flex: 1;
                  display: flex;
                }
              `,
  };

  const theme = useTheme([mantineTheme, customTheme]);

  const handleUpdate = (value: any, id: any, property: any) => {
    setErrorData((state) => ({
      ...state,
      nodes: state.nodes.map((node: any) => {
        if (node.id === id) {
          const updatedNode = { ...node, [property]: value };
          return updatedNode;
        } else {
          return node;
        }
      }),
    }));
  };

  //* Pagination *//

  const pagination = usePagination(errorData, {
    state: {
      page: 0,
      size: 13,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action: any, state: any) {
    console.log(action, state);
  }

  //* Search *//

  const [search, setSearch] = React.useState("");

  useCustom("search", errorData, {
    state: { search },
    onChange: onSearchChange,
  });

  function onSearchChange(action: any, state: any) {
    console.log(action, state);
  }

  const [detailSearch, setDetailSearch] = React.useState("");
  useCustom("det", errorData, {
    state: { detailSearch },
    onChange: onSearchDetail,
  });

  function onSearchDetail(action: any, state: any) {
    console.log(action, state);
    pagination.fns.onSetPage(0);
  }

  const [codeSearch, setCodeSearch] = React.useState("");
  useCustom("codInterno", errorData, {
    state: { codeSearch },
    onChange: onSearchCode,
  });
  function onSearchCode(action: any, state: any) {
    console.log(action, state);
    pagination.fns.onSetPage(0);
  }

  const [brandSearch, setBrandSearch] = React.useState("");
  useCustom("brandSearch", errorData, {
    state: { brandSearch },
    onChange: onBrandChange,
  });

  function onBrandChange(action: any, state: any) {
    console.log(action, state);
  }
  //* Filter *//

  //* Filter *//

  const [isHide, setHide] = React.useState(false);

  useCustom("filter", errorData, {
    state: { isHide },
    onChange: onFilterChange,
  });

  function onFilterChange(action: any, state: any) {
    console.log(action, state);
    pagination.fns.onSetPage(0);
  }

  //* Select *//

  const select = useRowSelect(errorData, {
    onChange: onSelectChange,
  });

  function onSelectChange(action: any, state: any) {
    console.log(action, state);
  }

  //* Tree *//

  const tree = useTree(
    errorData,
    {
      onChange: onTreeChange,
    },
    {
      clickType: TreeExpandClickTypes.ButtonClick,
      treeYLevel: 1,
      treeIcon: {
        margin: "2px",
        iconDefault: null,
        //  iconRight: <FaChevronRight />,
        //  iconDown: <FaChevronDown />,
      },
    }
  );

  function onTreeChange(action: any, state: any) {
    console.log(action, state);
  }

  //* Sort *//

  const sort = useSort(
    errorData,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: <SortIcon />,
        iconUp: <SortIcon className="rotate-180" />,
        iconDown: <SortIcon />,
      },
      sortFns: {
        SKU: (array) => array.sort((a, b) => a.SKU.localeCompare(b.SKU)),
        DESCRIPCION: (array) =>
          array.sort((a, b) => a.descripcion - b.descripcion),
        ORIGEN: (array) =>
          array.sort((a, b) => a.origen.localeCompare(b.origen)),
        DEVOLUCIONES: (array) =>
          array.sort((a, b) =>
            a.contadorDevoluciones.localeCompare(b.contadorDevoluciones)
          ),
        STOCK: (array) => array.sort((a, b) => a.stock.localeCompare(b.stock)),
        RUBRO: (array) => array.sort((a, b) => a.rubro.localeCompare(b.rubro)),
      },
    }
  );

  function onSortChange(action: any, state: any) {
    console.log(action, state);
  }

  //* Drawer *//

  const [drawerId, setDrawerId] = React.useState(null);
  const [edited, setEdited] = React.useState("");

  const handleEdit = (event: any) => {
    setEdited(event.target.value);
  };

  const handleCancel = () => {
    setEdited("");
    setDrawerId(null);
  };

  const handleSave = () => {
    const node = findNodeById(errorData.nodes, drawerId);
    const editedNode = { ...node, name: edited };
    const nodes = insertNode(errorData.nodes, editedNode);

    setErrorData({
      nodes,
    });

    setEdited("");
    setDrawerId(null);
  };

  //* Custom Modifiers *//

  let errorNodes = errorData.nodes;

  // search

  errorNodes = errorNodes.filter(
    (node: any) =>
      node.name?.toLowerCase().includes(search.toLowerCase()) ||
      node.codInterno?.toLowerCase().includes(search.toLowerCase()) ||
      node.rubro?.toLowerCase().includes(search.toLowerCase()) ||
      node.origen?.toLowerCase().includes(search.toLowerCase()) ||
      node.marcasCompatibles?.includes(search.toLowerCase()) ||
      node.image?.includes(search.toLowerCase()) || 
      node.oem?.includes(search.toLowerCase())
  );

  const [selectedCategory, setSelectedCategory] = React.useState("");
  if (selectedCategory) {
    errorNodes = errorNodes.filter((node: any) =>
      node.rubro.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }

  // // Hide columns

  columns = columns.map((column) => ({
    ...column,
  }));

  const [selectedOrigin, setSelectedOrigin] = React.useState("");
  if (selectedOrigin) {
    errorNodes = errorNodes.filter((node: any) =>
      node.origen?.toLowerCase().includes(selectedOrigin.toLowerCase())
    );
  }

  const [selectedBrand, setSelectedBrand] = React.useState(false);
  if (selectedBrand) {
    errorNodes = errorNodes.filter((node: any) => {
      // Convierte el arreglo marcasCompatibles a una cadena
      const compatibleBrands = Array.isArray(node.marca)
        ? node.marca.join(" / ").toLowerCase()
        : (node.marca || "").toLowerCase();

      return compatibleBrands.includes(selectedBrand.toLowerCase());
    });
  }

  if (search) {
    errorNodes = errorNodes.filter(
      (node: any) =>
        node.name?.toLowerCase().includes(search.toLowerCase()) || 
        node.oem?.toLowerCase().includes(search.toLowerCase())
      // Incluye aquí otras propiedades por las que quieras buscar
    );
  }

  const [selectedDays, setSelectedDays] = useState<DateRange | undefined>();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();

  if (startDate && endDate) {
    errorNodes = errorNodes.filter((node: any) => {
      if (!node.fecha) {
        return false;
      }

      const [date, time] = node.fecha.split(", ");
      const [nodeDay, nodeMonth, nodeYear] = date.split("/").map(Number);

      const nodeDate = new Date(nodeYear, nodeMonth - 1, nodeDay);
      nodeDate.setHours(0, 0, 0, 0);

      const [startDay, startMonth, startYear] = startDate
        .split("-")
        .map(Number);
      const start = new Date(startYear + 2000, startMonth - 1, startDay);
      start.setHours(0, 0, 0, 0);

      const [endDay, endMonth, endYear] = endDate.split("-").map(Number);
      const end = new Date(endYear + 2000, endMonth - 1, endDay);
      end.setHours(0, 0, 0, 0);

      return nodeDate >= start && nodeDate <= end;
    });
  }

  const inputSelectStyle =
    "border border-gray-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500";
  const dropdownStyle = `${inputSelectStyle} w-40 h-10`;

  const toggleDatePicker = () => {
    setShowDatePicker((prevState) => !prevState);
  };

  let footer = <p className="text-white">Elegí el primer día.</p>;
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
    return `${parseInt(day) + 1}-${month}-${year}`;
  };

  const [selectedOEM, setSelectedOEM] = React.useState("");
  if (selectedOEM) {
    errorNodes = errorNodes.filter((node: any) =>
      node.OEM.toLowerCase().includes(selectedOEM.toLowerCase())
    );
  }


  return (
    <>
      <Group>
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
                    "h-6 w-6 bg-transparent hover:bg-blue-600 p-1 rounded-full transition-colors duration-300",
                  nav_button_previous: "text-white absolute left-2",
                  nav_button_next: "text-white absolute right-2",
                  table: "w-full border-collapse",
                  head_row: "flex font-gotham text-green-400",
                  head_cell: "mx-0.5 w-7 font-gotham text-sm",
                  row: "flex w-full",
                  cell: "text-gray-300 rounded-full h-7 w-7 text-center text-sm p-0 mx-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-full [&:has([aria-selected].day-outside)]:bg-gray-700/30 [&:has([aria-selected].day-outside)]:text-gray-300 [&:has([aria-selected])]:bg-blue-600/70 first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full focus-within:relative focus-within:z-20",
                  day: "h-7 w-7 p-0 font-gotham font-bold text-white hover:text-blue-300",
                  day_range_end: "day-range-end",
                  day_today: "rounded-full bg-green-600 text-white",
                  day_outside: "day-outside text-gray-400 opacity-50",
                  day_disabled: "text-gray-600 opacity-50",
                  day_hidden: "invisible",
                }}
              />
            )}
          </div>
        {category ? (
          <Select
            value={category || null}
            classNames={{
              wrapper:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              input:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              section:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 [&>button>svg]:text-current",
              dropdown:
                "!bg-white dark:!bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              options: "bg-white dark:bg-gray-700",
              option:
                "hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100",
            }}
            onChange={(event) => {
              setSelectedCategory(event);
            }}
            placeholder="Rubro"
            data={categories}
            clearable
          />
        ) : (
          <Select
            classNames={{
              wrapper:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              input:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              section:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 [&>button>svg]:text-current",
              dropdown:
                "!bg-white dark:!bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              options: "bg-white dark:bg-gray-700",
              option:
                "hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100",
            }}
            onChange={(event) => {
              setSelectedCategory(event);
            }}
            placeholder="Rubro"
            data={categories}
            clearable
          />
        )}

<TextInput
            classNames={{
              wrapper:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              input:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              section:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 [&>button>svg]:text-current",
            }}
            placeholder="Codigo Interno"
            value={codeSearch}
            onChange={(event) => setCodeSearch(event.target.value)}
          />

<TextInput
            classNames={{
              wrapper:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              input:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              section:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 [&>button>svg]:text-current",
            }}
            placeholder="OEM"
            value={search}
            onChange={(event) => setSelectedOEM(event.target.value)}
          />

        <Select
          classNames={{
            wrapper:
              "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
            input:
              "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
            section:
              "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 [&>button>svg]:text-current",
            dropdown:
              "!bg-white dark:!bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
            options: "bg-white dark:bg-gray-700",
            option:
              "hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100",
          }}
          onChange={(event) => {
            setSelectedOrigin(event);
          }}
          placeholder="Origen"
          data={ProductOrigins}
          clearable
        />

        <Select
          // value={search}
          classNames={{
            wrapper:
              "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
            input:
              "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
            section:
              "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 [&>button>svg]:text-current",
            dropdown:
              "!bg-white dark:!bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
            options: "bg-white dark:bg-gray-700",
            option:
              "hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100",
          }}
          onChange={(event) => {
            setSelectedBrand(event);
          }}
          placeholder="Marcas"
          data={brands}
          clearable
        />

          <TextInput
            placeholder="Búsqueda"
            value={search}
            classNames={{
              wrapper:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              input:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              section:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 [&>button>svg]:text-current",
            }}
            onChange={(event) => setSearch(event.target.value)}
          />


        <ReloadTable path={paths.notifications} />
      </Group>

      <div
        className=" [&>table]:border-gray-200 [&>table>thead>tr>*]:bg-gray-100 [&>table>thead>tr>*]:text-gray-900 [&>table>thead>tr>*]:border-gray-200 
                dark:[&>table]:border-gray-500 dark:[&>table>thead>tr>*]:bg-gray-700 dark:[&>table>thead>tr>*]:text-gray-100 dark:[&>table>thead>tr>*]:border-gray-500
                even:[&>table>tbody>tr>*]:bg-gray-50 odd:[&>table>tbody>tr>*]:bg-white [&>table>tbody>tr>*]:text-gray-900 
                dark:even:[&>table>tbody>tr>*]:bg-gray-800 dark:odd:[&>table>tbody>tr>*]:bg-gray-900 dark:[&>table>tbody>tr>*]:text-gray-100
                [&>table>tbody>tr>*]:border-gray-200 dark:[&>table>tbody>tr>*]:border-gray-500 first:[&>table>tbody>tr>td]:p-0 transition-colors duration-300"
      >
        <CompactTable
          columns={columns}
          data={{ ...errorData, nodes: errorNodes }}
          theme={theme}
          layout={{ custom: true }}
          select={select}
          tree={tree}
          sort={sort}
          pagination={pagination}
          onChange={(event) =>
            handleUpdate(event.target.value, errorData, "Descripción")
          }
        />
      </div>
      <Group position="right" mx={10}>

      <Pagination
        total={pagination.state.getTotalPages(errorNodes)}
        page={pagination.state.page + 1}
        onChange={(page) => pagination.fns.onSetPage(page - 1)}
        className="
          [&>div>*]:bg-gray-200 dark:[&>div>*]:bg-gray-700
          [&>div>*]:text-gray-800 dark:[&>div>*]:text-gray-200
          [&>div>*]:border border-gray-300 dark:border-gray-600
          hover:[&>div>*]:bg-blue-500 dark:hover:[&>div>*]:bg-blue-700
          hover:[&>div>*]:text-white
          [&>div>.active]:bg-blue-600 dark:[&>div>.active]:bg-blue-800
          [&>div>.active]:text-white
          rounded-full
        "
      />
      </Group>

    </>
  );
};

export default NotificationTableChart;
