import * as React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { useCustom } from "@table-library/react-table-library/table";
import { useRowSelect } from "@table-library/react-table-library/select";
import { useState } from "react";
import useRoleCheck from "../../hooks/useRoleCheck.tsx";
import { useAuth } from "../../contexts/AuthContext.tsx";
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
  Collapse,
  Drawer,
  Space,
  Pagination,
} from "@mantine/core";
import { useSearchContext } from "../../contexts/SearchContext";
import { useBrandsObservations } from "../../contexts/BrandsObservationsContext";
import SortIcon from "../icon/SortIcon/SortIcon";
import { useUser } from "../../contexts/UserContext.tsx";
import ReloadTable from "../Reload/Reload.tsx";
import { paths } from "../../routes/paths.ts";
import { useEffect } from "react";
import {
  fetchCosts,
  modifyCosts,
  createCosts,
} from "../../utils/Handlers/Handlers.tsx";

import CostForm from "../CostForm/CostForm.tsx";

const ImportedTableChart = ({ columns, data, category }: any) => {
  const [errorData, setErrorData] = React.useState({ nodes: data });
  const { categories } = useSearchContext();
  const { users } = useUser();
  const userNames = users?.map((user) => user.name);
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
    --data-table-library_grid-template-columns:  500px repeat(6, minmax(0, 1fr));
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
          console.log(updatedNode);
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
      size: 15,
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
    // pagination.fns.onSetPage(0);
  }

  const [detailSearch, setDetailSearch] = React.useState("");
  useCustom("det", errorData, {
    state: { detailSearch },
    onChange: onSearchDetail,
  });

  function onSearchDetail(action: any, state: any) {
    console.log(action, state);
    // pagination.fns.onSetPage(0);
  }

  const [codeSearch, setCodeSearch] = React.useState("");
  useCustom("codInterno", errorData, {
    state: { codeSearch },
    onChange: onSearchCode,
  });
  function onSearchCode(action: any, state: any) {
    console.log(action, state);
    // pagination.fns.onSetPage(0);
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

  const [isHide, setHide] = React.useState(false);

  useCustom("filter", errorData, {
    state: { isHide },
    onChange: onFilterChange,
  });

  function onFilterChange(action: any, state: any) {
    console.log(action, state);
    // pagination.fns.onSetPage(0);
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

  // // Hide columns
  const [hiddenColumns, setHiddenColumns] = React.useState([]);

  columns = columns.map((column) => ({
    ...column,
    hide: hiddenColumns.includes(column.label),
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
      const compatibleBrands = Array.isArray(node.marcasCompatibles)
        ? node.marcasCompatibles.join(" / ").toLowerCase()
        : (node.marcasCompatibles || "").toLowerCase();

      return compatibleBrands.includes(selectedBrand.toLowerCase());
    });
  }

  const [selectedCategory, setSelectedCategory] = React.useState("");
  if (selectedCategory) {
    errorNodes = errorNodes.filter((node: any) =>
      node.rubro?.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }

  if (search) {
    errorNodes = errorNodes.filter(
      (node: any) =>
        node.descripcion?.toLowerCase().includes(search.toLowerCase())
      // Incluye aquí otras propiedades por las que quieras buscar
    );
  }

  const [ids, setIds] = React.useState([]);

  const handleExpand = (item) => {
    if (ids.includes(item.id)) {
      setIds(ids.filter((id) => id !== item.id));
    } else {
      setIds(ids.concat(item.id));
    }
  };

  const rowProps = {
    onClick: handleExpand,
  };

  const [costs, setCosts] = React.useState([]);

  useEffect(() => {
    const getCost = async () => {
      const response = await fetchCosts();
      console.log(response.payload);
      setCosts(response.payload);
    };

    getCost();
  }, []);

  {
    /* Si hay costo, lo muestro, y tambien botoncito para agregar otro o editar/borrar */
  }

  {
    /* Cada producto tiene sus proveedores en un array, por ejemplo: */
  }
  {
    /*
                
                producto1.proveedores =
                [
                  {
                    nombre: YAOPEI
                    origen: importado
                    valor: 5,70
                  },
                  {
                    nombre: WANCHUNKEIN
                    origen: nacional
                    valor: 15,00
                  },
                ]
                
                */
  }

  const [activeItemCode, setActiveItemCode] = React.useState(null);
  const [providerName, setProviderName] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [origin, setOrigin] = React.useState("Nacional");
  const [editingCost, setEditingCost] = React.useState(null);

  // For deletion purposes
  const [costFoundToFilter, setCostFoundToFilter] = React.useState(null);
  const [deletingCost, setDeletingCost] = React.useState(null);

  // For new cost purposes
  const [newCostItem, setNewCostItem] = React.useState(null);

  useEffect(() => {
    console.log(activeItemCode);
  }, [activeItemCode]);

  useEffect(() => {
    console.log(origin);
  }, [origin]);

  const handleAddCost = (e: any, costFound: any) => {
    e.preventDefault();
    console.log("add");
    console.log({ providerName, cost, origin, activeItemCode });

    costFound = costFound || {};
    console.log(costFound);

    const newCost = {
      nombre: providerName,
      origen: origin || "Nacional",
      valor: cost,
    };
    console.log("new cost", newCost);

    let newCosts;

    if (costFound.proveedores) {
      // Parse the string into an array
      const parsedProveedores = JSON.parse(costFound.proveedores);
      console.log("parsedProveedores", parsedProveedores);

      // Scenario 1: costFound.proveedores already exists, so append newCost to it
      console.log("Scenario 1");
      newCosts = {
        id: activeItemCode,
        ...costFound,
        proveedores: [...parsedProveedores, newCost],
      };
      // ! ACÁ UPDATEAS CON EL HANDLER DE MODIFYCOSTS
      modifyCosts(newCosts);
    } else {
      // Scenario 2: costFound.proveedores doesn't exist, so create a new array with newCost as its first element
      const itemData = {
        descripcion: newCostItem?.descripcion,
        codigo: newCostItem?.codigoInt,
        marca: newCostItem?.marca,
        stock: newCostItem?.stock,
        rubro: newCostItem?.rubro,
        sku: newCostItem?.SKU,
      };
      console.log("Scenario 2");
      newCosts = { ...itemData, proveedores: [newCost] };
      createCosts(newCosts);
      setNewCostItem(null);
    }

    // Reset form
    setProviderName("");
    setCost("");
    setOrigin("");
  };

  const handleEditCost = (e: any, costFound: any) => {
    const { user } = useAuth();

    const isOperator = useRoleCheck(user?.role, ["Operador de Fábrica"]);

    return (
      <>
        {!isOperator && e.origen != 'Fabrica' ? (
          () => {
            e.preventDefault();
            console.log("edit");

            costFound = costFound || {};
            console.log(costFound);

            // Create newCost
            const newCost = {
              nombre: providerName,
              valor: cost,
              origen: origin,
            };

            // Parse the string into an array
            const parsedProveedores = JSON.parse(costFound.proveedores);

            // Find the index of the cost being edited
            const costIndex = parsedProveedores.findIndex(
              (cost: any) => cost.nombre === editingCost?.nombre
            );

            // Replace the cost at costIndex with newCost
            parsedProveedores[costIndex] = newCost;

            // Update costFound.proveedores with the modified array
            const updatedCosts = {
              id: activeItemCode,
              ...costFound,
              proveedores: parsedProveedores,
            };

            // Update the costs state with updatedCosts
            console.log(updatedCosts);
            modifyCosts(updatedCosts);

            // Reset the form and editingCost
            setProviderName("");
            setCost("");
            setOrigin("");
            setEditingCost(null);
          }
        ) : (
          <p className="text-center text-white">-</p>
        )}
      </>
    );
  };

  const handleDeleteCost = (costToDelete: any, costFound: any) => {
    console.log("delete");
    // Parse the string into an array
    const parsedProveedores = JSON.parse(costFound.proveedores);

    // Filter out the cost to delete
    const updatedProveedores = parsedProveedores.filter(
      (cost: any) => cost.nombre !== costToDelete.nombre
    );

    // Update costFound.proveedores with the modified array
    const updatedCosts = {
      id: costFound.codigo,
      ...costFound,
      proveedores: updatedProveedores,
    };

    // Update the costs state with updatedCosts
    console.log("costos actualizados luego del delete", updatedCosts);
    modifyCosts(updatedCosts);
    setDeletingCost(null);
    setModalOpened(false);
  };

  const rowOptions = {
    renderAfterRow: (item: any) => {
      const costFound =
        costs && Array.isArray(costs)
          ? (costs as any[]).find((cost: any) => cost.codigo === item.codigoInt)
          : undefined;

      let proveedores;

      if (costFound) {
        proveedores = JSON.parse(costFound.proveedores);
      }

      return (
        <Collapse className="animate" in={ids.includes(item.id)}>
          <tr style={{ flex: "1", display: "flex" }}>
            <td style={{ flex: "1" }}>
              <ul style={{ margin: "0", padding: "0" }}>
                {costFound ? (
                  <div>
                    {proveedores.map((cost) => (
                      <div className="p-2 border-b-2 border-b-slate-600 pb-2">
                        <div className="flex flex-row gap-4 px-1 align-middle items-center">
                          <h3 className="font-bold py-1">{cost.nombre}</h3>
                          <p>{cost.valor}</p>
                          <p>{cost.origen}</p>
                          <button
                            className="rounded-full bg-black flex px-4 py-2"
                            onClick={() => {
                              setEditingCost(cost);
                              setActiveItemCode(item.codigoInt);
                              setProviderName(cost.nombre);
                              setCost(cost.valor);
                              setOrigin(cost.origen);
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="rounded-full bg-red-700 flex px-4 py-2"
                            onClick={() => {
                              setModalOpened(true);
                              setProviderName(cost.nombre);
                              setCostFoundToFilter(costFound);
                              setDeletingCost(cost);
                              // handleDeleteCost(cost, costFound)
                            }}
                          >
                            Borrar
                          </button>
                        </div>
                      </div>
                    ))}
                    {activeItemCode !== item.codigoInt && (
                      <div className="pb-3 pt-4">
                        <button
                          type="submit"
                          className="p-2 rounded-full items-center hover:bg-gray-500 bg-gray-400 dark:bg-black py-2 px-4 py-3"
                          onClick={() => setActiveItemCode(item.codigoInt)}
                        >
                          <a className="dark:text-white text-black font-bold">
                            Agregar Costo
                          </a>
                        </button>
                      </div>
                    )}
                    {activeItemCode === item.codigoInt && (
                      <CostForm
                        costFound={costFound}
                        providerName={providerName}
                        setProviderName={setProviderName}
                        cost={cost}
                        setCost={setCost}
                        origin={origin}
                        setOrigin={setOrigin}
                        handleAddCost={
                          editingCost ? handleEditCost : handleAddCost
                        }
                        setActiveItemCode={setActiveItemCode}
                      />
                    )}
                  </div>
                ) : activeItemCode === item.codigoInt ? (
                  <CostForm
                    costFound={costFound}
                    providerName={providerName}
                    setProviderName={setProviderName}
                    cost={cost}
                    setCost={setCost}
                    origin={origin}
                    setOrigin={setOrigin}
                    handleAddCost={handleAddCost}
                    setActiveItemCode={setActiveItemCode}
                  />
                ) : (
                  <div className="pt-3">
                    <button
                      className="p-2 rounded-full items-center hover:bg-gray-500 bg-gray-400 dark:bg-black py-2 px-4 py-3"
                      onClick={() => {
                        setActiveItemCode(item.codigoInt);
                        setNewCostItem(item);
                      }}
                    >
                      Agregar Costo
                    </button>
                  </div>
                )}
              </ul>
            </td>
          </tr>
        </Collapse>
      );
    },
  };

  return (
    <>
      <Modal
        className="[&>div>section>header>h2]:!text-gray-900"
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={`¿Eliminar el proveedor ${providerName}?`}
      >
        <div className="flex flex-row gap-4">
          <Button
            className="bg-red-600 hover:bg-red-500 text-gray-100"
            onClick={() => handleDeleteCost(deletingCost, costFoundToFilter)}
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

          {/* <Select
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
        /> */}

          <Select
            // value={search}
            onChange={(event) => {
              setSelectedBrand(event);
            }}
            placeholder="Marcas"
            data={brands}
            clearable
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

          <ReloadTable path={paths.costs} />
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
          rowProps={rowProps}
          rowOptions={rowOptions}
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

export default ImportedTableChart;
