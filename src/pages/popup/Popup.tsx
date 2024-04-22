import React, { useEffect } from "react";
import logo from "@assets/img/logo.svg";

import { DexieBackend as Backend } from "@src/lib/DexieBackend";
import { Link } from "@src/lib/types";

enum State {
  INIT,
  SAVING,
  SAVED,
  ERROR,
}

export default function Popup(): JSX.Element {
  const [url, setUrl] = React.useState<string>("");
  const [key, setKey] = React.useState<string>("");
  const [state, setState] = React.useState<State>(State.INIT);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab) {
        setUrl(tab.url || "");
      }
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log("Form JSON: ", formJson);

    setState(State.SAVING);
    Backend.set(formJson as Link).then(() => window.close());
  };

  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  switch (state) {
    case State.INIT:
      return (
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="space-y-12 m-3 pb-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a new link
            </h2>
            {/* <p className="mt-1 text-sm leading-2 text-gray-600">
            
          </p> */}

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8">
              <div className="sm:col-span-4">
                <label
                  htmlFor="key"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Key
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 text-sm">
                      go/
                    </span>
                    <input
                      onChange={(e) => setKey(e.target.value)}
                      type="text"
                      name="key"
                      id="key"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm leading-6"
                      placeholder="somewhere"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Destination
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="destination"
                      id="destination"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm leading-6"
                      defaultValue={url}
                      placeholder="somewhere"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm leading-6"
                      defaultValue={key ? capitalize(key) : ""}
                      placeholder="Somewhere"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={2}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      );

    case State.SAVING:
      return <h1>Saving...</h1>;
  }
}
