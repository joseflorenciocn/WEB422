/*********************************************************************************
*  WEB422 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Jose Florencio Coelho Neto Student ID: 131650160 Date: 15/06/2018
*
*
********************************************************************************/ 

var viewModel = {
    teams: ko.observable([]),
    employees: ko.observable([]),
    projects: ko.observable([]),
};

function showGenericModal(title,message) {

    $(".modal-title").empty();
    $(".modal-body").empty();
    $(".modal-title").append(title);
    $(".modal-body").append(message);
    $("#myModal").modal("show");
} 

function initializeTeams() {

    return new Promise(function (resolve, reject) {

        $.ajax({
            url: "https://secure-ocean-44491.herokuapp.com/teams-raw",
            type: "GET",
            contentType: "application/json"
        })
        .then(function(data){
            viewModel.teams = data;
            //viewModel.teams = ko.mapping.fromJS(data)
            resolve(viewModel);
        })
        .catch(function (error) {
            reject("No results returned");
        });
    });
};

function initializeEmployees() {

    return new Promise(function (resolve, reject) {

        $.ajax({
            url: "https://secure-ocean-44491.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
        .then(function(data){
            //console.log(data[0]);
            viewModel.employees = data;
            //viewModel.employees = ko.mapping.fromJS(data)
           // console.log(viewModel.employees[0]);
            resolve(viewModel);
        })
        .catch(function (error) {
            reject("No results returned");
        });
    });
};

function initializeProjects() {

    return new Promise(function (resolve, reject) {

        $.ajax({
            url: "https://secure-ocean-44491.herokuapp.com/projects",
            type: "GET",
            contentType: "application/json"
        })
        .then(function(data){
            viewModel.projects = data;
            //viewModel.projects = ko.mapping.fromJS(data)
            resolve(viewModel);
        })
        .catch(function (error) {
            reject("No results returned");
        });

    });
};

function saveTeam() {
    currentTeam = this;
    //console.log("https://secure-ocean-44491.herokuapp.com/team/:" + currentTeam._id);
   
    var data = {
        Projects: currentTeam.Projects,
        Employees: currentTeam.Employees,
        TeamLead: currentTeam.TeamLead
    } 
    
    $.ajax({
        url: "https://secure-ocean-44491.herokuapp.com/team/" + currentTeam._id,
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json"
    })
    .then(function(data){
       showGenericModal("Sucess",currentTeam.TeamName + " Updated Successfully.");
        //resolve("Success");
    })
    .catch(function (error) {
        console.log(error)
        showGenericModal("Error", "Error updating the team information.")
        //reject();
    });
  
}

$(function(){

    new Promise(function (resolve, reject) {

        initializeTeams()
        .then(initializeEmployees)
        .then(initializeProjects)
        .then(function (){

            ko.applyBindings(viewModel, $("#teste")[0]);
            $(".multiple").multipleSelect({ filter: true });
            $(".single").multipleSelect({ single: true, filter: true });
            resolve();
            
        })
        .catch(function (err){
            console.log(err);
            showGenericModal("Error", "Unable to get Data");
        })
    });       
    
        
});