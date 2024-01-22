import React, { useState, useEffect } from 'react';
import moment from 'moment';

export const useClook = () => {
  const [hora, setHora] = useState('');

  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = moment();
      const formatoHora = ahora.format('HH:mm:ss');
      setHora(formatoHora);
    }, 1000); // Actualizar cada segundo

    return () => clearInterval(intervalo);
  }, []); // Ejecutar solo una vez al montar el componente

  return hora;
};
