import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";


export default class Table extends Component {
    constructor(props)
    {
      super(props);
      this.state =
      {
        indata : this.props.data,
        incolumns :  this.props.columns,
        selected : null,
        selectedcallback : this.props.selectCallback,
        onMouseOverCallback: this.props.onMouseOverCallback,
        onMouseOutCallback: this.props.onMouseOutCallback
      };
    }

    ReturnTableRows()
    {
        let rows = [];
        for (let index = 0; index < 5; index++) {
            
            rows.push(<tr key={index} id={"row" + index}><td key={"item1-" + index}>{"ROW " + index}</td><td key={"item2-" + index}>{"ROW " + index}</td></tr>);
        }
        return rows;
    }

    render()
    {
        const data = this.props.data;
        const columns = this.props.columns;
        let defaultsorting = []
        if (this.props.defaultsortingid !== null)
        {
            defaultsorting = [
                {
                    id: columns[this.props.defaultsortingid].accessor,
                    desc: true
                }
            ]
        }
        return(
            <ReactTable key="table-child" data={data} columns={columns} minRows = {0} defaultSorted = {defaultsorting} 
            getTrProps={(state, rowInfo) => {
                return {
                    onClick: (e) => {
                       
                        this.props.selectCallback(e,rowInfo);
                        this.setState({
                            selected: rowInfo.index
                        })
                    },
                    onMouseOver: (e) =>
                    {
                        this.props.onMouseOverCallback(e,rowInfo);
                    },
                    onMouseOut: (e) =>
                    {
                        this.props.onMouseOutCallback(e);
                    },
                    // style: {
                    //     background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                    //     color: rowInfo.index === this.state.selected ? 'white' : 'black'
                    // }
                }
            }}
            style={{
                height: "325px" // This will force the table body to overflow and scroll, since there is not enough room
              }}
            />
        );

        /*
        return(
            <div id="table-div">
                <table id="table" className='table'>
                    <thread>
                        <tr>
                         <th key={"COL1"}>{"ONE"}</th>
                         <th key={"COL2"}>{"TWO"}</th>
                       </tr>
                    </thread>
                    <tbody>
                        {this.ReturnTableRows()}
                    </tbody>
                </table>
            </div>
        );
        */

    }
}