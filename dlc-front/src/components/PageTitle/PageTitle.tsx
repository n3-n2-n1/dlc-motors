import { useEffect } from 'react';

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null; // Este componente no renderiza nada
};

export default PageTitle;
