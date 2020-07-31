import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        {" "}
        <i className="fas fa-user">Welcome {user && user.name}</i>
      </p>
      {profile !== null ? (
        <>With Profile </>
      ) : (
        <>
          <p>You have not yet setup a profile,Please set your profile</p>
          <Link to="create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateTpProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateTpProps, { getCurrentProfile })(Dashboard);
