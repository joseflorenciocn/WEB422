import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ProjectsPanel extends Component {

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
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Projects</h3>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive overview-table">
                            <table className="table table-striped table-bordered">
                                <tbody>
                    
                                    {this.state.projects.map(projects => 
                                
                                    <tr>
                                        
                                    <td>{projects.ProjectName}</td>
                                    <td>Active {moment().diff(projects.ProjectStartDate, "days")} days</td>
                                    
                                    </tr> 

                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Link to="/projects" className="btn btn-primary form-control">View All Project Data</Link>
                    </div>
                </div>                          
            </div>
        );
      }
}

export default ProjectsPanel;