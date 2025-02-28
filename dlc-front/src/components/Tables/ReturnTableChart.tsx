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
  findNodeById,
  insertNode,
} from "@table-library/react-table-library/common";
import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/mantine";
import { Group, TextInput, Select, Pagination, MultiSelect } from "@mantine/core";
import { useSearchContext } from "../../contexts/SearchContext";
import { useBrandsObservations } from "../../contexts/BrandsObservationsContext";
import SortIcon from "../icon/SortIcon/SortIcon";
import { useUser } from "../../contexts/UserContext.tsx";
import { paths } from "../../routes/paths.ts";
import ReloadTable from "../Reload/Reload.tsx";
import { ProductOrigins } from "../../routes/routes.tsx";
DEFAULT_OPTIONS.highlightOnHover = true;
DEFAULT_OPTIONS.striped = true;

const ReturnTableChart = ({ columns, data, category }: any) => {
  const [errorData, setErrorData] = React.useState({ nodes: data });
  const { categories } = useSearchContext();
  const { users } = useUser();
  const userNames = users.map((user) => user.name);
  const { brands } = useBrandsObservations();

  const mantineTheme = getTheme({
    ...DEFAULT_OPTIONS,
    striped: true,
    highlightOnHover: true,
  });

  const customTheme = {
    Table: `
    --data-table-library_grid-template-columns:  120px repeat(13, minmax(0, 1fr));

    margin: 16px 0px;
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
      size: 12,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action: any, state: any) {
    console.log(action, state);
    pagination.fns.onSetPage(0);
  }

  //* Search *//

  const [search, setSearch] = React.useState("");

  useCustom("search", errorData, {
    state: { search },
    onChange: onSearchChange,
  });

  function onSearchChange(action: any, state: any) {
    console.log(action, state);
    pagination.fns.onSetPage(0);
  }

  const [observation, setObservation] = React.useState("");
  useCustom("det", errorData, {
    state: { observation },
    onChange: onObsDetail,
  });

  function onObsDetail(action: any, state: any) {
    console.log(action, state);
    pagination.fns.onSetPage(0);
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
      node.fecha?.toLowerCase().includes(detailSearch.toLowerCase()) ||
      node.detalle?.toLowerCase().includes(detailSearch.toLowerCase()) ||
      node.codInterno?.toLowerCase().includes(codeSearch.toLowerCase()) ||
      node.codInterno?.toLowerCase().includes(search.toLowerCase()) ||
      node.estado?.toLowerCase().includes(search.toLowerCase()) ||
      node.estado?.toLowerCase().includes(detailSearch.toLowerCase()) ||
      node.descripcion?.toLowerCase().includes(search.toLowerCase()) ||
      node.codOEM?.toLowerCase().includes(search.toLowerCase()) ||
      node.desc?.toLowerCase().includes(search.toLowerCase())
  );
  // // Hide columns
  // // Hide columns
  const [hiddenColumns, setHiddenColumns] = React.useState([]);
  const toggleColumn = (selectedLabels) => {
    setHiddenColumns(selectedLabels);
  };

  columns = columns.map((column) => ({
    ...column,
    hide: hiddenColumns.includes(column.label),
  }));
  
  const [selectedDetail, setSelectedDetail] = React.useState(false);
  if (selectedDetail) {
    errorNodes = errorNodes.filter(
      (node: any) => node.det?.toLowerCase() === ""
    );
  }

  if (observation) {
    errorNodes = errorNodes.filter((node: any) =>
      node.observaciones?.toLowerCase().includes(observation.toLowerCase())
    );
  }

  const [selectedCode, setSelectedCode] = React.useState(false);
  if (selectedCode) {
    errorNodes = errorNodes.filter((node: any) =>
      node.codInterno?.toLowerCase().includes(codeSearch.toLowerCase())
    );
  }

  const [selectedOrigin, setSelectedOrigin] = React.useState("");
  if (selectedOrigin) {
    errorNodes = errorNodes.filter((node: any) =>
      node.origen?.toLowerCase().includes(selectedOrigin.toLowerCase())
    );
  }

  const [selectedBrand, setSelectedBrand] = React.useState("");
  if (selectedBrand) {
    errorNodes = errorNodes.filter((node: any) =>
      node.marcasCompatibles
        ?.toLowerCase()
        .includes(selectedBrand.toLowerCase())
    );
  }

  const [selectedUser, setSelectedUser] = React.useState("");
  if (selectedUser) {
    errorNodes = errorNodes.filter((node: any) =>
      node.user?.toLowerCase().includes(selectedUser.toLowerCase())
    );
  }

  const [selectedCategory, setSelectedCategory] = React.useState("");
  if (selectedCategory) {
    errorNodes = errorNodes.filter((node: any) =>
      node.rubro.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }

  if (search) {
    errorNodes = errorNodes.filter(
      (node: any) =>
        node.desc?.toLowerCase().includes(search.toLowerCase()) ||
        node.codInterno?.toLowerCase().includes(search.toLowerCase()) ||
        node.codOEM?.toLowerCase().includes(search.toLowerCase()) ||
        node.det?.toLowerCase().includes(search.toLowerCase())
      // Incluye aquí otras propiedades por las que quieras buscar
    );
  }

  return (
    <>
    <div className="pb-4 transition-colors duration-300">
        <MultiSelect
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
          data={columns.map((column) => column.label)}
          value={hiddenColumns}
          onChange={toggleColumn}
          label=""
          placeholder="Ocultar columnas..."
        />
      </div>
      <div className="pt-4">
        <Group>
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

          <Select
            onChange={(event) => {
              setSelectedUser(event);
            }}
            placeholder="Usuario"
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
            data={userNames}
            clearable
          />

          <TextInput
            placeholder="Observaciones"
            value={observation}
            classNames={{
              wrapper:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              input:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
              section:
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 [&>button>svg]:text-current",
            }}
            onChange={(event) => setObservation(event.target.value)}
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

          <ReloadTable path={paths.historyView} />
        </Group>
      </div>

      <div
        className=" [&>table]:border-gray-200 [&>table>thead>tr>*]:bg-gray-100 [&>table>thead>tr>*]:text-gray-900 [&>table>thead>tr>*]:border-gray-200 
                dark:[&>table]:border-gray-500 dark:[&>table>thead>tr>*]:bg-gray-700 dark:[&>table>thead>tr>*]:text-gray-100 dark:[&>table>thead>tr>*]:border-gray-500
                even:[&>table>tbody>tr>*]:bg-gray-50 odd:[&>table>tbody>tr>*]:bg-white [&>table>tbody>tr>*]:text-gray-900 
                dark:even:[&>table>tbody>tr>*]:bg-gray-800 dark:odd:[&>table>tbody>tr>*]:bg-gray-900 dark:[&>table>tbody>tr>*]:text-gray-100
                [&>table>tbody>tr>*]:border-gray-200 dark:[&>table>tbody>tr>*]:border-gray-500 first:[&>table>tbody>tr>td]:p-0"
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
          rounded-full select-none
        "
        />
      </Group>
    </>
  );
};

export default ReturnTableChart;
