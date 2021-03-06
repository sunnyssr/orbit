import React from "react";
import { Result, Button } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function ScheduleSuccess(props) {
  return (
    <>
      <Result
        status="success"
        title="Your interview has been scheduled successfully."
        subTitle={`Your interview has been scheduled for ${new Date(
          props.interviewStartTime
        ).toDateString()} ${new Date(
          props.interviewStartTime
        ).toLocaleTimeString()} - ${new Date(
          props.interviewEndTime
        ).toLocaleTimeString()}`}
        extra={[
          <div className="flash warning margin-bt-1">
            We do calls via - <a href="https://whereby.com/altcampus" target="_blank">Whereby AltCampus</a> room. Please be there on time for the call. 
          </div>,
          <Button type="primary">
            <Link to="/profile">See Profile</Link>
          </Button>
        ]}
      />
    </>
  );
}
const mapStateToProps = state => {
  const { interview } = state;
  return {
    ...interview
  };
};
export default connect(mapStateToProps)(ScheduleSuccess);
