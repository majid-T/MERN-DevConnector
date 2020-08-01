import React from "react";
import PropTypes from "prop-types";
import Moement from "react-moment";
import { connect } from "react-redux";
import Moment from "react-moment";

const Experience = ({ experience }) => {
  const experiences = experience.map((exp) => {
    return (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td>
          <Moment format="YYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            " NOW"
          ) : (
            <Moment format="YYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
