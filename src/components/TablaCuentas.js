import React from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import logoImage from '../img/bancolombia.png';

const TablaCuentas = ({ cuentas }) => {
  const generarPDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 12;
      const yStart = height - 50;

      const imageBytes = await fetch(logoImage).then((res) => res.arrayBuffer());
      const image = await pdfDoc.embedPng(imageBytes);
      const imageWidth = 100;
      const imageHeight = 100;
      page.drawImage(image, {
        x: width - imageWidth - 100,
        y: height - 100,
        width: imageWidth,
        height: imageHeight,
      });
      
      const textX = 50; // Posición X del texto
      const textY = height - 100; // Posición Y del texto
      const text = 'Texto al lado izquierdo de la imagen'; // Texto a mostrar
      page.drawText(text, {
        x: textX,
        y: textY,
        size: fontSize,
      });


      const columnOrder = ["descripcion", "fecha", "metodoPago", "tipoCuenta", "tipoTransaccion", "total", "valor"];

      // Definir el ancho de cada columna
      const columnWidth = 100;

      // Calcular la posición inicial de las columnas
      const startX = 50;

      // Dibujar encabezados de columna y líneas verticales
      for (let colIndex = 0; colIndex < columnOrder.length; colIndex++) {
        const x = startX + colIndex * columnWidth;
        const y = yStart - 20;
        const title = columnOrder[colIndex];
        page.drawText(title, {
          x: x + 5,
          y: y - 15,
          size: fontSize,
        });
        // Dibujar líneas verticales
        page.drawLine({
          start: { x, y: y - 20 },
          end: { x, y: y - 20 - cuentas.length * 20 }, // Vertical hasta abajo
          thickness: 1,
          color: rgb(0, 0, 0),
        });
      }

      // Dibujar líneas horizontales de la tabla
      const tableWidth = columnOrder.length * columnWidth;
      const tableHeight = (cuentas.length + 1) * 20; // +1 for header row
      const tableX = startX;
      const tableY = yStart - tableHeight;

      page.drawLine({
        start: { x: tableX, y: tableY },
        end: { x: tableX + tableWidth, y: tableY },
        thickness: 1,
        color: rgb(0, 0, 0),
      });

      for (let i = 0; i <= cuentas.length; i++) {
        const y = tableY + i * 20;
        page.drawLine({
          start: { x: tableX, y },
          end: { x: tableX + tableWidth, y },
          thickness: 1,
          color: rgb(0, 0, 0),
        });
      }

      // Dibujar datos de la tabla
      for (let rowIndex = 0; rowIndex < cuentas.length; rowIndex++) {
        for (let colIndex = 0; colIndex < columnOrder.length; colIndex++) {
          const x = startX + colIndex * columnWidth;
          const y = yStart - (rowIndex + 2) * 20;
          const key = columnOrder[colIndex];
          const content = cuentas[rowIndex][key];
          page.drawText(content ? content.toString() : "", {
            x: x + 5, // Ajustar posición X para alinear con la columna
            y: y - 15,
            size: fontSize,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();

      saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), 'Movimientos.pdf');
    } catch (error) {
      console.error('Error PDF:', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-4 mr-2">
        <button onClick={generarPDF} className='btn btn-dark ' >Generar PDF</button>
      </div>

      <div className='row mt-3'>
        <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th>Método de Pago</th>
                  <th>Tipo de Cuenta</th>
                  <th>Tipo de Transacción</th>
                  <th>Total</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {cuentas && cuentas.length > 0 ? (
                  cuentas.map((cuenta, index) => (
                    <tr key={index}>
                      <td>{cuenta.descripcion}</td>
                      <td>{cuenta.fecha}</td>
                      <td>{cuenta.metodoPago}</td>
                      <td>{cuenta.tipoCuenta}</td>
                      <td>{cuenta.tipoTransaccion}</td>
                      <td>${new Intl.NumberFormat('es-co').format(cuenta.total)}</td>
                      <td>${new Intl.NumberFormat('es-co').format(cuenta.valor)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">No hay datos disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaCuentas;
