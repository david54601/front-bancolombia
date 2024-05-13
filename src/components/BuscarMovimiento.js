import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TablaCuentas from './TablaCuentas';

const BuscarMovimiento = () => {    
  const [movimiento, setMovimiento] = useState('');
  const [cuentas, setCuentas] = useState([]); 

  const handleBuscarClick = () => {
    axios.get(`http://localhost:8080/api/v1/movimientos/buscar/${movimiento}`)
      .then(response => {
        setCuentas(response.data); 
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error al buscar movimiento:', error);
      });
  };

  useEffect(() => {
    if (movimiento !== '') {
      handleBuscarClick();
    }
  }, [movimiento]);

  useEffect(() => {
  }, [cuentas]);

  return (
    <div>
      <div className='col-md-3 offset-md-3 d-grid mx-auto'>
        <button
          className='btn btn-dark'
          data-bs-toggle='modal'
          data-bs-target='#modalcuenta'
        >
          <i className='fa-solid fa-circle-plus'></i> Buscar Movimiento
        </button>
      </div>
      <div id='modalcuenta' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>Buscar Movimiento</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <input type='hidden' id='id'></input>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                <input
                  type='number'
                  id='movimiento'
                  className='form-control'
                  placeholder='Cuenta Movimientos'
                  value={movimiento}
                  onChange={(e) => setMovimiento(e.target.value)}
                  pattern="[0-9]*"
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
              <button type='button' className='btn btn-primary' onClick={handleBuscarClick} data-bs-dismiss='modal'>Buscar</button>
            </div>
          </div>
        </div>
      </div>
      <TablaCuentas cuentas={cuentas} />
    </div>
  );
};

export default BuscarMovimiento;
