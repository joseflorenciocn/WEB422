import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class TeamsPanel extends Component {

    state = {
        teams: []
      }
    
      componentDidMount() {
        axios.get("https://secure-ocean-44491.herokuapp.com/teams-raw")
          .then(res => {
            const teams = res.data;
            this.setState({ teams });
          })
      }

      render() {

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Teams</h3>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive overview-table">
                            <table className="table table-striped table-bordered">
                                <tbody>
                    
                                    {this.state.teams.map(teams => 
                                
                                    <tr>
                                
                                    <td>{teams.TeamName}</td>
                                    <td>{teams.Employees.length} Employees</td>

                                    </tr> 

                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Link to="/teams" className="btn btn-primary form-control">View All Team Data</Link>
                    </div>
                </div>                          
            </div>
        );
      }
}

export default TeamsPanel;