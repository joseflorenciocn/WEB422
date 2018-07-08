import React, { Component } from 'react';
import MainContainer from './MainContainer';
import moment from 'moment';
import axios from 'axios';

class Projects extends Component {

    state = {
        projects: []
      }

      componentDidMount() {
        axios.get("https://secure-ocean-44491.herokuapp.com/projects")
          .then(res => {
            const projects = res.data;
            this.setState({ projects });
          })
      }

  render() {
    return (
        <div>
            <MainContainer sidebar = "Projects" >
                <h1 className="page-header">Projects</h1>
                <table className="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            <td><b>Description</b></td>
                            <td><b>Start Date</b></td>
                            <td><b>End Date</b></td>
                        </tr>
                        {this.state.projects.map(projects =>       
                        <tr>
                            <td>{projects.ProjectName}</td>
                            <td>{projects.ProjectDescription}</td>
                            <td>{moment(projects.ProjectStartDate).format("LL")}</td>
                            <td>{projects.ProjectEndDate == null ? 'n/a' : moment(projects.ProjectEndDate).format("LL")}</td>
                        </tr> 
                        )}
                    </tbody>
                </table>
            </ MainContainer>
        </div>

    );
  }
}

export default Projects;