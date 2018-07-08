import React, { Component } from 'react';
import MainContainer from './MainContainer';
import axios from 'axios';

class Teams extends Component {

    state = {
        teams: [],
        projects: [],
        employees: []
      }

      componentDidMount() {
        axios.get("https://secure-ocean-44491.herokuapp.com/teams-raw")
          .then(res => {
            const teams = res.data;
            this.setState({ teams });
          })

          axios.get("https://secure-ocean-44491.herokuapp.com/projects")
          .then(res => {
            const projects = res.data;
            this.setState({ projects });
          })

          axios.get("https://secure-ocean-44491.herokuapp.com/employees")
          .then(res => {
            const employees = res.data;
            this.setState({ employees });
          })
      }

    ProjectNames(team_proj) {

        var proj_names = [];
        var num = this.state.projects.length;
        for (var i = 0; i< num; i++)
        {
            if(team_proj === this.state.projects[i]._id)
            proj_names = this.state.projects[i].ProjectName
        }
 
        return proj_names;
    }

    TeamLeader(team_lead) {

        var lead_name = {
                first: [],
                last: []
        };

        for (var i = 0; i< this.state.employees.length; i++)
        {
            if(team_lead === this.state.employees[i]._id)
            {
                lead_name.first = this.state.employees[i].FirstName
                lead_name.last = this.state.employees[i].LastName
            }
            
        }
 
        return lead_name;
    }

  render() {
    return (
        <div>
            <MainContainer sidebar = "Teams" >
                <h1 className="page-header">Teams</h1>
                <table className="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            <td><b>Projects</b></td>
                            <td><b>Employees</b></td>
                            <td><b>Team Lead</b></td>
                        </tr>
                        {this.state.teams.map(teams => 
                            <tr>
                                <td>{teams.TeamName}</td>
                                <td>
                                    <ul>
                                        {teams.Projects.map(names => 
                                            <li>{this.ProjectNames(names)}</li>
                                        )}
                                    </ul>
                                </td>
                                <td>{teams.Employees.length} Employees</td>
                                <td>{this.TeamLeader(teams.TeamLead).first} {this.TeamLeader(teams.TeamLead).last}</td>
                            </tr> 
                        )}


                    </tbody>
                </table>
            </ MainContainer>
        </div>

    );
  }
}

export default Teams;