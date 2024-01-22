import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InventariosReport = (data, idUser, name) => {
  // Configuración de tamaño de página y márgenes
  const pdfConfig = {
    orientation: 'landscape',
    unit: 'mm',
    format: 'letter',
  };

  // Obtener la fecha actual
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  const arrayDatos = [];
  for (const articulo in data) {
    if (data.hasOwnProperty(articulo)) {
      const articuloData = data[articulo];
      arrayDatos.push([articuloData.id, articuloData.lngCantidad, articuloData.strDescripcion, articuloData.strMarca, articuloData.strCategoria, articuloData.strTalla]);
    }
  }

  // Crear un nuevo documento PDF
  const doc = new jsPDF(pdfConfig);

  // Agregar texto al PDF con formato
  doc.setFont('helvetica');
  doc.setFontSize(16);

  // Usar la fecha actual en el texto del informe
  doc.text(` INFORME DE INVENTARIOS AL ${formattedDate} `, 20, 20);

  doc.setFontSize(12);

  doc.autoTable({
    startY: 30,
    head: [['Fecha impresion: ', 'ID De Usuario', '']],
    body: [[formattedDate, idUser, name]],
  });

  doc.autoTable({
    startY: 50,
    head: [['SKU','Cant','Descripcion','Marca','Categoria','Talla','Actual']],
    body: arrayDatos,
  });

  doc.text("FIRMA",20,500)

  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);

  const pdfWindow = window.open('', '_blank');
  pdfWindow.document.write(`
    <html>
      <head>
        <title>Informe de Inventarios</title>
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

export default InventariosReport;
