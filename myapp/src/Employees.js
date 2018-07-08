import React, { Component } from 'react';
import MainContainer from './MainContainer';
import moment from 'moment';
import axios from 'axios';

class Employees extends Component {

    state = {
        employees: []
      }
    
      componentDidMount() {
        axios.get("https://secure-ocean-44491.herokuapp.com/employees")
          .then(res => {
            const employees = res.data;
            this.setState({ employees });
          })
      }

  render() {
    return (
        <div>
            <MainContainer sidebar = "Employees" >
                <h1 className="page-header">Employees</h1>
                <table className="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <td><b>Name & Position</b></td>
                            <td><b>Address</b></td>
                            <td><b>Phone Num</b></td>
                            <td><b>Hire Date</b></td>
                            <td><b>Salary Bonus</b></td>
                        </tr>
                        {this.state.employees.map(emp =>       
                        <tr>
                            <td>{emp.FirstName} {emp.LastName} - {emp.Position.PositionName}</td>
                            <td>{emp.AddressStreet}, {emp.AddressCity} {emp.AddressState}, {emp.AddressZip}</td>
                            <td>{emp.PhoneNum} ex: {emp.Extension}</td>
                            <td>{moment(emp.HireDate).format("LL")}</td>
                            <td>$ {emp.SalaryBonus}</td>
                        </tr> 
                        )}
                    </tbody>
                </table>
            </ MainContainer>
        </div>

    );
  }
}

export default Employees;