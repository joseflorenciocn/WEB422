import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class EmployeesPanel extends Component {

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
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Employees</h3>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive overview-table">
                            <table className="table table-striped table-bordered">
                                <tbody>                    
                                    {this.state.employees.map(employees =>                                
                                    <tr>                              
                                        <td>{employees.FirstName} {employees.LastName}</td>
                                        <td>{employees.Position.PositionName}</td>
                                    </tr> 
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Link to="/employees" className="btn btn-primary form-control">View All Employee Data</Link>
                    </div>
                </div>                          
            </div>
        );
      }
}

export default EmployeesPanel;