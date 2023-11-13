import React from "react";

export const ResultMatrix = ({
  first,
  second,
}: {
  first: string;
  second: string;
}) => {
  return (
    <div className="w-full border-black border-4">
      {first} = {second}
    </div>
  );
};
