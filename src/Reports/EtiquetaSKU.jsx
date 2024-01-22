import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import JsBarcode from 'jsbarcode';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    borderBottom: '1 solid #ccc',
  },
  section: {
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 0.4,
    fontSize: 5,
  },
  textDescription:{
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 1,
    padding: 10,
    fontSize: 10,
  },
  barcodeContainer: {
    marginTop: 1,
  },
  text: {
    margin: 5,
  },
  textPrice: {
    margin: 2,
    fontSize: 20,
  },
  descuento: {
    margin: 2,
    fontSize: 10,
    textDecoration: 'line-through',
  },
  descuentoPrice: {
    margin: 2,
    fontSize: 20,
    color: 'red',
  },
});

const EtiquetaSku = ({ sku, formStateSave }) => {
  const [barcodeImage, setBarcodeImage] = useState(null);

  useEffect(() => {
    const generateBarcodeImage = async () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.willReadFrequently = true;
      JsBarcode(canvas, sku, { format: 'CODE128', width: 150, height: 80, text: "none", font: "none", textPosition: "none" });
      document.body.appendChild(canvas);
      try {
        const canvasImage = await html2canvas(canvas);
        const imageData = canvasImage.toDataURL('image/png');
        setBarcodeImage(imageData);
      } catch (error) {
        console.error('Error al utilizar html2canvas:', error);
      } finally {
        document.body.removeChild(canvas);
      }
    };
    generateBarcodeImage();
  }, [sku]);

  return (
    <Document>
      <Page size={{ width: 288, height: 144 }}>
        <View style={styles.container}>
          <View style={styles.section}>
            {barcodeImage && <Image src={barcodeImage} style={{ width: 150, height: 80 }}/>}
            <Text style={styles.text}>SKU: {sku}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>Marca: {formStateSave.strMarca}</Text>
            <Text style={styles.text}>Categoria: {formStateSave.strCategoria}</Text>
            {(formStateSave.strTalla!="ST")?<Text style={styles.text}>Talla: {formStateSave.strTalla}</Text>:null}
            {(formStateSave.lngDescuentoDirecto>0)?
            <>
            <Text style={styles.descuento}>$ {formStateSave.lngPrecioUnitario}</Text>
            <Text style={styles.descuentoPrice}>$ {formStateSave.lngPrecioUnitario-formStateSave.lngDescuentoDirecto}</Text>
            </>
            :
            <Text style={styles.textPrice}>$ {formStateSave.lngPrecioUnitario}</Text>
            }

          </View>
        </View>
        <View>
          <Text style={styles.textDescription}>{formStateSave.strDescripcion}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default EtiquetaSku;
