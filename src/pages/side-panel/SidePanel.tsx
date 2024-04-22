import React, { useEffect } from "react";

import { DexieBackend as Backend } from "@src/lib/DexieBackend";
import { Link } from "@src/lib/types";

export default function SidePanel(): JSX.Element {
  const [links, setLinks] = React.useState<Link[]>([]);
  useEffect(() => {
    Backend.list().then((links) => setLinks(links));
  }, []);

  return (
    <div className="container mx-4 mt-8">
      <div className="bg-white shadow-md rounded my-6 mx-2">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Name
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                URL
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.key} className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">
                  {link.key}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {link.destination}
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  {link.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
