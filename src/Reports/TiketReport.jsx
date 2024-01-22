import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TiketReport = (articulosFacturacion, subTotal, totalFinal, descuento, cambio, tarjeta, pagoEfecitivo, dataCaja, resp) => {

  let continueTable = ((articulosFacturacion.length)*10)+30;

  const pdfConfig = {
    unit: 'mm',
    format: [80, continueTable+45],
  };

  const doc = new jsPDF(pdfConfig);

  const addCenteredText = (text, xPos, yPos) => {
    const textWidth = doc.getTextWidth(text);
    const xPosition = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(text, xPosition, yPos);
  };

  // Obtener la fecha actual
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  doc.setFontSize(8);

  const arrayDatos = [];
  for (const articulo in articulosFacturacion) {
    if (articulosFacturacion.hasOwnProperty(articulo)) {
      const articuloData = articulosFacturacion[articulo];
      arrayDatos.push([articuloData.id, articuloData.strDescripcion, `$ ${articuloData.lngImporte}`]);
    }
  }
  
  
  addCenteredText('Factura: '+resp.id, 10, 10);
  addCenteredText('Tel. (347)-102-3933', 10, 15);
  doc.text('Fecha: ' + formattedDate, 10, 20);
  doc.text('__________________________________', 10, 22);
  doc.text('Articulos        ', 10, 25);
  doc.text('__________________________________', 10, 27);
  

  const tableOptions = {
    startY: 30,
    head: [['SKU', 'Descripcion', 'Importe']],
    body: arrayDatos,
    theme: 'plain',
    styles: { cellPadding: 1, fontSize: 8 },
  };

  
    doc.autoTable(tableOptions);
    doc.text('Total a Pagar: $ '+totalFinal,10,continueTable+10)
    doc.text('__________________________________',10, continueTable+15);
    doc.text('Pago en Efectivo: $ ' + pagoEfecitivo, 10, continueTable+20);
    doc.text('Cambio: $ ' + cambio, 10, continueTable+25);
    {(tarjeta>0) ? doc.text('Pago con Tarjeta: $ '+tarjeta, 10, continueTable+30):null}
    {(descuento>0)?doc.text('Descuento: $ '+descuento,10,continueTable+35):null}
    addCenteredText('::::: GRACIAS POR SU COMPRA :::::',10,continueTable+40);
    


  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);

  const pdfWindow = window.open('', '_blank');
  pdfWindow.document.write(`
    <html>
      <head>
        <title>Tiket no. ${resp.id}</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          iframe {
            width: 100vw;
            height: 100vh;
            border: none;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <iframe src="${pdfUrl}"></iframe>
      </body>
    </html>
  `);

  pdfWindow.document.close();

  return doc;
};

export default TiketReport;