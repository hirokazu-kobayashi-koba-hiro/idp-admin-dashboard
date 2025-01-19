"use client";

import { use } from "react";

const UserEditionPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);

  return <div>UserID: {resolvedParams.id}</div>;
};

export default UserEditionPage;
