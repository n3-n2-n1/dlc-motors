import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { toast } from "react-toastify";
export const useQRCodeScanner = () => {
  const [qrCode, setQrCode] = useState<string>("");
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const handleScan = (result: any, error: any) => {
    if (!!result) {
      setQrCode(result.text);
      
      return;
    }
    if (!!error) {
      console.error(error);
      return;
    }
    return;
  };

  return {
    qrCode,
    setQrCode,
    isQrModalOpen,
    setIsQrModalOpen,
    QrReaderComponent: (
      <div style={{ width: "100%" }}>
        <QrReader
          constraints={{ facingMode: "user" }}
          scanDelay={1000}
          onResult={handleScan}
        />
        {qrCode && <p>Código QR Capturado: {qrCode}</p>}
      </div>
    ),
    QrReaderButton: (
      <div className={`${isQrModalOpen ? "mb-6" : "mt-2"}`}>
        <button
          type="button"
          onClick={() => setIsQrModalOpen((prevState) => !prevState)}
          className="bg-gray-600 inline-flex font-bold items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-100 dark:text-gray-400 leading-none hover:text-gray-200 hover:bg-gray-700"
        >
          {isQrModalOpen ? "Cerrar" : "Escanear QR"}
        </button>
      </div>
    ),
  };
};
