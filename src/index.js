import React from 'react';
import ReactDOM from 'react-dom';
import { dbase } from './currencyInfo.json'
import './index.css'
const fetched = dbase;
const URL = 'https://openexchangerates.org/api/latest.json?app_id=5e5f9d54839a41b9b9dc77ec8d307ae1';
const d = new Date();
let date = d.toString();
fetch(URL)
    .then((Response) => Response.json())
    .then(myJson => {
        Object.keys(fetched).forEach(iso => fetched[iso].rate = myJson.rates[iso]);
        Object.keys(fetched).forEach(iso => {
            if (fetched[iso].rate === undefined) {
                delete fetched[iso];
            };
        });
        console.log(fetched);
        ReactDOM.render(<Program />, document.getElementById('master'));
        document.getElementById('down').options[2].defaultSelected = true;
        document.getElementById('symbol1').innerHTML = document.getElementById('up').options[document.getElementById('up').selectedIndex].id;
        document.getElementById('symbol2').innerHTML = document.getElementById('down').options[document.getElementById('down').selectedIndex].id;
        let ups = parseFloat(document.getElementById('up').options[document.getElementById('up').selectedIndex].value);
        let downs = parseFloat(document.getElementById('down').options[document.getElementById('down').selectedIndex].value);
        let upsCode = document.getElementById('up').options[document.getElementById('up').selectedIndex].className;
        let downsCode = document.getElementById('down').options[document.getElementById('down').selectedIndex].className;
        document.getElementById('footer').innerHTML=`${ups} ${upsCode} = ${downs.toFixed(4)} ${downsCode}`;
    });
class Program extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetched
        };
    }
    populate() {
        return Object.keys(this.state.fetched)
            .map(iso =>
                <option
                    className={fetched[iso].code}
                    key={fetched[iso].code}
                    id={fetched[iso].symbol}
                    value={fetched[iso].rate}
                >
                    {fetched[iso].name}
                </option>)
    }
    symbols() {
        let select1 = document.getElementById('up');
        let select2 = document.getElementById('down');
        document.getElementById('symbol1').innerHTML = select1.options[select1.selectedIndex].id;
        document.getElementById('symbol2').innerHTML = select2.options[select2.selectedIndex].id;
        let ups = parseFloat(document.getElementById('up').options[document.getElementById('up').selectedIndex].value);
        let downs = parseFloat(document.getElementById('down').options[document.getElementById('down').selectedIndex].value);
        let upsCode = document.getElementById('up').options[document.getElementById('up').selectedIndex].className;
        let downsCode = document.getElementById('down').options[document.getElementById('down').selectedIndex].className;
        let downsOut=downs/ups;
        document.getElementById('footer').innerHTML=`1 ${upsCode} = ${downsOut.toFixed(4)} ${downsCode}`;
    }
    calculateUp() {
        let ups = parseFloat(document.getElementById('up').options[document.getElementById('up').selectedIndex].value);
        let downs = parseFloat(document.getElementById('down').options[document.getElementById('down').selectedIndex].value);
        document.getElementById('numberDown').value = parseFloat((downs / ups) * document.getElementById('numberUp').value).toFixed(4);
    }
    calculateDown() {
        let downs = parseFloat(document.getElementById('up').options[document.getElementById('up').selectedIndex].value);
        let ups = parseFloat(document.getElementById('down').options[document.getElementById('down').selectedIndex].value);
        document.getElementById('numberUp').value = parseFloat((downs / ups) * document.getElementById('numberDown').value).toFixed(4);
    }
    render() {
        return (
            <div className="cont" >
                <div className='card mt-5 app' >
                    <h1 className='card-header header' >Currency converter</h1>
                    <div className='card-body cont' >
                        <div className='date badge badge-info'>{date}</div>
                        <div className='conts' >
                            <select name='up' id='up' className='btn btn-primary sel' onChange={this.symbols} >
                                {this.populate()}
                            </select>
                            <div className='money'>
                                <div id="symbol1" className="symbols  badge badge-warning"></div>
                                <input type="number" name="" id="numberUp" className='inputs' placeholder='0.0000' onInput={this.calculateUp} />
                            </div>
                        </div>
                        <div className='conts' >
                            <select name="down" id="down" className='btn btn-primary sel' onChange={this.symbols} >
                                {this.populate()}
                            </select>
                            <div className='money' >
                                <div id="symbol2" className="symbols  badge badge-warning"></div>
                                <input type="number" name="" id="numberDown" className='inputs ' placeholder='0.0000' onInput={this.calculateDown} />
                            </div>
                        </div>
                    </div>
                    <h3 className='card-footer footer' id='footer' ></h3>
                </div>
            </div>
        );
    }
}

