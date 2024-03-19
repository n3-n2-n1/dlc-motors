import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchBrands,
  fetchErrorObservations,
  fetchOutcomeObservations,
  fetchReturnObservations,
  fetchIncomeObservations,
} from "../utils/Handlers/Handlers";

interface BrandsObservationsContextProps {
  brands: string[];
  setBrands: React.Dispatch<React.SetStateAction<string[]>>;
  errorsObservations: string[];
  setErrorsObservations: React.Dispatch<React.SetStateAction<string[]>>;
  outcomesObservations: string[];
  setOutcomesObservations: React.Dispatch<React.SetStateAction<string[]>>;
  returnsObservations: string[];
  setReturnsObservations: React.Dispatch<React.SetStateAction<string[]>>;
  incomesObservations: string[];
  setIncomesObservations: React.Dispatch<React.SetStateAction<string[]>>;
  handleDeleteModal: (codigoInt: any) => void;
  modalOpened: boolean;
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCodigoInt: any;
}

export const BrandsObservationsContext = createContext<
  BrandsObservationsContextProps | undefined
>(undefined);

export const BrandsObservationsProvider: React.FC = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [brands, setBrands] = useState<string[]>([]);
  const [errorsObservations, setErrorsObservations] = useState<string[]>([]);
  const [outcomesObservations, setOutcomesObservations] = useState<string[]>(
    []
  );
  const [returnsObservations, setReturnsObservations] = useState<string[]>([]);
  const [incomesObservations, setIncomesObservations] = useState<string[]>([]);

  useEffect(() => {
    const getBrands = async () => {
      const { marcas = [] } = await fetchBrands();
      const brands = marcas.split(",");
      setBrands(brands);
    };
    getBrands();
  }, []);

  useEffect(() => {
    const getErrorObservations = async () => {
      const { observaciones = [] } = await fetchErrorObservations();
      const observations = observaciones.split(",");
      setErrorsObservations(observations);
    };
    getErrorObservations();
  }, []);

  useEffect(() => {
    const getOutcomeObservations = async () => {
      const { observaciones = [] } = await fetchOutcomeObservations();
      const observations = observaciones.split(",");
      setOutcomesObservations(observations);
    };
    getOutcomeObservations();
  }, []);

  useEffect(() => {
    const getReturnObservations = async () => {
      const { observaciones = [] } = await fetchReturnObservations();
      const observations = observaciones.split(",");
      setReturnsObservations(observations);
    };
    getReturnObservations();
  }, []);

  useEffect(() => {
    const getIncomeObservations = async () => {
      const { observaciones = [] } = await fetchIncomeObservations();
      const observations = observaciones.split(",");
      setIncomesObservations(observations);
    };
    getIncomeObservations();
  }, []);

    // TEST PARA DELETE BUTTON TABLE
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedCodigoInt, setSelectedCodigoInt] = useState(null);

    const handleDeleteModal = (codigoInt: any) => {
      setSelectedCodigoInt(codigoInt);
      setModalOpened(true);
    };

  const value = {
    brands,
    setBrands,
    errorsObservations,
    setErrorsObservations,
    outcomesObservations,
    setOutcomesObservations,
    returnsObservations,
    setReturnsObservations,
    incomesObservations,
    setIncomesObservations,
    handleDeleteModal,
    modalOpened,
    setModalOpened,
    selectedCodigoInt,
  };


  return (
    <BrandsObservationsContext.Provider value={value}>
      {children}
    </BrandsObservationsContext.Provider>
  );
};

export const useBrandsObservations = () => {
  const context = useContext(BrandsObservationsContext);

  if (!context) {
    throw new Error(
      "useBrandsObservations debe ser utilizado dentro de un BrandsObservations"
    );
  }

  return context;
};
