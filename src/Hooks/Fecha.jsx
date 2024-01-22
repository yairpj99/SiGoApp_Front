import React, { useState, useEffect } from 'react';
import moment from 'moment';

export const useDate = (format = 'YYYY-MM-DD') => {
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = moment();
      const formatoFecha = ahora.format(format);
      setFecha(formatoFecha);
    }, 1000); // Actualizar cada segundo

    return () => clearInterval(intervalo);
  }, [format]); // Reaccionar al cambio en el formato

  const [year, month, day] = fecha.split('-').map(Number);

  return { year, month, day };
};
