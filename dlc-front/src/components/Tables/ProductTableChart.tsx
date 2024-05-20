import * as React from "react";
import { useState, useEffect } from "react";
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
  Checkbox,
  Modal,
  OptionsDropdown,
  MultiSelect,
  ActionIcon,
  Button,
  Select,
  Drawer,
  Space,
  Pagination,
} from "@mantine/core";
import "@mantine/dates/styles.css";
import { DateInput } from "@mantine/dates";

import { useSearchContext } from "../../contexts/SearchContext";
import { useBrandsObservations } from "../../contexts/BrandsObservationsContext";
import { ProductOrigins } from "../../routes/routes";
import SortIcon from "../icon/SortIcon/SortIcon";
import { deleteProducts } from "../../utils/Handlers/Handlers.tsx";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useCallback } from "react";
import ReloadTable from "../Reload/Reload.tsx";
import { paths } from "../../routes/paths.ts";

import ExportButton from "../../utils/downloadProducts";

// import { DayPicker, DateFormatter, DateRange } from "react-day-picker";
// import { format } from "date-fns";
// import { es } from "date-fns/locale";

const ProductTableChart = ({ columns, data, category }: any) => {
  const [tableData, setTableData] = React.useState({ nodes: data });
  const { categories } = useSearchContext();

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
      --data-table-library_grid-template-columns: 70px 100px 100px 100px 300px repeat(9, minmax(0, 1fr));
      margin: 16px 0px;
    `,
  };
  

  const theme = useTheme([mantineTheme, customTheme]);
  const handleUpdate = (value: any, id: any, property: any) => {
    setTableData((state) => ({
      ...state,
      nodes: state.nodes.map((node: any) => {
        if (node.id === id) {
          const updatedNode = { ...node, [property]: value };
          console.log("updatedNode", updatedNode);
          return updatedNode;
        } else {
          console.log("node", node);
          return node;
        }
      }),
    }));
  };

  const handleDelete = async () => {
    try {
      await toast.promise(deleteProducts(selectedCodigoInt), {
        pending: "Eliminando producto... 🕒",
        success: {
          render: "Producto eliminado correctamente! 🚮",
          autoClose: 1500,
          onClose: () => {
            setModalOpened(false);
          },
        },
        error: "Error al eliminar el producto, intenta nuevamente 🤯",
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  //* Pagination *//

  const pagination = usePagination(tableData, {
    state: {
      page: 0,
      size: 14,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action: any, state: any) {
    console.log(action, state);
    // pagination.fns.onSetPage(0);
  }

  //* Search *//

  const [search, setSearch] = React.useState("");

  useCustom("search", tableData, {
    state: { search },
    onChange: onSearchChange,
  });

  function onSearchChange(action: any, state: any) {
    console.log(action, state);
    // pagination.fns.onSetPage(0);
  }

  const [brandSearch, setBrandSearch] = React.useState("");
  useCustom("brandSearch", tableData, {
    state: { brandSearch },
    onChange: onBrandChange,
  });

  function onBrandChange(action: any, state: any) {
    console.log(action, state);
  }
  //* Filter *//

  const [isHide, setHide] = React.useState(false);

  useCustom("filter", tableData, {
    state: { isHide },
    onChange: onFilterChange,
  });

  function onFilterChange(action: any, state: any) {
    console.log(action, state);
    // pagination.fns.onSetPage(0);
  }

  //* Select *//

  const select = useRowSelect(tableData, {
    onChange: onSelectChange,
  });

  function onSelectChange(action: any, state: any) {
    console.log(action, state);
  }

  //* Tree *//

  const tree = useTree(
    tableData,
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
    tableData,
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
          array.sort((a, b) =>
            a.descripcion
              .toLowerCase()
              .localeCompare(b.descripcion.toLowerCase())
          ),
        ORIGEN: (array) =>
          array.sort((a, b) => a.origen.localeCompare(b.origen)),
        STOCK: (array) =>
          array.sort((a, b) =>
            a.stock && b.stock ? a.stock.localeCompare(b.stock) : 0
          ),
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
    const node = findNodeById(tableData.nodes, drawerId);
    const editedNode = { ...node, name: edited };
    const nodes = insertNode(tableData.nodes, editedNode);

    setTableData({
      nodes,
    });

    setEdited("");
    setDrawerId(null);
  };

  //* Custom Modifiers *//

  let modifiedNodes = tableData.nodes;

  // search

  modifiedNodes = modifiedNodes.filter(
    (node: any) =>
      node.descripcion?.toLowerCase().includes(search.toLowerCase()) ||
      node.SKU?.toLowerCase().includes(search.toLowerCase()) ||
      node.codigoInt?.toLowerCase().includes(search.toLowerCase()) ||
      node.rubro?.toLowerCase().includes(search.toLowerCase()) ||
      node.stock?.toString().toLowerCase().includes(search.toLowerCase()) ||
      node.origen?.toLowerCase().includes(search.toLowerCase()) ||
      node.user?.toLowerCase().includes(search.toLowerCase()) ||
      node.detalle?.toLowerCase().includes(search.toLowerCase()) ||
      node.marcasCompatibles?.includes(brandSearch.toLowerCase())
  );

  // filter
  modifiedNodes = isHide
    ? modifiedNodes.filter((node: any) => !node.check)
    : modifiedNodes;

  const [selectedCategory, setSelectedCategory] = React.useState("");
  if (selectedCategory) {
    modifiedNodes = modifiedNodes.filter((node: any) =>
      node.rubro.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }

  // // Hide columns
  const [hiddenColumns, setHiddenColumns] = React.useState([]);
  const toggleColumn = (selectedLabels) => {
    setHiddenColumns(selectedLabels);
  };

  columns = columns.map((column) => ({
    ...column,
    hide: hiddenColumns.includes(column.label),
  }));

  const [selectedCheck, setSelectedCheck] = React.useState(false);
  if (selectedCheck) {
    modifiedNodes = modifiedNodes.filter(
      (node: any) => node.check?.toLowerCase() === selectedCheck
    );
  }

  const [selectedOrigin, setSelectedOrigin] = React.useState("");
  if (selectedOrigin) {
    modifiedNodes = modifiedNodes.filter((node: any) =>
      node.origen.toLowerCase().includes(selectedOrigin.toLowerCase())
    );
  }

  const [selectedBrand, setSelectedBrand] = React.useState(false);
  if (selectedBrand) {
    modifiedNodes = modifiedNodes.filter((node: any) => {
      // Convierte el arreglo marcasCompatibles a una cadena
      const compatibleBrands = Array.isArray(node.marcasCompatibles)
        ? node.marcasCompatibles.join(" / ").toLowerCase()
        : (node.marcasCompatibles || "").toLowerCase();

      return compatibleBrands.includes(selectedBrand.toLowerCase());
    });
  }
  const [value, setValue] = React.useState<Date | null>(null);

  if (search) {
    modifiedNodes = modifiedNodes.filter(
      (node: any) =>
        node.descripcion?.toLowerCase().includes(search.toLowerCase()) ||
        node.codigoInt?.toLowerCase().includes(search.toLowerCase()) ||
        node.origen?.toLowerCase().includes(search.toLowerCase()) ||
        node.SKU?.toLowerCase().includes(search.toLowerCase())
      // Incluye aquí otras propiedades por las que quieras buscar
    );
  }

  const reload = useCallback(() => {
    window.location.reload();
  }, []);
  
  return (
    <>
      <Modal
        className="[&>div>section>header>h2]:!text-gray-900"
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={`¿Estás seguro de querer eliminar el producto ${selectedCodigoInt}?`}
      >
        <div className="flex flex-row gap-4">
          <Button
            className="bg-red-600 hover:bg-red-500 text-gray-100"
            onClick={() => handleDelete()}
          >
            Eliminar
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-500 text-gray-100"
            onClick={() => setModalOpened(false)}
          >
            Cancelar
          </Button>
        </div>
      </Modal>

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

      <Group>
        <TextInput
          classNames={{
            wrapper:
              "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
            input:
              "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500",
            section:
              "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 [&>button>svg]:text-current",
          }}
          placeholder="Búsqueda"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

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

        <Checkbox
          classNames={{ label: "font-semibold" }}
          label="Ocultar check"
          checked={selectedCheck}
          onChange={(event) => setSelectedCheck(event.currentTarget.checked)}
        />

        <ReloadTable path="/productos" />
        <ExportButton modifiedNodes={modifiedNodes}/>
      </Group>

      <div
        className=" [&>table]:border-gray-200  [&>table>thead>tr>*]:bg-gray-100 [&>table>thead>tr>*]:text-gray-900 [&>table>thead>tr>*]:border-gray-200 
                dark:[&>table]:border-gray-500 dark:[&>table>thead>tr>*]:bg-gray-700 dark:[&>table>thead>tr>*]:text-gray-100 dark:[&>table>thead>tr>*]:border-gray-500
                even:[&>table>tbody>tr>*]:bg-gray-50 odd:[&>table>tbody>tr>*]:bg-white [&>table>tbody>tr>*]:text-gray-900 
                dark:even:[&>table>tbody>tr>*]:bg-gray-800 dark:odd:[&>table>tbody>tr>*]:bg-gray-900 dark:[&>table>tbody>tr>*]:text-gray-100
                [&>table>tbody>tr>*]:border-gray-200 dark:[&>table>tbody>tr>*]:border-gray-500 first:[&>table>tbody>tr>td]:p-0 transition-colors duration-300"
      >
        <CompactTable
          className="transition-colors duration-300"
          columns={columns}
          data={{ ...tableData, nodes: modifiedNodes }}
          theme={theme}
          layout={{ custom: true }}
          select={select}
          tree={tree}
          sort={sort}
          pagination={pagination}
          onChange={(event) =>
            handleUpdate(event.target.value, tableData, "Descripción")
          }
        />
      </div>

      <Group>
        <Pagination
          total={pagination.state.getTotalPages(modifiedNodes)}
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
          rounded-full transition-colors duration-300 select-none
        "
        />
      </Group>

      <Drawer
        opened={drawerId}
        onClose={handleCancel}
        title="Edit"
        padding="xl"
        size="xl"
        position="right"
      >
        <Group grow>
          <TextInput
            label="Name"
            value={
              edited ||
              fromTreeToList(tableData.nodes).find(
                (node) => node.id === drawerId
              )?.name
            }
            onChange={handleEdit}
            data-autofocus
          />
        </Group>
        <Space h="md" />
        <Group grow>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </Group>
      </Drawer>
    </>
  );
};

export default ProductTableChart;
