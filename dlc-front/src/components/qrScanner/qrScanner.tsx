import React, { useState } from 'react';
import {QrReader} from 'react-qr-reader';

const QRCodeScanner: React.FC = () => {
  const [qrCode, setQrCode] = useState<string>('');

  const handleScan = (data: string | null) => {
    if (data) {
      setQrCode(data);
      console.log('Código QR escaneado:', data);
      // Aquí puedes agregar lógica adicional, como enviar el código a un servidor
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const handleResult = () => {
    console.log('Holi')
  }

  return (
    <div style={{ width: '100%' }}>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        onResult={handleResult}
      />
      {qrCode && <p>Código QR Capturado: {qrCode}</p>}
    </div>
  );
};

export default QRCodeScanner;
