import React from "react";

const Profile = (props) => {
  return (
    <div className="container">
      {props.content && (
        <div className="user-data">
          <div>
            <pre>
              <span className="property">Email    </span>
              <span className="value">{props.content.email}</span>
            </pre>
          </div>

          <div>
            <pre>
              <span className="property">ID       </span>
              <span className="value">{props.content.id}</span>
            </pre>
          </div>

          <div>
            <pre>
              <span className="property">Name     </span>
              <span className="value">{props.content.name}</span>
            </pre>
          </div>

          <div>
            <pre>
              <span className="property">Username </span>
              <span className="value">{props.content.username}</span>
            </pre>
          </div>
          <div>
            <pre>
              <span className="property">Contact  </span>
              <span className="value">{props.content.phone}</span>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
