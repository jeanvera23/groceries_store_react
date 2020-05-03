import React, { useState } from 'react';

import { Link } from "react-router-dom";

const ApplicantHistoryPage = () => {
    let DataSet = [
        {
            'Name': 'Jean Vera',
            'DateCreated': '01/12/2019',
            'Status': '1',
            'OrderedBy': 'Counter 1',
            'Type': 'Criminal Check',
            'Delay': 'Third party delay'
        },
        {
            'Name': 'Cynthia Carbajal',
            'DateCreated': '01/12/2019',
            'Status': '2',
            'OrderedBy': 'Counter 2',
            'Type': 'Criminal Check',
            'Delay': 'Administrative delay'
        },
        {
            'Name': 'Andrea Monti',
            'DateCreated': '01/12/2019',
            'Status': '3',
            'OrderedBy': 'Counter 2',
            'Type': 'Criminal Check',
            'Delay': 'No Delay'
        }
    ]
    return (
        <div data-uk-grid>
            <div class="uk-width-1-1@m">
                <h4>Ordenes</h4>
                <div data-uk-grid>
                    <div className="uk-width-1-1@m" >
                        <div className="uk-card uk-card-body md-bg-white">
                            <div data-uk-grid className="uk-grid uk-grid-small">
                                <div className="uk-width-1-1@s" >
                                    <h4>Filter:</h4></div>
                                <div className="uk-width-1-3@m" ><p><strong>Dates</strong></p></div>
                                <div className="uk-width-1-3@m uk-width-1-2" >
                                    <div className="md-input-wrapper md-input-filled md-input-dense">
                                        <label>From:</label>
                                        <input type="date" className="md-input label-fixed" required />
                                        <span className="md-input-bar "></span>
                                    </div>
                                </div>
                                <div className="uk-width-1-3@m uk-width-1-2" >
                                    <div className="md-input-wrapper md-input-filled md-input-dense">
                                        <label>To:</label>
                                        <input type="date" className="md-input label-fixed" required />
                                        <span className="md-input-bar "></span>
                                    </div>
                                </div>

                                <div className="uk-width-1-3" >
                                    <p className="uk-margin-remove"><strong>Status</strong></p>
                                </div>
                                <div className="uk-width-2-3" >
                                    <div className="md-radio md-radio-inline">
                                        <input id='radio_search_all' name='previos_name_radio_group' type="radio" checked />
                                        <label htmlFor="radio_search_all">All</label>
                                    </div>
                                    <div className="md-radio md-radio-inline">
                                        <input id='radio_search_progress' name='previos_name_radio_group' type="radio" />
                                        <label htmlFor="radio_search_progress">Pending</label>
                                    </div>
                                    <div className="md-radio md-radio-inline">
                                        <input id='radio_search_complete' name='previos_name_radio_group' type="radio" />
                                        <label htmlFor="radio_search_complete">Payed</label>
                                    </div>
                                    <div className="md-radio md-radio-inline">
                                        <input id='radio_search_notstarted' name='previos_name_radio_group' type="radio" />
                                        <label htmlFor="radio_search_notstarted">Over due</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="uk-width-1-1@m">
                <div class="md-card">
                    <div class="md-card-content">
                        <div class="uk-clearfix">
                            <div class="uk-float-left">
                                <h4>Results</h4>
                            </div>
                            <div class="uk-float-right">
                                <a class="md-btn md-btn-wave md-bg-green-500 md-color-white">Excel</a>
                                <a class="md-btn md-btn-wave md-bg-blue-900 md-color-white">Print</a>
                            </div>
                        </div>
                        <table id="dt_tableExport" className="uk-table uk-table-hover" width="100%">
                            <thead>
                                <tr>
                                    <th>N.</th>
                                    <th>Date Started</th>
                                    <th>Applicant Name</th>
                                    <th>Order By</th>
                                    <th>Status</th>
                                    <th>Completion date</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DataSet.map((row, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{row.DateCreated}</td>
                                        <td>{row.Name}</td>
                                        <td>{row.OrderedBy}</td>
                                        <td>{row.Status}</td>
                                        <td>{row.DateCreated}</td>
                                        <td>-</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default ApplicantHistoryPage;