import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert} from '../components/functions';
import { useNavigate } from 'react-router-dom';

const ShowCuentas = () => {

    const url='http://localhost:8080/api/v1/cuentas';
    const navigate = useNavigate();
    const editUrl = `${url}/editar/`;
    const [cuentas,setCuentas]= useState([]);
    const [tipoCuenta,setTipoCuenta]= useState();
    const [id,setId]= useState('');
    const [titular,setTitular]= useState('');
    const [fecha,setFecha]= useState(new Date());
    const [sucursal,setSucursal]= useState('');
    const [moneda,setMoneda]= useState(1);
    const [saldo,setSaldo]= useState();
    const [tasaInteres,setTasaInteres]= useState('');
    const [operacion,SetOperacion]= useState('1');
    const [estado,setEstado]= useState('');
    const [title,setTitle]= useState('');

    
    useEffect( ()=>{
        
        getCuentas();
    },[]);

    
    const getCuentas = async () => {
        const respuesta = await axios.get(url);
        setCuentas(respuesta.data);
    }

    const redireccionarACrearMovimiento = () => {
        navigate('/crear-movimiento'); // Redirige al usuario al nuevo componente
      };


    const buscarMovimientos = () => {
        navigate('/buscar-movimiento'); // Redirige al usuario al nuevo componente
      };
    

    const openModal = (op,id,titular, tipoCuenta, fecha, saldo,sucursal,moneda,tasaInteres) =>{
        setId('');
        setTitular('');
        setTipoCuenta('');
        setFecha('');
        setSaldo('');
        setSucursal('');
        setMoneda('');
        setTasaInteres('');
        SetOperacion(op);
        if(op === 1){
            setTitle('Registrar Cuenta');

        }
        else if(op === 2){
            setTitle('Editar Cuenta');
  //           const editUrl = `${url}/editar/${id}`;

        

            setId(id);
            setTitular(titular);
            setTipoCuenta(tipoCuenta);
            setFecha(fecha);
            setSaldo(saldo);
            setSucursal(sucursal);
            setMoneda(moneda);
            setTasaInteres(tasaInteres);
            SetOperacion(op);

        }
        window.setTimeout(function(){
            document.getElementById('titular').focus();
        },500);
    }

    const validar = () => {
        var parametros;
        var metodo;
        if(titular.trim() === ''){
            show_alert('Escribe el titular','warning');
        }
        else if(tipoCuenta.trim() === ''){
            show_alert('Escribe el tipo de cuenta','warning');
        }
        else if(fecha === ''){
            show_alert('Escribe la fecha de creacion','warning');
        }
        else if(saldo === ''){
            show_alert('Escribe la fecha de creacion','warning');
        }
        else if(sucursal === ''){
            show_alert('Escribe nombre de la sucursal','warning');
        }
        else if(moneda === ''){
            show_alert('Escribe tipo de moneda','warning');
        }
        else if(tasaInteres === ''){
            show_alert('Escribeka tasa de interes','warning');
        }
        else{
            if(operacion === 1){
                parametros= {titular:titular.trim(),tipoCuenta: tipoCuenta.trim(),fecha: fecha,saldo: saldo,sucursal: sucursal.trim(),moneda: moneda.trim(),tasaInteres: tasaInteres.trim(),};
                metodo= 'POST';
            }
            else{

                parametros= {id:id,titular:titular.trim(),tipoCuenta: tipoCuenta.trim(),fecha: fecha,saldo: saldo,sucursal: sucursal.trim(),moneda: moneda.trim(),tasaInteres: tasaInteres.trim(),};
                metodo= 'PUT';
            }
            envarSolicitud(metodo,parametros);
        }
    }


    const envarSolicitud = async(metodo,parametros) => {
        console.log("los parametros son",parametros);
        
        const requestUrl = operacion === 1 ? url : `${editUrl}${id}`;

        await axios({ method:metodo, url: requestUrl, data:parametros}).then(function(respuesta){
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            show_alert(msj,tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
                getCuentas();
            }
        })
        .catch(function(error){
            show_alert('Error en la solicitud','error');
            console.log(error);
        });
    }








    return(
        <div className='App'>
        <div className='container-fluid'>
        <div className='row mt-3'>
                <div className='col-md-12 offset-md-12'>
                    <div className='col-md-3 offset-md-3 d-grid mx-auto'>
                        <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalcuenta'>
                            <i className='fa-solid fa-circle-plus'></i> Crear Cuenta
                        </button>
                    </div> 
                    <div className='col-md-3 offset-md-3  d-grid mx-auto'>
                        <button onClick={redireccionarACrearMovimiento}  className='btn btn-dark' >
                            <i className='fa-solid fa-circle-plus'></i> crear Movimiento
                        </button>
                    </div>

                    <div className='col-md-3 offset-md-3  d-grid mx-auto'>
                        <button onClick={buscarMovimientos}  className='btn btn-dark' >
                            <i className='fa-solid fa-circle-plus'></i> Buscar Movimiento
                        </button>
                    </div>

                </div>
                
            </div>

<div className='row mt-3'>
                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                            <tr><th>#</th><th>Titular</th><th>Tipo de Cuenta </th><th>Apertura</th><th>Saldo</th><th>Sucursal</th><th>Moneda</th><th>Tasa de interes</th></tr>
                            
                            </thead>
                            <tbody className='table-group-divider'>
                               { cuentas.map((cuenta,i)=>(
                                <tr key={cuentas.id}>
                                    <td>{(i+1)}</td>
                                    <td>{(cuenta.titular)}</td>
                                    <td>{(cuenta.tipoCuenta)}</td>
                                    <td>{(cuenta.fecha)}</td>
                                
                                    <td>${new Intl.NumberFormat('es-co').format(cuenta.saldo) }</td>
                                    <td>{(cuenta.sucursal)}</td>
                                    <td>{(cuenta.moneda)}</td>
                                    <td>{(cuenta.tasaInteres)}</td>
                                    <td>
                                    <button onClick={() => openModal(2,cuenta.id,cuenta.titular,cuenta.fecha,cuenta.saldo,cuenta.sucursal,cuenta.moneda,cuenta.tasaInteres)}
                                                 className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalcuenta'>
                                                <i className='fa-solid fa-edit'></i>
                                            </button>

                                        &nbsp;
                                        <button className='btn btn-danger'>
                                        <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </td>
                                    
                                </tr>

                                ))}

                            

                            </tbody>
                        </table>
            </div>
            </div>
            </div>
            </div>
            <div id='modalcuenta' className='modal fade' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type='hidden' id='id'></input>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                            <input type='text' id='titular' className='form-control' placeholder='Titular' value={titular}
                            onChange={(e)=> setTitular(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='tipoCuenta' className='form-control' placeholder='Tipo Cuenta' value={tipoCuenta}
                            onChange={(e)=> setTipoCuenta(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='date' id='fecha' className='form-control' placeholder='Fecha creacion' value={fecha}
                            onChange={(e)=> setFecha(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='double' id='precio' className='form-control' placeholder='Saldo' value={saldo}
                            onChange={(e)=> setSaldo(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='double' id='sucursal' className='form-control' placeholder='Sucursal' value={sucursal}
                            onChange={(e)=> setSucursal(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='double' id='moneda' className='form-control' placeholder='Moneda' value={moneda}
                            onChange={(e)=> setMoneda(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='double' id='moneda' className='form-control' placeholder='tasa de interes' value={tasaInteres}
                            onChange={(e)=> setTasaInteres(e.target.value)}></input>
                        </div>
                        <div className='d-grid col-6 mx-auto'>
                            <button onClick={() => validar()} className='btn btn-success'>
                                <i className='fa-solid fa-floppy-disk'></i> Guardar
                            </button>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>

            </div>
           
                                </div>

            
            

    )




}

export default ShowCuentas
