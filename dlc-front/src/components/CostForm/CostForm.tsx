const CostForm = ({
    costFound,
    providerName,
    setProviderName,
    cost,
    setCost,
    handleAddCost,
    setActiveItemCode,
    setOrigin,
  }: any) => {
    return (
      <form
        onSubmit={(e) => {
          handleAddCost(e, costFound);
          setActiveItemCode(null);
        }}
        className="flex flex-col gap-3 pt-2"
      >
        <input
          type="text"
          className="p-2 bg-white dark:bg-black border-none text-black dark:text-white rounded-md"
          value={providerName}
          onChange={(e) => {
            setProviderName(e.target.value);
          }}
          placeholder="Proveedor"
          required
        />
        <input
          type="number"
          className="p-2 bg-white dark:bg-black border-none  text-black dark:text-white rounded-md"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="Precio"
          required
        />
        <select
          className="p-2 bg-white dark:bg-black border-none select-none text-black dark:text-white rounded-md"
          onChange={(e) => setOrigin(e.target.value)}
          required
        >
          <option className="text-black dark:text-white" value="Nacional">
            Nacional
          </option>
          <option className="text-black dark:text-white" value="Importado">
            Importado
          </option>
          <option className="text-black dark:text-white" value="Fabrica">
            Fabrica
          </option>
        </select>
        <div className="pb-3">
          <button
            type="submit"
            className="p-2 rounded-full items-center hover:bg-gray-500 bg-gray-400 dark:bg-black py-2"
          >
            <a className="dark:text-white text-black font-bold">
              Agregar costo
            </a>
          </button>
        </div>
      </form>
    );
  };

export default CostForm