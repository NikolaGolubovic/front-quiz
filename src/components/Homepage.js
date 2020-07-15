import React from "react";

import GuestHomepage from "./GuestHomepage";
import UserHomepage from "./UserHomepage";

function Homepage({ user }) {
  return <div>{user ? <UserHomepage user={user} /> : <GuestHomepage />}</div>;
}

export default Homepage;
